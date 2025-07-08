# Scalable Trade Plan SEO Architecture

## Overview: Hybrid Cached + Real-time System

### **Storage Strategy:**

- ✅ **Top 100 stocks**: Pre-generated, cached, SEO-optimized
- ✅ **User-generated stocks**: Auto-cached when users create trade plans
- ✅ **Other stocks**: Real-time generation (current system)
- ✅ **Organic scaling**: Cache grows based on actual user demand

### **Database Schema:**

```sql
-- Cached trade plans for SEO optimization
CREATE TABLE cached_trade_plans (
  id SERIAL PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  -- Core trade plan data
  trade_plan JSONB NOT NULL,
  -- SEO-optimized content
  seo_content TEXT NOT NULL,
  meta_description TEXT,
  -- Pricing data (for live updates)
  base_price DECIMAL(10,2),
  last_price_update TIMESTAMP,
  -- Management
  priority INTEGER DEFAULT 0, -- Higher = more important for SEO
  is_active BOOLEAN DEFAULT true,
  cache_expires_at TIMESTAMP,
  -- User interaction tracking
  generation_count INTEGER DEFAULT 1, -- How many times generated
  last_accessed TIMESTAMP DEFAULT NOW(),
  source TEXT DEFAULT 'user', -- 'top100', 'user', 'manual'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_cached_trade_plans_symbol ON cached_trade_plans(symbol);
CREATE INDEX idx_cached_trade_plans_priority ON cached_trade_plans(priority DESC);
CREATE INDEX idx_cached_trade_plans_active ON cached_trade_plans(is_active);

-- Stock priority management
CREATE TABLE stock_priorities (
  symbol TEXT PRIMARY KEY,
  priority INTEGER NOT NULL,
  market_cap BIGINT,
  avg_volume BIGINT,
  sector TEXT,
  is_etf BOOLEAN DEFAULT false,
  added_to_cache DATE,
  notes TEXT
);
```

### **Page Architecture:**

```tsx
// app/trade-plan/[symbol]/page.tsx
import { getCachedTradePlan } from "@/lib/cache";
import { TradePlanContent } from "@/components/trade-plan-seo/TradePlanContent";

export async function generateStaticParams() {
  // Only generate static pages for cached stocks
  const cachedStocks = await getCachedStockSymbols();
  return cachedStocks.map((symbol) => ({ symbol }));
}

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}) {
  const { symbol } = params;
  const upperSymbol = symbol.toUpperCase();

  // Try to get cached metadata first
  const cached = await getCachedTradePlan(upperSymbol);

  if (cached) {
    return {
      title: `${upperSymbol} Trade Plan - AI Trading Strategy | TradeCraft`,
      description:
        cached.meta_description ||
        `Professional trade plan for ${upperSymbol} with entry, targets, and risk management.`,
      // ... enhanced SEO metadata
    };
  }

  // Fallback metadata for non-cached stocks
  return {
    title: `${upperSymbol} Trade Plan - Live Analysis | TradeCraft`,
    description: `Generate a live trade plan for ${upperSymbol} with real-time analysis and risk management.`,
  };
}

export default async function TradePlanPage({
  params,
}: {
  params: { symbol: string };
}) {
  const { symbol } = params;
  const upperSymbol = symbol.toUpperCase();

  // Check if we have cached data
  const cachedPlan = await getCachedTradePlan(upperSymbol);

  return (
    <main className="flex-1 pt-[68px] pb-12">
      <div className="container mx-auto px-3 sm:px-4">
        <TradePlanContent
          symbol={upperSymbol}
          cachedPlan={cachedPlan}
          isRealTime={!cachedPlan}
        />
      </div>
    </main>
  );
}
```

### **Smart Component Logic:**

