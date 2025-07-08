/**
 * Trade Plan Cache Management
 * Provides database operations for cached trade plans with proper error handling
 * and type safety. Supports both live data caching and SEO content management.
 */

import { createClient } from '@supabase/supabase-js';
import { supabase } from '../supabase';

export interface CachedTradePlan {
  id: string;
  symbol: string;
  seo_content: string;
  meta_description: string;
  trade_plan: any; // JSON object containing the full trade plan
  base_price: number;
  last_price_update: string;
  priority: number;
  is_active: boolean;
  source: 'manual' | 'user_generated' | 'automated';
  cache_expires_at: string;
  generation_count: number;
  last_accessed: string;
  created_at: string;
  updated_at: string;
}

export interface StockAnalytics {
  symbol: string;
  market_cap: number;
  avg_volume: number;
  sector: string;
  is_etf: boolean;
  popularity_score: number;
  seo_priority: number;
  created_at: string;
  updated_at: string;
}

export interface TradePlanCacheOptions {
  includeExpired?: boolean;
  priorityThreshold?: number;
  source?: 'manual' | 'user_generated' | 'automated';
}

/**
 * Retrieves a cached trade plan by symbol
 */
export async function getCachedTradePlan(
  symbol: string,
  options: TradePlanCacheOptions = {}
): Promise<CachedTradePlan | null> {
  try {
    let query = supabase
      .from('cached_trade_plans')
      .select('*')
      .eq('symbol', symbol.toUpperCase())
      .eq('is_active', true);

    // Filter out expired content unless explicitly requested
    if (!options.includeExpired) {
      query = query.gt('cache_expires_at', new Date().toISOString());
    }

    // Apply priority threshold if specified
    if (options.priorityThreshold !== undefined) {
      query = query.gte('priority', options.priorityThreshold);
    }

    // Filter by source if specified
    if (options.source) {
      query = query.eq('source', options.source);
    }

    const { data, error } = await query.single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - not an error, just no cached content
        return null;
      }
      console.error('Error fetching cached trade plan:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getCachedTradePlan:', error);
    return null;
  }
}

/**
 * Stores or updates a cached trade plan
 */
