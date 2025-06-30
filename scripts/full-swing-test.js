import https from 'https';
import http from 'http';

console.log('🧪 Full Swing Low Test with Real Data');
console.log('=' .repeat(60));

// Make HTTP request
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

// Full swing low detection (15/15 candles)
function detectSwingLow(data, leftCandles = 15, rightCandles = 15) {
  const swingLows = [];
  
  console.log(`🔍 Analyzing ${data.length} candles for swing lows (${leftCandles}/${rightCandles})...`);
  
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
        close: data[i].close
      });
    }
  }
  
  return swingLows.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
}

async function testRealSwingLow() {
  try {
    // Test with real MSFT daily data
    const url = 'http://localhost:3000/api/swing-low-data?symbol=MSFT&interval=1day&outputsize=60';
    console.log(`📡 Fetching: ${url}`);
    
    const data = await makeRequest(url);
    
    if (!data.values || data.values.length === 0) {
      console.log('❌ No data received');
      return;
    }
    
    console.log(`✅ Received ${data.values.length} daily candles`);
    console.log(`📅 Range: ${data.values[0].datetime} to ${data.values[data.values.length - 1].datetime}`);
    
    const currentPrice = data.values[data.values.length - 1].close;
    console.log(`💰 Current MSFT Price: $${currentPrice.toFixed(2)}`);
    
    // Detect swing lows with full 15/15 logic
    const swingLows = detectSwingLow(data.values, 15, 15);
    console.log(`📍 Swing Lows Found: ${swingLows.length}`);
    
    if (swingLows.length === 0) {
      console.log('❌ No swing lows found with 15/15 candles');
      console.log('💡 This would trigger ATR fallback');
      return;
    }
    
    // Show recent swing lows
    console.log('\n🔍 Recent Swing Lows:');
    swingLows.slice(0, 5).forEach((swing, idx) => {
      const daysAgo = Math.floor((new Date() - new Date(swing.datetime)) / (1000 * 60 * 60 * 24));
      console.log(`  ${idx + 1}. $${swing.low.toFixed(2)} on ${swing.datetime} (${daysAgo} days ago)`);
    });
    
    // Calculate stop loss for positional timeframe
    const recentSwingLow = swingLows[0];
    const buffer = 0.01; // 1% for positional
    const stopLoss = recentSwingLow.low * (1 - buffer);
    const riskPercent = ((currentPrice - stopLoss) / currentPrice) * 100;
    
    console.log('\n🛡️ Positional Stop Loss Calculation:');
    console.log(`  Selected Swing Low: $${recentSwingLow.low.toFixed(2)}`);
    console.log(`  Date: ${recentSwingLow.datetime}`);
    console.log(`  Buffer (1%): $${(recentSwingLow.low * buffer).toFixed(2)}`);
    console.log(`  Final Stop Loss: $${stopLoss.toFixed(2)}`);
    console.log(`  Risk: ${riskPercent.toFixed(2)}%`);
    
    // Validation
    console.log('\n✅ Validation:');
    if (riskPercent <= 15) {
      console.log(`  ✅ Risk ${riskPercent.toFixed(2)}% ≤ 15% for positional - ACCEPTABLE`);
    } else {
      console.log(`  ⚠️ Risk ${riskPercent.toFixed(2)}% > 15% for positional - WOULD USE ATR FALLBACK`);
    }
    
    if (stopLoss < currentPrice) {
      console.log(`  ✅ Stop loss below current price - LOGICAL`);
    } else {
      console.log(`  ❌ Stop loss above current price - INVALID`);
    }
    
    // Test different timeframes
    console.log('\n📊 Risk for Different Timeframes:');
    const swingBuffer = 0.005; // 0.5%
    const longtermBuffer = 0.015; // 1.5%
    
    const swingStopLoss = recentSwingLow.low * (1 - swingBuffer);
    const longtermStopLoss = recentSwingLow.low * (1 - longtermBuffer);
    
    const swingRisk = ((currentPrice - swingStopLoss) / currentPrice) * 100;
    const longtermRisk = ((currentPrice - longtermStopLoss) / currentPrice) * 100;
    
    console.log(`  Swing (0.5% buffer): $${swingStopLoss.toFixed(2)} = ${swingRisk.toFixed(2)}% risk`);
    console.log(`  Positional (1% buffer): $${stopLoss.toFixed(2)} = ${riskPercent.toFixed(2)}% risk`);
    console.log(`  Long Term (1.5% buffer): $${longtermStopLoss.toFixed(2)} = ${longtermRisk.toFixed(2)}% risk`);
    
    // Show which would be acceptable
    console.log('\n🎯 Acceptable for:');
    if (swingRisk <= 8) console.log(`  ✅ Swing trading (${swingRisk.toFixed(2)}% ≤ 8%)`);
    else console.log(`  ❌ Swing trading (${swingRisk.toFixed(2)}% > 8%)`);
    
    if (riskPercent <= 15) console.log(`  ✅ Positional trading (${riskPercent.toFixed(2)}% ≤ 15%)`);
    else console.log(`  ❌ Positional trading (${riskPercent.toFixed(2)}% > 15%)`);
    
    if (longtermRisk <= 20) console.log(`  ✅ Long term trading (${longtermRisk.toFixed(2)}% ≤ 20%)`);
    else console.log(`  ❌ Long term trading (${longtermRisk.toFixed(2)}% > 20%)`);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run test
testRealSwingLow();