```tsx
// components/trade-plan-seo/TradePlanContent.tsx
interface TradePlanContentProps {
  symbol: string;
  cachedPlan?: CachedTradePlan | null;
  isRealTime?: boolean;
}

export function TradePlanContent({
  symbol,
  cachedPlan,
  isRealTime = false,
}: TradePlanContentProps) {
  // State for live updates
  const [liveData, setLiveData] = useState(null);
  const [loading, setLoading] = useState(isRealTime);

  useEffect(() => {
    if (isRealTime) {
      // Real-time generation for non-cached stocks
      generateRealTimeTradePlan(symbol);
    } else if (cachedPlan) {
      // Live price updates for cached stocks
      updateLivePricing(symbol, cachedPlan);
    }
  }, [symbol, cachedPlan, isRealTime]);

  if (isRealTime && loading) {
    return <TradePlanLoadingState symbol={symbol} />;
  }

  if (cachedPlan) {
    return (
      <>
        {/* SEO-optimized cached content */}
        <CachedTradePlanView cachedPlan={cachedPlan} liveUpdates={liveData} />
        {/* Live price overlay */}
        <LivePriceUpdater symbol={symbol} />
      </>
    );
  }

  // Real-time generated trade plan
  return <RealTimeTradePlanView tradePlan={liveData} />;
}
```

### **Cache Management System:**

```typescript
// lib/cache.ts
export async function getCachedTradePlan(
  symbol: string
): Promise<CachedTradePlan | null> {
  const { data } = await supabase
    .from("cached_trade_plans")
    .select("*")
    .eq("symbol", symbol)
    .eq("is_active", true)
    .gte("cache_expires_at", new Date().toISOString())
    .single();

  return data;
}

export async function getCachedStockSymbols(): Promise<string[]> {
  const { data } = await supabase
    .from("cached_trade_plans")
    .select("symbol")
    .eq("is_active", true)
    .order("priority", { ascending: false });

  return data?.map((row) => row.symbol) || [];
}

export async function updateCachedTradePlan(symbol: string, tradePlan: any) {
  const seoContent = generateSEOContent(tradePlan);
  const metaDescription = generateMetaDescription(symbol, tradePlan);

  await supabase.from("cached_trade_plans").upsert({
    symbol,
    trade_plan: tradePlan,
    seo_content: seoContent,
    meta_description: metaDescription,
    base_price: tradePlan.currentPrice,
    last_price_update: new Date().toISOString(),
    cache_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
    updated_at: new Date().toISOString(),
  });
}
```

### **Top 100 Stock List:**

```typescript
// lib/top-stocks.ts
export const TOP_100_STOCKS = [
  // Large Cap Tech
  "AAPL",
  "MSFT",
  "NVDA",
  "GOOGL",
  "GOOG",
  "AMZN",
  "TSLA",
  "META",
  "AVGO",
  "ORCL",
  "CRM",
  "ADBE",
  "NFLX",
  "AMD",
  "INTC",
  "CSCO",

  // Large Cap Non-Tech
  "BRK.B",
  "JPM",
  "V",
  "UNH",
  "MA",
  "PG",
  "JNJ",
  "HD",
  "CVX",
  "PFE",
  "ABBV",
  "KO",
  "PEP",
  "TMO",
  "COST",
  "WMT",
  "BAC",
  "DIS",
  "ABT",
  "MRK",

  // Growth & Momentum
  "SHOP",
  "SQ",
  "ROKU",
  "ZOOM",
  "PTON",
  "SNOW",
  "PLTR",
  "RBLX",
  "U",
  "DKNG",

  // Popular ETFs
  "SPY",
  "QQQ",
  "IWM",
  "VTI",
  "VEA",
  "VWO",
  "GLD",
  "SLV",
  "TLT",
  "HYG",
  "ARKK",
  "ARKQ",
  "ARKW",
  "SQQQ",
  "TQQQ",
  "SPXL",
  "UPRO",
  "TMF",
  "UVXY",
  "VIX",

  // Add more based on volume, market cap, trading activity
];

export function getStockPriority(symbol: string): number {
  const index = TOP_100_STOCKS.indexOf(symbol);
  if (index === -1) return 0; // Not in top 100
  return 100 - index; // Higher number = higher priority
}
```

### **Background Cache Update Job:**

