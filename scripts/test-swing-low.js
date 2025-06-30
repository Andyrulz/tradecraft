import https from 'https';
import http from 'http';

// Test configuration
const TEST_SYMBOL = 'MSFT';
const BASE_URL = 'http://localhost:3000'; // Adjust if your dev server runs on different port

const TEST_TIMEFRAMES = [
  { 
    name: 'swing', 
    interval: '5min', 
    outputsize: 100,
    description: 'Swing Trading (5min candles)',
    maxRisk: 8 
  },
  { 
    name: 'positional', 
    interval: '1day', 
    outputsize: 60,
    description: 'Positional Trading (Daily candles)',
    maxRisk: 15 
  },
  { 
    name: 'longterm', 
    interval: '1week', 
    outputsize: 52,
    description: 'Long Term (Weekly candles)',
    maxRisk: 20 
  }
];

// Utility function to make HTTP requests
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
            return;
          }
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error(`Failed to parse JSON: ${error.message}`));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Swing Low Detection Function (matches your implementation)
function detectSwingLow(data, leftCandles = 15, rightCandles = 15) {
  const swingLows = [];
  
  console.log(`  🔍 Analyzing ${data.length} candles for swing lows...`);
  
  for (let i = leftCandles; i < data.length - rightCandles; i++) {
    const currentLow = data[i].low;
    let isSwingLow = true;
    
    // Check left candles
    for (let j = i - leftCandles; j < i; j++) {
      if (data[j].low <= currentLow) {
        isSwingLow = false;
        break;
      }
    }
    
    if (!isSwingLow) continue;
    
    // Check right candles
    for (let j = i + 1; j <= i + rightCandles; j++) {
      if (data[j].low <= currentLow) {
        isSwingLow = false;
        break;
      }
    }
    
    if (isSwingLow) {
      swingLows.push({
        index: i,
        low: currentLow,
        datetime: data[i].datetime,
        high: data[i].high,
        close: data[i].close,
        open: data[i].open
      });
    }
  }
  
  // Sort by most recent (datetime)
  return swingLows.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
}

// Calculate Stop Loss with Safety Buffer (matches your implementation)
function calculateStopLoss(swingLows, currentPrice, timeframe) {
  if (swingLows.length === 0) {
    console.log('    ❌ No swing lows found - would fallback to ATR');
    return null;
  }
  
  const recentSwingLow = swingLows[0];
  
  // Safety buffer based on timeframe (matches your code)
  const bufferPercent = timeframe === 'swing' ? 0.005 : // 0.5%
                       timeframe === 'positional' ? 0.01 : // 1.0%
                       0.015; // 1.5% for long term
  
  const stopLoss = recentSwingLow.low * (1 - bufferPercent);
  const riskPercent = ((currentPrice - stopLoss) / currentPrice) * 100;
  const riskDollar = currentPrice - stopLoss;
  
  return {
    swingLow: recentSwingLow,
    stopLoss,
    riskPercent,
    riskDollar,
    bufferPercent: bufferPercent * 100,
    bufferDollar: recentSwingLow.low * bufferPercent
  };
}

// Validate ATR-based calculation for comparison
function calculateATRStopLoss(data, currentPrice, timeframe) {
  // Simple ATR calculation (14-period)
  const atrPeriod = 14;
  const trueRanges = [];
  
  for (let i = 1; i < Math.min(data.length, atrPeriod + 10); i++) {
    const high = data[i].high;
    const low = data[i].low;
    const prevClose = data[i - 1].close;
    
    const tr = Math.max(
      high - low,
      Math.abs(high - prevClose),
      Math.abs(low - prevClose)
    );
    
    trueRanges.push(tr);
  }
  
  const atr = trueRanges.slice(-atrPeriod).reduce((sum, tr) => sum + tr, 0) / atrPeriod;
  
  // ATR multipliers (matches your code)
  const atrMultiplier = timeframe === 'swing' ? 1.5 : 
                       timeframe === 'positional' ? 2 : 
                       2.5;
  
  const atrStopLoss = currentPrice - (atr * atrMultiplier);
  const atrRiskPercent = ((currentPrice - atrStopLoss) / currentPrice) * 100;
  
  return {
    atr,
    atrMultiplier,
    stopLoss: atrStopLoss,
    riskPercent: atrRiskPercent
  };
}

