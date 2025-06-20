'use client';

import { StockAnalysis } from '@/components/stock-analysis/StockAnalysis';
import { mockStockAnalysis } from '@/lib/mock-stock-analysis';
import BuyMeCoffeeButton from '@/components/ui/BuyMeCoffeeButton';
import BuyMeCoffeeMessage from '@/components/ui/BuyMeCoffeeMessage';
import { AdSenseAd } from '@/components/ui/AdSenseAd';
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function StockAnalysisPage() {
  const { data: session } = useSession();
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'premium'>('free');
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

  return (
    <div className="container mx-auto py-8">
      <Head>
        <title>TradeCraft Stock Analysis</title>
        <meta name="description" content="Analyze any stock with technical and fundamental metrics, trend analysis, and actionable signals. Upgrade for more features and daily requests." />
        <meta property="og:title" content="TradeCraft Stock Analysis" />
        <meta property="og:description" content="Analyze any stock with technical and fundamental metrics, trend analysis, and actionable signals. Upgrade for more features and daily requests." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/stock-analysis" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft Stock Analysis" />
        <meta name="twitter:description" content="Analyze any stock with technical and fundamental metrics, trend analysis, and actionable signals. Upgrade for more features and daily requests." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
      </Head>
      {/* Wide, left-aligned support message and right-aligned button */}
      <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <BuyMeCoffeeMessage />
        <div className="md:self-start">
          <BuyMeCoffeeButton />
        </div>
      </div>
      {/* Show ads for free and not signed in users, hide for paid */}
      {(!session || userPlan === 'free') && <AdSenseAd />}
      <StockAnalysis analysis={mockStockAnalysis} />
    </div>
  );
}