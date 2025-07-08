#!/usr/bin/env tsx

/**
 * Cache Management CLI Tool
 * 
 * Comprehensive tool for managing the trade plan cache system:
 * - View cache status and analytics
 * - Refresh specific stocks or categories
 * - Clean up expired/stale cache entries
 * - Monitor performance and usage patterns
 * - Generate reports for optimization
 */

import { createClient } from '@supabase/supabase-js';
import { TOP_100_STOCKS, getStockPriority, isStockCacheEligible } from '../lib/config/top-stocks';
import { setCachedTradePlan, getCachedTradePlan, updateStockAnalytics } from '../lib/cache/trade-plan-cache';
import { getStockData } from '../lib/api';
import { generateTradePlanSEO, extractSEODataFromTradePlan } from '../lib/seo/trade-plan-seo';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper functions
function isTopStock(symbol: string): boolean {
  return TOP_100_STOCKS.some(stock => stock.symbol === symbol.toUpperCase());
}

function calculateStockPriority(symbol: string): number {
  return getStockPriority(symbol);
}

async function generateTradePlan(symbol: string, horizon: string = 'swing') {
  return await getStockData(symbol, 3, horizon);
}

interface CacheStats {
  total_cached: number;
  top_100_cached: number;
  cache_hit_rate: number;
  avg_age_hours: number;
  expired_count: number;
  most_popular: Array<{ symbol: string; generation_count: number; last_accessed: string }>;
  oldest_entries: Array<{ symbol: string; created_at: string; age_hours: number }>;
  largest_entries: Array<{ symbol: string; size_kb: number }>;
}

interface CacheEntry {
  symbol: string;
  created_at: string;
  expires_at: string;
  generation_count: number;
  last_accessed: string;
  cache_size_kb: number;
  is_top_100: boolean;
  priority_score: number;
}

class CacheManager {
  private async getSupabaseStats(): Promise<CacheStats> {
    console.log('📊 Gathering cache statistics...');

    // Get basic cache counts
    const { data: cacheData, error: cacheError } = await supabase
      .from('cached_trade_plans')
      .select('symbol, created_at, expires_at');

    if (cacheError) {
      throw new Error(`Failed to fetch cache data: ${cacheError.message}`);
    }

    // Get analytics data
    const { data: analyticsData, error: analyticsError } = await supabase
      .from('stock_analytics')
      .select('symbol, popularity_score, updated_at')
      .order('popularity_score', { ascending: false });

    if (analyticsError) {
      throw new Error(`Failed to fetch analytics data: ${analyticsError.message}`);
    }

    const now = new Date();
    const cached = cacheData || [];
    const analytics = analyticsData || [];

    // Calculate statistics
    const totalCached = cached.length;
    const top100Cached = cached.filter(entry => isTopStock(entry.symbol)).length;
    const expired = cached.filter(entry => new Date(entry.expires_at) < now).length;

    // Calculate average age
    const totalAgeMs = cached.reduce((sum, entry) => {
      return sum + (now.getTime() - new Date(entry.created_at).getTime());
    }, 0);
    const avgAgeHours = totalCached > 0 ? totalAgeMs / (totalCached * 1000 * 60 * 60) : 0;

    // Get most popular stocks
    const mostPopular = analytics
      .slice(0, 10)
      .map(entry => ({
        symbol: entry.symbol,
        generation_count: entry.popularity_score, // Use popularity_score as proxy for generation count
        last_accessed: entry.updated_at || 'Never'
      }));

    // Get oldest cache entries
    const oldestEntries = cached
      .map(entry => ({
        symbol: entry.symbol,
        created_at: entry.created_at,
        age_hours: (now.getTime() - new Date(entry.created_at).getTime()) / (1000 * 60 * 60)
      }))
      .sort((a, b) => b.age_hours - a.age_hours)
      .slice(0, 10);

    // Estimate cache sizes (rough calculation)
    const largestEntries = cached
      .map(entry => ({
        symbol: entry.symbol,
        size_kb: Math.floor(Math.random() * 100 + 20) // Placeholder - could implement actual size calculation
      }))
      .sort((a, b) => b.size_kb - a.size_kb)
      .slice(0, 10);

    return {
      total_cached: totalCached,
      top_100_cached: top100Cached,
      cache_hit_rate: 0, // Would need request tracking to calculate
      avg_age_hours: avgAgeHours,
      expired_count: expired,
      most_popular: mostPopular,
      oldest_entries: oldestEntries,
      largest_entries: largestEntries
    };
  }

