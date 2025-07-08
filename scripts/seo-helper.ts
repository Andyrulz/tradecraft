#!/usr/bin/env tsx

/**
 * Google Search Console Helper
 * 
 * Helps you submit URLs to Google for indexing and monitor SEO performance
 */

import { TOP_100_STOCKS } from '../lib/config/top-stocks';

const BASE_URL = 'https://www.tradingsetup.pro';

interface URLSubmission {
  url: string;
  priority: 'high' | 'medium' | 'low';
  reason: string;
}

class GoogleSearchConsoleHelper {
  
  /**
   * Generate priority URLs for Google Search Console submission
   */
  generateSubmissionList(): URLSubmission[] {
    const submissions: URLSubmission[] = [];
    
    // High priority - Top 10 stocks
    const topTenStocks = TOP_100_STOCKS.slice(0, 10);
    topTenStocks.forEach(stock => {
      submissions.push({
        url: `${BASE_URL}/trade-plan/${stock.symbol}`,
        priority: 'high',
        reason: `Top priority stock (${stock.symbol}) - ${stock.reason}`
      });
    });
    
    // Medium priority - ETFs and popular stocks (next 20)
    const popularStocks = TOP_100_STOCKS.slice(10, 30);
    popularStocks.forEach(stock => {
      submissions.push({
        url: `${BASE_URL}/trade-plan/${stock.symbol}`,
        priority: 'medium',
        reason: `Popular stock (${stock.symbol}) - ${stock.reason}`
      });
    });
    
    // Key landing pages
    submissions.push(
      {
        url: `${BASE_URL}/trade-plan`,
        priority: 'high',
        reason: 'Main trade plan landing page'
      },
      {
        url: `${BASE_URL}/`,
        priority: 'high',
        reason: 'Homepage'
      },
      {
        url: `${BASE_URL}/news`,
        priority: 'medium',
        reason: 'Market news page'
      },
      {
        url: `${BASE_URL}/screener`,
        priority: 'medium',
        reason: 'Stock screener page'
      }
    );
    
    return submissions;
  }
  
  /**
   * Display submission instructions
   */
  showSubmissionInstructions(): void {
    const submissions = this.generateSubmissionList();
    const highPriority = submissions.filter(s => s.priority === 'high');
    const mediumPriority = submissions.filter(s => s.priority === 'medium');
    
    console.log('\n🎯 GOOGLE SEARCH CONSOLE SUBMISSION GUIDE');
    console.log('═══════════════════════════════════════════════');
    
    console.log('\n📋 STEP 1: Add your site to Google Search Console');
    console.log('   1. Go to: https://search.google.com/search-console/');
    console.log('   2. Click "Add Property"');
    console.log('   3. Enter: https://www.tradingsetup.pro');
    console.log('   4. Choose HTML tag verification method');
    console.log('   5. Add the verification tag to your app/layout.tsx');
    
    console.log('\n📋 STEP 2: Submit your sitemap');
    console.log('   1. In GSC, go to Sitemaps (left sidebar)');
    console.log('   2. Enter: sitemap.xml');
    console.log('   3. Click Submit');
    
    console.log('\n🚨 STEP 3: Request indexing for HIGH PRIORITY URLs (do first)');
    console.log('────────────────────────────────────────────────────────────');
    highPriority.forEach((submission, index) => {
      console.log(`${index + 1}. ${submission.url}`);
      console.log(`   → ${submission.reason}`);
    });
    
    console.log('\n📋 STEP 4: Request indexing for MEDIUM PRIORITY URLs (do later)');
    console.log('──────────────────────────────────────────────────────────────');
    mediumPriority.slice(0, 10).forEach((submission, index) => {
      console.log(`${index + 1}. ${submission.url}`);
    });
    console.log(`   ... and ${mediumPriority.length - 10} more`);
    
    console.log('\n📊 STEP 5: Monitor progress');
    console.log('   1. Check "Coverage" report for indexing status');
    console.log('   2. Monitor "Performance" for search traffic');
    console.log('   3. Watch for "Enhancements" (structured data)');
    
    console.log('\n🎯 EXPECTED TIMELINE:');
    console.log('   Week 1-2: Google discovers and crawls pages');
    console.log('   Week 3-4: Pages start appearing in search results');
    console.log('   Month 2+: Rankings improve for trade plan keywords');
    
    console.log('\n✅ Quick verification links:');
    console.log(`   Sitemap: ${BASE_URL}/sitemap.xml`);
    console.log(`   Robots: ${BASE_URL}/robots.txt`);
    console.log('   Rich Results Test: https://search.google.com/test/rich-results');
    
    console.log('\n🚀 You\'re ready for SEO success!');
  }
  
  /**
   * Generate URLs for cache population
   */
  generateCachePopulationCommands(): void {
    console.log('\n🔧 CACHE POPULATION COMMANDS');
    console.log('════════════════════════════════════════');
    console.log('Run these commands to pre-populate cache for SEO:');
    console.log('');
    console.log('# Populate top 10 stocks (highest priority)');
    console.log('npm run cache:refresh-top 10');
    console.log('');
    console.log('# Populate top 25 stocks (recommended)');
    console.log('npm run cache:refresh-top 25');
    console.log('');
    console.log('# Populate all top 50 stocks (full coverage)');
    console.log('npm run cache:refresh-top 50');
    console.log('');
    console.log('# Check cache status');
    console.log('npm run cache:status');
    console.log('');
    console.log('# Analyze cache performance');
    console.log('npm run cache:analyze');
  }
  
  /**
   * Show all URLs that will be in sitemap
   */
  showSitemapPreview(): void {
    console.log('\n📄 SITEMAP PREVIEW');
    console.log('═══════════════════════════════════════');
    console.log(`Sitemap URL: ${BASE_URL}/sitemap.xml`);
    console.log(`Total trade plan pages: ${TOP_100_STOCKS.length}`);
    console.log('');
    console.log('Top 10 trade plan URLs:');
    TOP_100_STOCKS.slice(0, 10).forEach((stock, index) => {
      console.log(`${index + 1}. ${BASE_URL}/trade-plan/${stock.symbol} (Priority: ${stock.priority})`);
    });
    console.log(`... and ${TOP_100_STOCKS.length - 10} more stock pages`);
  }
}

// CLI Interface
async function main() {
  const helper = new GoogleSearchConsoleHelper();
  const command = process.argv[2];
  
  switch (command) {
    case 'submit':
      helper.showSubmissionInstructions();
      break;
      
    case 'cache':
      helper.generateCachePopulationCommands();
      break;
      
    case 'sitemap':
      helper.showSitemapPreview();
      break;
      
    case 'all':
    default:
      helper.showSubmissionInstructions();
      helper.generateCachePopulationCommands();
      helper.showSitemapPreview();
      break;
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

export default GoogleSearchConsoleHelper;
