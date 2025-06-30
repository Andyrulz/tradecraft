# Momentum Screener Timeout Fix - Implementation Plan

## 🚨 Issue Identified

**Problem**: GitHub Actions cron job for momentum screener times out during the calculation phase because:

1. **High API Usage**: Each stock requires 5 Twelve Data API calls:

   - Main price data (time_series)
   - RSI indicator
   - MACD indicator
   - Bollinger Bands
   - Swing low timeframe data

2. **Rate Limit Bottleneck**:

   - Twelve Data API: 55 calls per minute limit
   - Processing 25-30 stocks = 125-150 API calls total
   - Current processing time: 3+ minutes minimum
   - GitHub Actions timeout causing job failures

3. **No Rate Limiting**: Code processes stocks sequentially with only 1-second delays, hitting rate limits and causing timeouts.

## ✅ Solution Strategy

### Phase 1: Intelligent Rate Limiting

- **API Call Batching**: Process stocks in batches of 11 (55 calls ÷ 5 calls per stock)
- **Dynamic Delays**: 60-second delay between batches to reset rate limit
- **Request Tracking**: Monitor API calls per minute to stay within limits

### Phase 2: Performance Optimization

- **Parallel Processing**: Process multiple stocks within rate limit simultaneously
- **Smart Caching**: Cache API responses to reduce duplicate calls
- **Progressive Processing**: Continue from where left off on timeout

### Phase 3: Fallback Strategies

- **Timeout Handling**: Graceful degradation when approaching time limits
- **Partial Results**: Save partial results and continue next run
- **Error Recovery**: Retry failed stocks with exponential backoff

## 🔧 Implementation Details

### New Rate Limiter Class

```typescript
class TwelveDataRateLimiter {
  private callCount = 0;
  private windowStart = Date.now();
  private readonly maxCallsPerMinute = 55;
  private readonly windowMs = 60 * 1000; // 1 minute

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();

    // Reset counter if window expired
    if (now - this.windowStart >= this.windowMs) {
      this.callCount = 0;
      this.windowStart = now;
    }

    // If approaching limit, wait for window reset
    if (this.callCount >= this.maxCallsPerMinute - 5) {
      const waitTime = this.windowMs - (now - this.windowStart) + 1000;
      console.log(`⏳ Rate limit approaching, waiting ${waitTime}ms...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      this.callCount = 0;
      this.windowStart = Date.now();
    }
  }

  recordCall(): void {
    this.callCount++;
  }
}
```

### Batch Processing Logic

```typescript
const rateLimiter = new TwelveDataRateLimiter();
const BATCH_SIZE = 11; // 11 stocks × 5 calls = 55 calls (within limit)
const BATCH_DELAY = 65000; // 65 seconds between batches

