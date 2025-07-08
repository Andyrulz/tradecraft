import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { getStockData } from '@/lib/api';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { generateTradePlanSEO, extractSEODataFromTradePlan } from '@/lib/seo/trade-plan-seo';
import { getStockPriority } from '@/lib/config/top-stocks';

// Helper to get today's date in YYYY-MM-DD
function getToday() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

/**
 * Cache trade plan in background (non-blocking)
 * 
 * Always cache EVERY user-generated trade plan with fresh data.
 * Since we're already making API calls to generate trade plans,
 * we should always cache the fresh results for better SEO and user experience.
 */
async function cacheTradePlanInBackground(symbol: string, tradePlan: any) {
  try {
    const upperSymbol = symbol.toUpperCase();
    const now = new Date();
    
    // Get current cache state for analytics
    const { data: existingCache } = await supabase
      .from('cached_trade_plans')
      .select('generation_count')
      .eq('symbol', upperSymbol)
      .single();
    
    const userDemandCount = existingCache?.generation_count || 0;
    
    console.log(`Always caching fresh trade plan for ${upperSymbol}`);
    
    // Validate trade plan data before caching
    if (!tradePlan || !tradePlan.companyName) {
      console.error(`Invalid trade plan data for ${upperSymbol}:`, {
        hasData: !!tradePlan,
        hasCompanyName: !!tradePlan?.companyName,
        tradePlanKeys: tradePlan ? Object.keys(tradePlan) : []
      });
      throw new Error('Invalid trade plan data - missing required fields');
    }
    
    // Generate SEO content from the fresh trade plan
    const seoData = extractSEODataFromTradePlan(tradePlan);
    const seoContent = generateTradePlanSEO(seoData);
    
    // Calculate cache expiration (24 hours from now)
    const cacheExpiresAt = new Date();
    cacheExpiresAt.setHours(cacheExpiresAt.getHours() + 24);
    
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
      source: 'user_generated',
      updated_at: now.toISOString()
    };
    
    console.log(`Caching data for ${upperSymbol}:`, {
      symbol: cacheData.symbol,
      priority: cacheData.priority,
      generation_count: cacheData.generation_count,
      tradePlanSize: JSON.stringify(tradePlan).length,
      seoContentSize: cacheData.seo_content.length
    });
    
    // Always upsert cache entry with fresh data
    const { data: cacheResult, error: cacheError } = await supabase
      .from('cached_trade_plans')
      .upsert(cacheData, {
        onConflict: 'symbol'
      });

    if (cacheError) {
      console.error(`Failed to cache trade plan for ${upperSymbol}:`, cacheError);
      throw new Error(`Cache upsert failed: ${cacheError.message}`);
    }
    
    // Update stock analytics
    const { data: analyticsResult, error: analyticsError } = await supabase
      .from('stock_analytics')
      .upsert({
        symbol: upperSymbol,
        seo_priority: getStockPriority(upperSymbol),
        popularity_score: userDemandCount + 1,
        updated_at: now.toISOString()
      }, {
        onConflict: 'symbol'
      });

    if (analyticsError) {
      console.error(`Failed to update analytics for ${upperSymbol}:`, analyticsError);
      // Don't throw here, as cache is more important than analytics
    }
    
    console.log(`Successfully cached fresh data for ${upperSymbol}`);
      
  } catch (error) {
    // Log error but don't throw (background operation)
    console.error('Background cache operation failed for', symbol, error);
  }
}

