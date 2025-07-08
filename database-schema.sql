-- Trade Plan Cache Database Schema
-- Execute this in your Supabase SQL Editor

-- Main table for cached trade plans
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
  
  -- Cache management
  priority INTEGER DEFAULT 0, -- Higher = more important for SEO
  is_active BOOLEAN DEFAULT true,
  cache_expires_at TIMESTAMP,
  
  -- User interaction tracking
  generation_count INTEGER DEFAULT 1, -- How many times generated
  last_accessed TIMESTAMP DEFAULT NOW(),
  source TEXT DEFAULT 'user', -- 'top100', 'user', 'manual'
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_cached_trade_plans_symbol ON cached_trade_plans(symbol);
CREATE INDEX idx_cached_trade_plans_priority ON cached_trade_plans(priority DESC);
CREATE INDEX idx_cached_trade_plans_active ON cached_trade_plans(is_active);
CREATE INDEX idx_cached_trade_plans_source ON cached_trade_plans(source);
CREATE INDEX idx_cached_trade_plans_expires ON cached_trade_plans(cache_expires_at);

-- Optional: Stock analytics table (for future use)
CREATE TABLE stock_analytics (
  symbol TEXT PRIMARY KEY,
  market_cap BIGINT,
  avg_volume BIGINT,
  sector TEXT,
  is_etf BOOLEAN DEFAULT false,
  popularity_score INTEGER DEFAULT 0,
  seo_priority INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_stock_analytics_priority ON stock_analytics(seo_priority DESC);
CREATE INDEX idx_stock_analytics_popularity ON stock_analytics(popularity_score DESC);

-- Add RLS (Row Level Security) policies if needed
-- ALTER TABLE cached_trade_plans ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE stock_analytics ENABLE ROW LEVEL SECURITY;

-- Create a simple policy that allows all operations for now
-- (you can restrict this later based on your auth needs)
-- CREATE POLICY "Allow all operations on cached_trade_plans" ON cached_trade_plans FOR ALL USING (true);
-- CREATE POLICY "Allow all operations on stock_analytics" ON stock_analytics FOR ALL USING (true);
