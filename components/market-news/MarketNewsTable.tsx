import React, { useEffect, useState } from 'react';

interface NewsItem {
  id: string;
  title: string;
  url: string;
  summary: string;
  source: string;
  published_at: string;
}

export default function MarketNewsTable() {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      setData([]);
      try {
        const res = await fetch('/api/market-news');
        const json = await res.json();
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([]);
        }
      } catch (e) {
        setError('Failed to load news.');
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
      <ul className="divide-y divide-gray-100">
        {data.map((item) => (
          <li key={item.id} className="p-4 hover:bg-gray-50 transition">
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-700 hover:underline">
              {item.title}
            </a>
            <div className="text-gray-500 text-xs mt-1">
              {item.source} &middot; {formatTimeAgo(item.published_at)}
            </div>
            <div className="text-gray-700 mt-2 text-sm">
              {item.summary}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return date.toLocaleDateString();
}
