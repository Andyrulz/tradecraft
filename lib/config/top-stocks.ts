/**
 * Top 100 Stocks Configuration and Priority Management
 * 
 * Phase 2: Stock Priority System
 * - Define the top 100 stocks for initial cache population
 * - Implement priority scoring and cache eligibility logic
 * - Support organic cache expansion based on user demand
 */

export interface StockPriority {
  symbol: string;
  priority: number;
  marketCap?: number;
  avgVolume?: number;
  sector?: string;
  reason: string;
}

/**
 * Top 100 stocks for initial cache population
 * Prioritized by market cap, trading volume, and popularity
 */
export const TOP_100_STOCKS: StockPriority[] = [
  // Top 20 - Mega Cap Tech & Popular Stocks
  { symbol: 'AAPL', priority: 100, reason: 'Largest market cap, highest demand' },
  { symbol: 'MSFT', priority: 99, reason: 'Second largest market cap, stable growth' },
  { symbol: 'NVDA', priority: 98, reason: 'AI leader, high volatility trading' },
  { symbol: 'GOOGL', priority: 97, reason: 'Search giant, consistent performer' },
  { symbol: 'AMZN', priority: 96, reason: 'E-commerce leader, high volume' },
  { symbol: 'TSLA', priority: 95, reason: 'EV leader, very high volatility' },
  { symbol: 'META', priority: 94, reason: 'Social media giant, comeback story' },
  { symbol: 'NFLX', priority: 93, reason: 'Streaming leader, earnings mover' },
  { symbol: 'AMD', priority: 92, reason: 'Semiconductor leader, NVDA alternative' },
  { symbol: 'CRM', priority: 91, reason: 'SaaS leader, enterprise focus' },
  { symbol: 'ORCL', priority: 90, reason: 'Database giant, cloud transition' },
  { symbol: 'ADBE', priority: 89, reason: 'Creative software monopoly' },
  { symbol: 'PYPL', priority: 88, reason: 'Fintech leader, payment processor' },
  { symbol: 'INTC', priority: 87, reason: 'Chip giant, turnaround story' },
  { symbol: 'CSCO', priority: 86, reason: 'Networking leader, dividend play' },
  { symbol: 'PEP', priority: 85, reason: 'Consumer staple, defensive play' },
  { symbol: 'AVGO', priority: 84, reason: 'Broadcom, chip infrastructure' },
  { symbol: 'TXN', priority: 83, reason: 'Analog chips, consistent performer' },
  { symbol: 'QCOM', priority: 82, reason: '5G leader, mobile chips' },
  { symbol: 'COST', priority: 81, reason: 'Retail giant, membership model' },

  // ETFs and Index Funds (High Priority for Retail Traders)
  { symbol: 'SPY', priority: 95, reason: 'S&P 500 ETF, most liquid' },
  { symbol: 'QQQ', priority: 94, reason: 'NASDAQ ETF, tech exposure' },
  { symbol: 'IWM', priority: 85, reason: 'Small cap ETF, risk indicator' },
  { symbol: 'VTI', priority: 80, reason: 'Total market ETF, long-term' },
  { symbol: 'VEA', priority: 75, reason: 'International developed markets' },
  { symbol: 'VWO', priority: 75, reason: 'Emerging markets ETF' },
  { symbol: 'GLD', priority: 85, reason: 'Gold ETF, inflation hedge' },
  { symbol: 'SLV', priority: 80, reason: 'Silver ETF, precious metals' },
  { symbol: 'TLT', priority: 80, reason: 'Long-term Treasury ETF' },
  { symbol: 'HYG', priority: 75, reason: 'High yield bond ETF' },

  // Large Cap Growth Stocks
  { symbol: 'TMUS', priority: 80, reason: 'Telecom leader, 5G play' },
  { symbol: 'UNH', priority: 79, reason: 'Healthcare giant, defensive' },
  { symbol: 'HD', priority: 78, reason: 'Home improvement, economic indicator' },
  { symbol: 'MA', priority: 77, reason: 'Payment processor, growth' },
  { symbol: 'V', priority: 76, reason: 'Visa, payment monopoly' },
  { symbol: 'JPM', priority: 75, reason: 'Banking leader, interest rates' },
  { symbol: 'JNJ', priority: 74, reason: 'Healthcare conglomerate, dividend' },
  { symbol: 'WMT', priority: 73, reason: 'Retail giant, recession-proof' },
  { symbol: 'PG', priority: 72, reason: 'Consumer goods, steady growth' },
  { symbol: 'DIS', priority: 71, reason: 'Entertainment giant, streaming wars' },

  // High Volatility / Momentum Stocks
  { symbol: 'BABA', priority: 80, reason: 'Chinese e-commerce, geopolitical risk' },
  { symbol: 'NIO', priority: 75, reason: 'Chinese EV, high volatility' },
  { symbol: 'PLTR', priority: 75, reason: 'Data analytics, meme stock potential' },
  { symbol: 'RBLX', priority: 70, reason: 'Gaming platform, metaverse play' },
  { symbol: 'ROKU', priority: 70, reason: 'Streaming platform, cord-cutting' },
  { symbol: 'SQ', priority: 70, reason: 'Square, fintech innovation' },
  { symbol: 'SHOP', priority: 70, reason: 'E-commerce platform, SMB focus' },
  { symbol: 'ZOOM', priority: 68, reason: 'Video conferencing, hybrid work' },
  { symbol: 'DOCU', priority: 67, reason: 'Digital signatures, digital transformation' },
  { symbol: 'SNOW', priority: 66, reason: 'Cloud data, enterprise growth' },

  // Financial Sector
  { symbol: 'BAC', priority: 70, reason: 'Bank of America, rate sensitivity' },
  { symbol: 'WFC', priority: 69, reason: 'Wells Fargo, turnaround story' },
  { symbol: 'GS', priority: 68, reason: 'Goldman Sachs, investment banking' },
  { symbol: 'MS', priority: 67, reason: 'Morgan Stanley, wealth management' },
  { symbol: 'C', priority: 66, reason: 'Citigroup, international exposure' },
  { symbol: 'AXP', priority: 65, reason: 'American Express, premium card' },
  { symbol: 'BRK.B', priority: 75, reason: 'Berkshire Hathaway, Buffett factor' },

  // Healthcare & Biotech
  { symbol: 'PFE', priority: 70, reason: 'Pfizer, pharmaceutical giant' },
  { symbol: 'MRNA', priority: 68, reason: 'Moderna, mRNA technology' },
  { symbol: 'ABBV', priority: 67, reason: 'AbbVie, biotech leader' },
  { symbol: 'TMO', priority: 66, reason: 'Thermo Fisher, life sciences' },
  { symbol: 'DHR', priority: 65, reason: 'Danaher, healthcare tech' },
  { symbol: 'BMY', priority: 64, reason: 'Bristol Myers, oncology focus' },

  // Energy Sector
  { symbol: 'XOM', priority: 70, reason: 'ExxonMobil, oil giant' },
  { symbol: 'CVX', priority: 69, reason: 'Chevron, energy stability' },
  { symbol: 'COP', priority: 68, reason: 'ConocoPhillips, shale producer' },
  { symbol: 'SLB', priority: 65, reason: 'Schlumberger, oilfield services' },
  { symbol: 'XLE', priority: 70, reason: 'Energy sector ETF' },

  // Industrial & Aerospace
  { symbol: 'BA', priority: 70, reason: 'Boeing, aerospace leader' },
  { symbol: 'CAT', priority: 69, reason: 'Caterpillar, construction equipment' },
  { symbol: 'GE', priority: 68, reason: 'General Electric, industrial conglomerate' },
  { symbol: 'HON', priority: 67, reason: 'Honeywell, aerospace & automation' },
  { symbol: 'MMM', priority: 66, reason: '3M, industrial innovation' },
  { symbol: 'RTX', priority: 65, reason: 'Raytheon, defense contractor' },

  // Consumer Discretionary
  { symbol: 'AMZN', priority: 96, reason: 'Already listed above' },
  { symbol: 'HD', priority: 78, reason: 'Already listed above' },
  { symbol: 'MCD', priority: 68, reason: 'McDonald\'s, recession-resistant' },
  { symbol: 'SBUX', priority: 67, reason: 'Starbucks, consumer brand' },
  { symbol: 'NKE', priority: 66, reason: 'Nike, athletic wear leader' },
  { symbol: 'LOW', priority: 65, reason: 'Lowe\'s, home improvement' },
  { symbol: 'TGT', priority: 64, reason: 'Target, retail competition' },

  // Emerging Growth & Speculative
  { symbol: 'ARKK', priority: 70, reason: 'ARK Innovation ETF, disruptive tech' },
  { symbol: 'SPCE', priority: 60, reason: 'Virgin Galactic, space tourism' },
  { symbol: 'RIVN', priority: 65, reason: 'Rivian, electric trucks' },
  { symbol: 'LCID', priority: 64, reason: 'Lucid Motors, luxury EV' },
  { symbol: 'COIN', priority: 70, reason: 'Coinbase, crypto exposure' },
  { symbol: 'HOOD', priority: 65, reason: 'Robinhood, retail trading' },

  // Commodities & Materials
  { symbol: 'FCX', priority: 65, reason: 'Freeport, copper mining' },
  { symbol: 'NEM', priority: 64, reason: 'Newmont, gold mining' },
  { symbol: 'CLF', priority: 63, reason: 'Cleveland-Cliffs, steel' },
  { symbol: 'AA', priority: 62, reason: 'Alcoa, aluminum' },

  // Real Estate
  { symbol: 'VNQ', priority: 65, reason: 'Real estate ETF' },
  { symbol: 'O', priority: 64, reason: 'Realty Income, monthly dividend' },
  { symbol: 'SPG', priority: 63, reason: 'Simon Property, mall REITs' },

  // International
  { symbol: 'ASML', priority: 70, reason: 'ASML, chip equipment monopoly' },
  { symbol: 'TSM', priority: 75, reason: 'Taiwan Semi, chip manufacturing' },
  { symbol: 'NVO', priority: 68, reason: 'Novo Nordisk, diabetes treatment' },
  { symbol: 'ADYEY', priority: 67, reason: 'Adidas, European sportswear' },

  // Utility & Defensive
  { symbol: 'NEE', priority: 65, reason: 'NextEra Energy, renewable focus' },
  { symbol: 'DUK', priority: 64, reason: 'Duke Energy, utility stability' },
  { symbol: 'SO', priority: 63, reason: 'Southern Company, dividend utility' },
].filter((stock, index, self) => 
  // Remove duplicates, keeping highest priority
  index === self.findIndex(s => s.symbol === stock.symbol)
).slice(0, 100); // Ensure exactly 100 stocks

