/**
 * Cache Population Script for Trade Plans
 * 
 * Phase 2: Bulk Cache Population
 * - Populate cache with top 100 stocks
 * - Handle rate limiting and error recovery
 * - Support incremental and full cache refresh
 * - Provide progress tracking and logging
 */

import { getStockData } from '@/lib/api';
import { 
  getCachedTradePlan 
} from '@/lib/cache/trade-plan-cache';
import { supabase } from '@/lib/supabase';
import { generateTradePlanSEO, extractSEODataFromTradePlan } from '@/lib/seo/trade-plan-seo';
import { TOP_100_STOCKS, getStocksByPriority } from '@/lib/config/top-stocks';

export interface CachePopulationOptions {
  // Targeting options
  symbols?: string[]; // Specific symbols to cache (overrides other options)
  tierLevel?: 1 | 2 | 3 | 4 | 5; // Priority tier to process (1 = highest)
  maxSymbols?: number; // Maximum number of symbols to process
  
  // Processing options
  forceRefresh?: boolean; // Refresh even if cache exists and is fresh
  maxAgeHours?: number; // Consider cache stale after X hours (default: 24)
  
  // Rate limiting
  batchSize?: number; // Number of parallel requests (default: 3)
  delayBetweenBatches?: number; // Delay in ms between batches (default: 2000)
  
  // Error handling
  maxRetries?: number; // Max retries per symbol (default: 2)
  continueOnError?: boolean; // Continue processing other symbols on error (default: true)
  
  // Logging
  verbose?: boolean; // Enable detailed logging
  onProgress?: (progress: CacheProgress) => void; // Progress callback
}

export interface CacheProgress {
  total: number;
  completed: number;
  successful: number;
  failed: number;
  skipped: number;
  currentSymbol?: string;
  errors: Array<{ symbol: string; error: string }>;
  timeElapsed: number;
  estimatedTimeRemaining?: number;
}

export interface CacheResult {
  success: boolean;
  symbol: string;
  action: 'created' | 'updated' | 'skipped' | 'failed';
  error?: string;
  executionTime: number;
}

/**
 * Main cache population function
 */
export async function populateTradeplanCache(options: CachePopulationOptions = {}): Promise<CacheProgress> {
  const startTime = Date.now();
  
  // Set defaults - Optimized for 55 API calls/minute limit
  // Each stock takes ~5 API calls in ~3 seconds
  // With 55 calls/minute, we can safely do 11 stocks/minute
  const config = {
    maxAgeHours: 24,
    batchSize: 1, // Process one stock at a time
    delayBetweenBatches: 4000, // 4 seconds = ~11 stocks/minute (well under limit)
    maxRetries: 2,
    continueOnError: true,
    verbose: false,
    ...options
  };
  
  // Determine symbols to process
  const symbolsToProcess = getSymbolsToProcess(config);
  
  const progress: CacheProgress = {
    total: symbolsToProcess.length,
    completed: 0,
    successful: 0,
    failed: 0,
    skipped: 0,
    errors: [],
    timeElapsed: 0
  };
  
  if (config.verbose) {
    console.log(`🚀 Starting cache population for ${progress.total} symbols`);
    console.log(`Configuration:`, config);
  }
  
  // Process symbols in batches
  for (let i = 0; i < symbolsToProcess.length; i += config.batchSize) {
    const batch = symbolsToProcess.slice(i, i + config.batchSize);
    
    if (config.verbose) {
      console.log(`📦 Processing batch ${Math.floor(i / config.batchSize) + 1}/${Math.ceil(symbolsToProcess.length / config.batchSize)}: ${batch.join(', ')}`);
    }
    
    // Process batch in parallel
    const batchPromises = batch.map(symbol => 
      processSingleSymbol(symbol, config).catch(error => ({
        success: false,
        symbol,
        action: 'failed' as const,
        error: error.message,
        executionTime: 0
      }))
    );
    
    const batchResults = await Promise.all(batchPromises);
    
    // Update progress
    for (const result of batchResults) {
      progress.completed++;
      progress.currentSymbol = result.symbol;
      
      if (result.success) {
        if (result.action === 'skipped') {
          progress.skipped++;
        } else {
          progress.successful++;
        }
      } else {
        progress.failed++;
        progress.errors.push({
          symbol: result.symbol,
          error: result.error || 'Unknown error'
        });
      }
      
      progress.timeElapsed = Date.now() - startTime;
      
      // Calculate estimated time remaining
      if (progress.completed > 0) {
        const avgTimePerSymbol = progress.timeElapsed / progress.completed;
        progress.estimatedTimeRemaining = avgTimePerSymbol * (progress.total - progress.completed);
      }
      
      // Call progress callback
      if (config.onProgress) {
        config.onProgress({ ...progress });
      }
      
      if (config.verbose) {
        console.log(`✅ ${result.symbol}: ${result.action} (${result.executionTime}ms)`);
      }
    }
    
    // Delay between batches to avoid rate limiting
    if (i + config.batchSize < symbolsToProcess.length && config.delayBetweenBatches > 0) {
      if (config.verbose) {
        console.log(`⏳ Waiting ${config.delayBetweenBatches}ms before next batch...`);
      }
      await new Promise(resolve => setTimeout(resolve, config.delayBetweenBatches));
    }
  }
  
  progress.timeElapsed = Date.now() - startTime;
  
  if (config.verbose) {
    console.log(`🎉 Cache population completed in ${Math.round(progress.timeElapsed / 1000)}s`);
    console.log(`📊 Results: ${progress.successful} successful, ${progress.skipped} skipped, ${progress.failed} failed`);
    
    if (progress.errors.length > 0) {
      console.log(`❌ Errors:`, progress.errors);
    }
  }
  
  return progress;
}

