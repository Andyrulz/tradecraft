# Cache Management System Documentation

## Overview

The TradeCraft Cache Management System provides comprehensive tools for monitoring, maintaining, and optimizing the trade plan cache that powers our SEO and performance optimization strategy.

## 🛠️ Cache Manager CLI Tool

### Available Commands

```bash
# Check cache status and statistics
npm run cache:status

# Refresh cache for a specific stock
npm run cache:refresh AAPL

# Refresh top N stocks (default: 10)
npm run cache:refresh-top 20

# Clean up expired cache entries
npm run cache:cleanup

# Analyze cache performance and recommendations
npm run cache:analyze

# Show help and command reference
npm run cache:help
```

### Command Details

#### `cache:status`

Displays comprehensive cache statistics including:

- Total cached stocks and coverage
- Top 100 stock coverage percentage
- Most popular stocks by request count
- Oldest cache entries
- Expired entries count
- Cache health overview

#### `cache:refresh <symbol>`

Refreshes the cache for a specific stock symbol:

- Generates fresh trade plan data
- Updates SEO content
- Resets cache expiration to 24 hours
- Updates analytics and popularity scores

Example:

```bash
npm run cache:refresh TSLA
```

#### `cache:refresh-top [N]`

Refreshes cache for the top N priority stocks:

- Processes stocks in priority order
- Rate-limited to ~55 API calls/minute
- Shows progress and success/error summary
- Default: refreshes top 10 stocks

Example:

```bash
npm run cache:refresh-top 25
```

#### `cache:cleanup`

Removes expired cache entries:

- Identifies cache entries past their expiration date
- Safely removes expired data
- Reports cleanup summary
- Helps maintain database performance

#### `cache:analyze`

Provides detailed performance analysis:

- Cache coverage analysis
- Health score calculation
- Missing top stock identification
- Optimization recommendations
- Performance bottleneck detection

## 📊 Cache System Architecture

### Database Tables

#### `cached_trade_plans`

Stores cached trade plan data with:

- `symbol` - Stock symbol (primary key)
- `company_name` - Company name for SEO
- `trade_plan` - Complete trade plan JSON data
- `seo_content` - Generated SEO content
- `cache_expires_at` - Expiration timestamp
- `priority` - Stock priority score
- `generation_count` - Number of times generated
- `source` - Cache source (manual, automated, user_generated)

#### `stock_analytics`

Tracks stock popularity and usage:

- `symbol` - Stock symbol (primary key)
- `view_count` - Total page views
- `popularity_score` - Calculated popularity
- `last_requested` - Last access timestamp
- `seo_priority` - SEO importance score

### Cache Eligibility Logic

1. **Top 100 Stocks**: Always eligible for caching
2. **User Demand**: Stocks become eligible after 2+ requests
3. **Priority Scoring**: Higher priority stocks get better cache management
4. **Expiration**: 24-hour cache expiration for freshness

## 🎯 Performance Optimization

### Rate Limiting

- API calls limited to ~55/minute (Twelve Data limit)
- Background caching doesn't block user experience
- Intelligent batching for bulk operations

### Cache Strategy

- **Proactive**: Top stocks pre-cached
- **Reactive**: Popular stocks cached on demand
- **Smart Expiration**: Fresh data within 24 hours
- **Fallback Logic**: Multiple data sources ensure reliability

### SEO Benefits

- Complete HTML content for Google indexing
- Rich meta descriptions with real trade data
- Structured data for enhanced search snippets
- Fast page loading with cached content

## 🚀 Usage Scenarios

### Daily Maintenance

```bash
# Check system health
npm run cache:status

# Clean up expired entries
npm run cache:cleanup

# Refresh top performing stocks
npm run cache:refresh-top 20
```

### Troubleshooting

```bash
# Analyze performance issues
npm run cache:analyze

# Refresh problematic stock
npm run cache:refresh PROBLEMATIC_SYMBOL

# Check overall system status
npm run cache:status
```

### Bulk Operations

```bash
# Refresh all top 50 stocks
npm run cache:refresh-top 50

# Full system analysis
npm run cache:analyze

# Complete maintenance cycle
npm run cache:cleanup && npm run cache:analyze
```

## 📈 Monitoring & Analytics

### Key Metrics

- **Cache Coverage**: Percentage of top stocks cached
- **Hit Rate**: Successful cache retrievals vs total requests
- **Freshness**: Average age of cached content
- **User Demand**: Organic cache growth from user requests

### Success Indicators

- ✅ Top 100 coverage > 80%
- ✅ Expired entries < 10%
- ✅ Average cache age < 12 hours
- ✅ Growing organic cache from user demand

### Warning Signs

- ⚠️ Many expired entries
- ⚠️ Low top stock coverage
- ⚠️ Old average cache age
- ⚠️ API rate limit violations

## 🔧 Configuration

### Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
TWELVE_DATA_API_KEY=your_api_key
```

### Cache Settings

- **Expiration**: 24 hours (configurable)
- **Batch Size**: 1 stock at a time (rate limiting)
- **Retry Logic**: 2 retries on failure
- **Priority Threshold**: Top 100 stocks + user demand

## 🚨 Troubleshooting

### Common Issues

#### "API Rate Limit Exceeded"

```bash
# Reduce batch size or increase delays
npm run cache:refresh-top 5  # Smaller batch
```

#### "Database Connection Error"

```bash
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY
```

#### "Cache Not Updating"

```bash
# Force refresh specific stock
npm run cache:refresh SYMBOL

# Check cache status
npm run cache:status
```

#### "Missing Top Stocks"

```bash
# Analyze gaps and recommendations
npm run cache:analyze

# Populate missing stocks
npm run cache:refresh-top 25
```

## 🎯 Best Practices

### Daily Operations

1. **Morning**: Check cache status
2. **Midday**: Refresh high-demand stocks
3. **Evening**: Clean up expired entries
4. **Weekly**: Full performance analysis

### Maintenance Schedule

- **Daily**: Status check and cleanup
- **Weekly**: Top stock refresh and analysis
- **Monthly**: Full system optimization review
- **Quarterly**: Performance metrics and strategy review

### Emergency Procedures

1. **System Down**: Check database connectivity
2. **Poor Performance**: Run analysis and refresh key stocks
3. **SEO Issues**: Verify cache content and refresh affected stocks
4. **API Limits**: Reduce refresh frequency and batch sizes

This cache management system ensures optimal performance, SEO benefits, and user experience while maintaining data freshness and system reliability.