/**
 * Get stock priority score for cache eligibility
 */
export function getStockPriority(symbol: string): number {
  const stock = TOP_100_STOCKS.find(s => s.symbol === symbol.toUpperCase());
  return stock ? stock.priority : 0;
}

/**
 * Check if stock is eligible for cache
 */
export function isStockCacheEligible(symbol: string, userDemandCount: number = 0): boolean {
  const priority = getStockPriority(symbol);
  
  // Top 100 stocks are always eligible
  if (priority > 0) {
    return true;
  }
  
  // User-demanded stocks become eligible after 2+ requests
  if (userDemandCount >= 2) {
    return true;
  }
  
  return false;
}

/**
 * Calculate dynamic priority based on demand
 */
export function calculateDynamicPriority(
  symbol: string, 
  baseUserCount: number = 0,
  recentAccessCount: number = 0,
  lastAccessedDays: number = 0
): number {
  const basePriority = getStockPriority(symbol);
  
  // If not in top 100, start with low base priority
  let priority = basePriority > 0 ? basePriority : 10;
  
  // Boost priority based on user demand
  const demandBoost = Math.min(baseUserCount * 5, 30); // Max 30 points from demand
  
  // Boost priority based on recent access
  const recentBoost = Math.min(recentAccessCount * 2, 20); // Max 20 points from recent access
  
  // Decay priority based on last access (encourage fresh content)
  const decayPenalty = Math.min(lastAccessedDays * 0.5, 15); // Max 15 point penalty
  
  const finalPriority = priority + demandBoost + recentBoost - decayPenalty;
  
  return Math.max(0, Math.min(100, finalPriority)); // Clamp between 0-100
}

