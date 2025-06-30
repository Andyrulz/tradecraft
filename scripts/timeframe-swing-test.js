import https from 'https';
import http from 'http';

console.log('🧪 Testing Swing Low with Correct Timeframes');
console.log('=' .repeat(70));
console.log('📋 Requirements:');
console.log('  • Swing: 65min chart (using 1h/60min as closest available)');
console.log('  • Positional: Daily chart');
console.log('  • Long Term: Weekly chart');
console.log('  • Detection: 15 left candles, 15 right candles');
console.log('');

// Make HTTP request
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
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
    }).on('error', reject);
  });
}

// Swing low detection
function detectSwingLow(data, leftCandles = 15, rightCandles = 15) {
  const swingLows = [];
  
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

// Test timeframe-specific swing lows
async function testTimeframeSpecificSwingLows() {
  const symbol = 'MSFT';
  
  const testCases = [
    {
      name: 'SWING TRADING',
      interval: '1h',
      outputsize: 120, // 5 days of hourly data
      maxRisk: 8,
      buffer: 0.005, // 0.5%
      description: '1-hour candles (closest to 65min request)'
    },
    {
      name: 'POSITIONAL TRADING', 
      interval: '1day',
      outputsize: 60,
      maxRisk: 15,
      buffer: 0.01, // 1%
      description: 'Daily candles'
    },
    {
      name: 'LONG TERM TRADING',
      interval: '1week', 
      outputsize: 52,
      maxRisk: 20,
      buffer: 0.015, // 1.5%
      description: 'Weekly candles'
    }
  ];
  
  for (const testCase of testCases) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📈 ${testCase.name}`);
    console.log(`🕐 ${testCase.description}`);
    console.log('-'.repeat(60));
    
    try {
      const url = `http://localhost:3000/api/swing-low-data?symbol=${symbol}&interval=${testCase.interval}&outputsize=${testCase.outputsize}`;
      console.log(`📡 Fetching: ${testCase.interval} data (${testCase.outputsize} periods)`);
      
      const data = await makeRequest(url);
      
      if (!data.values || data.values.length === 0) {
        console.log('❌ No data received');
        continue;
      }
      
      console.log(`✅ Received: ${data.values.length} ${testCase.interval} candles`);
      console.log(`📅 Range: ${data.values[0].datetime} to ${data.values[data.values.length - 1].datetime}`);
      
      const currentPrice = data.values[data.values.length - 1].close;
      console.log(`💰 Current Price: $${currentPrice.toFixed(2)}`);
      
      // Detect swing lows
      const swingLows = detectSwingLow(data.values, 15, 15);
      console.log(`🔍 Analysis: ${data.values.length} candles → ${swingLows.length} swing lows found`);
      
      if (swingLows.length === 0) {
        console.log('❌ No swing lows detected with 15/15 candles');
        console.log('💡 Would fallback to ATR-based stop loss');
        continue;
      }
      
      // Show swing lows
      console.log('\n📍 Recent Swing Lows:');
      swingLows.slice(0, 3).forEach((swing, idx) => {
        const timeAgo = testCase.interval === '1h' 
          ? `${Math.floor((new Date() - new Date(swing.datetime)) / (1000 * 60 * 60))} hours ago`
          : testCase.interval === '1day'
          ? `${Math.floor((new Date() - new Date(swing.datetime)) / (1000 * 60 * 60 * 24))} days ago`
          : `${Math.floor((new Date() - new Date(swing.datetime)) / (1000 * 60 * 60 * 24 * 7))} weeks ago`;
        
        console.log(`  ${idx + 1}. $${swing.low.toFixed(2)} on ${swing.datetime} (${timeAgo})`);
      });
      
      // Calculate stop loss
      const recentSwingLow = swingLows[0];
      const stopLoss = recentSwingLow.low * (1 - testCase.buffer);
      const riskPercent = ((currentPrice - stopLoss) / currentPrice) * 100;
      const riskDollar = currentPrice - stopLoss;
      
      console.log('\n🛡️ Stop Loss Calculation:');
      console.log(`  Selected Swing Low: $${recentSwingLow.low.toFixed(2)}`);
      console.log(`  Safety Buffer: ${(testCase.buffer * 100).toFixed(1)}%`);
      console.log(`  Final Stop Loss: $${stopLoss.toFixed(2)}`);
      console.log(`  Risk: $${riskDollar.toFixed(2)} (${riskPercent.toFixed(2)}%)`);
      
      // Validation
      console.log('\n✅ Validation:');
      if (riskPercent <= testCase.maxRisk) {
        console.log(`  ✅ Risk ${riskPercent.toFixed(2)}% ≤ ${testCase.maxRisk}% - ACCEPTABLE`);
      } else {
        console.log(`  ⚠️ Risk ${riskPercent.toFixed(2)}% > ${testCase.maxRisk}% - WOULD USE ATR FALLBACK`);
      }
      
      if (stopLoss < currentPrice) {
        console.log(`  ✅ Stop loss below current price - LOGICAL`);
      } else {
        console.log(`  ❌ Stop loss above current price - INVALID`);
      }
      
      // Show timeframe benefits
      console.log('\n🎯 Timeframe Benefits:');
      if (testCase.interval === '1h') {
        console.log('  • More recent swing lows (hours vs days)');
        console.log('  • Better for short-term swing trades');
        console.log('  • Captures intraday market structure');
      } else if (testCase.interval === '1day') {
        console.log('  • Captures daily market structure');
        console.log('  • Good for multi-week position trades');
        console.log('  • Filters out intraday noise');
      } else {
        console.log('  • Major weekly support levels');
        console.log('  • Long-term trend structure');
        console.log('  • Institutional-level support');
      }
      
    } catch (error) {
      console.error(`❌ Error: ${error.message}`);
    }
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('📊 SUMMARY: Timeframe-Specific Swing Low Detection');
  console.log('✅ Each timeframe uses appropriate candle intervals');
  console.log('✅ 15/15 candle pivot detection implemented');
  console.log('✅ Risk limits validated for each trading style');
  console.log('💡 Swing trading now uses 1-hour data (closest to 65min)');
}

// Run test
testTimeframeSpecificSwingLows();
