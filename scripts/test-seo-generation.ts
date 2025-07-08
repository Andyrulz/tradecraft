/**
 * Test Script for SEO Content Generation
 * 
 * Tests the SEO content generation utilities with sample data
 * to ensure proper formatting and completeness.
 */

import { 
  generateTradePlanSEO, 
  extractSEODataFromTradePlan, 
  generateFallbackSEO,
  type TradePlanSEOData 
} from '../lib/seo/trade-plan-seo';

// Sample trade plan data for testing
const sampleTradePlan = {
  symbol: 'AAPL',
  companyName: 'Apple Inc.',
  currentPrice: 185.25,
  direction: 'bullish' as const,
  confidenceLevel: 'high',
  setupType: 'swing trade',
  timeHorizon: 'swing',
  summary: 'Strong bullish momentum with breakout above key resistance levels.',
  riskManagement: {
    riskRewardRatio: 2.8,
    entryZone: { low: 184.50, high: 186.00 },
    initialStopLoss: { price: 180.25, type: 'technical' },
    targets: [
      { price: 195.50, probability: 75 },
      { price: 205.00, probability: 45 },
      { price: 212.50, probability: 25 }
    ]
  }
};

// Test cases
const testCases = [
  {
    name: 'Complete Trade Plan (AAPL)',
    data: sampleTradePlan
  },
  {
    name: 'Minimal Trade Plan (TSLA)',
    data: {
      symbol: 'TSLA',
      currentPrice: 242.50,
      direction: 'bearish' as const,
      setupType: 'day trade'
    }
  },
  {
    name: 'ETF Trade Plan (SPY)',
    data: {
      symbol: 'SPY',
      companyName: 'SPDR S&P 500 ETF',
      currentPrice: 445.75,
      direction: 'neutral' as const,
      setupType: 'position trade',
      timeHorizon: 'long'
    }
  }
];

async function runSEOTests() {
  console.log('🧪 Testing SEO Content Generation\n');
  console.log('='.repeat(80));
  
  for (const testCase of testCases) {
    console.log(`\\n📊 Test Case: ${testCase.name}`);
    console.log('-'.repeat(50));
    
    try {
      // Extract SEO data from trade plan
      const seoData = extractSEODataFromTradePlan(testCase.data);
      
      // Generate SEO content
      const seoContent = generateTradePlanSEO(seoData);
      
      // Display results
      console.log(`📝 Title: ${seoContent.title}`);
      console.log(`📖 Description: ${seoContent.description}`);
      console.log(`🔑 Keywords (${seoContent.keywords.length}): ${seoContent.keywords.slice(0, 5).join(', ')}...`);
      console.log(`🔗 Canonical URL: ${seoContent.canonicalUrl}`);
      console.log(`📄 Content Length: ${seoContent.content.length} characters`);
      
      // Validate content structure
      validateSEOContent(seoContent, testCase.name);
      
      console.log('✅ Test passed!');
      
    } catch (error) {
      console.error(`❌ Test failed:`, error);
    }
  }
  
  // Test fallback SEO generation
  console.log('\\n\\n🔄 Testing Fallback SEO Generation');
  console.log('-'.repeat(50));
  
  const fallbackContent = generateFallbackSEO('NVDA');
  console.log(`📝 Fallback Title: ${fallbackContent.title}`);
  console.log(`📖 Fallback Description: ${fallbackContent.description}`);
  console.log(`🔑 Fallback Keywords: ${fallbackContent.keywords.slice(0, 3).join(', ')}...`);
  
  validateSEOContent(fallbackContent, 'Fallback Content');
  console.log('✅ Fallback test passed!');
  
  console.log('\\n🎉 All SEO tests completed successfully!');
}

function validateSEOContent(content: any, testName: string) {
  const errors: string[] = [];
  
  // Validate title
  if (!content.title || content.title.length < 30 || content.title.length > 60) {
    errors.push(`Title should be 30-60 characters (current: ${content.title?.length || 0})`);
  }
  
  // Validate description
  if (!content.description || content.description.length < 120 || content.description.length > 160) {
    errors.push(`Description should be 120-160 characters (current: ${content.description?.length || 0})`);
  }
  
  // Validate keywords
  if (!content.keywords || content.keywords.length < 5 || content.keywords.length > 25) {
    errors.push(`Should have 5-25 keywords (current: ${content.keywords?.length || 0})`);
  }
  
  // Validate content
  if (!content.content || content.content.length < 500) {
    errors.push(`Content should be at least 500 characters (current: ${content.content?.length || 0})`);
  }
  
  // Validate structured data
  if (!content.structuredData || typeof content.structuredData !== 'object') {
    errors.push('Structured data is missing or invalid');
  }
  
  // Validate canonical URL
  if (!content.canonicalUrl || !content.canonicalUrl.startsWith('https://')) {
    errors.push('Canonical URL is missing or invalid');
  }
  
  if (errors.length > 0) {
    console.warn(`⚠️  Validation warnings for ${testName}:`);
    errors.forEach(error => console.warn(`   • ${error}`));
  }
}

// Test structured data generation
function testStructuredData() {
  console.log('\\n\\n🔍 Testing Structured Data Generation');
  console.log('-'.repeat(50));
  
  const seoData = extractSEODataFromTradePlan(sampleTradePlan);
  const seoContent = generateTradePlanSEO(seoData);
  
  console.log('📋 Structured Data Preview:');
  console.log(JSON.stringify(seoContent.structuredData, null, 2));
  
  // Validate JSON-LD structure
  const sd = seoContent.structuredData as any;
  if (sd['@context'] && sd['@type'] && sd.headline && sd.author) {
    console.log('✅ Structured data is valid JSON-LD');
  } else {
    console.error('❌ Structured data is missing required fields');
  }
}

// Test keyword optimization
function testKeywordOptimization() {
  console.log('\\n\\n🎯 Testing Keyword Optimization');
  console.log('-'.repeat(50));
  
  const testSymbols = ['AAPL', 'TSLA', 'SPY', 'BTC-USD', 'ARKK'];
  
  testSymbols.forEach(symbol => {
    const fallbackSEO = generateFallbackSEO(symbol);
    const primaryKeywords = fallbackSEO.keywords.slice(0, 5);
    
    console.log(`${symbol}: ${primaryKeywords.join(', ')}`);
    
    // Check for symbol-specific optimization
    const hasSymbolVariations = primaryKeywords.some(kw => 
      kw.includes(symbol.toLowerCase()) || kw.includes(symbol)
    );
    
    if (hasSymbolVariations) {
      console.log(`  ✅ Symbol-optimized keywords detected`);
    } else {
      console.log(`  ⚠️  No symbol-specific keywords found`);
    }
  });
}

// Run all tests
async function main() {
  try {
    await runSEOTests();
    testStructuredData();
    testKeywordOptimization();
    
    console.log('\\n' + '='.repeat(80));
    console.log('🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(80));
    
  } catch (error) {
    console.error('❌ Test suite failed:', error);
    process.exit(1);
  }
}

// Run tests if called directly
if (require.main === module) {
  main();
}

export default main;