/**
 * Get stocks by priority tier for cache management
 */
export function getStocksByPriority(): {
  tier1: string[]; // Priority 80-100
  tier2: string[]; // Priority 60-79
  tier3: string[]; // Priority 40-59
  tier4: string[]; // Priority 20-39
  tier5: string[]; // Priority 0-19
} {
  const tier1: string[] = [];
  const tier2: string[] = [];
  const tier3: string[] = [];
  const tier4: string[] = [];
  const tier5: string[] = [];
  
  TOP_100_STOCKS.forEach(stock => {
    if (stock.priority >= 80) tier1.push(stock.symbol);
    else if (stock.priority >= 60) tier2.push(stock.symbol);
    else if (stock.priority >= 40) tier3.push(stock.symbol);
    else if (stock.priority >= 20) tier4.push(stock.symbol);
    else tier5.push(stock.symbol);
  });
  
  return { tier1, tier2, tier3, tier4, tier5 };
}

/**
 * Get cache refresh schedule based on priority
 */
export function getCacheRefreshInterval(priority: number): number {
  if (priority >= 90) return 6; // 6 hours for top tier
  if (priority >= 80) return 12; // 12 hours for high priority
  if (priority >= 60) return 24; // 24 hours for medium priority
  if (priority >= 40) return 48; // 48 hours for lower priority
  return 72; // 72 hours for lowest priority
}