```typescript
// scripts/update-trade-plan-cache.ts
async function updateTradePlanCache() {
  console.log("🔄 Starting trade plan cache update...");

  // Get top stocks to cache
  const stocksToUpdate = TOP_100_STOCKS.slice(0, 100);

  for (const symbol of stocksToUpdate) {
    try {
      console.log(`📊 Updating ${symbol}...`);

      // Generate fresh trade plan
      const tradePlan = await generateTradePlan(symbol, "swing");

      // Cache it
      await updateCachedTradePlan(symbol, tradePlan);

      console.log(`✅ ${symbol} updated successfully`);

      // Rate limiting
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`❌ Failed to update ${symbol}:`, error);
    }
  }

  console.log("✅ Trade plan cache update complete!");
}

// Run daily
updateTradePlanCache();
```

### **GitHub Actions Workflow:**

```yaml
# .github/workflows/update-trade-plan-cache.yml
name: Update Trade Plan Cache

on:
  schedule:
    # Run at 6 AM EST daily (after market close)
    - cron: "0 11 * * *"
  workflow_dispatch: # Manual trigger

jobs:
  update-cache:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install
      - run: npm run update-trade-plan-cache
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
          TWELVE_DATA_API_KEY: ${{ secrets.TWELVE_DATA_API_KEY }}
```

### **Scaling Strategy:**

```typescript
// As SEO improves, add more stocks:

// Phase 1: Top 100 stocks (launch)
// Phase 2: Top 200 stocks (after 3 months)
// Phase 3: Top 500 stocks (after 6 months)
// Phase 4: All major stocks (after 12 months)

export async function expandCacheBasedOnPerformance() {
  const performanceMetrics = await getTradePageAnalytics();

  if (performanceMetrics.organicTraffic > 10000) {
    // Add next 100 stocks
    await addStocksToCache(NEXT_100_STOCKS);
  }
}
```

### **User-Driven Cache Expansion:**

```typescript
// Enhanced trade plan API with automatic caching
// app/api/trade-plan/route.ts

export async function POST(request: Request) {
  // ...existing auth and validation...

  const { symbol, horizon } = await request.json();

  // Check if we have cached data
  let cachedPlan = await getCachedTradePlan(symbol);

  if (cachedPlan && !isCacheExpired(cachedPlan)) {
    // Update access tracking
    await updateCacheAccess(symbol);

    // Return cached data with live price updates
    const livePrice = await getCurrentPrice(symbol);
    const updatedPlan = await updatePlanWithLivePrice(
      cachedPlan.trade_plan,
      livePrice
    );

    return NextResponse.json(updatedPlan);
  }

  // Generate fresh trade plan
  const tradePlan = await getStockData(symbol, 3, horizon);

  // AUTOMATIC CACHING: Store every generated trade plan
  await cacheUserGeneratedTradePlan(symbol, tradePlan, {
    generationType: "user_request",
    horizon: horizon,
    userId: userId,
  });

  // Increment usage and return
  await updateUserUsage(userId);
  return NextResponse.json(tradePlan);
}

async function cacheUserGeneratedTradePlan(
  symbol: string,
  tradePlan: any,
  metadata: any
) {
  try {
    const seoContent = generateSEOContent(tradePlan);
    const metaDescription = generateMetaDescription(symbol, tradePlan);

    // Check if already exists
    const existing = await supabase
      .from("cached_trade_plans")
      .select("id, generation_count")
      .eq("symbol", symbol)
      .single();

    if (existing.data) {
      // Update existing cache
      await supabase
        .from("cached_trade_plans")
        .update({
          trade_plan: tradePlan,
          seo_content: seoContent,
          meta_description: metaDescription,
          base_price: tradePlan.currentPrice,
          last_price_update: new Date().toISOString(),
          last_accessed: new Date().toISOString(),
          generation_count: existing.data.generation_count + 1,
          cache_expires_at: new Date(
            Date.now() + 24 * 60 * 60 * 1000
          ).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("symbol", symbol);

      console.log(
        `📈 Updated cached trade plan for ${symbol} (${
          existing.data.generation_count + 1
        } generations)`
      );
    } else {
      // Create new cache entry
      await supabase.from("cached_trade_plans").insert({
        symbol,
        trade_plan: tradePlan,
        seo_content: seoContent,
        meta_description: metaDescription,
        base_price: tradePlan.currentPrice,
        last_price_update: new Date().toISOString(),
        last_accessed: new Date().toISOString(),
        generation_count: 1,
        source: "user",
        priority: calculateUserDemandPriority(symbol),
        cache_expires_at: new Date(
          Date.now() + 24 * 60 * 60 * 1000
        ).toISOString(),
      });

      console.log(`🆕 Cached new trade plan for ${symbol} (user-generated)`);
    }
  } catch (error) {
    console.error(`❌ Failed to cache trade plan for ${symbol}:`, error);
    // Don't fail the main request if caching fails
  }
}

function calculateUserDemandPriority(symbol: string): number {
  // Higher priority for stocks with more user demand
  const baseScore = TOP_100_STOCKS.includes(symbol) ? 100 : 50;
  // Add points based on user activity, market cap, etc.
  return baseScore;
}
```

