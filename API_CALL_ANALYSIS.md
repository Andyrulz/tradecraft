# API Call Duplication Analysis

## Current Trade Plan Generation Flow

When a user generates a trade plan, the following API calls are made:

### 1. Main `getStockData()` function (lib/api.ts):

1. **Time Series Data**: `https://api.twelvedata.com/time_series` (1 call)
2. **RSI Indicator**: `https://api.twelvedata.com/rsi` (1 call)
3. **MACD Indicator**: `https://api.twelvedata.com/macd` (1 call)
4. **Bollinger Bands**: `https://api.twelvedata.com/bbands` (1 call)

### 2. Enhanced Stop Loss Calculation:

5. **Additional Time Series Data**: `fetchTimeframeData()` calls the same endpoint again (1 call)

### 3. Potential Additional Calls:

- Background caching operations
- Session validation calls
- Usage tracking calls

## Issues Identified

### 🔴 **Primary Issue: Duplicate Time Series Calls**

The main problem is in the **Enhanced Stop Loss Calculation**:

```typescript
// In getStockData() - FIRST CALL
const tdRes = await fetch(
  `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${twelveDataApiKey}`
);

// Later in calculateEnhancedStopLoss() -> fetchTimeframeData() - SECOND CALL
const response = await fetch(
  `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=${outputsize}&apikey=${apiKey}`
);
```

**This is fetching the same daily data twice!**

## API Call Count

**Current**: ~10 calls per trade plan

- 1 Time series (main)
- 1 RSI
- 1 MACD
- 1 Bollinger Bands
- 1 Time series (duplicate for swing low) ← **UNNECESSARY**
- Plus session/auth/caching calls

**Target**: ~5-6 calls per trade plan

- 1 Time series (shared)
- 1 RSI
- 1 MACD
- 1 Bollinger Bands
- Session/auth calls (unavoidable)

## Solution

Pass the already-fetched price history from the main `getStockData()` function to the stop loss calculation instead of making a second API call.