/**
 * Validate stock symbol format
 */
export function isValidStockSymbol(symbol: string): boolean {
  // Basic validation for US stock symbols
  const cleanSymbol = symbol.toUpperCase().trim();
  
  // Allow 1-5 characters, letters only (with some exceptions for common suffixes)
  const basicPattern = /^[A-Z]{1,5}$/;
  
  // Allow some common ETF and special symbols
  const specialPatterns = [
    /^[A-Z]{1,4}\.[A-Z]$/, // Class shares like BRK.A
    /^[A-Z]{2,5}$/, // Standard symbols
  ];
  
  return basicPattern.test(cleanSymbol) || 
         specialPatterns.some(pattern => pattern.test(cleanSymbol));
}

/**
 * Get similar/related stocks for cross-linking
 */
export function getSimilarStocks(symbol: string, count: number = 6): string[] {
  const symbolUpper = symbol.toUpperCase();
  
  // Define stock relationships for better SEO cross-linking
  const relationships: Record<string, string[]> = {
    // Tech giants
    'AAPL': ['MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA', 'TSLA'],
    'MSFT': ['AAPL', 'GOOGL', 'AMZN', 'CRM', 'ORCL', 'ADBE'],
    'GOOGL': ['AAPL', 'MSFT', 'META', 'AMZN', 'NFLX', 'ADBE'],
    'AMZN': ['AAPL', 'MSFT', 'GOOGL', 'SHOP', 'WMT', 'HD'],
    'META': ['GOOGL', 'NFLX', 'SNAP', 'TWTR', 'ROKU', 'DIS'],
    'NVDA': ['AMD', 'INTC', 'TSM', 'QCOM', 'AVGO', 'MRVL'],
    'TSLA': ['NIO', 'RIVN', 'LCID', 'F', 'GM', 'FORD'],
    
    // ETFs
    'SPY': ['QQQ', 'IWM', 'VTI', 'VEA', 'VWO', 'ARKK'],
    'QQQ': ['SPY', 'TQQQ', 'IWM', 'VTI', 'ARKK', 'XLK'],
    'IWM': ['SPY', 'QQQ', 'VTI', 'IJR', 'VB', 'VTWO'],
    
    // Financial
    'JPM': ['BAC', 'WFC', 'C', 'GS', 'MS', 'AXP'],
    'BAC': ['JPM', 'WFC', 'C', 'GS', 'MS', 'PNC'],
    
    // Healthcare
    'PFE': ['JNJ', 'MRNA', 'ABBV', 'TMO', 'UNH', 'BMY'],
    'JNJ': ['PFE', 'UNH', 'ABBV', 'TMO', 'DHR', 'BMY'],
    
    // Energy
    'XOM': ['CVX', 'COP', 'SLB', 'XLE', 'PSX', 'VLO'],
    'CVX': ['XOM', 'COP', 'EOG', 'PSX', 'XLE', 'OXY'],
  };
  
  // Get related stocks or fall back to top stocks
  const related = relationships[symbolUpper] || 
    TOP_100_STOCKS.slice(0, 12).map(s => s.symbol);
  
  // Filter out the current symbol and return requested count
  return related
    .filter(s => s !== symbolUpper)
    .slice(0, count);
}

export default TOP_100_STOCKS;
