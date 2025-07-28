#!/usr/bin/env node

/**
 * Cache Headers Validation Script
 * Tests that proper cache headers are being served for different asset types
 */

const https = require('https');
const http = require('http');

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.tradingsetup.pro';

const TEST_URLS = [
  '/favicon.ico',
  '/avatar.png', 
  '/badges/medium-badge.png',
  '/blog/stan-weinstein-june-update.png',
  '/_next/static/css/app.css', // This will exist after build
  '/_next/image?url=/avatar.png&w=128&q=75', // Next.js optimized image
];

async function checkCacheHeaders(url) {
  return new Promise((resolve) => {
    const fullUrl = `${BASE_URL}${url}`;
    const client = fullUrl.startsWith('https:') ? https : http;
    
    console.log(`\n🔍 Testing: ${url}`);
    
    const req = client.request(fullUrl, { method: 'HEAD' }, (res) => {
      const headers = res.headers;
      
      console.log(`   Status: ${res.statusCode}`);
      console.log(`   Cache-Control: ${headers['cache-control'] || 'NOT SET'}`);
      console.log(`   Expires: ${headers['expires'] || 'NOT SET'}`);
      console.log(`   Last-Modified: ${headers['last-modified'] || 'NOT SET'}`);
      console.log(`   ETag: ${headers['etag'] || 'NOT SET'}`);
      
      // Validate cache headers
      const hasCacheControl = !!headers['cache-control'];
      const hasExpires = !!headers['expires'];
      const isOptimal = hasCacheControl && hasExpires;
      
      console.log(`   ✅ Cache Headers: ${isOptimal ? 'OPTIMAL' : 'NEEDS IMPROVEMENT'}`);
      
      resolve({
        url,
        status: res.statusCode,
        hasCacheControl,
        hasExpires,
        isOptimal,
        headers: {
          'cache-control': headers['cache-control'],
          'expires': headers['expires'],
          'last-modified': headers['last-modified'],
          'etag': headers['etag']
        }
      });
    });
    
    req.on('error', (err) => {
      console.log(`   ❌ Error: ${err.message}`);
      resolve({
        url,
        status: 'ERROR', 
        error: err.message,
        isOptimal: false
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log(`   ⏰ Timeout for ${url}`);
      resolve({
        url,
        status: 'TIMEOUT',
        isOptimal: false
      });
    });
    
    req.end();
  });
}

async function runCacheValidation() {
  console.log('🚀 Cache Headers Validation');
  console.log('=' .repeat(50));
  console.log(`Base URL: ${BASE_URL}`);
  
  const results = [];
  
  for (const url of TEST_URLS) {
    const result = await checkCacheHeaders(url);
    results.push(result);
    
    // Add delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Summary
  console.log('\n📊 SUMMARY');
  console.log('=' .repeat(50));
  
  const optimal = results.filter(r => r.isOptimal).length;
  const total = results.length;
  
  console.log(`Optimal cache headers: ${optimal}/${total} (${Math.round(optimal/total*100)}%)`);
  
  if (optimal === total) {
    console.log('🎉 All assets have optimal cache headers!');
  } else {
    console.log('⚠️  Some assets need cache header improvements:');
    results.filter(r => !r.isOptimal).forEach(r => {
      console.log(`   - ${r.url}: ${r.status === 'ERROR' ? r.error : 'Missing headers'}`);
    });
  }
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS');
  console.log('=' .repeat(50));
  console.log('1. Ensure middleware.ts is properly configured');
  console.log('2. Check next.config.js headers() function');
  console.log('3. Verify static assets exist in public/ directory');
  console.log('4. Test after deployment to production');
  
  console.log('\n🔗 TESTING TOOLS');
  console.log('=' .repeat(50));
  console.log('• GTmetrix: https://gtmetrix.com/');
  console.log('• PageSpeed Insights: https://pagespeed.web.dev/');
  console.log('• WebPageTest: https://www.webpagetest.org/');
}

// Run the validation
runCacheValidation().catch(console.error);
