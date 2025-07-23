/**
 * Auto-refresh cache functionality
 * 
 * This module provides automatic cache refresh capabilities that trigger
 * whenever users query for stock data, ensuring fresh content for SEO
 * and better user experience.
 */

import { supabase } from '@/lib/supabase';
import { getStockData } from '@/lib/api';
import { generateTradePlanSEO, extractSEODataFromTradePlan } from '@/lib/seo/trade-plan-seo';
import { getStockPriority } from '@/lib/config/top-stocks';

interface CacheRefreshOptions {
  maxAgeHours?: number; // Only refresh if cache is older than this
  forceRefresh?: boolean; // Force refresh regardless of age
  source?: string; // Track where the refresh came from
}

// Global cache for active refresh operations to prevent duplicates
const activeRefreshOperations = new Map<string, Promise<any>>();

/**
 * Check if cache needs refresh based on age and staleness
 */
export async function shouldRefreshCache(
  symbol: string, 
  maxAgeHours: number = 12
): Promise<boolean> {
  try {
    const { data: cached } = await supabase
      .from('cached_trade_plans')
      .select('updated_at, cache_expires_at')
      .eq('symbol', symbol.toUpperCase())
      .single();

    if (!cached) {
      // No cache exists, should refresh
      return true;
    }

    const now = new Date();
    const updatedAt = new Date(cached.updated_at);
    const ageInHours = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);

    // Refresh if cache is older than maxAgeHours or past expiration
    const isStale = ageInHours > maxAgeHours;
    const isExpired = cached.cache_expires_at && now > new Date(cached.cache_expires_at);

    return isStale || isExpired;
  } catch (error) {
    console.error('Error checking cache staleness:', error);
    // If we can't check, assume we should refresh
    return true;
  }
}

/**
 * Refresh cache for a single symbol (background operation)
 */
export async function refreshCacheInBackground(
  symbol: string,
  options: CacheRefreshOptions = {}
): Promise<void> {
  const { maxAgeHours = 12, forceRefresh = false, source = 'auto_refresh' } = options;
  const upperSymbol = symbol.toUpperCase();

  try {
    // Check if there's already an active refresh operation for this symbol
    if (activeRefreshOperations.has(upperSymbol)) {
      console.log(`🔄 Refresh already in progress for ${upperSymbol}, waiting for existing operation (source: ${source})`);
      await activeRefreshOperations.get(upperSymbol);
      return;
    }

    // Check if refresh is needed (unless forced)
    if (!forceRefresh) {
      const needsRefresh = await shouldRefreshCache(upperSymbol, maxAgeHours);
      if (!needsRefresh) {
        console.log(`Cache for ${upperSymbol} is still fresh, skipping refresh`);
        return;
      }
    }

    console.log(`🔄 Auto-refreshing cache for ${upperSymbol} (source: ${source})`);

    // Create and store the refresh operation promise
    const refreshPromise = (async () => {
      // Generate fresh trade plan
      const tradePlan = await getStockData(upperSymbol, 3, 'swing');

      // Validate trade plan data
      if (!tradePlan || !tradePlan.companyName) {
        console.error(`Invalid trade plan data for auto-refresh: ${upperSymbol}`);
        return;
      }

      // Generate SEO content
      const seoData = extractSEODataFromTradePlan(tradePlan);
      const seoContent = generateTradePlanSEO(seoData);

      // Get current cache state for analytics
      const { data: existingCache } = await supabase
        .from('cached_trade_plans')
        .select('generation_count')
        .eq('symbol', upperSymbol)
        .single();

      const generationCount = existingCache?.generation_count || 0;
      
      const now = new Date();
      const cacheExpiresAt = new Date();
      cacheExpiresAt.setHours(cacheExpiresAt.getHours() + 24);

      // Update cache
      const { error: cacheError } = await supabase
        .from('cached_trade_plans')
        .upsert({
          symbol: upperSymbol,
          trade_plan: tradePlan,
          seo_content: seoContent.content,
          meta_description: seoContent.description,
          base_price: tradePlan.currentPrice,
          last_price_update: now.toISOString(),
          priority: getStockPriority(upperSymbol),
          is_active: true,
          cache_expires_at: cacheExpiresAt.toISOString(),
          generation_count: generationCount + 1,
          last_accessed: now.toISOString(),
          source: source,
          updated_at: now.toISOString()
        }, {
          onConflict: 'symbol'
        });

      if (cacheError) {
        console.error(`Failed to auto-refresh cache for ${upperSymbol}:`, cacheError);
        return;
      }

      // Update analytics
      await supabase
        .from('stock_analytics')
        .upsert({
          symbol: upperSymbol,
          seo_priority: getStockPriority(upperSymbol),
          popularity_score: generationCount + 1,
          updated_at: now.toISOString()
        }, {
          onConflict: 'symbol'
        });

      console.log(`✅ Successfully auto-refreshed cache for ${upperSymbol}`);
    })();

    // Store the promise in the active operations map
    activeRefreshOperations.set(upperSymbol, refreshPromise);

    // Execute the refresh operation
    await refreshPromise;

  } catch (error) {
    console.error(`❌ Auto-refresh failed for ${upperSymbol}:`, error);
    // Don't throw - this is a background operation
  } finally {
    // Always clean up the active operation
    activeRefreshOperations.delete(upperSymbol);
  }
}

