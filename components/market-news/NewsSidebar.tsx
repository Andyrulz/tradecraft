import React from 'react';

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  if (diff < 86400 * 2) return 'Yesterday';
  if (diff < 86400 * 3) return '2 days ago';
  return date.toLocaleDateString();
}

// Helper to check if news is very recent (within last hour)
function isBreakingNews(dateString: string): boolean {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  return diff < 3600;
}

// Enhanced scoring system for news highlights
function scoreNews(item: any) {
  let score = 0;
  const now = new Date();
  const published = new Date(item.published_at);
  const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  
  // 1. RECENCY SCORING (0-72 points)
  score += Math.max(0, 72 - hoursAgo) * 1;
  
  // 2. VISUAL CONTENT (+3 points)
  if (item.thumbnail_url) score += 3;
  
  // 3. CONTENT QUALITY (0-4 points)
  if (item.summary && item.summary.length > 150) score += 4; // Rich content
  else if (item.summary && item.summary.length > 80) score += 2; // Decent content
  
  // 4. SOURCE AUTHORITY (0-5 points)
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
  const highImpactKeywords = ['fed', 'interest rate', 'inflation', 'gdp', 'unemployment', 'recession', 'crash', 'correction', 'bubble'];
  highImpactKeywords.forEach(keyword => {
    if (title.includes(keyword)) score += 3;
    else if (summary.includes(keyword)) score += 2;
  });
  
  // Medium-impact keywords (2 points in title, 1 in summary)
  const mediumImpactKeywords = ['earnings', 'ipo', 'merger', 'acquisition', 'buyback', 'dividend', 'guidance', 'outlook'];
  mediumImpactKeywords.forEach(keyword => {
    if (title.includes(keyword)) score += 2;
    else if (summary.includes(keyword)) score += 1;
  });
  
  // Market/Index keywords (1 point each)
  const marketKeywords = ['dow', 'nasdaq', 's&p', 'russell', 'market', 'stocks', 'bonds', 'futures'];
  marketKeywords.forEach(keyword => {
    if (title.includes(keyword) || summary.includes(keyword)) score += 1;
  });
  
  // Political/Policy keywords (2 points each)
  const policyKeywords = ['trump', 'biden', 'congress', 'senate', 'policy', 'regulation', 'tariff', 'trade war'];
  policyKeywords.forEach(keyword => {
    if (title.includes(keyword) || summary.includes(keyword)) score += 2;
  });
  
  // 6. BREAKING NEWS INDICATORS (+5 points)
  const breakingIndicators = ['breaking', 'urgent', 'alert', 'just in', 'developing'];
  breakingIndicators.forEach(indicator => {
    if (title.includes(indicator)) score += 5;
  });
  
  // 7. MARKET TIMING BONUS (market hours = +2, pre/post = +1)
  const hour = published.getHours();
  if (hour >= 9 && hour <= 16) score += 2; // Market hours EST
  else if ((hour >= 4 && hour < 9) || (hour > 16 && hour <= 20)) score += 1; // Pre/post market
  
  // 8. CONTENT INDICATORS (+1 each)
  const qualityIndicators = [/\$\d+/g, /\d+%/g, /\d+\.\d+/g]; // Dollar amounts, percentages, decimals
  qualityIndicators.forEach(pattern => {
    if (pattern.test(title + ' ' + summary)) score += 1;
  });
  
  return Math.round(score);
}

export default function NewsSidebar({ news }: { news: any[] }) {
  // SIDEBAR: Sort by score (importance/relevance) - unlike main news which is chronological
  const now = new Date();
  const highlights = news
    .filter(item => (now.getTime() - new Date(item.published_at).getTime()) < 72 * 60 * 60 * 1000)
    .map(item => ({ ...item, _score: scoreNews(item) }))
    .sort((a, b) => b._score - a._score) // Sort by score DESC for highlights
    .slice(0, 10);  return (
    <aside className="bg-white rounded-xl shadow border border-gray-100 p-4">
      <ul className="space-y-3 lg:space-y-3">
        {highlights.map((item, i) => (
          <li key={item.url + i} className="lg:border-0 border-b border-gray-100 last:border-b-0 pb-3 last:pb-0 lg:pb-0">
            <div className="flex flex-col gap-1">
              {isBreakingNews(item.published_at) && (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 w-fit">
                  BREAKING
                </span>
              )}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:underline font-medium text-sm lg:text-sm block leading-tight"
              >
                {item.title}
              </a>
              <div className="text-gray-500 text-xs">
                {item.source && <>{item.source} &middot; </>}{formatTimeAgo(item.published_at)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
