import type { Metadata } from 'next';
import { AdSenseAd } from '@/components/ui/AdSenseAd';
import { useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Momentum Stock Screener – Find High Momentum Stocks Daily | TradeCraft',
  description: 'Discover the best momentum stocks every day with TradeCraft’s Momentum Stock Screener. Scan for breakouts, volume surges, and actionable setups in real time.',
  alternates: { canonical: '/blog/momentum-stock-screener' },
};

export default function MomentumStockScreenerBlog() {
  const { data: session } = useSession();

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Momentum Stock Screener: Find the Hottest Stocks Fast</h1>
      <p>
        TradeCraft&apos;s Momentum Stock Screener scans the market for stocks showing strong price and volume momentum. Instantly discover breakout candidates and trending stocks before the crowd.
      </p>
      <h2>How TradeCraft Screens for Momentum</h2>
      <ul>
        <li>Real-time scanning of thousands of stocks</li>
        <li>Filters for high relative volume and price strength</li>
        <li>Customizable criteria: market cap, sector, volatility, and more</li>
        <li>Visual momentum charts and watchlist integration</li>
      </ul>
      <h2>Why Momentum Matters</h2>
      <p>
        Momentum trading captures big moves quickly. TradeCraft helps you spot opportunities early and manage risk with confidence.
      </p>
      <h2>Try the Momentum Stock Screener</h2>
      <p>
        Sign up to access TradeCraft&apos;s powerful screener and never miss another momentum play.
      </p>
      {/* Show ads for free and not signed in users, hide for paid */}
      {(!session) && <AdSenseAd />}
    </main>
  );
}
