"use client";

import { ChevronRight, Lock, TrendingUp, BarChart3, Zap, Newspaper } from 'lucide-react';
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
      
      <section className="w-full bg-background border-b border-border pt-16 pb-12 sm:pt-20 sm:pb-16" id="main-content">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] max-w-full">
          <div className="w-full max-w-2xl text-center mx-auto">
            <p className="text-sm text-primary font-semibold mb-2 tracking-wide uppercase">Detailed Trade plans, signals & screeners</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-5 leading-tight">
              Trade with Clarity & Confidence
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Instantly generate data-driven trade plans enhanced with AI insights and discover high-momentum stocks. Simple, powerful, and built for modern traders.
            </p>
          </div>
          
          {/* CTA Tiles - Full Width */}
          <div className="w-full max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" role="grid" aria-label="Trading tools and features">
            <Link 
              href="/trade-plan/start-here" 
              className="block group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
              aria-label="Generate trade plans with AI insights"
              role="gridcell"
            >
              <div className="bg-primary/5 rounded-xl p-5 sm:p-6 shadow-sm border-2 border-primary/30 flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-primary/50 hover:bg-primary/10 focus-within:border-primary/50 w-full min-h-[210px] cursor-pointer relative">
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full font-medium">
                  Popular
                </div>
                <div className="mb-4" aria-hidden="true">
                  <TrendingUp className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary leading-tight">Trade Plans</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Generate data-driven trade plans enhanced with AI insights and risk management.</p>
                <div className="mt-auto">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-primary/90 transition-colors">
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
              <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border border-border flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-primary/20 hover:bg-muted/20 focus-within:border-primary/20 w-full min-h-[210px] cursor-pointer">
                <div className="mb-4" aria-hidden="true">
                  <BarChart3 className="h-10 w-10 text-chart-1" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary leading-tight">Stock Screener</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Discover high-momentum stocks with advanced screening tools and indicators.</p>
                <div className="mt-auto">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-secondary/90 transition-colors">
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
              <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border border-border flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-primary/20 hover:bg-muted/20 focus-within:border-primary/20 w-full min-h-[210px] cursor-pointer">
                <div className="mb-4" aria-hidden="true">
                  <Zap className="h-10 w-10 text-chart-2" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary leading-tight">Market Movers</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Track the biggest gainers and losers in real-time and stay updated with market trends.</p>
                <div className="mt-auto">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-secondary/90 transition-colors">
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
              <div className="bg-background rounded-xl p-5 sm:p-6 shadow-sm border border-border flex flex-col items-center text-center transition-all hover:shadow-lg hover:border-primary/20 hover:bg-muted/20 focus-within:border-primary/20 w-full min-h-[210px] cursor-pointer">
                <div className="mb-4" aria-hidden="true">
                  <Newspaper className="h-10 w-10 text-chart-3" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 text-primary leading-tight">Market News</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Stay updated with AI-curated market news and insights from trusted sources.</p>
                <div className="mt-auto">
                  <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium text-sm group-hover:bg-secondary/90 transition-colors">
                    Read News →
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        
        {/* <div className="w-full max-w-2xl text-center mx-auto">
          <div className="flex flex-wrap items-center gap-4 mt-6 justify-center max-w-full">
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              10,000+ trade plans generated
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
              2,000+ momentum stocks analyzed
            </span>
          </div>
        </div> */}
      </div>
    </section>
    </>
  );
}