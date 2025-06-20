import type { Metadata } from 'next';
import { AdSenseAd } from '@/components/ui/AdSenseAd';
import { useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Small Cap Stock Screener – Discover High Potential Small Caps | TradeCraft',
  description: 'Find the best small cap stocks with TradeCraft’s Small Cap Stock Screener. Screen for high-growth, high-momentum small caps with actionable trade plans and risk management.',
  alternates: { canonical: '/blog/small-cap-stock-screener' },
};

export default function SmallCapStockScreenerBlog() {
  const { data: session } = useSession();

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Small Cap Stock Screener: Discover High-Growth Opportunities</h1>
      <p>
        TradeCraft&apos;s Small Cap Stock Screener is designed for traders seeking explosive growth. Filter for small cap stocks with strong momentum, volume, and technical setups—all in one place.
      </p>
      <h2>How the Small Cap Screener Works</h2>
      <ul>
        <li>Focuses on stocks under $2B market cap</li>
        <li>Highlights unusual volume and price breakouts</li>
        <li>Customizable filters: sector, volatility, float, and more</li>
        <li>Integrates with your trade plan for actionable setups</li>
      </ul>
      <h2>Why Trade Small Caps?</h2>
      <p>
        Small caps can deliver outsized returns, but require careful screening. TradeCraft gives you the edge with real-time data and proven filters.
      </p>
      <h2>Start Screening Small Caps</h2>
      <p>
        Try TradeCraft&apos;s Small Cap Stock Screener and find your next big winner.
      </p>
      {/* Show ads for free and not signed in users, hide for paid */}
      {(!session) && <AdSenseAd />}
    </main>
  );
}
