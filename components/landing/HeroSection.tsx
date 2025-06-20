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
    <section className="w-full bg-background border-b border-border pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] max-w-full">
        <div className="w-full max-w-2xl text-center mx-auto">
          <p className="text-sm text-primary font-semibold mb-2 tracking-wide uppercase">Trade plans, signals & screeners</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary mb-5 leading-tight">
            Trade with Clarity & Confidence
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            Instantly generate actionable trade plans and discover high-momentum stocks. Simple, powerful, and built for modern traders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 w-full">
            <Button size="lg" asChild className="rounded-lg px-8 py-4 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition w-full sm:w-auto">
              <a href="/trade-plan/start-here">Generate Trade Plan</a>
            </Button>
            <Button size="lg" asChild variant="outline" className="rounded-lg px-8 py-4 text-base font-semibold border-border text-primary hover:bg-muted transition w-full sm:w-auto">
              <a href="#how-it-works">How It Works</a>
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-6 justify-center max-w-full">
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z" /></svg>
              10,000+ plans generated
            </span>
            <span className="flex items-center gap-2 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
              2,000+ momentum stocks scanned
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}