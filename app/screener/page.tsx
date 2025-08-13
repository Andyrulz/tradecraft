'use client';

import { useEffect, useState } from 'react';
import { ScreenerFilters } from '@/components/screener/ScreenerFilters';
import { ScreenerResults } from '@/components/screener/ScreenerResults';
import { Card, CardContent } from '@/components/ui/card';
import { ScreenerStock, ScreenerFilters as FilterType } from '@/lib/types';
import Link from 'next/link';
import { getMockScreenerStocks } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { useSession, signIn } from 'next-auth/react';
import { StructuredData } from '@/components/seo/StructuredData';

function ScreenerRow({ stock }: { stock: any }) {
  return (
    <div className="border rounded-xl p-6 mb-6 bg-white shadow-md flex flex-col md:flex-row md:items-center gap-4 hover:shadow-lg transition-shadow">
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-bold text-2xl md:text-3xl text-primary truncate w-24">{stock.symbol}</span>
          <span className="text-gray-700 text-lg font-medium truncate max-w-xs">{stock.company_name}</span>
        </div>
        <div className="flex flex-wrap gap-4 mt-2 text-base">
          <span>Price: <span className="font-semibold">{stock.price ?? 'N/A'}</span></span>
          <span>Setup: <span className="font-semibold text-blue-700">{stock.setup.replace('_', ' ')}</span></span>
          <span>Confidence: <span className={`font-semibold ${stock.confidence === 'high' ? 'text-green-600' : stock.confidence === 'medium' ? 'text-yellow-600' : 'text-red-600'}`}>{stock.confidence?.toUpperCase()}</span></span>
        </div>
        <div className="mt-2 text-sm text-gray-800 whitespace-pre-line">
          {stock.summary}
        </div>
        <div className={`mt-1 text-sm font-semibold ${stock.confidence === 'high' ? 'text-green-700' : stock.confidence === 'medium' ? 'text-yellow-700' : 'text-red-700'}`}>{stock.trade_recommendation}</div>
        {stock.entry && stock.stopLoss && stock.targets && (
          <div className="mt-2 text-sm text-gray-700 flex flex-wrap gap-4">
            <span>Entry: <b>{stock.entry.low?.toFixed(2)} - {stock.entry.high?.toFixed(2)}</b></span>
            <span>SL: <b>{stock.stopLoss.price?.toFixed(2)}</b></span>
            <span>Target: <b>{stock.targets[0]?.price?.toFixed(2)}</b></span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end justify-between min-w-[140px] gap-2">
        <a
          href={stock.planurl}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow transition-colors text-center"
        >
          View Detail Plan
        </a>
      </div>
    </div>
  );
}

export default function ScreenerPage() {
  const { data: session } = useSession();
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'premium'>('free');
  const [stocks, setStocks] = useState<ScreenerStock[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [planType, setPlanType] = useState<'free' | 'pro' | 'premium' | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const runScreener = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/momentum-screener/run', { method: 'POST' });
        const data = await res.json();
        if (data.success) {
          setStocks(data.top10);
        } else {
          setError(data.error || 'Failed to run screener.');
        }
      } catch (e) {
        setError('Failed to run screener.');
      } finally {
        setLoading(false);
      }
    };
    runScreener();
  }, []);

  useEffect(() => {
    async function fetchPlan() {
      if (!session?.user?.email) return;
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', session.user.email)
        .single();
      if (!user) return;
      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('plan_type')
        .eq('user_id', user.id)
        .single();
      setUserPlan(sub?.plan_type || 'free');
    }
    fetchPlan();
  }, [session]);

  useEffect(() => {
    // Fetch user plan from Supabase (client-side, since this is a client component)
    async function fetchPlan() {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();
      if (!session?.user?.email) return;
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', session.user.email)
        .single();
      if (!user) return;
      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('plan_type')
        .eq('user_id', user.id)
        .single();
      setPlanType(sub?.plan_type || 'free');
    }
    fetchPlan();
  }, []);

  // Only allow Premium users to run screener
  useEffect(() => {
    if (planType && planType !== 'premium') {
      setShowUpgrade(true);
    }
  }, [planType]);

  useEffect(() => {
    if (error && error.toLowerCase().includes('unauthorized')) {
      setShowSignIn(true);
    }
  }, [error]);

  const handleFilter = async (filters: FilterType) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const results = getMockScreenerStocks(filters);
      setStocks(results);
      setLoading(false);
    }, 1000);
  };

  return (
    <main className="flex-1 pt-[68px] pb-12">
      <Head>
        <title>Free Stock Screener - Find Best Momentum Stocks | TradeCraft Pro</title>
        <meta name="description" content="Free stock screener finds top momentum stocks with breakout patterns. Screen 4000+ stocks daily for volume spikes, technical setups, and profitable trades." />
        <meta name="keywords" content="free stock screener, momentum stock screener, stock scanner, breakout stocks, volume scanner, day trading stocks, swing trading stocks, stock analysis tool" />
        <meta property="og:title" content="TradeCraft Stock Screener - Find Top Momentum Stocks Daily" />
        <meta property="og:description" content="Discover the top 10 momentum stocks daily with TradeCraft's advanced screener. Find breakout setups, volume spikes, and high-potential trading opportunities." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/screener" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft Stock Screener - Find Top Momentum Stocks Daily" />
        <meta name="twitter:description" content="Discover the top 10 momentum stocks daily with TradeCraft's advanced screener. Find breakout setups and high-potential trading opportunities." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <link rel="canonical" href="https://www.tradingsetup.pro/screener" />
      </Head>
      <div className="container mx-auto px-4">
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.tradingsetup.pro"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Stock Screener",
              "item": "https://www.tradingsetup.pro/screener"
            }
          ]
        }} />

        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-3">
            Free Stock Screener - Find Best Momentum Stocks Daily
          </h1>
          <p className="text-lg text-muted-foreground">
            Screen 4000+ stocks for breakout patterns, volume spikes, and profitable trading setups. Updated daily with fresh opportunities.
          </p>
        </div>
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <span className="block h-10 w-10 border-4 border-sky-500 border-t-transparent border-b-transparent rounded-full animate-spin mb-4"></span>
            <div className="text-lg font-semibold text-sky-700">Running Daily Momentum Screener…</div>
          </div>
        )}
        {error && <div className="text-center text-red-500 py-8">{error}</div>}
        {/* Screener results only for Premium users */}
        {planType === 'premium' && (
          <div className="mt-8">
            {stocks.map((stock) => (
              <ScreenerRow key={stock.symbol} stock={stock} />
            ))}
          </div>
        )}

        {/* Newsletter Signup Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Daily Market Alerts
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join 10,000+ traders who get our daily pre-market alerts with top momentum picks, breakout setups, and market insights delivered to their inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Free. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Related Resources Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Learn More About Stock Screening</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border">
              <h3 className="font-bold text-lg mb-2">
                <Link href="/blog/momentum-trading-guide" className="text-blue-600 hover:text-blue-800">
                  Momentum Trading Strategy Guide
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">
                Learn how to identify and trade momentum stocks using volume, price action, and technical indicators.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border">
              <h3 className="font-bold text-lg mb-2">
                <Link href="/blog/breakout-patterns" className="text-blue-600 hover:text-blue-800">
                  Breakout Pattern Recognition
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">
                Master the art of spotting breakout patterns before they happen with our comprehensive guide.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md border">
              <h3 className="font-bold text-lg mb-2">
                <Link href="/education/risk-management" className="text-blue-600 hover:text-blue-800">
                  Risk Management for Traders
                </Link>
              </h3>
              <p className="text-gray-600 text-sm">
                Protect your capital and maximize profits with proven risk management techniques.
              </p>
            </div>
          </div>
        </div>
        {/* Show ads for free and not signed in users, hide for paid */}
        {/* No ads in paid screener feature */}
        {/* Upgrade modal for non-premium users */}
        <Dialog open={showUpgrade} onOpenChange={setShowUpgrade}>
          <DialogContent>
            <div className="text-center p-4">
              <h2 className="text-2xl font-bold mb-2 text-sky-800">Unlock the Momentum Screener</h2>
              <p className="mb-4 text-gray-700 text-lg">
                The Momentum Screener is your edge for finding the <span className="font-semibold text-sky-700">top 10 actionable stocks</span> every day—setups you won&apos;t find anywhere else. <br /><br />
                <span className="font-semibold text-sky-700">Upgrade to Premium for just $14.65/month</span> (less than a night at the movies) and you could make back your subscription with a single great trade.
              </p>
              <p className="mb-6 text-gray-600 text-base">
                Premium unlocks daily screener access, advanced filters, and priority support. Don’t miss out on the next big breakout!
              </p>
              <Button asChild size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-sky-900 font-bold text-lg px-8 py-3 rounded-xl shadow-lg">
                <Link href="/pricing">Upgrade to Premium</Link>
              </Button>
              <div className="mt-4 text-sm text-gray-500">Cancel anytime. No risk, all reward.</div>
            </div>
          </DialogContent>
        </Dialog>
        {/* Sign In modal for unauthorized access */}
        <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
          <DialogContent>
            <div className="text-center p-4">
              <h2 className="text-2xl font-bold mb-2 text-sky-800">Sign In Required</h2>
              <p className="mb-4 text-gray-700 text-lg">
                Please sign in with Google to access the Momentum Screener and discover today&apos;s top actionable stocks.
              </p>
              <Button
                size="lg"
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg px-8 py-3 rounded-xl shadow-lg"
                onClick={() => signIn('google')}
              >
                Sign In with Google
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Page-specific Structured Data */}
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Stock Screener - TradeCraft Pro",
          "url": "https://www.tradingsetup.pro/screener",
          "description": "Advanced stock screening tool to find momentum stocks, breakout setups, and high-potential trading opportunities with real-time market data.",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "softwareVersion": "1.0",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "description": "Free stock screener with premium features available"
          },
          "featureList": [
            "Momentum Stock Screening",
            "Breakout Detection",
            "Volume Analysis",
            "Technical Indicators",
            "Real-time Market Data",
            "Custom Filters"
          ],
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro"
          }
        }} />
        
        <StructuredData data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Stock Market Screener",
          "description": "Professional stock screening service for finding momentum stocks and trading opportunities",
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro"
          },
          "serviceType": "Financial Data Service",
          "areaServed": "United States",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Screener Features",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Free Screener",
                  "description": "Basic stock screening with limited access"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Premium Screener",
                  "description": "Full access to momentum screener with top 10 daily picks"
                }
              }
            ]
          }
        }} />
      </div>
    </main>
  );
}
