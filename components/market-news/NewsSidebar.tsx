import React from 'react';

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return date.toLocaleDateString();
}

// Score news: recency, has image, summary length, keywords
function scoreNews(item) {
  let score = 0;
  // Recency: newer = higher
  const now = new Date();
  const published = new Date(item.published_at);
  const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
  score += Math.max(0, 24 - hoursAgo) * 2;
  // Has image
  if (item.thumbnail_url) score += 3;
  // Summary length
  if (item.summary && item.summary.length > 80) score += 2;
  // Keywords
  const keywords = ['fed', 'earnings', 'crash', 'inflation', 'cut', 'rally', 'trump', 'market', 'stocks', 'dow', 'nasdaq'];
  const text = (item.title + ' ' + (item.summary || '')).toLowerCase();
  for (const kw of keywords) {
    if (text.includes(kw)) score += 1;
  }
  return score;
}

export default function NewsSidebar({ news }: { news: any[] }) {
  // Only consider news from last 24 hours
  const now = new Date();
  const highlights = news
    .filter(item => (now.getTime() - new Date(item.published_at).getTime()) < 24 * 60 * 60 * 1000)
    .map(item => ({ ...item, _score: scoreNews(item) }))
    .sort((a, b) => b._score - a._score)
    .slice(0, 10);

  return (
    <aside className="bg-white rounded-xl shadow border border-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Top Highlights</h2>
      <ul className="space-y-3">
        {highlights.map((item, i) => (
          <li key={item.url + i}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline font-medium text-sm block"
            >
              {item.title}
            </a>
            <div className="text-gray-500 text-xs">
              {item.source && <>{item.source} &middot; </>}{formatTimeAgo(item.published_at)}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
