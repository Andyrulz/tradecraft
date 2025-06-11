"use client";

import { ChevronRight, Lock } from 'lucide-react';
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
      {/* Scrolling Banner for Callouts */}
      <div className="w-full bg-gradient-to-r from-green-200 via-green-100 to-sky-100 py-2 border-b border-green-300 shadow-sm flex items-center justify-center overflow-hidden z-20 relative" style={{marginTop: '64px'}}>
        <div className="animate-marquee whitespace-nowrap flex items-center gap-3">
          <svg width="20" height="20" fill="none" viewBox="0 0 1043.63 592.71" xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2"><g><ellipse cx="521.81" cy="296.35" rx="521.81" ry="296.35" fill="#fff"/><path d="M588.67 296.35c0 163.6-132.62 296.35-296.35 296.35S-4.03 459.95-4.03 296.35 128.59 0 292.32 0s296.35 132.62 296.35 296.35z" fill="#00ab6c"/><path d="M1043.63 296.35c0 163.6-132.62 296.35-296.35 296.35s-296.35-132.62-296.35-296.35S583.65 0 747.28 0s296.35 132.62 296.35 296.35z" fill="#00ab6c"/><ellipse cx="521.81" cy="296.35" rx="208.06" ry="296.35" fill="#fff"/></g></svg>
          <a
            href="/blog/stan-weinstein-market-sentiment-june-2025"
            className="text-green-900 font-semibold hover:underline hover:text-green-700 transition-colors text-base md:text-lg"
            aria-label="Read: Stan-weinstein-market-sentiment-june-2025"
            style={{ letterSpacing: '0.01em' }}
          >
            🌟 New: Stan Weinstein's Market Sentiment – June 2025 Update!
          </a>
        </div>
      </div> 
      {/* Main Hero Section */}
      <div className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-sky-100 via-white to-blue-50" style={{marginTop: '0'}}>
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,199,255,0.10),rgba(255,255,255,0))]" />
      </div>
      <div className="container relative z-10 mx-auto px-4 pb-8 md:pb-14 pt-8 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
            <div className="flex flex-row items-center gap-3 mb-4 mx-auto lg:mx-0 w-fit">
              <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-sky-200 text-sky-800 transition-transform duration-300 hover:scale-105">
                <span className="flex h-2 w-2 rounded-full bg-sky-500 mr-2"></span>
                Professional Trading Tools
              </span>
              <a
                href="/blog/market-symmetry-in-base-patterns"
                className="inline-flex items-center bg-green-100 text-green-700 text-xs font-semibold rounded-full px-3 py-1 hover:bg-green-200 transition-colors border border-green-200 shadow-sm whitespace-nowrap"
                aria-label="Featured Insight: Market Symmetry in Base Patterns"
                style={{ fontSize: '0.97em', lineHeight: 1.3 }}
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 1043.63 592.71" xmlns="http://www.w3.org/2000/svg" className="mr-1"><g><ellipse cx="521.81" cy="296.35" rx="521.81" ry="296.35" fill="#fff"/><path d="M588.67 296.35c0 163.6-132.62 296.35-296.35 296.35S-4.03 459.95-4.03 296.35 128.59 0 292.32 0s296.35 132.62 296.35 296.35z" fill="#00ab6c"/><path d="M1043.63 296.35c0 163.6-132.62 296.35-296.35 296.35s-296.35-132.62-296.35-296.35S583.65 0 747.28 0s296.35 132.62 296.35 296.35z" fill="#00ab6c"/><ellipse cx="521.81" cy="296.35" rx="208.06" ry="296.35" fill="#fff"/></g></svg>
                Discover the Power of Market Symmetry
              </a>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight">
              Trade Plan Generator & <span className="text-primary bg-primary/10 px-2 rounded-md">Momentum Stock Screener</span>
              <br />
              <span className="text-sky-700 block mt-4">Find When & Where to Buy, Sell, or Hold</span>
            </h1>
            <ul className="text-base text-muted-foreground max-w-2xl mx-auto lg:mx-0 mt-2 mb-2 list-disc list-inside space-y-1">
              <li><b>Trade plan generator</b> for any stock</li>
              <li><b>Stock entry and exit tool</b> with clear buy/sell/hold signals</li>
              <li><b>Momentum & small cap stock screener</b> for new ideas</li>
              <li>Set <b>stop loss and targets</b> with confidence</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <Button size="lg" variant="outline" asChild className="group rounded-xl text-lg px-8 py-4 border-2 border-sky-300 hover:border-sky-500 transition-all duration-300 hover:scale-105">
                <a href="#how-it-works" className="flex items-center justify-center">
                  How It Works
                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="bg-white/90 backdrop-blur-lg border-none rounded-2xl shadow-xl p-2 sm:p-4 md:p-6 max-w-full sm:max-w-xl w-full mx-auto">
              <Tabs defaultValue="symbol" className="space-y-6 w-full">
                <TabsList className="flex w-full bg-sky-50 rounded-full mb-4 p-1 gap-1 sm:gap-4 md:gap-6 justify-center flex-wrap">
                  <TabsTrigger
                    value="symbol"
                    className="flex-1 min-w-[120px] sm:min-w-[160px] max-w-full whitespace-nowrap text-sm sm:text-lg font-bold px-1 sm:px-4 py-2 rounded-full transition-all duration-200 text-sky-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-400 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 data-[state=active]:z-10 bg-white/70 hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-400"
                  >
                    Generate a Trade Plan
                  </TabsTrigger>
                  <div className="flex flex-col items-center flex-1 min-w-[120px] sm:min-w-[180px] max-w-full -mt-7">
                    <span className="mb-0 flex items-center gap-1 text-xs font-bold text-red-500" style={{letterSpacing: '0.02em'}}>
                      <span role="img" aria-label="fire" className="text-base">🔥</span> New
                    </span>
                    <TabsTrigger
                      value="discover"
                      className="w-full whitespace-nowrap text-sm sm:text-lg font-bold px-1 sm:px-4 py-2 rounded-full transition-all duration-200 text-sky-800 data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky-400 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:scale-105 data-[state=active]:z-10 bg-white/70 hover:bg-sky-100 focus-visible:ring-2 focus-visible:ring-sky-400"
                    >
                      Find Momentum Stocks
                    </TabsTrigger>
                  </div>
                </TabsList>
                <TabsContent value="symbol" className="space-y-4 animate-in fade-in-50 duration-500">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-center">Enter Stock Symbol</h3>
                    <p className="text-base text-muted-foreground text-center">
                      Get a detailed trade plan with entry points, targets, and risk management
                    </p>
                  </div>
                  <div className="flex justify-center mt-2 mb-0">
                    <span className="text-green-700 bg-green-50 rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1">🎉 Generate trade plans for free now</span>
                  </div>
                  <StockForm />
                  <div className="flex flex-col gap-1 pt-1">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full text-sky-700 border-sky-300 bg-sky-50 hover:bg-sky-100 font-bold shadow-sm hover:border-sky-500 transition-all duration-200"
                    >
                      <a href="/trade-plan/example">See Example (No Sign-in Needed)</a>
                    </Button>
                  </div>
                  {/* Trust/metrics bar below CTA */}
                  <div className="flex flex-wrap items-center gap-3 mt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold bg-white/80 rounded-full px-3 py-1 shadow-sm">
                      <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
                      10,000+ plans generated
                    </div>
                    <div className="flex items-center gap-2 text-sm text-blue-500 font-semibold bg-white/80 rounded-full px-3 py-1 shadow-sm">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
                      2,000+ momentum stocks scanned and traded
                    </div>
                    {/* <div className="flex items-center gap-2 text-sm text-gray-500 font-semibold bg-white/80 rounded-full px-3 py-1 shadow-sm">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.57-1.838-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                      Awarded &quot;Top 10 Trading Apps 2025&quot; by FinEdge Community
                    </div> */}
                  </div>
                  <p className="text-center text-muted-foreground text-sm mt-4">
                    <a href="/blog" className="underline hover:text-primary">Read our in-depth trading guides on the TradeCraft Blog</a>
                  </p>
                </TabsContent>
                <TabsContent value="discover" className="space-y-6 animate-in fade-in-50 duration-500">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-center">Find High Momentum Stocks</h3>
                    <p className="text-base text-muted-foreground text-center">
                      Instantly screen for today’s top 10 actionable momentum stocks—refreshed every day.
                    </p>
                  </div>
                  <DiscoverScreener />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}