/**
 * Process a single symbol for caching
 */
async function processSingleSymbol(
  symbol: string, 
  config: CachePopulationOptions & { maxAgeHours: number; maxRetries: number }
): Promise<CacheResult> {
  const startTime = Date.now();
  
  try {
    // Check if cache exists and is fresh (unless force refresh)
    if (!config.forceRefresh) {
      const existingCache = await getCachedTradePlan(symbol);
      
      if (existingCache && existingCache.cache_expires_at) {
        const cacheExpiry = new Date(existingCache.cache_expires_at).getTime();
        const now = Date.now();
        
        if (now < cacheExpiry) {
          return {
            success: true,
            symbol,
            action: 'skipped',
            executionTime: Date.now() - startTime
          };
        }
      }
    }
    
    // Generate fresh trade plan with retries
    let tradePlan;
    let lastError;
    
    for (let attempt = 1; attempt <= config.maxRetries; attempt++) {
      try {
        tradePlan = await getStockData(symbol, 3, 'swing');
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error;
        if (attempt < config.maxRetries) {
          // Wait before retry
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    if (!tradePlan) {
      throw lastError || new Error('Failed to generate trade plan');
    }
    
    // Generate SEO content
    const seoData = extractSEODataFromTradePlan(tradePlan);
    const seoContent = generateTradePlanSEO(seoData);
    
    // Calculate cache expiration
    const cacheExpiresAt = new Date();
    cacheExpiresAt.setHours(cacheExpiresAt.getHours() + config.maxAgeHours);
    
    // Store in cache using direct database insert (matches actual schema)
    const { data: cachedResult, error: cacheError } = await supabase
      .from('cached_trade_plans')
      .upsert({
        symbol,
        trade_plan: tradePlan,
        seo_content: seoContent.content,
        meta_description: seoContent.description,
        base_price: tradePlan.currentPrice,
        last_price_update: new Date().toISOString(),
        priority: getStockPriority(symbol),
        is_active: true,
        cache_expires_at: cacheExpiresAt.toISOString(),
        generation_count: 1,
        last_accessed: new Date().toISOString(),
        source: 'bulk_population',
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'symbol'
      })
      .select()
      .single();
    
    if (cacheError || !cachedResult) {
      throw new Error(`Failed to store trade plan in cache: ${cacheError?.message || 'Unknown error'}`);
    }
    
    // Update stock analytics using direct database insert
    await supabase
      .from('stock_analytics')
      .upsert({
        symbol,
        company_name: tradePlan.companyName || symbol,
        seo_priority: getStockPriority(symbol),
        popularity_score: 1, // Initial score
        view_count: 0,
        last_requested: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'symbol'
      });
    
    const action = 'created'; // Upsert handles both create and update
    
    return {
      success: true,
      symbol,
      action,
      executionTime: Date.now() - startTime
    };
    
  } catch (error) {
    return {
      success: false,
      symbol,
      action: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      executionTime: Date.now() - startTime
    };
  }
}

/**
 * Determine which symbols to process based on options
 */
function getSymbolsToProcess(config: CachePopulationOptions): string[] {
  // If specific symbols provided, use those
  if (config.symbols && config.symbols.length > 0) {
    return config.symbols.slice(0, config.maxSymbols);
  }
  
  // If tier level specified, get symbols from that tier
  if (config.tierLevel) {
    const tiers = getStocksByPriority();
    let tierSymbols: string[] = [];
    
    switch (config.tierLevel) {
      case 1: tierSymbols = tiers.tier1; break;
      case 2: tierSymbols = tiers.tier2; break;
      case 3: tierSymbols = tiers.tier3; break;
      case 4: tierSymbols = tiers.tier4; break;
      case 5: tierSymbols = tiers.tier5; break;
    }
    
    return tierSymbols.slice(0, config.maxSymbols);
  }
  
  // Default: return all top 100 stocks
  const allSymbols = TOP_100_STOCKS.map(stock => stock.symbol);
  return allSymbols.slice(0, config.maxSymbols);
}

/**
 * Get stock priority (needed for cache population)
 */
function getStockPriority(symbol: string): number {
  const stock = TOP_100_STOCKS.find(s => s.symbol === symbol);
  return stock ? stock.priority : 0;
}

/**
 * Quick population of highest priority stocks
 */
export async function populateHighPriorityStocks(verbose: boolean = false): Promise<CacheProgress> {
  return populateTradeplanCache({
    tierLevel: 1,
    maxSymbols: 20, // Back to 20 with optimized timing
    batchSize: 1,
    delayBetweenBatches: 3000, // 3 seconds between requests
    verbose,
    onProgress: verbose ? (progress) => {
      console.log(`Progress: ${progress.completed}/${progress.total} (${Math.round(progress.completed / progress.total * 100)}%)`);
    } : undefined
  });
}

/**
 * Refresh stale cache entries
 */
export async function refreshStaleCache(maxAgeHours: number = 24, verbose: boolean = false): Promise<CacheProgress> {
  return populateTradeplanCache({
    maxAgeHours,
    forceRefresh: false,
    batchSize: 1,
    delayBetweenBatches: 3000,
    verbose,
    onProgress: verbose ? (progress) => {
      console.log(`Refreshing stale cache: ${progress.completed}/${progress.total}`);
    } : undefined
  });
}

/**
 * Force refresh all cached trade plans
 */
export async function forceRefreshAllCache(verbose: boolean = false): Promise<CacheProgress> {
  return populateTradeplanCache({
    forceRefresh: true,
    batchSize: 1,
    delayBetweenBatches: 3000,
    verbose,
    onProgress: verbose ? (progress) => {
      console.log(`Force refreshing: ${progress.completed}/${progress.total}`);
    } : undefined
  });
}

// Export for use in scripts
export default populateTradeplanCache;