// Main test function
async function testSwingLowCalculation() {
  console.log('🧪 SWING LOW STOP LOSS ACCURACY TEST');
  console.log('=' .repeat(80));
  console.log(`📊 Testing Symbol: ${TEST_SYMBOL}`);
  console.log(`🌐 API Base URL: ${BASE_URL}`);
  console.log('');
  
  for (const timeframe of TEST_TIMEFRAMES) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📈 ${timeframe.description.toUpperCase()}`);
    console.log(`🕐 Interval: ${timeframe.interval} | Data Points: ${timeframe.outputsize}`);
    console.log('-'.repeat(60));
    
    try {
      // Build API URL
      const apiUrl = `${BASE_URL}/api/swing-low-data?symbol=${TEST_SYMBOL}&interval=${timeframe.interval}&outputsize=${timeframe.outputsize}`;
      console.log(`📡 Fetching: ${apiUrl}`);
      
      // Fetch data from your API
      const startTime = Date.now();
      const data = await makeRequest(apiUrl);
      const fetchTime = Date.now() - startTime;
      
      console.log(`✅ API Response: ${fetchTime}ms`);
      
      if (!data.values || data.values.length === 0) {
        console.log('❌ No data received from API');
        continue;
      }
      
      console.log(`📊 Data Points Received: ${data.values.length}`);
      console.log(`📅 Date Range: ${data.values[0].datetime} to ${data.values[data.values.length - 1].datetime}`);
      
      // Get current price (latest close)
      const currentPrice = data.values[data.values.length - 1].close;
      const currentCandle = data.values[data.values.length - 1];
      
      console.log(`💰 Current Price: $${currentPrice.toFixed(2)}`);
      console.log(`📈 Latest Candle: O:$${currentCandle.open.toFixed(2)} H:$${currentCandle.high.toFixed(2)} L:$${currentCandle.low.toFixed(2)} C:$${currentCandle.close.toFixed(2)}`);
      
      // Detect swing lows
      const swingStartTime = Date.now();
      const swingLows = detectSwingLow(data.values, 15, 15);
      const swingTime = Date.now() - swingStartTime;
      
      console.log(`⏱️  Swing Low Detection: ${swingTime}ms`);
      console.log(`📍 Swing Lows Found: ${swingLows.length}`);
      
      if (swingLows.length > 0) {
        // Show first 5 swing lows
        console.log('\n🔍 RECENT SWING LOWS:');
        swingLows.slice(0, 5).forEach((swing, idx) => {
          const daysAgo = Math.floor((new Date() - new Date(swing.datetime)) / (1000 * 60 * 60 * 24));
          console.log(`  ${idx + 1}. $${swing.low.toFixed(2)} | ${swing.datetime} (${daysAgo} days ago)`);
        });
        
        // Calculate swing low stop loss
        const stopLossResult = calculateStopLoss(swingLows, currentPrice, timeframe.name);
        
        if (stopLossResult) {
          console.log('\n🛡️  SWING LOW STOP LOSS CALCULATION:');
          console.log(`  📍 Selected Swing Low: $${stopLossResult.swingLow.low.toFixed(2)}`);
          console.log(`  📅 Swing Low Date: ${stopLossResult.swingLow.datetime}`);
          console.log(`  🛡️  Safety Buffer: ${stopLossResult.bufferPercent.toFixed(2)}% ($${stopLossResult.bufferDollar.toFixed(2)})`);
          console.log(`  🚫 Final Stop Loss: $${stopLossResult.stopLoss.toFixed(2)}`);
          console.log(`  ⚠️  Risk Amount: $${stopLossResult.riskDollar.toFixed(2)} (${stopLossResult.riskPercent.toFixed(2)}%)`);
          
          // Risk validation
          console.log('\n✅ RISK VALIDATION:');
          if (stopLossResult.riskPercent <= timeframe.maxRisk) {
            console.log(`  ✅ Risk ${stopLossResult.riskPercent.toFixed(2)}% ≤ Max ${timeframe.maxRisk}% ✓`);
          } else {
            console.log(`  ⚠️  Risk ${stopLossResult.riskPercent.toFixed(2)}% > Max ${timeframe.maxRisk}% - Would use fallback`);
          }
          
          // Quality checks
          console.log('\n🔬 QUALITY CHECKS:');
          const distanceFromCurrent = ((currentPrice - stopLossResult.swingLow.low) / currentPrice) * 100;
          console.log(`  📏 Distance from swing low: ${distanceFromCurrent.toFixed(2)}%`);
          
          if (distanceFromCurrent > 0.5) {
            console.log(`  ✅ Swing low is below current price ✓`);
          } else {
            console.log(`  ⚠️  Swing low too close to current price`);
          }
          
          // Compare with ATR-based approach
          const atrResult = calculateATRStopLoss(data.values, currentPrice, timeframe.name);
          console.log('\n📊 COMPARISON WITH ATR METHOD:');
          console.log(`  ATR(14): $${atrResult.atr.toFixed(2)}`);
          console.log(`  ATR Multiplier: ${atrResult.atrMultiplier}x`);
          console.log(`  ATR Stop Loss: $${atrResult.stopLoss.toFixed(2)} (${atrResult.riskPercent.toFixed(2)}% risk)`);
          console.log(`  Swing Stop Loss: $${stopLossResult.stopLoss.toFixed(2)} (${stopLossResult.riskPercent.toFixed(2)}% risk)`);
          
          const difference = stopLossResult.stopLoss - atrResult.stopLoss;
          console.log(`  💡 Difference: $${Math.abs(difference).toFixed(2)} ${difference > 0 ? '(Swing higher)' : '(ATR higher)'}`);
          
        }
      } else {
        console.log('\n❌ NO SWING LOWS DETECTED');
        console.log('  📋 This would trigger ATR-based fallback');
        
        // Show ATR fallback
        const atrResult = calculateATRStopLoss(data.values, currentPrice, timeframe.name);
        console.log(`  🔄 ATR Fallback: $${atrResult.stopLoss.toFixed(2)} (${atrResult.riskPercent.toFixed(2)}% risk)`);
      }
      
    } catch (error) {
      console.log(`❌ ERROR: ${error.message}`);
      
      if (error.message.includes('ECONNREFUSED')) {
        console.log('💡 Make sure your Next.js dev server is running: npm run dev');
      }
    }
  }
  
  console.log('\n' + '='.repeat(80));
  console.log('🏁 TEST COMPLETED');
  console.log('📋 Review the results above to verify swing low detection accuracy');
  console.log('💡 Expected: Multiple swing lows found with reasonable stop loss levels');
  console.log('⚠️  If no swing lows found, check data availability and pivot logic');
}

// Run the test
async function main() {
  console.log('🚀 Starting Swing Low Test...\n');
  
  try {
    await testSwingLowCalculation();
    console.log('\n✅ Test execution completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test execution failed:', error.message);
    process.exit(1);
  }
}

// Check if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { 
  testSwingLowCalculation, 
  detectSwingLow, 
  calculateStopLoss,
  calculateATRStopLoss 
};
