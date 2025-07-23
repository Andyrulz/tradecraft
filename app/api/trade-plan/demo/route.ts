import { NextResponse } from 'next/server';
import { getStockData } from '@/lib/api';
import { supabase } from '@/lib/supabase';
import { generateTradePlanSEO, extractSEODataFromTradePlan } from '@/lib/seo/trade-plan-seo';
import { getStockPriority } from '@/lib/config/top-stocks';

// OPTIMIZATION: Request deduplication for demo API calls
// Prevents multiple simultaneous requests for the same demo data
const pendingDemoRequests = new Map<string, Promise<any>>();

/**
 * Cache demo trade plan in background (non-blocking)
 * 
 * Same strategy as main endpoint - always cache fresh data since we're 
 * already making API calls for demo users
 */
async function cacheDemoTradePlanInBackground(symbol: string, tradePlan: any) {
  try {
    const upperSymbol = symbol.toUpperCase();
    const now = new Date();
    
    console.log(`Always caching fresh demo trade plan for ${upperSymbol}`);
    
    // Validate trade plan data before caching
    if (!tradePlan || !tradePlan.companyName) {
      console.error(`Invalid demo trade plan data for ${upperSymbol}:`, {
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
      source: 'demo_generated',
      updated_at: now.toISOString()
    };
    
    console.log(`Caching demo data for ${upperSymbol}:`, {
      symbol: cacheData.symbol,
      priority: cacheData.priority,
      generation_count: cacheData.generation_count,
      source: cacheData.source
    });
    
    // Always upsert cache entry with fresh data
    const { error: cacheError } = await supabase
      .from('cached_trade_plans')
      .upsert(cacheData, {
        onConflict: 'symbol'
      });

    if (cacheError) {
      console.error(`Failed to cache demo trade plan for ${upperSymbol}:`, cacheError);
      throw new Error(`Cache upsert failed: ${cacheError.message}`);
    }
    
    // Update stock analytics
    const { error: analyticsError } = await supabase
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
    
    console.log(`Successfully cached fresh demo data for ${upperSymbol}`);
      
  } catch (error) {
    // Log error but don't throw (background operation)
    console.error('Background demo cache operation failed for', symbol, error);
  }
}

// Demo endpoint for TSLA trade plan - no authentication required
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol') || 'TSLA';
    const horizon = searchParams.get('horizon') || '1-3 months';

    // Only allow TSLA for the demo to prevent abuse
    if (symbol.toUpperCase() !== 'TSLA') {
      return NextResponse.json({ 
        error: 'Demo is only available for TSLA. Please sign up for full access to all stocks.' 
      }, { status: 400 });
    }

    console.log(`🔄 Generating fresh demo trade plan for ${symbol.toUpperCase()}`);

    // OPTIMIZATION: Generate fresh trade plan (same as main endpoint strategy)
    const tradePlan = await getStockData(symbol, 3, horizon);

    // Validate trade plan before returning
    if (!tradePlan || !tradePlan.companyName) {
      console.error('Invalid trade plan data:', { tradePlan });
      return NextResponse.json({ 
        error: 'Failed to generate trade plan. Please try again later.' 
      }, { status: 500 });
    }

    // Add demo watermark to the trade plan
    const demoTradePlan = {
      ...tradePlan,
      isDemo: true,
      demoMessage: 'This is a live demo for TSLA. Sign up to generate trade plans for any stock!',
      upgradeMessage: 'Get unlimited trade plans for all stocks by signing up today.'
    };

    // OPTIMIZATION: Cache the fresh trade plan in background (non-blocking)
    cacheDemoTradePlanInBackground(symbol, tradePlan);

    return NextResponse.json({
      tradePlan: demoTradePlan,
      isDemo: true,
      symbol: symbol.toUpperCase()
    });

  } catch (error) {
    console.error('Error generating demo trade plan:', error);
    
    // Return a more detailed error response for debugging
    return NextResponse.json({
      error: 'Failed to generate demo trade plan',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    }, { status: 500 });
  }
}

// Add POST handler with optimized cache strategy and request deduplication
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { symbol = 'TSLA', horizon = 'swing' } = body;

    // Only allow TSLA for the demo to prevent abuse
    if (symbol.toUpperCase() !== 'TSLA') {
      console.warn(`SECURITY: Demo API accessed with unauthorized symbol: ${symbol}`);
      return NextResponse.json({ 
        error: 'Demo is only available for TSLA. Please sign up for full access to all stocks.' 
      }, { status: 400 });
    }

    // OPTIMIZATION: Request deduplication - prevent multiple simultaneous requests
    const requestKey = `${symbol.toUpperCase()}-${horizon}`;
    if (pendingDemoRequests.has(requestKey)) {
      console.log(`⚡ Deduplicating demo request for ${requestKey} - using existing promise`);
      const existingRequest = pendingDemoRequests.get(requestKey)!;
      const result = await existingRequest;
      return NextResponse.json(result);
    }

    console.log(`🔄 Generating fresh demo trade plan for ${symbol.toUpperCase()} with horizon: ${horizon}`);

    // Create and store the promise for deduplication
    const requestPromise = (async () => {
      try {
        // Convert horizon to the format expected by getStockData
        const horizonMapping: { [key: string]: string } = {
          'swing': '1-3 months',
          'positional': '3-6 months', 
          'longterm': '6+ months'
        };

        const mappedHorizon = horizonMapping[horizon] || '1-3 months';
        console.log(`Mapped horizon: ${mappedHorizon}`);

        // OPTIMIZATION: Generate fresh trade plan (same as main endpoint strategy)
        // Demo users get fresh data, and we cache it in background for SEO/performance
        const tradePlan = await getStockData(symbol, 3, mappedHorizon);

        // Validate trade plan before returning
        if (!tradePlan || !tradePlan.companyName) {
          console.error('Invalid demo trade plan data:', { 
            tradePlan: tradePlan ? 'exists but invalid' : 'null/undefined',
            companyName: tradePlan?.companyName 
          });
          throw new Error('Failed to generate trade plan. Please try again later.');
        }

        // Add demo watermark to the trade plan
        const demoTradePlan = {
          ...tradePlan,
          isDemo: true,
          demoMessage: 'This is a live demo for TSLA. Sign up to generate trade plans for any stock!',
          upgradeMessage: 'Get unlimited trade plans for all stocks by signing up today.'
        };

        // OPTIMIZATION: Cache the fresh trade plan in background (non-blocking)
        // This implements the same user-driven cache strategy as the main endpoint
        cacheDemoTradePlanInBackground(symbol, tradePlan);

        console.log(`Successfully generated fresh demo trade plan for ${symbol.toUpperCase()}`);

        return {
          tradePlan: demoTradePlan,
          isDemo: true,
          symbol: symbol.toUpperCase()
        };

      } finally {
        // Clean up the pending request
        pendingDemoRequests.delete(requestKey);
      }
    })();

    // Store the promise for deduplication
    pendingDemoRequests.set(requestKey, requestPromise);

    // Wait for the result and return it
    const result = await requestPromise;
    return NextResponse.json(result);

  } catch (error) {
    console.error('Error generating demo trade plan:', error);
    
    // Return a more detailed error response for debugging
    return NextResponse.json({
      error: 'Failed to generate demo trade plan',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.stack : undefined) : undefined
    }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
