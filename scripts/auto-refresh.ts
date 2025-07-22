#!/usr/bin/env tsx
/**
 * Auto-refresh popular stocks in the cache
 * 
 * This script refreshes the cache for the most popular stocks based on
 * user demand and ensures fresh content for SEO and user experience.
 */

import { refreshMultipleStocks, getCacheStatus } from '@/lib/cache/auto-refresh';
import { getTopStocksByPopularity } from '@/lib/cache/trade-plan-cache';
import { TOP_100_STOCKS } from '@/lib/config/top-stocks';

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'popular';
  const count = parseInt(args[1]) || 20;

  console.log('🚀 TradeCraft Auto-Refresh Tool\n');

  try {
    switch (command) {
      case 'popular':
        await refreshPopularStocks(count);
        break;
      
      case 'top':
        await refreshTopStocks(count);
        break;
      
      case 'stale':
        await refreshStaleStocks(parseInt(args[1]) || 12);
        break;
      
      case 'status':
        await showCacheStatus(count);
        break;
      
      case 'single':
        if (!args[1]) {
          console.error('❌ Please provide a symbol: npm run auto-refresh single AAPL');
          process.exit(1);
        }
        await refreshSingleStock(args[1]);
        break;
      
      default:
        showHelp();
        break;
    }
  } catch (error) {
    console.error('❌ Auto-refresh failed:', error);
    process.exit(1);
  }
}

async function refreshPopularStocks(count: number) {
  console.log(`🔥 Refreshing ${count} most popular stocks...\n`);
  
  const popularStocks = await getTopStocksByPopularity(count);
  const symbols = popularStocks.map(stock => stock.symbol);
  
  if (symbols.length === 0) {
    console.log('⚠️  No popular stocks found. Using top stocks instead...');
    const topSymbols = TOP_100_STOCKS.slice(0, count).map(s => s.symbol);
    await refreshMultipleStocks(topSymbols, {
      maxAgeHours: 8,
      source: 'popular_refresh'
    });
  } else {
    console.log(`📈 Popular stocks: ${symbols.join(', ')}\n`);
    await refreshMultipleStocks(symbols, {
      maxAgeHours: 8,
      source: 'popular_refresh'
    });
  }
}

async function refreshTopStocks(count: number) {
  console.log(`⭐ Refreshing top ${count} stocks...\n`);
  
  const symbols = TOP_100_STOCKS.slice(0, count).map(s => s.symbol);
  console.log(`📈 Top stocks: ${symbols.join(', ')}\n`);
  
  await refreshMultipleStocks(symbols, {
    maxAgeHours: 12,
    source: 'top_stocks_refresh'
  });
}

async function refreshStaleStocks(maxAgeHours: number) {
  console.log(`🕒 Refreshing stocks older than ${maxAgeHours} hours...\n`);
  
  // Check all top 100 stocks for staleness
  const staleSymbols: string[] = [];
  
  for (const stock of TOP_100_STOCKS.slice(0, 50)) {
    const status = await getCacheStatus(stock.symbol);
    if (status.exists && status.ageHours > maxAgeHours) {
      staleSymbols.push(stock.symbol);
    }
  }
  
  if (staleSymbols.length === 0) {
    console.log('✅ No stale stocks found!');
    return;
  }
  
  console.log(`📈 Stale stocks (${staleSymbols.length}): ${staleSymbols.join(', ')}\n`);
  
  await refreshMultipleStocks(staleSymbols, {
    maxAgeHours: 0, // Force refresh for stale stocks
    forceRefresh: true,
    source: 'stale_refresh'
  });
}

async function refreshSingleStock(symbol: string) {
  console.log(`🎯 Refreshing single stock: ${symbol.toUpperCase()}\n`);
  
  const { refreshCacheInBackground } = await import('@/lib/cache/auto-refresh');
  
  await refreshCacheInBackground(symbol.toUpperCase(), {
    forceRefresh: true,
    source: 'manual_single'
  });
}

async function showCacheStatus(count: number) {
  console.log(`📊 Cache Status for Top ${count} Stocks\n`);
  console.log('Symbol    | Age (hrs) | Status    | Last Updated');
  console.log('----------|-----------|-----------|------------------');
  
  for (const stock of TOP_100_STOCKS.slice(0, count)) {
    const status = await getCacheStatus(stock.symbol);
    
    const ageStr = status.exists ? status.ageHours.toFixed(1).padStart(8) : '    N/A';
    const statusStr = !status.exists ? 'Missing' : 
                     status.isExpired ? 'Expired' :
                     status.isStale ? 'Stale  ' : 'Fresh  ';
    const lastUpdated = status.lastUpdated ? 
      new Date(status.lastUpdated).toLocaleString() : 'Never';
    
    console.log(`${stock.symbol.padEnd(9)} | ${ageStr} | ${statusStr} | ${lastUpdated}`);
  }
}

function showHelp() {
  console.log(`
TradeCraft Auto-Refresh Tool

USAGE:
  npm run auto-refresh [COMMAND] [OPTIONS]

COMMANDS:
  popular [COUNT]       Refresh most popular stocks (default: 20)
  top [COUNT]          Refresh top priority stocks (default: 20)  
  stale [MAX_AGE]      Refresh stocks older than MAX_AGE hours (default: 12)
  status [COUNT]       Show cache status for top stocks (default: 20)
  single SYMBOL        Refresh a specific stock symbol

EXAMPLES:
  npm run auto-refresh                    # Refresh 20 most popular stocks
  npm run auto-refresh popular 50        # Refresh 50 most popular stocks
  npm run auto-refresh top 30           # Refresh top 30 priority stocks
  npm run auto-refresh stale 6          # Refresh stocks older than 6 hours
  npm run auto-refresh status 25        # Show status for top 25 stocks
  npm run auto-refresh single AAPL      # Refresh AAPL only

FEATURES:
  - Non-blocking background refresh
  - Intelligent staleness detection
  - Rate limiting (3 seconds between stocks)
  - Analytics tracking
  - SEO content generation

TIMING:
  - Single stock: ~6 seconds
  - 20 stocks: ~2 minutes
  - 50 stocks: ~5 minutes
  `);
}

if (require.main === module) {
  main().catch(console.error);
}
