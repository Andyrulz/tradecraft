"use client";

import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import NewsSidebar from './NewsSidebar';
import { GoogleAutoAds } from '@/components/ui/HybridAds';
import { AdAnalytics } from '@/components/ui/AdAnalytics';

interface NewsItem {
  title: string;
  url: string;
  summary: string;
  source: string;
  published_at: string;
  thumbnail_url?: string;
}

export default function MarketNewsPageAutoAds() {
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

  // Featured news (first item - most recent from API)
  const [featured, ...rest] = news;
  const sidebarNews = news.slice(0, 15);

  // Enhanced scoring system for news highlights
  function scoreNews(item: NewsItem) {
    let score = 0;
    const now = new Date();
    const published = new Date(item.published_at);
    const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
    
    // 1. RECENCY SCORING (0-72 points)
    score += Math.max(0, 72 - hoursAgo) * 1;
    
    // 2. VISUAL CONTENT (+3 points)
    if (item.thumbnail_url) score += 3;
    
    // 3. CONTENT QUALITY (0-4 points)
    if (item.summary && item.summary.length > 150) score += 4;
    else if (item.summary && item.summary.length > 80) score += 2;
    
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
    
    // 5. KEYWORD SCORING
    const title = (item.title || '').toLowerCase();
    const summary = (item.summary || '').toLowerCase();
    
    const highImpactKeywords = ['fed', 'interest rate', 'inflation', 'gdp', 'unemployment', 'recession', 'crash', 'correction', 'bubble'];
    highImpactKeywords.forEach(keyword => {
      if (title.includes(keyword)) score += 3;
      else if (summary.includes(keyword)) score += 2;
    });
    
    const mediumImpactKeywords = ['earnings', 'ipo', 'merger', 'acquisition', 'buyback', 'dividend', 'guidance', 'outlook'];
    mediumImpactKeywords.forEach(keyword => {
      if (title.includes(keyword)) score += 2;
      else if (summary.includes(keyword)) score += 1;
    });
    
    return Math.round(score);
  }

  const restWithScore = rest.map(item => ({ ...item, _score: scoreNews(item) }));
  
  const newsCards = restWithScore.map((item, i) => {
    const isFeatured = (i > 0 && i % 5 === 0);
    const isNewSection = i > 0 && i % 3 === 0;
    
    return (
      <React.Fragment key={item.url + i}>
        {/* Section break for additional ad placement opportunities */}
        {isNewSection && (
          <div className="my-6 py-4 border-t border-gray-100">
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-blue-50 text-xs text-blue-600 rounded-full">
                More News
              </div>
            </div>
          </div>
        )}
        
        {/* News article with proper spacing */}
        <div className="mb-4">
          <NewsCard item={item} featured={isFeatured} />
        </div>
      </React.Fragment>
    );
  });

  return (
    <div>
      {/* Google Auto Ads - Let Google optimize everything */}
      <GoogleAutoAds />
      <AdAnalytics />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-8">
        
        {/* SECTION 1: Header */}
        <section className="mb-8">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Stock Market News</h1>            <p className="text-xl text-gray-600 leading-relaxed">
              Real-time market updates and financial analysis
            </p>
          </div>
        </section>

        {/* SECTION 2: Mobile-first layout with optimal content structure */}
        <div className="lg:hidden">
          
          {/* Mobile: Introduction section */}
          <section className="mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-gray-200">
              <h2 className="text-lg font-semibold mb-2 text-gray-800">Latest Market Updates</h2>
              <p className="text-sm text-gray-700 leading-relaxed">
                Stay informed with real-time market news and analysis from top financial sources.
              </p>
            </div>
          </section>
          
          {/* Mobile: Highlights section */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">📈 Market Highlights</h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <NewsSidebar news={sidebarNews} />
            </div>
          </section>
          
          {/* Mobile: Content divider for ad placement */}
          <section className="mb-10">
            <div className="border-t border-gray-200 pt-8">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-blue-50 text-sm text-blue-700 rounded-full font-medium">
                  Breaking News & Analysis
                </div>
              </div>
            </div>
          </section>
          
          {/* Mobile: Featured article section */}          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Breaking News</h2>
            <div className="overflow-hidden">
              <NewsCard item={featured} featured />
            </div>
          </section>
          
          {/* Mobile: Additional content section for ad placement */}
          <section className="mb-10">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Why This Matters</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Market-moving news can create significant opportunities for informed traders. 
                Our curated selection focuses on events that directly impact stock prices and market sentiment.
              </p>
            </div>
          </section>
          
          {/* Mobile: Latest news section with enhanced spacing */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">📰 Latest Market News</h2>
            <div className="space-y-4">
              {newsCards}
            </div>
          </section>

          {/* Mobile: Market insights section */}
          <section className="mb-10">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">📊 Market Analysis Tools</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Stock Screener</h4>
                  <p className="text-sm text-gray-600">Find top performing stocks with our advanced screening tools.</p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-medium text-gray-800 mb-2">Market Movers</h4>
                  <p className="text-sm text-gray-600">Track the biggest gainers and losers in real-time.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mobile: Trading tips section for additional content */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">💡 Trading Insights</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-4">Smart News Analysis</h3>
              <ul className="space-y-3 text-blue-700 text-sm">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Look for news with specific financial data (earnings, revenue, guidance)</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Consider the timing of news relative to market hours</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Cross-reference breaking news with volume and price action</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Focus on news from authoritative financial sources</span>
                </li>
              </ul>
            </div>
          </section>

        </div>

        {/* SECTION 3: Desktop layout - Well-structured sections for optimal ad placement */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          
          <div className="lg:col-span-8">
            {/* Featured article section */}            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Breaking News</h2>
              <div className="overflow-hidden">
                <NewsCard item={featured} featured />
              </div>
            </section>
            
            {/* Latest news section with proper content structure */}
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">📰 Latest Market News</h2>
              <div className="space-y-4">
                {newsCards}
              </div>
            </section>

            {/* Bottom analysis section for additional ad placement */}
            <section className="mb-12">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Market Analysis</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Stay ahead of market trends with our comprehensive analysis and insights from top financial sources.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Real-Time Updates</h4>
                    <p className="text-sm text-gray-600">Get the latest market-moving news as it happens.</p>
                  </div>
                  <div className="bg-white p-4 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-2">Expert Analysis</h4>
                    <p className="text-sm text-gray-600">Professional insights from trusted financial sources.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
            {/* Sidebar highlights section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">📈 Market Highlights</h2>
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                <NewsSidebar news={sidebarNews} />
              </div>
            </section>
            
            {/* Additional sidebar content for more ad opportunities */}
            <section className="mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Trading Tools</h3>
                <div className="space-y-3">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Stock Screener</h4>
                    <p className="text-xs text-gray-600">Find top opportunities</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Market Movers</h4>
                    <p className="text-xs text-gray-600">Track gainers & losers</p>
                  </div>
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Trade Plans</h4>
                    <p className="text-xs text-gray-600">Generate strategies</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Market tips section */}
            <section className="mb-8">
              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h3 className="text-lg font-semibold mb-4 text-green-800">💡 Quick Tips</h3>
                <ul className="space-y-2 text-green-700 text-sm">
                  <li>• Monitor volume with price movements</li>
                  <li>• Check news timing vs market hours</li>
                  <li>• Verify sources for credibility</li>
                  <li>• Look for specific financial data</li>
                </ul>
              </div>
            </section>
          </div>
          
        </div>

      </div>
    </div>
  );
}