  private async getCacheEntries(): Promise<CacheEntry[]> {
    const { data: cacheData, error: cacheError } = await supabase
      .from('cached_trade_plans')
      .select('symbol, created_at, expires_at');

    if (cacheError) {
      throw new Error(`Failed to fetch cache entries: ${cacheError.message}`);
    }

    const { data: analyticsData, error: analyticsError } = await supabase
      .from('stock_analytics')
      .select('symbol, generation_count, last_accessed, popularity_score');

    if (analyticsError) {
      throw new Error(`Failed to fetch analytics: ${analyticsError.message}`);
    }

    const analyticsMap = new Map(
      analyticsData?.map(a => [a.symbol, a]) || []
    );

    return (cacheData || []).map(entry => {
      const analytics = analyticsMap.get(entry.symbol);
      return {
        symbol: entry.symbol,
        created_at: entry.created_at,
        expires_at: entry.expires_at,
        generation_count: analytics?.generation_count || 0,
        last_accessed: analytics?.last_accessed || 'Never',
        cache_size_kb: Math.floor(Math.random() * 100 + 20), // Placeholder
        is_top_100: isTopStock(entry.symbol),
        priority_score: calculateStockPriority(entry.symbol)
      };
    });
  }

  async showStatus(): Promise<void> {
    try {
      const stats = await this.getSupabaseStats();
      
      console.log('\n🎯 TRADECRAFT CACHE STATUS');
      console.log('════════════════════════════════════════');
      console.log(`📦 Total Cached Stocks: ${stats.total_cached}`);
      console.log(`⭐ Top 100 Stocks Cached: ${stats.top_100_cached}/100 (${Math.round(stats.top_100_cached)}%)`);
      console.log(`⏰ Average Cache Age: ${stats.avg_age_hours.toFixed(1)} hours`);
      console.log(`🚨 Expired Entries: ${stats.expired_count}`);
      
      if (stats.most_popular.length > 0) {
        console.log('\n🔥 MOST POPULAR STOCKS:');
        console.log('────────────────────────');
        stats.most_popular.forEach((stock, i) => {
          console.log(`${i + 1}. ${stock.symbol} - ${stock.generation_count} requests`);
        });
      }

      if (stats.oldest_entries.length > 0) {
        console.log('\n⏳ OLDEST CACHE ENTRIES:');
        console.log('────────────────────────');
        stats.oldest_entries.slice(0, 5).forEach((entry, i) => {
          console.log(`${i + 1}. ${entry.symbol} - ${entry.age_hours.toFixed(1)} hours old`);
        });
      }

      console.log('\n✅ Cache system is operational');
      
    } catch (error) {
      console.error('❌ Error getting cache status:', error);
      process.exit(1);
    }
  }

  async refreshStock(symbol: string): Promise<void> {
    try {
      console.log(`🔄 Refreshing cache for ${symbol}...`);
      
      // Generate new trade plan
      const tradePlan = await generateTradePlan(symbol, 'swing');
      
      // Generate SEO content
      const seoData = extractSEODataFromTradePlan(tradePlan);
      const seoContent = generateTradePlanSEO(seoData);
      
      // Calculate cache expiration (24 hours from now)
      const cacheExpiresAt = new Date();
      cacheExpiresAt.setHours(cacheExpiresAt.getHours() + 24);
      
      // Update cache using direct supabase call (matches populate script exactly)
      const { error: cacheError } = await supabase
        .from('cached_trade_plans')
        .upsert({
          symbol: symbol.toUpperCase(),
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
          source: 'manual_refresh',
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'symbol'
        });

      if (cacheError) {
        throw new Error(`Failed to cache: ${cacheError.message}`);
      }
      
      // Update analytics using direct supabase call
      await supabase
        .from('stock_analytics')
        .upsert({
          symbol: symbol.toUpperCase(),
          seo_priority: getStockPriority(symbol),
          popularity_score: 1,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'symbol'
        });
      
      console.log(`✅ Successfully refreshed ${symbol}`);
      
    } catch (error) {
      console.error(`❌ Error refreshing ${symbol}:`, error);
      throw error;
    }
  }

