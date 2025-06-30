// Test script to verify the enhanced swing low stop loss logic via API endpoint
async function testApiEndpoint() {
  console.log('🔄 Testing enhanced swing low stop loss logic via API endpoint...\n');
  
  const testCases = [
    { symbol: 'AAPL', horizon: 'swing' },
    { symbol: 'TSLA', horizon: 'positional' },
    { symbol: 'MSFT', horizon: 'longterm' }
  ];
  
  for (const { symbol, horizon } of testCases) {
    try {
      console.log(`\n📊 Testing ${symbol} (${horizon}):`);
      
      // Make a request to the trade plan API endpoint
      const response = await fetch(`http://localhost:3000/api/trade-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symbol, horizon })
      });
      
      if (!response.ok) {
        console.log(`  ❌ API error: ${response.status} ${response.statusText}`);
        continue;
      }
      
      const data = await response.json();
      const tradePlan = data.tradePlan;
      
      if (!tradePlan) {
        console.log(`  ❌ No trade plan returned`);
        continue;
      }
      
      const stopLoss = tradePlan.riskManagement.initialStopLoss;
      const currentPrice = tradePlan.currentPrice;
      const risk = ((currentPrice - stopLoss.price) / currentPrice) * 100;
      
      console.log(`  Current Price: $${currentPrice.toFixed(2)}`);
      console.log(`  Stop Loss: $${stopLoss.price.toFixed(2)}`);
      console.log(`  Risk: ${risk.toFixed(2)}%`);
      console.log(`  Method: ${stopLoss.method || 'unknown'}`);
      console.log(`  Description: ${stopLoss.description}`);
      
      if (stopLoss.riskWarning) {
        console.log(`  ⚠️ HIGH RISK WARNING`);
      }
      
      // Validate the stop loss is reasonable
      const maxRisk = horizon === 'swing' ? 8 : horizon === 'positional' ? 15 : 20;
      if (risk > maxRisk && !stopLoss.riskWarning) {
        console.log(`  ❌ ERROR: Risk ${risk.toFixed(2)}% exceeds max ${maxRisk}% without warning`);
      } else {
        console.log(`  ✅ Stop loss logic working correctly`);
      }
      
    } catch (error) {
      console.log(`  ❌ Error testing ${symbol} (${horizon}):`, error.message);
    }
  }
  
  console.log('\n✅ API endpoint testing complete!');
}

// Run the test
testApiEndpoint().catch(console.error);
