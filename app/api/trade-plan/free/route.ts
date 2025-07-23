import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { getStockData } from '@/lib/api';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { getCachedTradePlan } from '@/lib/cache/trade-plan-cache';
import { generateTradePlanSEO, extractSEODataFromTradePlan } from '@/lib/seo/trade-plan-seo';
import { getStockPriority } from '@/lib/config/top-stocks';

// Helper to get today's date in YYYY-MM-DD
function getToday() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Cache trade plan in background (non-blocking)
 */
async function cacheTradePlanInBackground(symbol: string, tradePlan: any) {
  try {
    const upperSymbol = symbol.toUpperCase();
    const now = new Date();
    
    // Validate trade plan data before caching
    if (!tradePlan || !tradePlan.companyName) {
      console.error(`Invalid trade plan data for ${upperSymbol}`);
      return;
    }
    
    // Generate SEO content from the fresh trade plan
    const seoData = extractSEODataFromTradePlan(tradePlan);
    const seoContent = generateTradePlanSEO(seoData);
    
    // Calculate cache expiration (24 hours from now)
    const cacheExpiresAt = new Date();
    cacheExpiresAt.setHours(cacheExpiresAt.getHours() + 24);
    
    // Get current cache state for analytics
    const { data: existingCache } = await supabase
      .from('cached_trade_plans')
      .select('generation_count')
      .eq('symbol', upperSymbol)
      .single();
    
    const userDemandCount = existingCache?.generation_count || 0;
    
    const cacheData = {
      symbol: upperSymbol,
      trade_plan: tradePlan,
      seo_content: seoContent.content,
      meta_description: seoContent.description,
      base_price: tradePlan.currentPrice,
      last_price_update: now.toISOString(),
      priority: getStockPriority(upperSymbol),
      is_active: true,
      cache_expires_at: cacheExpiresAt.toISOString(),
      generation_count: userDemandCount + 1,
      last_accessed: now.toISOString(),
      source: 'free_user_generated',
      updated_at: now.toISOString()
    };
    
    // Always upsert cache entry with fresh data
    await supabase
      .from('cached_trade_plans')
      .upsert(cacheData, {
        onConflict: 'symbol'
      });
    
    console.log(`Successfully cached fresh data for ${upperSymbol} from free user`);
      
  } catch (error) {
    console.error('Background cache operation failed for', symbol, error);
  }
}

// Track free user requests by IP address (since they're not authenticated)
const freeUserRequestTracker = new Map<string, { count: number, date: string }>();

// Clean up old entries every hour
setInterval(() => {
  const today = getToday();
  const entries = Array.from(freeUserRequestTracker.entries());
  for (const [ip, data] of entries) {
    if (data.date !== today) {
      freeUserRequestTracker.delete(ip);
    }
  }
}, 60 * 60 * 1000);

export async function POST(request: Request) {
  try {
    // Get client IP for tracking free user limits
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    const today = getToday();
    
    // Check if user is authenticated (optional for this endpoint)
    const session = await getServerSession(authOptions);
    
    // If authenticated, redirect to main trade-plan endpoint
    if (session?.user?.email) {
      console.log(`Authenticated user ${session.user.email} redirected to main API`);
      return NextResponse.json({ 
        error: 'Please use the main trade plan endpoint for authenticated users',
        redirect: '/api/trade-plan' 
      }, { status: 400 });
    }
    
    const { symbol, horizon = 'swing' } = await request.json();
    
    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }
    
    const upperSymbol = symbol.toUpperCase();
    
    // Check for cached data first
    const cachedPlan = await getCachedTradePlan(upperSymbol);
    
    // Track free user requests by IP
    const userTracker = freeUserRequestTracker.get(ip) || { count: 0, date: today };
    
    // Reset count if it's a new day
    if (userTracker.date !== today) {
      userTracker.count = 0;
      userTracker.date = today;
    }
    
    // Check daily limit for free users (1 fresh trade plan per day per IP)
    const FREE_DAILY_LIMIT = 1;
    
    if (userTracker.count >= FREE_DAILY_LIMIT) {
      // Over limit - only serve cached data if available
      if (cachedPlan && (cachedPlan as any).trade_plan) {
        console.log(`🔒 Free user over limit (${ip}) - serving cached data for ${upperSymbol}`);
        return NextResponse.json({
          tradePlan: (cachedPlan as any).trade_plan,
          cached: true,
          freeUser: true,
          dailyLimitReached: true,
          message: 'Daily limit reached. Showing cached data. Sign up for fresh trade plans!',
          upgradeMessage: 'Get unlimited fresh trade plans by signing up for free!'
        });
      } else {
        // No cached data and over limit
        return NextResponse.json({
          error: 'Daily limit reached and no cached data available',
          dailyLimitReached: true,
          upgradeMessage: 'Sign up for free to generate fresh trade plans daily!',
          ctaLink: '/auth/signin'
        }, { status: 429 });
      }
    }
    
    // Within limit - generate fresh trade plan
    console.log(`🆓 Generating fresh trade plan for free user (${ip}): ${upperSymbol}`);
    
    // Generate fresh trade plan
    const tradePlan = await getStockData(symbol, 3, horizon);
    
    // Validate trade plan
    if (!tradePlan || !tradePlan.companyName) {
      console.error('Invalid trade plan data for free user:', { tradePlan });
      
      // Fall back to cached data if available
      if (cachedPlan && (cachedPlan as any).trade_plan) {
        console.log(`Falling back to cached data for ${upperSymbol}`);
        return NextResponse.json({
          tradePlan: (cachedPlan as any).trade_plan,
          cached: true,
          freeUser: true,
          message: 'Using cached data due to generation error'
        });
      }
      
      return NextResponse.json({ 
        error: 'Failed to generate trade plan. Please try again later.' 
      }, { status: 500 });
    }
    
    // Increment usage count
    userTracker.count++;
    freeUserRequestTracker.set(ip, userTracker);
    
    // Cache the fresh trade plan in background
    cacheTradePlanInBackground(upperSymbol, tradePlan);
    
    // Add free user messaging
    const freeUserTradePlan = {
      ...tradePlan,
      freeUser: true,
      remainingFreeRequests: FREE_DAILY_LIMIT - userTracker.count,
      upgradeMessage: userTracker.count >= FREE_DAILY_LIMIT ? 
        'You\'ve used your daily free trade plan. Sign up for unlimited access!' :
        `${FREE_DAILY_LIMIT - userTracker.count} free requests remaining today. Sign up for unlimited access!`
    };
    
    console.log(`✅ Generated fresh trade plan for free user (${ip}): ${upperSymbol}`);
    
    return NextResponse.json({
      tradePlan: freeUserTradePlan,
      cached: false,
      freeUser: true,
      remainingRequests: FREE_DAILY_LIMIT - userTracker.count
    });
    
  } catch (error) {
    console.error('Error in free trade plan endpoint:', error);
    return NextResponse.json({
      error: 'Failed to process request',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