  async refreshTopStocks(limit: number = 10): Promise<void> {
    console.log(`🔄 Refreshing top ${limit} stocks...`);
    
    const topStocks = TOP_100_STOCKS.slice(0, limit);
    let successCount = 0;
    let errorCount = 0;

    for (const stock of topStocks) {
      try {
        await this.refreshStock(stock.symbol);
        successCount++;
        
        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 1100)); // ~55/minute
        
      } catch (error) {
        console.error(`❌ Failed to refresh ${stock.symbol}`);
        errorCount++;
      }
    }

    console.log(`\n📊 Refresh Summary:`);
    console.log(`✅ Success: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
  }

  async cleanupExpired(): Promise<void> {
    try {
      console.log('🧹 Cleaning up expired cache entries...');
      
      const { data, error } = await supabase
        .from('cached_trade_plans')
        .delete()
        .lt('expires_at', new Date().toISOString())
        .select();

      if (error) {
        throw new Error(`Cleanup failed: ${error.message}`);
      }

      const deletedCount = data?.length || 0;
      console.log(`✅ Cleaned up ${deletedCount} expired entries`);
      
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
      throw error;
    }
  }

  async analyzePerformance(): Promise<void> {
    try {
      console.log('📈 Analyzing cache performance...');
      const entries = await this.getCacheEntries();
      
      const now = new Date();
      const expired = entries.filter(e => new Date(e.expires_at) < now);
      const topStockEntries = entries.filter(e => e.is_top_100);
      const organicEntries = entries.filter(e => !e.is_top_100);

      console.log('\n📊 PERFORMANCE ANALYSIS');
      console.log('════════════════════════════════════════');
      console.log(`🎯 Cache Coverage:`);
      console.log(`   - Top 100 stocks: ${topStockEntries.length}/100 (${Math.round(topStockEntries.length)}%)`);
      console.log(`   - Organic demand: ${organicEntries.length} stocks`);
      console.log(`   - Total coverage: ${entries.length} stocks`);
      
      console.log(`\n⏰ Cache Health:`);
      console.log(`   - Fresh entries: ${entries.length - expired.length}`);
      console.log(`   - Expired entries: ${expired.length}`);
      console.log(`   - Health score: ${Math.round((1 - expired.length / entries.length) * 100)}%`);

      // Find gaps in top 100 coverage
      const cachedTopSymbols = new Set(topStockEntries.map(e => e.symbol));
      const missingTopStocks = TOP_100_STOCKS
        .slice(0, 50) // Check first 50
        .filter(stock => !cachedTopSymbols.has(stock.symbol));

      if (missingTopStocks.length > 0) {
        console.log(`\n⚠️  MISSING TOP STOCKS (${missingTopStocks.length}):`);
        missingTopStocks.slice(0, 10).forEach(stock => {
          console.log(`   - ${stock.symbol} (Priority: ${stock.priority})`);
        });
      }

      // Recommend actions
      console.log(`\n💡 RECOMMENDATIONS:`);
      if (expired.length > 0) {
        console.log(`   ✅ Run cleanup to remove ${expired.length} expired entries`);
      }
      if (missingTopStocks.length > 0) {
        console.log(`   ✅ Populate ${missingTopStocks.length} missing top stocks`);
      }
      if (topStockEntries.length < 50) {
        console.log(`   ✅ Improve top stock coverage (currently ${topStockEntries.length}/100)`);
      }
      
    } catch (error) {
      console.error('❌ Error analyzing performance:', error);
      throw error;
    }
  }

  async showHelp(): Promise<void> {
    console.log('\n🛠️  TRADECRAFT CACHE MANAGER');
    console.log('════════════════════════════════════════');
    console.log('Available commands:');
    console.log('');
    console.log('  status              Show cache status and statistics');
    console.log('  refresh <symbol>    Refresh cache for specific stock');
    console.log('  refresh-top [N]     Refresh top N stocks (default: 10)');
    console.log('  cleanup             Remove expired cache entries');
    console.log('  analyze             Analyze cache performance');
    console.log('  help                Show this help message');
    console.log('');
    console.log('Examples:');
    console.log('  npm run cache:status');
    console.log('  npm run cache:refresh AAPL');
    console.log('  npm run cache:refresh-top 20');
    console.log('  npm run cache:cleanup');
    console.log('  npm run cache:analyze');
    console.log('');
  }
}

// CLI Entry Point
async function main() {
  const manager = new CacheManager();
  const command = process.argv[2];
  const arg = process.argv[3];

  try {
    switch (command) {
      case 'status':
        await manager.showStatus();
        break;
        
      case 'refresh':
        if (!arg) {
          console.error('❌ Please specify a stock symbol: npm run cache:refresh AAPL');
          process.exit(1);
        }
        await manager.refreshStock(arg.toUpperCase());
        break;
        
      case 'refresh-top':
        const limit = arg ? parseInt(arg, 10) : 10;
        if (isNaN(limit) || limit < 1) {
          console.error('❌ Please specify a valid number: npm run cache:refresh-top 20');
          process.exit(1);
        }
        await manager.refreshTopStocks(limit);
        break;
        
      case 'cleanup':
        await manager.cleanupExpired();
        break;
        
      case 'analyze':
        await manager.analyzePerformance();
        break;
        
      case 'help':
      default:
        await manager.showHelp();
        break;
    }
  } catch (error) {
    console.error('❌ Cache manager error:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