function validateTradePlan(tradePlan: any): boolean {
  if (!tradePlan) return false;
  const rm = tradePlan.riskManagement;
  return (
    tradePlan.symbol &&
    tradePlan.companyName &&
    typeof tradePlan.currentPrice === 'number' &&
    tradePlan.direction &&
    tradePlan.timeHorizon &&
    tradePlan.confidenceLevel &&
    tradePlan.setupType &&
    rm &&
    typeof rm.probabilityScore === 'number' &&
    typeof rm.riskRewardRatio === 'number' &&
    typeof rm.suggestedPositionSize === 'number' &&
    rm.entryZone && typeof rm.entryZone.low === 'number' && typeof rm.entryZone.high === 'number' &&
    rm.initialStopLoss && typeof rm.initialStopLoss.price === 'number' && rm.initialStopLoss.type &&
    Array.isArray(rm.targets) && rm.targets.length > 0 &&
    tradePlan.summary &&
    Array.isArray(tradePlan.priceHistory) && tradePlan.priceHistory.length > 0 &&
    Array.isArray(tradePlan.indicators) && tradePlan.indicators.length > 0 &&
    tradePlan.metrics
  );
}

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  // 1. Get user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const email = session.user.email;
  const today = getToday();

  // 2. Get user from users table
  let { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (userError && userError.code !== 'PGRST116') {
    // Not a 'no rows' error
    return NextResponse.json({ error: 'Database error (users)' }, { status: 500 });
  }

  // 3. If user does not exist, create user
  if (!user) {
    const { data: newUser, error: createUserError } = await supabase
      .from('users')
      .insert({ email })
      .select('id')
      .single();
    if (createUserError || !newUser) {
      return NextResponse.json({ error: 'Failed to create user', details: createUserError?.message }, { status: 500 });
    }
    user = newUser;
    // Wait briefly to ensure user is available for subsequent inserts
    await new Promise(res => setTimeout(res, 300));
  }
  const userId = user.id;

  // 4. Ensure user_subscriptions exists and get plan_type
  const { data: sub, error: subError } = await supabase
    .from('user_subscriptions')
    .select('user_id, plan_type')
    .eq('user_id', userId)
    .single();
  let planType = 'free';
  if (sub && sub.plan_type) {
    planType = sub.plan_type;
  } else {
    await supabase.from('user_subscriptions').insert({ user_id: userId, plan_type: 'free' });
  }

  // 5. Check or create user_usage for today
  let { data: usage, error: usageError } = await supabase
    .from('user_usage')
    .select('request_count, total_requests')
    .eq('user_id', userId)
    .eq('date', today)
    .single();
  if (!usage) {
    // New day or new user: create usage record
    let newUsage, createUsageError, retries = 0;
    do {
      ({ data: newUsage, error: createUsageError } = await supabase
        .from('user_usage')
        .insert({ user_id: userId, date: today, request_count: 0, total_requests: 0, last_request_at: new Date().toISOString() })
        .select('request_count, total_requests')
        .single());
      if (!createUsageError && newUsage) break;
      await new Promise(res => setTimeout(res, 300));
      retries++;
    } while (retries < 3);
    if (createUsageError || !newUsage) {
      return NextResponse.json({ error: 'Failed to create usage record', details: createUsageError?.message }, { status: 500 });
    }
    usage = newUsage;
    // Do not increment quota for these retries, so return usage with request_count 0
  }

  // 6. Enforce quota based on plan
  let planLimit = 1;
  if (planType === 'pro') planLimit = 100;
  if (planType === 'premium') planLimit = 1000;
  if (usage.request_count >= planLimit) {
    let upgradeMessage = '';
    let cta = '';
    let displayLimit = planLimit;
    if (planType === 'free') {
      upgradeMessage =
        'You have used up your daily quota of 1 trade plan. Upgrade to Pro or Premium for more requests and advanced features. Even one good trade can pay for your subscription!';
      cta = 'Upgrade Now';
    } else if (planType === 'pro') {
      upgradeMessage =
        'You have used up your daily quota of 100 trade plans. Upgrade to Premium to unlock 10x more requests, the exclusive Momentum Screener, and priority support. Premium is less than a night at the movies and could pay for itself with a single winning trade. Don’t miss out on the next big breakout—upgrade now!';
      cta = 'Upgrade to Premium';
      displayLimit = 100;
    }
    // Instead of a plain string, return error as a JSON string with upgrade info for frontend parsing
    return NextResponse.json({
      error: JSON.stringify({
        message: 'You have used up your daily quota. Please come back tomorrow.',
        upgradeMessage,
        cta,
        ctaLink: '/pricing',
      }),
      quotaExceeded: true,
      request_count: usage.request_count,
      total_requests: usage.total_requests,
      date: today,
      planType,
      planLimit: displayLimit,
      upgradeMessage,
      cta,
      ctaLink: '/pricing',
    }, { status: 429 });
  }

  // 7. Parse request body for trade plan params
  const { symbol, horizon } = await request.json();
  if (!symbol) {
    return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
  }

  // 8. Generate trade plan (calls getStockData, analytics, etc.)
  try {
    const tradePlan = await getStockData(symbol, 3, horizon); // pass horizon
    // ...additional analytics as needed...

    // Validate trade plan before proceeding
    if (!validateTradePlan(tradePlan)) {
      return NextResponse.json({ error: 'Failed to generate a complete trade plan. Please try again later.' }, { status: 500 });
    }

    // 9. Increment usage
    const { error: updateError } = await supabase
      .from('user_usage')
      .update({
        request_count: usage.request_count + 1,
        total_requests: usage.total_requests + 1,
        last_request_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('date', today);
    if (updateError) {
      return NextResponse.json({ error: 'Failed to update usage' }, { status: 500 });
    }

    // 10. Cache the trade plan (background operation, don't block response)
    // Always cache fresh trade plans since we already generated the data
    cacheTradePlanInBackground(symbol, tradePlan);

    return NextResponse.json({
      tradePlan,
      request_count: usage.request_count + 1,
      total_requests: usage.total_requests + 1,
      quotaExceeded: false,
      date: today
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to generate trade plan' }, { status: 500 });
  }
}
