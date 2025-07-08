#!/usr/bin/env tsx
/**
 * CLI Script for Trade Plan Cache Population
 * 
 * Usage:
 *   npm run populate-cache              # Populate top 20 stocks
 *   npm run populate-cache -- --tier=1  # Populate tier 1 stocks
 *   npm run populate-cache -- --all     # Populate all top 100 stocks
 *   npm run populate-cache -- --refresh # Force refresh existing cache
 *   npm run populate-cache -- --symbols=AAPL,MSFT,GOOGL  # Specific symbols
 */

import { 
  populateTradeplanCache, 
  populateHighPriorityStocks,
  refreshStaleCache,
  forceRefreshAllCache,
  type CachePopulationOptions 
} from './populate-trade-plan-cache';

// Parse command line arguments
const args = process.argv.slice(2);
const flags: Record<string, string | boolean> = {};

args.forEach(arg => {
  if (arg.startsWith('--')) {
    const [key, value] = arg.substring(2).split('=');
    flags[key] = value || true;
  }
});

async function main() {
  console.log('🚀 TradeCraft Cache Population Tool\n');
  
  try {
    let result;
    
    if (flags.help) {
      showHelp();
      return;
    }
    
    if (flags.refresh && flags.all) {
      console.log('Force refreshing all cached trade plans...');
      result = await forceRefreshAllCache(true);
    } 
    else if (flags.refresh) {
      console.log('Refreshing stale cache entries...');
      const maxAge = typeof flags.age === 'string' ? parseInt(flags.age) : 24;
      result = await refreshStaleCache(maxAge, true);
    }
    else if (flags.symbols && typeof flags.symbols === 'string') {
      const symbolList = flags.symbols.split(',').map(s => s.trim().toUpperCase());
      console.log(`Populating specific symbols: ${symbolList.join(', ')}`);
      
      result = await populateTradeplanCache({
        symbols: symbolList,
        verbose: true,
        batchSize: 1,
        delayBetweenBatches: 3000
      });
    }
    else if (flags.tier && typeof flags.tier === 'string') {
      const tierLevel = parseInt(flags.tier) as 1 | 2 | 3 | 4 | 5;
      if (tierLevel < 1 || tierLevel > 5) {
        console.error('❌ Tier level must be between 1 and 5');
        process.exit(1);
      }
      
      console.log(`Populating tier ${tierLevel} stocks...`);
      result = await populateTradeplanCache({
        tierLevel,
        verbose: true,
        batchSize: 1,
        delayBetweenBatches: 3000 // 3 seconds between requests
      });
    }
    else if (flags.all) {
      console.log('Populating all top 100 stocks...');
      result = await populateTradeplanCache({
        verbose: true,
        batchSize: 1,
        delayBetweenBatches: 3000
      });
    }
    else {
      // Default: populate high priority stocks
      console.log('Populating top 10 high-priority stocks (default behavior)...');
      result = await populateTradeplanCache({
        tierLevel: 1,
        maxSymbols: 20, // Back to 20 with faster processing
        batchSize: 1,
        delayBetweenBatches: 3000, // 3 seconds between stocks
        verbose: true,
        onProgress: (progress) => {
          console.log(`Progress: ${progress.completed}/${progress.total} (${Math.round(progress.completed / progress.total * 100)}%)`);
        }
      });
    }
    
    // Display final results
    console.log('\\n' + '='.repeat(60));
    console.log('📊 CACHE POPULATION SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Processed: ${result.total}`);
    console.log(`✅ Successful: ${result.successful}`);
    console.log(`⏭️  Skipped: ${result.skipped}`);
    console.log(`❌ Failed: ${result.failed}`);
    console.log(`⏱️  Total Time: ${Math.round(result.timeElapsed / 1000)}s`);
    
    if (result.successful > 0) {
      const avgTime = Math.round(result.timeElapsed / result.successful);
      console.log(`📈 Avg Time per Success: ${avgTime}ms`);
    }
    
    if (result.errors.length > 0) {
      console.log('\\n❌ ERRORS:');
      result.errors.forEach(error => {
        console.log(`   ${error.symbol}: ${error.error}`);
      });
    }
    
    console.log('\\n🎉 Cache population completed!');
    
    if (result.failed > 0) {
      console.log('\\n⚠️  Some symbols failed. You may want to retry failed symbols manually.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Fatal error during cache population:', error);
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
TradeCraft Cache Population Tool

USAGE:
  npm run populate-cache [OPTIONS]

OPTIONS:
  --help                    Show this help message
  --all                     Populate all top 100 stocks
  --tier=<1-5>             Populate specific priority tier (1=highest)
  --symbols=<LIST>         Populate specific symbols (comma-separated)
  --refresh                Refresh stale cache entries
  --refresh --all          Force refresh all cached entries
  --age=<HOURS>           Max age for stale refresh (default: 24)

EXAMPLES:
  npm run populate-cache                           # Top 20 stocks (~2 minutes)
  npm run populate-cache -- --tier=1              # Highest priority tier (~3 minutes)
  npm run populate-cache -- --symbols=AAPL,MSFT   # Specific symbols (~20 seconds)
  npm run populate-cache -- --refresh             # Refresh stale entries (variable time)
  npm run test-cache                               # Quick test with AAPL only (~10 seconds)

RATE LIMITING:
  - API limit: 55 calls per minute
  - Each stock: ~5 API calls in ~3 seconds
  - Processing rate: ~20 stocks per minute  
  - Delay between stocks: 3 seconds
  - Well under the 55 calls/minute limit

TIMING ESTIMATES:
  - 1 stock: ~6 seconds (3s processing + 3s delay)
  - 5 stocks: ~30 seconds
  - 20 stocks: ~2 minutes  
  - 50 stocks: ~5 minutes
  - 100 stocks: ~10 minutes

TIERS:
  Tier 1: Priority 80-100 (Top stocks like AAPL, MSFT, SPY)
  Tier 2: Priority 60-79  (Large cap growth stocks)
  Tier 3: Priority 40-59  (Mid-cap and sector leaders)
  Tier 4: Priority 20-39  (Smaller but popular stocks)
  Tier 5: Priority 0-19   (Niche or speculative stocks)

NOTES:
  - Rate limiting is built-in to avoid API throttling
  - Failed symbols will be retried automatically
  - Existing fresh cache entries are skipped unless --refresh is used
  - Progress is shown in real-time during execution
`);
}

// Run the main function
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Unhandled error:', error);
    process.exit(1);
  });
}

export default main;
