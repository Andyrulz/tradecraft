import { Metadata } from 'next';
import { TradePlanContentDemo } from '@/components/trade-plan-seo/TradePlanContentDemo';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'TSLA Live Demo - Free Trade Plan | TradeCraft',
  description: 'See TradeCraft in action with a live TSLA trade plan. Real market data, AI analysis, and professional trading strategy - no signup required.',
  keywords: ['TSLA trade plan', 'Tesla trading', 'live demo', 'free trade plan', 'AI trading'],
};

// Get cached TSLA trade plan for initial display
async function getTSLACachedData() {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXTAUTH_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/trade-plan/demo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        symbol: 'TSLA',
        horizon: 'swing',
      }),
      // Cache for 5 minutes to reduce API calls but still show live data
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.tradePlan || data;
  } catch (error) {
    console.error('Failed to get TSLA cached data:', error);
    return null;
  }
}

export default async function TSLADemoPage() {
  const cachedTradePlan = await getTSLACachedData();

  return (
    <main className="flex-1 pt-[68px] pb-12">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Demo banner */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4 text-center mb-8">
          <div className="flex items-center justify-center gap-2 text-blue-800 mb-2">
            <TrendingUp className="h-5 w-5" />
            <span className="font-semibold">Live TSLA Demo</span>
          </div>
          <p className="text-sm text-blue-700">
            This is a live demonstration using real TSLA market data. Experience the full power of TradeCraft&apos;s AI analysis.
          </p>
        </div>

        {/* Use the demo-specific TradePlanContent component */}
        <TradePlanContentDemo 
          symbol="TSLA" 
          initialCachedData={cachedTradePlan}
        />

        {/* Demo-specific upgrade CTA that replaces the standard one */}
        <Card className="bg-gradient-to-r from-slate-700 to-slate-800 text-white mt-8">
          <CardContent className="text-center space-y-4 py-8">
            <Badge className="bg-white text-slate-800 mb-4">Demo Complete</Badge>
            <h3 className="text-2xl font-bold">Ready to Generate Trade Plans for Any Stock for FREE?</h3>
            <p className="text-slate-200 max-w-2xl mx-auto">
              You&apos;ve seen TradeCraft&apos;s AI in action with live TSLA data. Sign up now to generate 
              <strong> 1 free trade plan every day</strong> for any stock symbol. No payment required to get started!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signin">
                <Button size="lg" className="min-w-[200px] bg-white text-slate-800 hover:bg-gray-100">
                  Sign In to Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button 
                  size="lg" 
                  className="min-w-[200px] bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 transition-colors"
                >
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
