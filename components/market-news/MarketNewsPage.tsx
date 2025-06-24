"use client";

import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import NewsSidebar from './NewsSidebar';
import { HybridAdStrategy, ManualAd, StickyBannerAd, InFeedAd, MultiplexAd } from '@/components/ui/HybridAds';
import { AdAnalytics } from '@/components/ui/AdAnalytics';
import { ContentSection, NewsArticleWrapper } from '@/components/ui/AdBreakHelper';
import { InFeedWorkingAd, BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';

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
  const [error, setError] = useState('');  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/market-news');
        const json = await res.json();
        // Debug: log the first 5 news items
        if (Array.isArray(json)) {
          console.log('First 5 news items:', json.slice(0, 5).map(item => ({ title: item.title, published_at: item.published_at })));
        }
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
  if (!news.length) return <div className="py-12 text-center">No news found.</div>;  // Featured news (first item - most recent from API)
  const [featured, ...rest] = news;
  const sidebarNews = news.slice(0, 15); // Pass to sidebar for score-based sorting
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

  // MAIN NEWS: Keep strict chronological order (newest first) - do NOT sort by score
  // Only calculate scores to determine which articles get "featured" styling
  const restWithScore = rest.map(item => ({ ...item, _score: scoreNews(item) }));
  // Note: restWithScore maintains the original API order (newest first)  // Show every 5th article as featured - primarily position-based, minimal score-based
  // More aggressive ad frequency: every 3 articles for better revenue
  const newsCards = restWithScore.map((item, i) => {
    // Very conservative: Mainly rely on position (every 5th), only feature score-based for truly exceptional content
    const isFeatured = (i > 0 && i % 5 === 0);
    // More aggressive ad frequency: every 3 articles, extended to first 30 articles
    const showAdAfter = (i + 1) % 3 === 0 && i < 30;
    
    // Add section breaks every 2 articles for Google Auto Ads placement opportunities
    const isNewSection = i > 0 && i % 2 === 0;
    // Add major section breaks every 6 articles
    const isMajorSection = i > 0 && i % 6 === 0;
      return (
      <React.Fragment key={item.url + i}>
        {/* Major section break for enhanced ad placement opportunities */}
        {isMajorSection && (
          <div className="my-12 py-6 border-t-2 border-gray-200">
            <div className="text-center">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-50 to-green-50 text-sm text-blue-700 rounded-lg border border-blue-200">
                📊 Market Analysis Continues
              </div>
            </div>
            {/* Force manual ad in major section breaks */}
            <div className="mt-6">
              <InFeedAd className="my-6" />
            </div>
          </div>
        )}
        
        {/* Minor section break for additional ad placement opportunities */}
        {isNewSection && !isMajorSection && (
          <div className="my-8 py-4 border-t border-gray-100">
            <div className="text-center">
              <div className="inline-block px-3 py-1 bg-blue-50 text-xs text-blue-600 rounded-full">
                Continue Reading
              </div>
            </div>
          </div>
        )}
          {/* News article with proper spacing for ad recognition */}
        <NewsArticleWrapper 
          index={i} 
          isLast={i === restWithScore.length - 1}
        >
          <NewsCard item={item} featured={isFeatured} />
        </NewsArticleWrapper>
          {/* Manual in-feed ads at strategic positions - MORE FREQUENT */}
        {showAdAfter && (
          <div className="my-10 py-6 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-center mb-4">
              <span className="text-xs text-gray-500 uppercase tracking-wide">Advertisement</span>
            </div>
            <InFeedWorkingAd className="my-0" />
            {/* Add a second ad for high-value positions using working ad unit */}
            {(i + 1) % 9 === 0 && (
              <div className="mt-6">
                <BannerWorkingAd className="w-full" />
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  });return (
    <HybridAdStrategy>
      <AdAnalytics />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 lg:pb-8">        {/* Header */}
        <section className="mb-8">
          <div className="text-center lg:text-left">            <h1 className="text-4xl font-bold mb-4 text-gray-900">Stock Market News</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay informed with the latest market-moving news and analysis.
            </p>
          </div>
        </section>        {/* Top Banner Ad - High Revenue */}
        <ManualAd 
          adKey="TOP_BANNER"
          format="auto"
          className="flex justify-center mb-8"
          style={{ display: 'block', minHeight: 120 }}
        />{/* Mobile-first layout: Enhanced structure for better ad placement */}
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
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Market Highlights</h2>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <NewsSidebar news={sidebarNews} />
            </div>
          </section>          {/* Mobile: Strategic ad placement - FIRST AD */}
          <InFeedWorkingAd className="my-8" />
          
          {/* Mobile: Featured article section */}
          <section className="mb-10">
            <div className="overflow-hidden">
              <NewsCard item={featured} featured />
            </div>
          </section>
          
          {/* Mobile: Strategic ad placement - SECOND AD */}
          <LargeWorkingAd className="my-10" />
          
          {/* Mobile: Additional content section for ad placement */}
          <section className="mb-10">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Why This Matters</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Market-moving news can create significant opportunities for informed traders. 
                Our curated selection focuses on events that directly impact stock prices and market sentiment.
              </p>
            </div>
          </section>          {/* Mobile: Latest news section with enhanced spacing */}
          <ContentSection title="Latest Market News" className="mb-10">
            <div className="space-y-4">
              {newsCards}
            </div>
          </ContentSection>          {/* Mobile: Strategic ad between content sections - THIRD AD */}
          <LargeWorkingAd className="my-12" />

          {/* Mobile: Market insights section */}
          <section className="mb-10">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Market Analysis Tools</h3>
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

          {/* Bottom content section for additional ad placement */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">Trading Insights</h2>
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
                  <span>Focus on news from authoritative financial sources</span>                </li>
              </ul>
            </div>
            <MultiplexAd />
          </section>
        </div>

        {/* Desktop layout: Well-structured sections with strategic ad placement */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-8">
            {/* Featured article section */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Breaking News</h2>
              <NewsCard item={featured} featured />
            </section>
              {/* Strategic ad after featured content */}
            <div className="mb-10">
              <ManualAd 
                adKey="IN_FEED_SECONDARY"
                format="auto"
                className="flex justify-center"
                style={{ display: 'block', minHeight: 100 }}
              />
            </div>
              {/* Latest news section with proper content structure */}
            <section className="mb-10">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Latest Market News</h2>
              <div className="space-y-3">
                {newsCards}
              </div>
            </section>

            {/* Mid-content ad section for additional revenue */}
            <section className="my-12">
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold mb-2">Trading Insights</h3>
                <p className="text-gray-600 text-sm">
                  Discover advanced trading tools and market analysis features.
                </p>
              </div>
              <ManualAd 
                adKey="IN_FEED_PRIMARY"
                format="auto"
                className="flex justify-center"
                style={{ display: 'block', minHeight: 150 }}
              />
            </section>

            {/* Bottom section for additional ad placement */}
            <section className="mt-12">
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Market Analysis</h3>
                <p className="text-gray-600 mb-4">
                  Stay ahead of market trends with our comprehensive analysis and insights.
                </p>
              </div>
              <ManualAd 
                adKey="BOTTOM_BANNER"
                format="auto"
                className="flex justify-center"
                style={{ display: 'block', minHeight: 120 }}
              />
            </section>
          </div>

          <div className="lg:col-span-4">
            {/* Sidebar highlights section */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 text-gray-800">Market Highlights</h2>
              <NewsSidebar news={sidebarNews} />
            </section>
              {/* Sidebar ad section */}
            <section className="mb-8">
              <ManualAd 
                adKey="SIDEBAR_PRIMARY"
                format="auto"
                className="w-full"
                style={{ display: 'block', minHeight: 250 }}
              />
            </section>
            
            {/* Additional sidebar content for more ad opportunities */}
            <section className="mb-8">
              <h3 className="text-md font-semibold mb-4">Related Tools</h3>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 min-h-[150px]">
                <p className="text-sm text-gray-600">
                  Explore our trading tools and market analysis features.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>      {/* Sticky bottom banner for mobile - high revenue */}
      <StickyBannerAd />
    </HybridAdStrategy>
  );
}