export async function setCachedTradePlan(
  tradePlan: Omit<CachedTradePlan, 'id' | 'created_at' | 'updated_at'>
): Promise<CachedTradePlan | null> {
  try {
    const now = new Date().toISOString();
    
    const { data, error } = await supabase
      .from('cached_trade_plans')
      .upsert({
        ...tradePlan,
        symbol: tradePlan.symbol.toUpperCase(),
        updated_at: now,
      }, {
        onConflict: 'symbol'
      })
      .select()
      .single();

    if (error) {
      console.error('Error caching trade plan:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in setCachedTradePlan:', error);
    return null;
  }
}

/**
 * Gets multiple cached trade plans with filtering and sorting
 */
export async function getCachedTradePlans(
  options: TradePlanCacheOptions & {
    limit?: number;
    offset?: number;
    orderBy?: 'priority' | 'updated_at' | 'symbol';
    orderDirection?: 'asc' | 'desc';
  } = {}
): Promise<CachedTradePlan[]> {
  try {
    let query = supabase
      .from('cached_trade_plans')
      .select('*')
      .eq('is_active', true);

    // Filter out expired content unless explicitly requested
    if (!options.includeExpired) {
      query = query.gt('cache_expires_at', new Date().toISOString());
    }

    // Apply priority threshold if specified
    if (options.priorityThreshold !== undefined) {
      query = query.gte('priority', options.priorityThreshold);
    }

    // Filter by source if specified
    if (options.source) {
      query = query.eq('source', options.source);
    }

    // Apply ordering
    const orderBy = options.orderBy || 'priority';
    const orderDirection = options.orderDirection || 'desc';
    query = query.order(orderBy, { ascending: orderDirection === 'asc' });

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching cached trade plans:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getCachedTradePlans:', error);
    return [];
  }
}

/**
 * Marks a cached trade plan as inactive (soft delete)
 */
export async function deactivateCachedTradePlan(symbol: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('cached_trade_plans')
      .update({ 
        is_active: false, 
        updated_at: new Date().toISOString() 
      })
      .eq('symbol', symbol.toUpperCase());

    if (error) {
      console.error('Error deactivating cached trade plan:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Unexpected error in deactivateCachedTradePlan:', error);
    return false;
  }
}

/**
 * Updates or creates stock analytics record
 */
export async function updateStockAnalytics(
  symbol: string,
  updates: Partial<Omit<StockAnalytics, 'symbol' | 'created_at' | 'updated_at'>>
): Promise<StockAnalytics | null> {
  try {
    const now = new Date().toISOString();
    
    // First, try to get existing record to increment popularity score
    const { data: existing } = await supabase
      .from('stock_analytics')
      .select('popularity_score')
      .eq('symbol', symbol.toUpperCase())
      .single();

    const currentPopularityScore = existing?.popularity_score || 0;

    const { data, error } = await supabase
      .from('stock_analytics')
      .upsert({
        symbol: symbol.toUpperCase(),
        popularity_score: updates.popularity_score !== undefined 
          ? updates.popularity_score 
          : currentPopularityScore + 1,
        updated_at: now,
        ...updates,
      }, {
        onConflict: 'symbol'
      })
      .select()
      .single();

    if (error) {
      console.error('Error updating stock analytics:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in updateStockAnalytics:', error);
    return null;
  }
}

/**
 * Gets stock analytics for a symbol
 */
export async function getStockAnalytics(symbol: string): Promise<StockAnalytics | null> {
  try {
    const { data, error } = await supabase
      .from('stock_analytics')
      .select('*')
      .eq('symbol', symbol.toUpperCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned - not an error, just no analytics yet
        return null;
      }
      console.error('Error fetching stock analytics:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Unexpected error in getStockAnalytics:', error);
    return null;
  }
}

/**
 * Gets top stocks by popularity for SEO prioritization
 */
export async function getTopStocksByPopularity(limit: number = 100): Promise<StockAnalytics[]> {
  try {
    const { data, error } = await supabase
      .from('stock_analytics')
      .select('*')
      .order('popularity_score', { ascending: false })
      .order('updated_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Error fetching top stocks by popularity:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Unexpected error in getTopStocksByPopularity:', error);
    return [];
  }
}

/**
 * Checks if a symbol should be cached based on popularity and demand
 */
export async function shouldCacheSymbol(symbol: string): Promise<{
  shouldCache: boolean;
  reason: string;
  priority: number;
}> {
  try {
    const analytics = await getStockAnalytics(symbol);
    
    if (!analytics) {
      return {
        shouldCache: false,
        reason: 'No analytics data available',
        priority: 0
      };
    }

    // Define caching criteria
    const popularityThreshold = 50;
    
    if (analytics.popularity_score >= popularityThreshold) {
      return {
        shouldCache: true,
        reason: `High demand: popularity ${analytics.popularity_score}`,
        priority: Math.min(100, analytics.popularity_score)
      };
    }

    return {
      shouldCache: false,
      reason: `Low demand: popularity ${analytics.popularity_score}`,
      priority: 0
    };
  } catch (error) {
    console.error('Error in shouldCacheSymbol:', error);
    return {
      shouldCache: false,
      reason: 'Error checking cache eligibility',
      priority: 0
    };
  }
}

/**
 * Cleans up expired cache entries
 */
export async function cleanupExpiredCache(): Promise<{ deletedCount: number }> {
  try {
    const { data, error } = await supabase
      .from('cached_trade_plans')
      .update({ is_active: false })
      .lt('cache_expires_at', new Date().toISOString())
      .eq('is_active', true)
      .select('id');

    if (error) {
      console.error('Error cleaning up expired cache:', error);
      return { deletedCount: 0 };
    }

    return { deletedCount: data?.length || 0 };
  } catch (error) {
    console.error('Unexpected error in cleanupExpiredCache:', error);
    return { deletedCount: 0 };
  }
}
