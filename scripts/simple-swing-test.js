console.log('🧪 Starting Swing Low Test...');
console.log('Current directory:', process.cwd());
console.log('Node version:', process.version);

// Test the swing low detection logic with sample data
function testSwingLowLogic() {
  console.log('\n📊 Testing Swing Low Detection Logic');
  console.log('='.repeat(50));

  // Sample price data (simulating daily candles)
  const sampleData = [
    { datetime: '2024-01-01', open: 100, high: 105, low: 98, close: 103 },
    { datetime: '2024-01-02', open: 103, high: 108, low: 102, close: 106 },
    { datetime: '2024-01-03', open: 106, high: 110, low: 104, close: 108 },
    { datetime: '2024-01-04', open: 108, high: 112, low: 106, close: 110 },
    { datetime: '2024-01-05', open: 110, high: 114, low: 108, close: 112 },
    { datetime: '2024-01-08', open: 112, high: 115, low: 110, close: 113 },
    { datetime: '2024-01-09', open: 113, high: 116, low: 111, close: 114 },
    { datetime: '2024-01-10', open: 114, high: 117, low: 112, close: 115 },
    { datetime: '2024-01-11', open: 115, high: 118, low: 113, close: 116 },
    { datetime: '2024-01-12', open: 116, high: 119, low: 114, close: 117 },
    { datetime: '2024-01-15', open: 117, high: 120, low: 115, close: 118 },
    { datetime: '2024-01-16', open: 118, high: 121, low: 116, close: 119 },
    { datetime: '2024-01-17', open: 119, high: 122, low: 117, close: 120 },
    { datetime: '2024-01-18', open: 120, high: 123, low: 118, close: 121 },
    { datetime: '2024-01-19', open: 121, high: 124, low: 119, close: 122 },
    { datetime: '2024-01-22', open: 122, high: 118, low: 115, close: 116 }, // Down day
    { datetime: '2024-01-23', open: 116, high: 119, low: 113, close: 117 },
    { datetime: '2024-01-24', open: 117, high: 120, low: 114, close: 118 },
    { datetime: '2024-01-25', open: 118, high: 121, low: 115, close: 119 },
    { datetime: '2024-01-26', open: 119, high: 122, low: 116, close: 120 },
    { datetime: '2024-01-29', open: 120, high: 117, low: 112, close: 114 }, // Another down day
    { datetime: '2024-01-30', open: 114, high: 118, low: 110, close: 116 },
    { datetime: '2024-01-31', open: 116, high: 119, low: 113, close: 117 },
    { datetime: '2024-02-01', open: 117, high: 120, low: 114, close: 118 },
    { datetime: '2024-02-02', open: 118, high: 121, low: 115, close: 119 },
    { datetime: '2024-02-05', open: 119, high: 115, low: 108, close: 110 }, // Big drop - potential swing low
    { datetime: '2024-02-06', open: 110, high: 114, low: 109, close: 112 },
    { datetime: '2024-02-07', open: 112, high: 116, low: 111, close: 114 },
    { datetime: '2024-02-08', open: 114, high: 118, low: 113, close: 116 },
    { datetime: '2024-02-09', open: 116, high: 120, low: 115, close: 118 },
    { datetime: '2024-02-12', open: 118, high: 122, low: 117, close: 120 },
    { datetime: '2024-02-13', open: 120, high: 124, low: 119, close: 122 },
    { datetime: '2024-02-14', open: 122, high: 126, low: 121, close: 124 },
    { datetime: '2024-02-15', open: 124, high: 128, low: 123, close: 126 },
    { datetime: '2024-02-16', open: 126, high: 130, low: 125, close: 128 }, // Current price
  ];

  console.log(`📈 Sample data: ${sampleData.length} candles`);
  console.log(`💰 Current price: $${sampleData[sampleData.length - 1].close}`);

  // Test swing low detection with 5 left/5 right (smaller for sample data)
  const leftCandles = 5;
  const rightCandles = 5;
  
  console.log(`🔍 Looking for swing lows with ${leftCandles} left, ${rightCandles} right candles`);

  const swingLows = [];

  for (let i = leftCandles; i < sampleData.length - rightCandles; i++) {
    const currentLow = sampleData[i].low;
    let isSwingLow = true;

    // Check left candles
    for (let j = i - leftCandles; j < i; j++) {
      if (sampleData[j].low <= currentLow) {
        isSwingLow = false;
        break;
      }
    }

    if (!isSwingLow) continue;

    // Check right candles  
    for (let j = i + 1; j <= i + rightCandles; j++) {
      if (sampleData[j].low <= currentLow) {
        isSwingLow = false;
        break;
      }
    }

    if (isSwingLow) {
      swingLows.push({
        index: i,
        datetime: sampleData[i].datetime,
        low: currentLow,
        high: sampleData[i].high,
        close: sampleData[i].close
      });
      console.log(`✅ Swing Low found: $${currentLow} on ${sampleData[i].datetime} (index ${i})`);
    }
  }

  console.log(`\n📍 Total swing lows found: ${swingLows.length}`);

  if (swingLows.length > 0) {
    // Calculate stop loss using most recent swing low
    const recentSwingLow = swingLows[swingLows.length - 1]; // Most recent
    const currentPrice = sampleData[sampleData.length - 1].close;
    const buffer = 0.01; // 1% buffer
    const stopLoss = recentSwingLow.low * (1 - buffer);
    const riskPercent = ((currentPrice - stopLoss) / currentPrice) * 100;

    console.log('\n🛡️ Stop Loss Calculation:');
    console.log(`  Most Recent Swing Low: $${recentSwingLow.low} on ${recentSwingLow.datetime}`);
    console.log(`  Current Price: $${currentPrice}`);
    console.log(`  Buffer (1%): $${(recentSwingLow.low * buffer).toFixed(2)}`);
    console.log(`  Final Stop Loss: $${stopLoss.toFixed(2)}`);
    console.log(`  Risk: ${riskPercent.toFixed(2)}%`);
    console.log(`  Distance: ${((currentPrice - stopLoss) / currentPrice * 100).toFixed(2)}%`);

    if (riskPercent <= 15) {
      console.log('✅ Risk acceptable');
    } else {
      console.log('⚠️ Risk too high');
    }
  }

  return swingLows;
}

// Test API connection
async function testAPIConnection() {
  console.log('\n🌐 Testing API Connection');
  console.log('='.repeat(50));

  const testUrls = [
    'http://localhost:3000/api/swing-low-data?symbol=AAPL&interval=1day&outputsize=5',
    'http://localhost:3001/api/swing-low-data?symbol=AAPL&interval=1day&outputsize=5',
    'https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&outputsize=5&apikey=demo'
  ];

  for (const url of testUrls) {
    try {
      console.log(`🔗 Testing: ${url}`);
      
      const response = await fetch(url);
      console.log(`📡 Response status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Data received:`, Object.keys(data));
        if (data.values) {
          console.log(`📊 Data points: ${data.values.length}`);
        }
        break; // Stop if we get a successful response
      }
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
    }
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Running Swing Low Tests');
  console.log('='.repeat(60));

  try {
    // Test 1: Logic with sample data
    const swingLows = testSwingLowLogic();

    // Test 2: API connection
    await testAPIConnection();

    console.log('\n✅ Tests completed');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the tests
runTests();
