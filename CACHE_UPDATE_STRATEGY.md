# Cache Update Strategy Documentation

## 🔄 How Cache Updates Work

### **Always-Fresh Cache Strategy**

The cache now updates **automatically** with fresh data whenever a user generates a trade plan. Since we're already making expensive API calls to generate trade plans, we always cache the fresh results.

**Simple Rule: Always cache every user-generated trade plan**

---

## 📋 **Cache Update Flow**

### **When User Generates Trade Plan:**

```
User requests trade plan for AAPL
    ↓
Generate fresh trade plan via API
    ↓
Always cache this fresh data ✅
    ↓
Update analytics and popularity scores
    ↓
Return trade plan to user
```

### **Background Caching Process:**

1. **Fresh Data Caching**:

   ```typescript
   // Always cache the fresh trade plan we just generated
   await supabase
     .from("cached_trade_plans")
     .upsert({
       symbol: upperSymbol,
       trade_plan: tradePlan, // Fresh data
       seo_content: JSON.stringify(seoContent),
       cache_expires_at: cacheExpiresAt.toISOString(),
       generation_count: userDemandCount + 1,
       // ... other fields
     });
   - **No additional API costs**: We're already making the calls for users
   - **Always fresh SEO pages**: Cache contains the most recent market data
   - **Simplified logic**: No complex time-based checks needed
   - **Better user experience**: Next visitor gets fresher cached data
   - **Improved SEO rankings**: More current content for search engines

   ```

2. **Automatic Cache Updates**:

   ```typescript
   // Always cache fresh data from user requests
   const seoContent = generateTradePlanSEO(tradePlan);
   const cacheExpiresAt = new Date();
   cacheExpiresAt.setHours(cacheExpiresAt.getHours() + 24);

   await supabase.from("cached_trade_plans").upsert({
     symbol: upperSymbol,
     trade_plan: tradePlan, // Fresh data we just generated
     seo_content: seoContent,
     cache_expires_at: cacheExpiresAt,
     generation_count: userDemandCount + 1,
     last_accessed: now.toISOString(),
     updated_at: now.toISOString(),
   });
   ```

---

## 🎯 **Cache Behavior Examples**

### **Every Request Updates Cache**

```
User requests TSLA trade plan
    ↓
Generate fresh TSLA trade plan via API
    ↓
✅ Always cache this fresh data
    ↓
Update analytics (generation_count, popularity_score)
    ↓
Cache expires in 24 hours (reset)
```

### **Scenario 2: Fresh Cache (< 24 hours)**

```
User requests AAPL trade plan (cached 2 hours ago)
    ↓
Generate AAPL trade plan
    ↓
Cache check: Exists, expires in 22 hours
    ↓
❌ Don't cache (still fresh)
✅ Update analytics only
```

### **Result: Consistently Fresh Cache**

With the new always-cache approach, every user request keeps the cache fresh:

```
1st user requests MSFT → Cache gets fresh data
2nd user visits /trade-plan/MSFT → Gets fresh cached data
3rd user requests MSFT → Cache gets even fresher data
4th user visits SEO page → Gets the freshest cached data
```

This ensures SEO pages always have the most current market data available!

---

## 📊 **Cache Data Structure**

### **cached_trade_plans Table**

```sql
symbol              TEXT PRIMARY KEY    -- Stock symbol (AAPL, TSLA, etc.)
company_name        TEXT               -- Company name for SEO
trade_plan          JSONB              -- Complete trade plan data
seo_content         TEXT               -- Generated SEO content
priority            INTEGER            -- Stock priority score
is_active           BOOLEAN            -- Cache status
cache_expires_at    TIMESTAMP          -- When cache becomes stale
generation_count    INTEGER            -- How many times generated
last_accessed       TIMESTAMP          -- Last user access
source              TEXT               -- user_generated, bulk_population, etc.
created_at          TIMESTAMP          -- First cached
updated_at          TIMESTAMP          -- Last updated
```

### **stock_analytics Table**

```sql
symbol              TEXT PRIMARY KEY    -- Stock symbol
company_name        TEXT               -- Company name
seo_priority        INTEGER            -- SEO importance score
popularity_score    INTEGER            -- User demand score
view_count          INTEGER            -- Total views/generations
last_requested      TIMESTAMP          -- Last user request
created_at          TIMESTAMP          -- First analytics entry
updated_at          TIMESTAMP          -- Last updated
```

---

## 🚀 **Benefits of This Approach**

### **For SEO:**

- ✅ **Every stock** gets cached content for Google indexing
- ✅ **Fresh content** within 24 hours for better rankings
- ✅ **Organic growth** - cache expands with actual user demand
- ✅ **Rich content** generated for every trade plan

### **For Performance:**

- ✅ **Instant loading** for recently cached stocks
- ✅ **Background operation** doesn't slow down user response
- ✅ **Smart updates** - only refresh when needed
- ✅ **Analytics tracking** for usage patterns

### **For User Experience:**

- ✅ **Always fresh data** - never serve stale trade plans to users
- ✅ **Progressive enhancement** - pages work even if cache fails
- ✅ **Transparent operation** - users don't know/care about caching
- ✅ **Reliable fallbacks** - multiple data sources

---

## 🔧 **Cache Management**

## 🚀 **Benefits of Always-Fresh Caching**

### **Performance Benefits:**

- ✅ **Zero additional API costs** - Uses data already generated for users
- ✅ **Faster SEO page loads** - Pre-computed trade plans in database
- ✅ **Better user experience** - Consistent performance across pages

### **SEO Benefits:**

- ✅ **Always current content** - Search engines see fresh market data
- ✅ **Higher content quality** - No stale 24-hour-old data
- ✅ **Better rankings** - Google rewards fresh, relevant content

### **Technical Benefits:**

- ✅ **Simplified logic** - No complex time-based caching rules
- ✅ **Predictable behavior** - Every user request updates cache
- ✅ **Better analytics** - Accurate tracking of demand and popularity

---

## 🛠 **Manual Cache Operations**

### **Cache Management Commands:**

```bash
# Check cache status
npm run cache:status

# Refresh specific stock (force update)
npm run cache:refresh AAPL

# Refresh top stocks
npm run cache:refresh-top 20

# Clean up expired entries
npm run cache:cleanup

# Analyze performance
npm run cache:analyze
```

### **Automatic Operations:**

- ✅ **User-triggered caching** - Always caches fresh data on every trade plan generation
- ✅ **Analytics tracking** - Automatically tracks popularity and usage patterns
- ✅ **SEO content generation** - Automatically creates optimized content for search engines

---

## 📈 **Monitoring Cache Health**

### **Key Metrics:**

- **Cache Hit Rate**: How often cached data is used vs generated fresh
- **Freshness Score**: Percentage of cache entries under 24 hours old
- **Coverage**: Number of unique stocks in cache
- **User Demand**: Most frequently requested stocks

### **Health Indicators:**

- ✅ **Healthy**: Most cache < 12 hours old, high hit rate
- ⚠️ **Warning**: Many entries > 20 hours old, low hit rate
- ❌ **Unhealthy**: Most cache expired, frequent cache misses

### **Optimization Opportunities:**

- **Popular stocks** should be pre-cached more frequently
- **Trending stocks** may need shorter cache expiration
- **Low-demand stocks** can have longer cache periods

This cache strategy ensures every user-generated trade plan contributes to your SEO content while maintaining optimal performance and data freshness! 🎉