for (let i = 0; i < stocksToProcess.length; i += BATCH_SIZE) {
  const batch = stocksToProcess.slice(i, i + BATCH_SIZE);

  // Process batch with rate limiting
  const batchResults = await Promise.all(
    batch.map(async (stock) => {
      await rateLimiter.waitIfNeeded();
      const result = await getStockDataWithRateLimit(stock.symbol, rateLimiter);
      return result;
    })
  );

  results.push(...batchResults);

  // Wait between batches (except for last batch)
  if (i + BATCH_SIZE < stocksToProcess.length) {
    console.log(
      `⏳ Batch completed, waiting ${BATCH_DELAY / 1000}s for next batch...`
    );
    await new Promise((resolve) => setTimeout(resolve, BATCH_DELAY));
  }
}
```

### Enhanced getStockData with Rate Limiting

```typescript
async function getStockDataWithRateLimit(
  symbol: string,
  rateLimiter: TwelveDataRateLimiter,
  retries = 3
): Promise<any> {
  try {
    // Pre-call rate limit check
    await rateLimiter.waitIfNeeded();

    // Main price data call
    rateLimiter.recordCall();
    const priceData = await fetchWithRetry(`/time_series?symbol=${symbol}...`);

    await new Promise((resolve) => setTimeout(resolve, 200)); // Small delay between calls

    // Indicator calls with rate limiting
    await rateLimiter.waitIfNeeded();
    rateLimiter.recordCall();
    const rsiData = await fetchWithRetry(`/rsi?symbol=${symbol}...`);

    await new Promise((resolve) => setTimeout(resolve, 200));

    await rateLimiter.waitIfNeeded();
    rateLimiter.recordCall();
    const macdData = await fetchWithRetry(`/macd?symbol=${symbol}...`);

    // ... continue for other indicators
  } catch (error) {
    if (retries > 0) {
      console.log(`⚠️ Retrying ${symbol}, attempts left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return getStockDataWithRateLimit(symbol, rateLimiter, retries - 1);
    }
    throw error;
  }
}
```

## 📊 Expected Results

### Before Fix:

- ❌ 125-150 API calls in rapid succession
- ❌ Rate limit exceeded, causing delays and timeouts
- ❌ GitHub Actions job fails after 3+ minutes
- ❌ No momentum screener results for users

### After Fix:

- ✅ Controlled batches of 55 calls per minute
- ✅ 65-second delays between batches for rate limit reset
- ✅ Total processing time: ~5-7 minutes (within GitHub Actions limits)
- ✅ Reliable daily momentum screener results
- ✅ Graceful error handling and partial results

## 🚀 Deployment Plan

1. **Update Route Handler**: Implement rate limiting in `/api/momentum-screener/refresh/route.ts`
2. **Enhance Cron Job**: Update GitHub Actions cron with longer timeout
3. **Add Monitoring**: Log batch progress and API usage
4. **Test Locally**: Verify rate limiting works with 30+ stocks
5. **Deploy & Monitor**: Watch first production run for success

## 📝 Success Metrics

- ✅ GitHub Actions cron job completes successfully
- ✅ Top 10-15 momentum stocks upserted to database daily
- ✅ API rate limits respected (≤55 calls/minute)
- ✅ Total processing time under 10 minutes
- ✅ Zero timeout failures in production

## ✅ IMPLEMENTATION STATUS - COMPLETED

### ✅ Phase 1: Rate Limiting - IMPLEMENTED

- **TwelveDataRateLimiter Class**: ✅ Fully implemented in `/api/momentum-screener/refresh/route.ts`
- **Conservative Limits**: ✅ 50 calls/minute (5 call buffer)
- **Intelligent Waiting**: ✅ Auto-waits when approaching limits
- **Call Tracking**: ✅ Logs API usage and windows

### ✅ Phase 2: Batch Processing - IMPLEMENTED

- **Batch Size**: ✅ 10 stocks per batch (50 API calls = within limit)
- **Batch Delays**: ✅ 65 seconds between batches
- **Progress Logging**: ✅ Detailed batch progress reports
- **Sequential Processing**: ✅ Stocks processed one-by-one with rate limiting

### ✅ Phase 3: Error Handling - IMPLEMENTED

- **Retry Logic**: ✅ 2 retries per stock with exponential backoff
- **Graceful Failures**: ✅ Failed stocks return error data instead of throwing
- **Partial Results**: ✅ Successful stocks still saved even if some fail
- **Comprehensive Logging**: ✅ Success/error counts and timing

### ✅ Phase 4: Cron Job Setup - IMPLEMENTED

- **GitHub Actions**: ✅ Two workflows running (direct API + script)
- **Dual Endpoints**: ✅ GET (universe) + POST (screener) with delays
- **Production Ready**: ✅ Currently running in production

## 🚨 CRITICAL UPDATE: FULL UNIVERSE PROCESSING

### ⚠️ Issue Discovered: Artificial Stock Limits

The initial implementation had artificial limits:

- `const MAX_STOCKS = 30` in POST method
- `stocks.slice(0, 25)` in old POST method

**Problem**: With 60+ stocks in the typical universe, we were only analyzing 25-30 stocks, potentially missing the actual best momentum stocks!

### ✅ Solution: Process ALL Stocks

**Updated Architecture for 60+ Stock Universe:**

```typescript
// OLD (Limited):
const stocksToProcess = stocks.slice(0, 30); // Only 30 stocks

// NEW (Full Universe):
const stocksToProcess = stocks; // ALL stocks in universe
```

### 📊 Updated Performance Calculations

**For Typical 60-Stock Universe:**

- **Total API Calls**: 60 stocks × 5 calls = 300 calls
- **Processing Time**: 60 ÷ 10 stocks per batch = 6 batches
- **Batch Duration**: 6 batches × 65 seconds = ~6.5 minutes
- **Function Timeout**: Extended to 10 minutes (600s) via vercel.json

### 🛡️ Timeout Protection Added

```typescript
const MAX_PROCESSING_TIME = 570000; // 9.5 minutes (30s buffer)

// Check before each batch:
if (elapsedTime + estimatedTimeForNextBatch > MAX_PROCESSING_TIME) {
  console.log(`⚠️ Approaching timeout. Processed X stocks so far.`);
  break; // Graceful exit with partial results
}
```

### 📈 Expected Results

**Scenario 1: Full Processing (Most Common)**

- ✅ All 60+ stocks analyzed
- ✅ True top 10-15 momentum stocks identified
- ✅ Processing time: 6-7 minutes

**Scenario 2: Partial Processing (Edge Case)**

- ✅ 40-50 stocks analyzed before timeout
- ✅ Best stocks from analyzed set saved
- ✅ Still better than artificial 30-stock limit
- ⚠️ Logged for monitoring

### 🎯 Benefits of Full Universe Processing

1. **True Top Stocks**: No longer missing potential winners
2. **Fair Analysis**: All momentum candidates evaluated equally
3. **Better Results**: Higher quality stock recommendations
4. **Scalable**: Handles universe growth automatically

## 🎯 CURRENT ARCHITECTURE

### API Call Pattern (Per Stock):

1. **Main Price Data** (1 call)
2. **RSI Indicator** (1 call)
3. **MACD Indicator** (1 call)
4. **Bollinger Bands** (1 call)
5. **Swing Low Data** (1 call)
   **Total: 5 calls per stock**

### Rate Limiting Strategy:

- **Batch Size**: 10 stocks = 50 API calls
- **Conservative Limit**: 50/55 calls per minute (5 call buffer)
- **Batch Delay**: 65 seconds (rate limit reset + 5s buffer)
- **Stock Delay**: 1 second between stocks in same batch

### Expected Performance:

- **30 stocks** = 3 batches
- **Batch 1**: 0-65s (10 stocks)
- **Batch 2**: 65-130s (10 stocks)
- **Batch 3**: 130-195s (10 stocks)
- **Total Time**: ~3.5 minutes (well within GitHub Actions limits)

## 🚀 PRODUCTION STATUS

The momentum screener timeout fix is **FULLY IMPLEMENTED** and ready for production:

✅ **Code Deployed**: Rate limiting and batch processing active  
✅ **Build Success**: No TypeScript errors or warnings  
✅ **Cron Jobs**: GitHub Actions workflows configured and running  
✅ **Error Handling**: Comprehensive retry and fallback logic  
✅ **Monitoring**: Detailed logging and progress tracking

The system should now reliably complete the momentum screener refresh within GitHub Actions timeout limits while respecting the Twelve Data API rate limits.
