'use client';

import { StockAnalysis } from '@/components/stock-analysis/StockAnalysis';
import { mockStockAnalysis } from '@/lib/mock-stock-analysis';
import BuyMeCoffeeButton from '@/components/ui/BuyMeCoffeeButton';
import BuyMeCoffeeMessage from '@/components/ui/BuyMeCoffeeMessage';
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import MobileLargeAd from '@/components/ui/MobileLargeAd';
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
    <HybridAdStrategy>
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
        
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Stock Analysis Tool</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get comprehensive analysis for any stock with technical indicators, fundamental metrics, and actionable insights.
          </p>
        </div>

        {/* Top banner ad for free users */}
        {(!session || userPlan === 'free') && (
          <BannerWorkingAd className="flex justify-center mb-8" />
        )}

        {/* Support section */}
        <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <BuyMeCoffeeMessage />
          <div className="md:self-start">
            <BuyMeCoffeeButton />
          </div>
        </div>

        {/* Stock Analysis Component */}
        <StockAnalysis analysis={mockStockAnalysis} />

        {/* Bottom ad for free users */}
        {(!session || userPlan === 'free') && (
          <div className="mt-12">
            <div className="md:hidden">
              <MobileLargeAd className="my-8" />
            </div>
            <div className="hidden md:block">
              <LargeWorkingAd className="my-8" />
            </div>
          </div>
        )}
      </div>
    </HybridAdStrategy>
  );
}