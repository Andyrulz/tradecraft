# Auto-Refresh Cache System Documentation

## Overview

The auto-refresh cache system ensures that stock data in the cache is automatically updated whenever customers query for data, reducing manual refresh requirements and keeping information up-to-date for SEO purposes.

## How It Works

### 1. **Automatic Triggers**

The cache refresh is triggered in multiple scenarios:

- **SEO Page Visits**: When users visit `/trade-plan/[symbol]` pages
- **Client Interactions**: When users interact with trade plan components
- **API Requests**: When users generate new trade plans
- **Manual Commands**: Via command-line scripts

### 2. **Smart Refresh Logic**

The system includes intelligent refresh logic:

- **Staleness Detection**: Only refreshes if cache is older than threshold (default: 8-12 hours)
- **Background Operations**: All refreshes happen in the background, non-blocking
- **Rate Limiting**: 3-second delays between refreshes to respect API limits
- **Error Handling**: Graceful failure without affecting user experience

### 3. **Multiple Refresh Strategies**

#### **On-Demand Refresh (SEO Pages)**

```typescript
// Triggered when users visit trade plan pages
onStockPageAccess(symbol); // Refreshes if cache > 8 hours old
```

#### **User-Generated Refresh (API)**

```typescript
// Triggered when users generate trade plans
cacheTradePlanInBackground(symbol, tradePlan); // Always caches fresh data
```

#### **Client-Side Refresh (Interactive)**

```typescript
// Triggered by component interactions
fetch("/api/cache/auto-refresh", {
  method: "POST",
  body: JSON.stringify({ symbol, source: "client_interaction" }),
});
```

## Implementation Details

### **Core Auto-Refresh Module**

Location: `lib/cache/auto-refresh.ts`

Key functions:

- `shouldRefreshCache()` - Determines if refresh is needed
- `refreshCacheInBackground()` - Performs the actual refresh
- `onStockPageAccess()` - Triggers refresh on page visits
- `getCacheStatus()` - Returns cache status information

### **API Endpoint**

Location: `app/api/cache/auto-refresh/route.ts`

- **POST**: Triggers background refresh for a symbol
- **GET**: Returns cache status for a symbol

### **Page Integration**

Location: `app/trade-plan/[symbol]/page.tsx`

Automatically triggers background refresh when users visit SEO pages:

```typescript
onStockPageAccess(upperSymbol); // Non-blocking background refresh
```

### **Component Integration**

Location: `components/trade-plan-seo/TradePlanContent.tsx`

Triggers refresh when users interact with trade plan components.

## Command Line Tools

### **Auto-Refresh Script**

```bash
# Refresh 20 most popular stocks
npm run auto-refresh

# Refresh top 30 priority stocks
npm run auto-refresh top 30

# Refresh stocks older than 6 hours
npm run auto-refresh stale 6

# Show cache status for top 25 stocks
npm run auto-refresh status 25

# Refresh a specific stock
npm run auto-refresh single AAPL
```

### **Existing Cache Commands**

```bash
# Check overall cache status
npm run cache:status

# Manual refresh of specific stock
npm run cache:refresh AAPL

# Refresh top stocks manually
npm run cache:refresh-top 20
```

## Configuration

### **Refresh Thresholds**

- **SEO Page Visits**: 8 hours (stocks accessed via public pages)
- **Client Interactions**: 8 hours (user component interactions)
- **Stale Detection**: 12 hours (general staleness threshold)
- **API Generation**: Always (user-generated trade plans are always cached)

### **Rate Limiting**

- **3 seconds** between individual stock refreshes
- **5 API calls** per stock (within TwelveData 55/minute limit)
- **Background processing** to avoid blocking user responses

## Benefits

### **For SEO**

- ✅ **Always Fresh Content**: Search engines see current market data
- ✅ **Automatic Updates**: No manual intervention required
- ✅ **Popular Stock Focus**: Most-visited stocks get priority
- ✅ **Better Rankings**: Fresh content improves search rankings

### **For Users**

- ✅ **Current Data**: Users always see recent market information
- ✅ **Fast Loading**: Cached content loads instantly
- ✅ **Seamless Experience**: Background updates don't interrupt usage
- ✅ **Popular Stocks**: Most-requested stocks stay fresh

### **For Operations**

- ✅ **Reduced Manual Work**: Automatic refresh reduces maintenance
- ✅ **Smart Updates**: Only refreshes when actually needed
- ✅ **Usage Analytics**: Tracks which stocks are most popular
- ✅ **Performance Monitoring**: Cache status and health tracking

## Monitoring

### **Cache Health Indicators**

```bash
# Check cache status
npm run auto-refresh status 50

# Sample output:
Symbol    | Age (hrs) | Status    | Last Updated
----------|-----------|-----------|------------------
AAPL      |      2.3  | Fresh     | 2025-07-18 10:30:15
MSFT      |      8.7  | Stale     | 2025-07-18 01:45:22
GOOGL     |     24.1  | Expired   | 2025-07-17 10:15:33
```

### **Key Metrics**

- **Fresh**: Cache age < 8 hours
- **Stale**: Cache age 8-24 hours
- **Expired**: Cache age > 24 hours
- **Missing**: No cache entry exists

### **Automatic Maintenance**

The system includes automatic maintenance:

- **Background refresh** on every user interaction
- **Popular stock prioritization** based on user demand
- **Stale detection** and automatic updates
- **Analytics tracking** for optimization

## Best Practices

### **For High-Traffic Stocks**

- Auto-refresh triggers more frequently due to higher access
- Cache stays fresher automatically
- SEO content is always current

### **For Low-Traffic Stocks**

- Refreshes only when actually accessed
- Reduces unnecessary API calls
- Still ensures fresh content when needed

### **For Operations**

- Monitor cache status regularly: `npm run auto-refresh status`
- Use stale refresh for maintenance: `npm run auto-refresh stale 12`
- Track popular stocks: `npm run cache:analyze`

## Troubleshooting

### **If Cache Isn't Updating**

1. Check API limits: Ensure TwelveData quota isn't exceeded
2. Verify logs: Look for error messages in console
3. Test single stock: `npm run auto-refresh single AAPL`
4. Check status: `npm run auto-refresh status 10`

### **If Performance Is Slow**

1. Reduce refresh frequency in code (increase maxAgeHours)
2. Limit batch sizes: Use smaller counts in commands
3. Check rate limiting: Ensure 3-second delays are sufficient

### **If SEO Content Is Stale**

1. Force refresh popular stocks: `npm run auto-refresh popular 50`
2. Check staleness: `npm run auto-refresh stale 6`
3. Verify page triggers: Ensure `onStockPageAccess()` is called

## Future Enhancements

### **Planned Improvements**

- **Predictive Refresh**: Refresh popular stocks proactively
- **Market Hours Awareness**: More frequent updates during trading hours
- **User Behavior Analytics**: Refresh based on user access patterns
- **A/B Testing**: Compare different refresh strategies

This auto-refresh system ensures your cache stays current with minimal manual intervention while optimizing for both SEO performance and user experience! 🚀
