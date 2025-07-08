#!/usr/bin/env tsx
/**
 * Simple Cache Test Script
 * 
 * Tests cache population with just 1-2 stocks to verify fixes
 */

import { populateTradeplanCache } from './populate-trade-plan-cache';

async function testCachePopulation() {
  console.log('🧪 Testing Cache Population with Rate Limiting Fixes\n');
  
  console.log('Testing with AAPL only...');
  console.log('This should respect the 55 API calls/minute limit.\n');
  
  try {
    const result = await populateTradeplanCache({
      symbols: ['AAPL'],
      verbose: true,
      batchSize: 1,
      delayBetweenBatches: 2000, // Shorter delay for single test
      maxRetries: 1 // Reduce retries for faster testing
    });
    
    console.log('\n' + '='.repeat(50));
    console.log('🎯 TEST RESULTS');
    console.log('='.repeat(50));
    console.log(`✅ Successful: ${result.successful}`);
    console.log(`❌ Failed: ${result.failed}`);
    console.log(`⏭️  Skipped: ${result.skipped}`);
    console.log(`⏱️  Time: ${Math.round(result.timeElapsed / 1000)}s`);
    
    if (result.errors.length > 0) {
      console.log('\n❌ Errors:');
      result.errors.forEach(error => {
        console.log(`   ${error.symbol}: ${error.error}`);
      });
    }
    
    if (result.successful > 0) {
      console.log('\n🎉 SUCCESS! Cache population is working.');
      console.log('You can now run the full cache population:');
      console.log('npm run populate-cache');
    } else {
      console.log('\n⚠️  Cache population failed. Check the errors above.');
    }
    
  } catch (error) {
    console.error('💥 Test failed with error:', error);
  }
}

// Run the test
testCachePopulation().catch(console.error);
