import type { Metadata } from 'next';
import { AdSenseAd } from '@/components/ui/AdSenseAd';
import { useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Stock Entry & Exit Tool – Find Where to Buy, Sell, or Hold Stocks | TradeCraft',
  description: 'TradeCraft’s Stock Entry & Exit Tool gives you clear, actionable buy, sell, and hold levels for any stock. Make smarter trading decisions with real-time momentum and support/resistance analysis.',
  alternates: { canonical: '/blog/stock-entry-exit-tool' },
};

export default function StockEntryExitToolBlog() {
  const { data: session } = useSession();

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Stock Entry and Exit Tool: Know Exactly Where to Buy and Sell</h1>
      <p>
        TradeCraft&apos;s Stock Entry and Exit Tool pinpoints the best price levels to enter and exit your trades. Using advanced momentum and price action analysis, the tool highlights optimal buy and sell zones, so you never have to guess where to act.
      </p>
      <h2>How the Entry/Exit Tool Works</h2>
      <ul>
        <li>Scans for momentum shifts and trend reversals</li>
        <li>Identifies support and resistance for precise entries</li>
        <li>Suggests exit points to lock in profits or cut losses</li>
        <li>Integrates with your trade plan for seamless execution</li>
      </ul>
      <h2>Benefits of Using TradeCraft&apos;s Entry/Exit Tool</h2>
      <p>
        Take the guesswork out of trading. With clear entry and exit signals, you can act decisively and avoid emotional mistakes.
      </p>
      <h2>Start Using the Entry/Exit Tool</h2>
      <p>
        Try TradeCraft today and see how easy it is to find high-probability trade setups.
      </p>
      {/* Show ads for free and not signed in users, hide for paid */}
      {(!session) && <AdSenseAd />}
    </main>
  );
}
