// Test script to verify the enhanced swing low stop loss logic in the backend API
import { getStockData } from '../lib/api.js';

async function testEnhancedStopLoss() {
  console.log('🔄 Testing enhanced swing low stop loss logic in backend API...\n');
  
  const testSymbols = ['AAPL', 'TSLA', 'MSFT'];
  const timeframes = ['swing', 'positional', 'longterm'];
  
  for (const symbol of testSymbols) {
    console.log(`\n📊 Testing ${symbol}:`);
    
    for (const timeframe of timeframes) {
      try {
        console.log(`\n  ${timeframe.toUpperCase()} timeframe:`);
        const tradePlan = await getStockData(symbol, 3, timeframe);
        
        const stopLoss = tradePlan.riskManagement.initialStopLoss;
        const currentPrice = tradePlan.currentPrice;
        const risk = ((currentPrice - stopLoss.price) / currentPrice) * 100;
        
        console.log(`    Current Price: $${currentPrice.toFixed(2)}`);
        console.log(`    Stop Loss: $${stopLoss.price.toFixed(2)}`);
        console.log(`    Risk: ${risk.toFixed(2)}%`);
        console.log(`    Method: ${stopLoss.method || 'unknown'}`);
        console.log(`    Description: ${stopLoss.description}`);
        
        if (stopLoss.riskWarning) {
          console.log(`    ⚠️ HIGH RISK WARNING`);
        }
        
        // Validate the stop loss is reasonable
        const maxRisk = timeframe === 'swing' ? 8 : timeframe === 'positional' ? 15 : 20;
        if (risk > maxRisk && !stopLoss.riskWarning) {
          console.log(`    ❌ ERROR: Risk ${risk.toFixed(2)}% exceeds max ${maxRisk}% without warning`);
        } else {
          console.log(`    ✅ Stop loss logic working correctly`);
        }
        
      } catch (error) {
        console.log(`    ❌ Error testing ${symbol} (${timeframe}):`, error.message);
      }
    }
  }
  
  console.log('\n✅ Enhanced stop loss testing complete!');
}

// Run the test
testEnhancedStopLoss().catch(console.error);