/**
 * Auto-refresh cache when a stock is accessed via SEO pages
 * Now only serves cached data - fresh generation happens via user requests
 * This ensures we don't waste API calls on automatic background refreshes
 */
export async function onStockPageAccess(symbol: string): Promise<void> {
  // Don't trigger background refresh - let user requests drive fresh data generation
  // SEO pages and automatic access should use existing cache only
  console.log(`📋 SEO page access for ${symbol} - using existing cache only`);
}

/**
 * Auto-refresh multiple symbols (for popular stocks)
 */
export async function refreshMultipleStocks(
  symbols: string[],
  options: CacheRefreshOptions = {}
): Promise<void> {
  const { source = 'batch_refresh' } = options;
  
  console.log(`🔄 Starting batch auto-refresh for ${symbols.length} stocks`);
  
  for (const symbol of symbols) {
    try {
      await refreshCacheInBackground(symbol, {
        ...options,
        source
      });
      
      // Rate limiting - wait 3 seconds between refreshes
      await new Promise(resolve => setTimeout(resolve, 3000));
      
    } catch (error) {
      console.error(`Batch refresh failed for ${symbol}:`, error);
      // Continue with next symbol
    }
  }
  
  console.log(`✅ Completed batch auto-refresh for ${symbols.length} stocks`);
}

/**
 * Get cache status for a symbol
 */
export async function getCacheStatus(symbol: string): Promise<{
  exists: boolean;
  ageHours: number;
  isStale: boolean;
  isExpired: boolean;
  lastUpdated?: string;
  expiresAt?: string;
}> {
  try {
    const { data: cached } = await supabase
      .from('cached_trade_plans')
      .select('updated_at, cache_expires_at')
      .eq('symbol', symbol.toUpperCase())
      .single();

    if (!cached) {
      return {
        exists: false,
        ageHours: Infinity,
        isStale: true,
        isExpired: true
      };
    }

    const now = new Date();
    const updatedAt = new Date(cached.updated_at);
    const ageHours = (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60);
    const isExpired = cached.cache_expires_at && now > new Date(cached.cache_expires_at);
    const isStale = ageHours > 12; // Consider stale after 12 hours

    return {
      exists: true,
      ageHours,
      isStale,
      isExpired: !!isExpired,
      lastUpdated: cached.updated_at,
      expiresAt: cached.cache_expires_at
    };
  } catch (error) {
    console.error('Error getting cache status:', error);
    return {
      exists: false,
      ageHours: Infinity,
      isStale: true,
      isExpired: true
    };
  }
}
