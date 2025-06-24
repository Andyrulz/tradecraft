/**
 * Enhanced news scoring system for market news highlights
 * Used across scraper, sidebar, and main news components
 */

export interface NewsItem {
  title: string;
  summary?: string;
  source?: string;
  published_at: string;
  thumbnail_url?: string;
}

/**
 * Calculate a comprehensive score for news articles based on multiple factors
 * @param item - News item to score
 * @returns Numerical score (higher = more important/relevant)
 */
export function scoreNews(item: NewsItem): number {
  let score = 0;
  const now = new Date();
  const published = new Date(item.published_at);
  const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  
  // 1. RECENCY SCORING (0-72 points) - Linear decay over 72 hours
  score += Math.max(0, 72 - hoursAgo) * 1;
  
  // 2. VISUAL CONTENT (+3 points) - Articles with images are more engaging
  if (item.thumbnail_url) score += 3;
  
  // 3. CONTENT QUALITY (0-4 points) - Longer summaries indicate more substantive content
  if (item.summary && item.summary.length > 150) score += 4; // Rich content
  else if (item.summary && item.summary.length > 80) score += 2; // Decent content
  
  // 4. SOURCE AUTHORITY (0-5 points) - Weight by publication credibility
  const authorityMap: { [key: string]: number } = {
    'bloomberg': 5, 'reuters': 5, 'wall street journal': 5, 'wsj': 5,
    'cnbc': 4, 'marketwatch': 4, 'yahoo finance': 4,
    'seeking alpha': 3, 'motley fool': 3, 'benzinga': 3,
    'barron\'s': 4, 'financial times': 5, 'ft': 5
  };
  const source = (item.source || '').toLowerCase();
  for (const [sourceName, points] of Object.entries(authorityMap)) {
    if (source.includes(sourceName)) {
      score += points;
      break;
    }
  }
  
  // 5. KEYWORD SCORING - Weighted by importance and position
  const title = (item.title || '').toLowerCase();
  const summary = (item.summary || '').toLowerCase();
  
  // High-impact market keywords (3 points each in title, 2 in summary)
  const highImpactKeywords = [
    'fed', 'interest rate', 'inflation', 'gdp', 'unemployment', 
    'recession', 'crash', 'correction', 'bubble', 'fomc'
  ];
  highImpactKeywords.forEach(keyword => {
    if (title.includes(keyword)) score += 3;
    else if (summary.includes(keyword)) score += 2;
  });
  
  // Medium-impact keywords (2 points in title, 1 in summary)
  const mediumImpactKeywords = [
    'earnings', 'ipo', 'merger', 'acquisition', 'buyback', 
    'dividend', 'guidance', 'outlook', 'revenue', 'profit'
  ];
  mediumImpactKeywords.forEach(keyword => {
    if (title.includes(keyword)) score += 2;
    else if (summary.includes(keyword)) score += 1;
  });
  
  // Market/Index keywords (1 point each)
  const marketKeywords = [
    'dow', 'nasdaq', 's&p', 'russell', 'market', 'stocks', 
    'bonds', 'futures', 'options', 'etf'
  ];
  marketKeywords.forEach(keyword => {
    if (title.includes(keyword) || summary.includes(keyword)) score += 1;
  });
  
  // Political/Policy keywords (2 points each)
  const policyKeywords = [
    'trump', 'biden', 'congress', 'senate', 'policy', 
    'regulation', 'tariff', 'trade war', 'election'
  ];
  policyKeywords.forEach(keyword => {
    if (title.includes(keyword) || summary.includes(keyword)) score += 2;
  });
  
  // 6. BREAKING NEWS INDICATORS (+5 points) - Urgent content
  const breakingIndicators = ['breaking', 'urgent', 'alert', 'just in', 'developing'];
  breakingIndicators.forEach(indicator => {
    if (title.includes(indicator)) score += 5;
  });
  
  // 7. MARKET TIMING BONUS - Content published during market hours is more relevant
  const hour = published.getHours();
  if (hour >= 9 && hour <= 16) score += 2; // Market hours EST
  else if ((hour >= 4 && hour < 9) || (hour > 16 && hour <= 20)) score += 1; // Pre/post market
  
  // 8. CONTENT INDICATORS (+1 each) - Articles with specific data are more valuable
  const qualityIndicators = [/\$\d+/g, /\d+%/g, /\d+\.\d+/g]; // Dollar amounts, percentages, decimals
  qualityIndicators.forEach(pattern => {
    if (pattern.test(title + ' ' + summary)) score += 1;
  });
  
  return Math.round(score);
}

/**
 * Determine if an article should be featured based on its score
 * @param score - Article score from scoreNews()
 * @returns Whether article should be featured
 */
export function shouldFeature(score: number): boolean {
  return score > 25; // Threshold for high-importance articles
}

/**
 * Check if news is breaking (published within last hour)
 * @param dateString - Publication date
 * @returns Whether news is breaking
 */
export function isBreakingNews(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  return diff < 3600; // Less than 1 hour
}
