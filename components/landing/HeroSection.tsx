"use client";

import { ChevronRight, Lock, TrendingUp, BarChart3, Zap, Newspaper, Target } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StockForm } from './StockForm';
import { ScreenerFilters } from '@/components/screener/ScreenerFilters';
import { ScreenerResults } from '@/components/screener/ScreenerResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useState } from 'react';
import { ScreenerStock, ScreenerFilters as FilterType } from '@/lib/types';
import { getMockScreenerStocks } from '@/lib/mock-data';
import DiscoverScreener from './DiscoverScreener';
import './marquee.css';

export function HeroSection() {
  const [stocks, setStocks] = useState<ScreenerStock[]>([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleFilter = async (filters: FilterType) => {
    setLoading(true);
    setTimeout(() => {
      const results = getMockScreenerStocks(filters);
      setStocks(results);
      setLoading(false);
    }, 1000);
  };

  const handleFormspreeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/xnndpbwn', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(e.currentTarget),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitted(true);
        setEmail('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-primary-foreground"
      >
        Skip to main content
      </a>
      
      <section className="w-full bg-white pt-8 pb-20 sm:pt-12 sm:pb-24" id="main-content">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] max-w-full">
          <div className="w-full max-w-2xl text-center mx-auto">
            <p className="text-sm text-primary font-semibold mb-4 tracking-wide uppercase">Detailed Trade Plans & Momentum Screeners</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-6 leading-tight">
              Trade Strategies <br />& AI Stock Analysis
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Build winning trading strategies with AI-powered trade plans, momentum screening, and professional market analysis tools.
            </p>
            
            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center mb-12 w-full max-w-lg mx-auto">
              <Link 
                href="/trade-plan/start-here" 
                className="group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg flex-1"
                aria-label="Generate your free trade plan"
              >
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white px-5 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all hover:shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2 w-full">
                  <TrendingUp className="h-4 w-4 flex-shrink-0" />
                  <span className="text-center leading-tight">Generate Trade Plan</span>
                </div>
              </Link>
              
              <Link 
                href="/trade-plan/demo" 
                className="group focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 rounded-lg flex-1"
                aria-label="Try a live TSLA demo trade plan"
              >
                <div className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400 px-5 py-3 rounded-lg font-semibold text-sm sm:text-base transition-all hover:shadow-md hover:scale-[1.02] flex items-center justify-center gap-2 w-full">
                  <BarChart3 className="h-4 w-4 flex-shrink-0" />
                  <span className="text-center leading-tight">Try Free (No Login)</span>
                </div>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <div className="w-full max-w-5xl mx-auto mb-12 relative">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Browser Header */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="flex-1 text-center">
                  <div className="bg-white rounded-md px-3 py-1 text-sm text-gray-600 inline-block">
                    tradingsetup.pro/trade-plan/TSLA
                  </div>
                </div>
              </div>
              
              {/* Trade Plan Header Section */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50">
                {/* Stock Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-bold text-gray-900">TSLA</h2>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">NASDAQ</span>
                      </div>
                      <p className="text-gray-600 text-sm">Tesla Inc.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">$248.42</div>
                    <div className="text-sm text-green-600 font-medium">+2.1%</div>
                  </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {/* Time Horizon */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">TIME HORIZON</div>
                        <div className="text-sm font-semibold">Swing Trade</div>
                      </div>
                    </div>
                  </div>

                  {/* Setup Type */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">SETUP</div>
                        <div className="text-sm font-semibold">Breakout</div>
                      </div>
                    </div>
                  </div>

                  {/* Risk/Reward */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Target className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">RISK/REWARD</div>
                        <div className="text-sm font-semibold">1:2.8</div>
                      </div>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="bg-white rounded-lg p-4 shadow-sm border">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Zap className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">CONFIDENCE</div>
                        <div className="text-sm font-semibold text-green-600">High</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Executive Summary Section */}
                <div className="bg-white rounded-xl p-5 shadow-sm border mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Strong Buy Signal - High Probability Setup</h3>
                      <p className="text-sm text-gray-600">Consider entering this trade with standard position size</p>
                    </div>
                  </div>
                  
                  {/* Key Levels Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">ENTRY</div>
                      <div className="text-sm font-bold">$245.50 - $250.00</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">STOP</div>
                      <div className="text-sm font-bold text-red-600">$238.00</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">TARGET 1</div>
                      <div className="text-sm font-bold text-green-600">$265.00</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500 mb-1">R:R</div>
                      <div className="text-sm font-bold">1:2.8</div>
                    </div>
                  </div>
                </div>

                {/* Technical Analysis Preview */}
                <div className="bg-white rounded-xl p-5 shadow-sm border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Technical Analysis</h3>
                    <div className="flex gap-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">BULLISH</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">RSI: 58.4</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Moving Average (20 EMA)</span>
                      <span className="text-sm font-medium text-green-600">Bullish</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">MACD Signal</span>
                      <span className="text-sm font-medium text-green-600">Bullish</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Volume Confirmation</span>
                      <span className="text-sm font-medium text-green-600">✓ Confirmed</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Support Level</span>
                      <span className="text-sm font-medium">$240.50</span>
                    </div>
                  </div>

                  {/* Mini Chart Placeholder */}
                  <div className="mt-4 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-lg flex items-end justify-center">
                    <div className="text-sm text-gray-600">Interactive Chart Preview</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-3 border">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900">Live Data</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-3 border">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-gray-900">AI Generated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-50 py-16 sm:py-20" id="features">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Trading Strategy Tools & AI Stock Analysis Platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Build systematic trading strategies with AI-powered analysis, momentum screening, and professional trade planning tools for consistent market success.
            </p>
          </div>

          {/* Features Grid */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="grid" aria-label="Trading tools and features">
              <Link 
                href="/trade-plan/start-here" 
                className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label="Generate trade plans with AI insights"
                role="gridcell"
              >
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border-2 border-slate-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-slate-300 hover:bg-slate-50 focus-within:border-slate-300 w-full min-h-[210px] cursor-pointer relative">
                  <div className="absolute -top-2 -right-2 bg-slate-700 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                    POPULAR
                  </div>
                  <div className="mb-4" aria-hidden="true">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shadow-sm">
                      <TrendingUp className="h-6 w-6 text-slate-700" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 leading-tight">Trade Plans</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">Generate data-driven trade plans enhanced with AI insights and risk management.</p>
                  <div className="mt-auto">
                    <div className="bg-slate-700 text-white px-5 py-2 rounded-lg font-semibold text-sm group-hover:bg-slate-800 transition-all shadow-sm">
                      Generate Plan →
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/screener" 
                className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label="Screen stocks for momentum opportunities"
                role="gridcell"
              >
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border-2 border-yellow-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-yellow-300 hover:bg-yellow-50 focus-within:border-yellow-300 w-full min-h-[210px] cursor-pointer relative">
                  <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                    PREMIUM
                  </div>
                  <div className="mb-4" aria-hidden="true">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center shadow-sm">
                      <BarChart3 className="h-6 w-6 text-yellow-700" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 leading-tight">Stock Screener</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">Discover high-momentum stocks with advanced screening tools and indicators.</p>
                  <div className="mt-auto">
                    <div className="bg-yellow-600 text-white px-5 py-2 rounded-lg font-semibold text-sm group-hover:bg-yellow-700 transition-all shadow-sm">
                      Screen Stocks →
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/market-movers" 
                className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label="View market movers and gainers"
                role="gridcell"
              >
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border-2 border-teal-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-teal-300 hover:bg-teal-50 focus-within:border-teal-300 w-full min-h-[210px] cursor-pointer relative">
                  <div className="absolute -top-2 -right-2 bg-teal-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                    FREE
                  </div>
                  <div className="mb-4" aria-hidden="true">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center shadow-sm">
                      <Zap className="h-6 w-6 text-teal-700" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 leading-tight">Market Movers</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">Track the biggest gainers and losers in real-time and stay updated with market trends.</p>
                  <div className="mt-auto">
                    <div className="bg-teal-600 text-white px-5 py-2 rounded-lg font-semibold text-sm group-hover:bg-teal-700 transition-all shadow-sm">
                      View Movers →
                    </div>
                  </div>
                </div>
              </Link>
              
              <Link 
                href="/news" 
                className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label="Read market news and insights"
                role="gridcell"
              >
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md border-2 border-blue-200 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-blue-300 hover:bg-blue-50 focus-within:border-blue-300 w-full min-h-[210px] cursor-pointer relative">
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm">
                    FREE
                  </div>
                  <div className="mb-4" aria-hidden="true">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shadow-sm">
                      <Newspaper className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 leading-tight">Market News</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">Stay updated with AI-curated market news and insights from trusted sources.</p>
                  <div className="mt-auto">
                    <div className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm group-hover:bg-blue-700 transition-all shadow-sm">
                      Read News →
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
        
        {/* <div className="w-full max-w-2xl text-center mx-auto">
          <div className="flex flex-wrap items-center gap-4 mt-6 justify-center max-w-full">
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              10,000+ trade plans generated
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></circle></svg>
              2,000+ momentum stocks analyzed
            </span>
          </div>
        </div> */}
    </>
  );
}