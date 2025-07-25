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

// Simple in-memory rate limiting to prevent rapid successive calls
const userRequestTracker = new Map<string, number>();

// Request deduplication to prevent simultaneous requests for same user+symbol
const activeRequests = new Map<string, Promise<any>>();

// Clean up old entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
  const entries = Array.from(userRequestTracker.entries());
  for (const [email, timestamp] of entries) {
    if (timestamp < fiveMinutesAgo) {
      userRequestTracker.delete(email);
    }
  }
  
  // Also clean up completed active requests
  const activeEntries = Array.from(activeRequests.entries());
  for (const [key, promise] of activeEntries) {
    // Remove resolved/rejected promises
    promise.then(() => activeRequests.delete(key))
           .catch(() => activeRequests.delete(key));
  }
}, 5 * 60 * 1000);

export async function POST(request: Request) {
  // 1. Get user session
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const email = session.user.email;
  const today = getToday();

  // Temporarily disable cooldown to debug the issue
  // TODO: Re-enable with proper logic once we identify the root cause
  /*
  // Check for rapid successive requests (prevent spam/race conditions)
  const lastRequestTime = userRequestTracker.get(email) || 0;
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  // Only apply cooldown for very rapid requests (< 200ms) to prevent double-clicks
  // This allows normal usage while preventing spam
  if (timeSinceLastRequest > 0 && timeSinceLastRequest < 200) { 
    console.log(`🚫 Rate limit: User ${email} making requests too quickly (${timeSinceLastRequest}ms gap)`);
    return NextResponse.json({ 
      error: 'Please wait a moment before making another request',
      cooldown: true,
      timeSinceLastRequest: timeSinceLastRequest
    }, { status: 429 });
  }
  
  // Set the tracker after the check to avoid blocking the first request
  userRequestTracker.set(email, now);
  */

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
    console.log(`✅ Found plan type for user ${email}: ${planType}`);
  } else {
    console.log(`⚠️ No subscription found for user ${email}, creating free plan`);
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
  
  console.log(`📊 Quota check for user ${email}: planType=${planType}, limit=${planLimit}, current=${usage.request_count}`);
  
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

  // 7.5. Check for duplicate active requests for same user+symbol
  const requestKey = `${email}:${symbol.toUpperCase()}`;
  if (activeRequests.has(requestKey)) {
    console.log(`⚠️ Duplicate request detected for ${email} + ${symbol}, waiting for existing request`);
    try {
      // Wait for the existing request to complete and return its result
      const existingResult = await activeRequests.get(requestKey);
      return NextResponse.json(existingResult);
    } catch (error) {
      // If existing request failed, continue with new request
      console.log(`Existing request failed, proceeding with new request`);
      activeRequests.delete(requestKey);
    }
  }

  // 8. Generate fresh trade plan for user request (always fresh for paying users)
  console.log(`🔄 Generating fresh trade plan for user request: ${symbol}`);
  
  // Create a promise for this request to handle deduplication
  const tradePlanPromise = (async () => {
    try {
      const tradePlan = await getStockData(symbol, 3, horizon); // pass horizon
      // ...additional analytics as needed...

      // Validate trade plan before proceeding
      if (!validateTradePlan(tradePlan)) {
        throw new Error('Failed to generate a complete trade plan. Please try again later.');
      }

      // 9. Increment usage with atomic update
      const { data: updateResult, error: updateError } = await supabase
        .from('user_usage')
        .update({
          request_count: usage.request_count + 1,
          total_requests: usage.total_requests + 1,
          last_request_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .eq('date', today)
        .select();
        
      if (updateError) {
        console.error(`❌ Failed to update usage for user ${email}:`, updateError);
        throw new Error('Failed to update usage');
      }

      // 10. Cache the trade plan (background operation, don't block response)
      // Always cache fresh trade plans since we already generated the data
      // This provides fresh content for SEO and future visitors
      cacheTradePlanInBackground(symbol, tradePlan);

      return {
        tradePlan,
        request_count: usage.request_count + 1,
        total_requests: usage.total_requests + 1,
        quotaExceeded: false,
        date: today
      };
    } catch (err) {
      throw new Error('Failed to generate trade plan');
    }
  })();

  // Store the promise for deduplication
  activeRequests.set(requestKey, tradePlanPromise);

  try {
    const result = await tradePlanPromise;
    // Clean up the request tracker
    activeRequests.delete(requestKey);
    return NextResponse.json(result);
  } catch (err) {
    // Clean up the request tracker
    activeRequests.delete(requestKey);
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Failed to generate trade plan' }, { status: 500 });
  }
}