### **Organic Scaling Benefits:**

#### **Immediate Wins:**

- ✅ **User demand drives SEO**: Popular stocks automatically get cached
- ✅ **No waste**: Only cache stocks people actually want
- ✅ **Performance**: Second-time visitors get instant loading
- ✅ **SEO growth**: More cached pages = more Google indexing

#### **Growth Timeline:**

```
Week 1: Start with Top 100 stocks
Week 2: Users generate 20 new stocks → Now have 120 cached
Month 1: Users generate 100 more → Now have 200 cached
Month 3: Users generate 300 more → Now have 500 cached
Year 1: Organic expansion to 1000+ stocks based on real demand
```

#### **Smart Prioritization:**

```typescript
// Automatic priority calculation based on user demand
function calculateStockPriority(symbol: string, metadata: any): number {
  let priority = 0;

  // Base scores
  if (TOP_100_STOCKS.includes(symbol)) priority += 100;

  // User demand indicators
  priority += Math.min(metadata.generation_count * 5, 50); // Max 50 points
  priority += metadata.recent_access_count * 2;

  // Market factors
  if (metadata.market_cap > 100_000_000_000) priority += 20; // Large cap
  if (metadata.avg_volume > 10_000_000) priority += 15; // High volume

  return priority;
}
```

#### **Cache Management Dashboard:**

```sql
-- Analytics queries for monitoring cache growth
SELECT
  COUNT(*) as total_cached,
  COUNT(CASE WHEN source = 'top100' THEN 1 END) as top100_stocks,
  COUNT(CASE WHEN source = 'user' THEN 1 END) as user_generated,
  AVG(generation_count) as avg_generations,
  MAX(generation_count) as most_popular
FROM cached_trade_plans;

-- Most popular user-generated stocks
SELECT symbol, generation_count, last_accessed, source
FROM cached_trade_plans
WHERE source = 'user'
ORDER BY generation_count DESC, last_accessed DESC
LIMIT 20;
```

## Benefits of This Architecture:

### **Immediate (Top 100 Cached):**

- ✅ **Fast SEO**: Google can index complete content
- ✅ **Great UX**: Instant loading for popular stocks
- ✅ **Live Data**: Real-time price updates
- ✅ **Fallback**: All other stocks work real-time

### **Scalable:**

- ✅ **Easy expansion**: Add more stocks as you grow
- ✅ **Performance**: Only cache what matters for SEO
- ✅ **Cost effective**: Controlled API usage
- ✅ **Flexible**: Mix of cached + real-time based on priority

### **SEO Optimized:**

- ✅ **Server-side rendering**: Full content for crawlers
- ✅ **Fresh content**: Daily cache updates
- ✅ **Consistent URLs**: Stable content for ranking
- ✅ **Fast loading**: Cached content loads instantly

This gives you the perfect balance: **enterprise-grade SEO** for your top stocks while maintaining **real-time flexibility** for the long tail. As your organic traffic grows, you can easily expand the cache to cover more stocks!

Should I start implementing this architecture?
