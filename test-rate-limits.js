#!/usr/bin/env node

/**
 * Test script to verify rate limiting works correctly for all plan types
 * Usage: node test-rate-limits.js
 */

const https = require('https');
const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_SYMBOL = 'AAPL';

// Test users (you'll need to update these with actual test accounts)
const TEST_USERS = {
  free: { email: 'test-free@example.com', expectedLimit: 1 },
  pro: { email: 'test-pro@example.com', expectedLimit: 100 },
  premium: { email: 'test-premium@example.com', expectedLimit: 1000 }
};

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data, headers: res.headers });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testRateLimit(planType, userEmail) {
  console.log(`\n🧪 Testing ${planType} plan rate limiting...`);
  
  try {
    // First, let's check the user's current plan status
    const debugResponse = await makeRequest(`${BASE_URL}/api/debug/user-plan`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Note: In a real test, you'd need to include authentication cookies/headers
      }
    });
    
    console.log(`📊 Debug response for ${planType}:`, debugResponse.data);
    
    // Test a trade plan generation
    const tradePlanResponse = await makeRequest(`${BASE_URL}/api/trade-plan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: TEST_SYMBOL,
        horizon: 'swing'
      })
    });
    
    console.log(`📈 Trade plan response for ${planType}:`, {
      status: tradePlanResponse.status,
      hasData: !!tradePlanResponse.data.tradePlan,
      error: tradePlanResponse.data.error,
      quotaInfo: {
        planType: tradePlanResponse.data.planType,
        planLimit: tradePlanResponse.data.planLimit,
        requestCount: tradePlanResponse.data.request_count
      }
    });
    
  } catch (error) {
    console.error(`❌ Error testing ${planType}:`, error.message);
  }
}

async function runTests() {
  console.log('🚀 Starting rate limit tests...');
  console.log('⚠️  Note: This test requires manual authentication setup');
  
  // Test each plan type
  for (const [planType, config] of Object.entries(TEST_USERS)) {
    await testRateLimit(planType, config.email);
    
    // Wait between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n✅ Tests completed!');
  console.log('\n📝 Manual verification steps:');
  console.log('1. Log in as a premium user');
  console.log('2. Generate multiple trade plans (should work up to 1000/day)');
  console.log('3. Log in as a pro user');
  console.log('4. Generate multiple trade plans (should work up to 100/day)');
  console.log('5. Log in as a free user');
  console.log('6. Generate trade plans (should be limited to 1/day)');
}

if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testRateLimit, makeRequest };
