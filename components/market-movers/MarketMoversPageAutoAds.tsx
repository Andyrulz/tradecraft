"use client";

import React, { useState } from 'react';
import MarketMoversTable from './MarketMoversTable';
import { GoogleAutoAds } from '@/components/ui/HybridAds';
import { AdAnalytics } from '@/components/ui/AdAnalytics';
import { InFeedWorkingAd, BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import { ContentSection } from '@/components/ui/AdBreakHelper';

const PERIODS = [
  { label: 'Today', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'YTD', value: 'ytd' },
];

export default function MarketMoversPageAutoAds() {
  const [gainersPeriod, setGainersPeriod] = useState<'day' | 'week' | 'month' | 'ytd'>('day');
  const [losersPeriod, setLosersPeriod] = useState<'day' | 'week' | 'month' | 'ytd'>('day');
  return (
    <div>
      <GoogleAutoAds />
      <AdAnalytics />
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 pb-24 lg:pb-8">
        
        {/* SECTION 1: Header and Introduction */}
        <section className="mb-12">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Market Movers</h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto lg:mx-0">
              Track the biggest stock gainers and losers across different time periods. 
              Stay informed about market momentum and identify trending securities.
            </p>
          </div>
            {/* Market overview intro */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Today&apos;s Market Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              Monitor real-time market movements and discover which stocks are making the biggest moves. 
              Our data is updated throughout the trading day to help you stay on top of market trends.
            </p>
          </div>
          
          {/* Top Banner Ad - Guaranteed ad placement */}
          <BannerWorkingAd className="flex justify-center mb-8" />
        </section>        {/* SECTION 2: Quick Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Market Movement Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-green-700 mb-3">Top Gainers Insights</h3>
              <p className="text-gray-600 leading-relaxed">
                Stocks showing the strongest upward momentum based on percentage gains. 
                These securities are attracting significant buying interest and market attention.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-red-700 mb-3">Top Losers Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Securities experiencing the largest declines, which may present opportunities 
                for value investors or indicate potential risk factors to monitor.
              </p>
            </div>
          </div>
          
          {/* Strategic ad after analysis section */}
          <InFeedWorkingAd className="mb-8" />
        </section>

        {/* SECTION 3: Mobile Layout - Stacked with natural breaks */}
        <div className="md:hidden">
          
          {/* Top Gainers Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-green-700">Top Gainers</h2>
              <div className="flex gap-1 overflow-x-auto">
                {PERIODS.map(p => (
                  <button
                    key={p.value}
                    className={`px-3 py-2 rounded-md font-medium text-sm border transition-all duration-200 whitespace-nowrap ${
                      gainersPeriod === p.value 
                        ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                    onClick={() => setGainersPeriod(p.value as 'day' | 'week' | 'month' | 'ytd')}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <MarketMoversTable type="gainers" period={gainersPeriod} />
            </div>
            
            {/* Insights after gainers table */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Gainers Insight</h3>
              <p className="text-green-700 text-sm leading-relaxed">
                Strong momentum in these stocks may indicate positive sentiment, earnings beats, 
                or sector rotation. Consider volume and market cap when evaluating opportunities.
              </p>
            </div>
          </section>          {/* Content break section with strategic ad */}
          <section className="mb-12">
            <div className="text-center py-8 border-t border-b border-gray-200 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Market Analysis Tools</h2>
              <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
                Discover more market insights with our comprehensive screening and analysis tools.
              </p>
            </div>
            {/* Strategic ad placement in content break */}
            <LargeWorkingAd className="mt-8" />
          </section>

          {/* Top Losers Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-red-700">Top Losers</h2>
              <div className="flex gap-1 overflow-x-auto">
                {PERIODS.map(p => (
                  <button
                    key={p.value}
                    className={`px-3 py-2 rounded-md font-medium text-sm border transition-all duration-200 whitespace-nowrap ${
                      losersPeriod === p.value 
                        ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' 
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                    }`}
                    onClick={() => setLosersPeriod(p.value as 'day' | 'week' | 'month' | 'ytd')}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <MarketMoversTable type="losers" period={losersPeriod} />
            </div>
            
            {/* Insights after losers table */}
            <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
              <h3 className="font-semibold text-red-800 mb-2">Losers Analysis</h3>
              <p className="text-red-700 text-sm leading-relaxed">
                Significant declines may indicate company-specific issues, sector weakness, 
                or broader market corrections. Research fundamentals before making investment decisions.
              </p>
            </div>
          </section>          {/* Trading tips section */}
          <ContentSection title="Trading Tips & Strategies" className="mb-12">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-3">Smart Trading Practices</h3>
              <ul className="space-y-2 text-blue-700 text-sm">
                <li>• Always verify volume alongside price movements</li>
                <li>• Consider market cap and liquidity before trading</li>
                <li>• Set stop-losses to manage downside risk</li>
                <li>• Research company fundamentals and recent news</li>
              </ul>
            </div>
          </ContentSection>

          {/* Additional mobile ad for better revenue */}
          <InFeedWorkingAd className="my-10" />

        </div>

        {/* SECTION 4: Desktop Layout - Side by side with center content */}
        <div className="hidden md:block">
          
          {/* Market data tables section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Live Market Data</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Gainers Column - 50% width */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-green-700">Top Gainers</h3>
                  <div className="flex gap-1">
                    {PERIODS.map(p => (
                      <button
                        key={p.value}
                        className={`px-3 py-1.5 rounded-md font-medium text-xs border transition-all duration-200 ${
                          gainersPeriod === p.value 
                            ? 'bg-green-50 border-green-500 text-green-700 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setGainersPeriod(p.value as 'day' | 'week' | 'month' | 'ytd')}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <MarketMoversTable type="gainers" period={gainersPeriod} />
                </div>
                
                {/* Add strategic ad after gainers table on desktop */}
                <BannerWorkingAd className="mt-6" />
              </div>

              {/* Losers Column - 50% width */}
              <div className="lg:col-span-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-red-700">Top Losers</h3>
                  <div className="flex gap-1">
                    {PERIODS.map(p => (
                      <button
                        key={p.value}
                        className={`px-3 py-1.5 rounded-md font-medium text-xs border transition-all duration-200 ${
                          losersPeriod === p.value 
                            ? 'bg-red-50 border-red-500 text-red-700 shadow-sm' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                        onClick={() => setLosersPeriod(p.value as 'day' | 'week' | 'month' | 'ytd')}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <MarketMoversTable type="losers" period={losersPeriod} />
                </div>
                
                {/* Add strategic ad after losers table on desktop */}
                <BannerWorkingAd className="mt-6" />
              </div>
                </div>
          </section>

          {/* Strategic mid-content ad */}
          <LargeWorkingAd className="mb-12" />

          {/* Additional analysis section */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-8 text-gray-800">Market Insights & Strategy</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Understanding Market Movers</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Market movers help identify stocks with significant momentum, whether positive or negative. 
                  These movements often reflect changing investor sentiment, earnings reports, or sector trends.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Monitor volume alongside price changes</li>
                  <li>• Consider market capitalization for context</li>
                  <li>• Research catalyst events and news</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Management Tips</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  While market movers present opportunities, they also carry risks. 
                  Implement proper risk management strategies to protect your capital.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• Set stop-loss orders to limit downside</li>
                  <li>• Diversify across different sectors</li>
                  <li>• Avoid FOMO-driven investment decisions</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Bottom banner ad for desktop */}
          <BannerWorkingAd className="flex justify-center mt-12" /></div>

      </div>
    </div>
  );
}
