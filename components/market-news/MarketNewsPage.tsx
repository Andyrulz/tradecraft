"use client";

import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import NewsSidebar from './NewsSidebar';

interface NewsItem {
  title: string;
  url: string;
  summary: string;
  source: string;
  published_at: string;
  thumbnail_url?: string;
}

export default function MarketNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/market-news');
        const json = await res.json();
        setNews(Array.isArray(json) ? json : []);
      } catch (e) {
        setError('Failed to load news.');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 py-12 text-center">{error}</div>;
  if (!news.length) return <div className="py-12 text-center">No news found.</div>;

  // Featured news (first item)
  const [featured, ...rest] = news;
  const sidebarNews = news.slice(0, 15);

  // Score all articles
  function scoreNews(item: NewsItem) {
    let score = 0;
    const now = new Date();
    const published = new Date(item.published_at);
    const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
    score += Math.max(0, 24 - hoursAgo) * 2;
    if (item.thumbnail_url) score += 3;
    if (item.summary && item.summary.length > 80) score += 2;
    const keywords = ['fed', 'earnings', 'crash', 'inflation', 'cut', 'rally', 'trump', 'market', 'stocks', 'dow', 'nasdaq'];
    const text = (item.title + ' ' + (item.summary || '')).toLowerCase();
    for (const kw of keywords) {
      if (text.includes(kw)) score += 1;
    }
    return score;
  }

  // Sort rest by score descending
  const restWithScore = rest.map(item => ({ ...item, _score: scoreNews(item) }));
  restWithScore.sort((a, b) => b._score - a._score);

  // Show every 5th high-score article as featured, rest as regular
  const newsCards = restWithScore.map((item, i) => {
    const isFeatured = i > 0 && i % 5 === 0;
    return (
      <React.Fragment key={item.url + i}>
        <NewsCard item={item} featured={isFeatured} />
      </React.Fragment>
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-8">
        <h1 className="text-4xl font-bold mb-6">Stock Market News</h1>
        <NewsCard item={featured} featured />
        <div className="mt-8 flex flex-col gap-0">
          <div className="border-t border-gray-200 mb-2" />
          {newsCards}
        </div>
      </div>
      <div className="lg:col-span-4">
        <NewsSidebar news={sidebarNews} />
      </div>
    </div>
  );
}
