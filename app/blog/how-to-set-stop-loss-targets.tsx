import type { Metadata } from 'next';
import { AdSenseAd } from '@/components/ui/AdSenseAd';
import { useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'How to Set Stop Loss & Targets – Risk Management with TradeCraft',
  description: 'Learn how to set stop loss and profit targets using TradeCraft. Our platform calculates optimal levels for every trade, helping you manage risk and maximize gains.',
  alternates: { canonical: '/blog/how-to-set-stop-loss-targets' },
};

export default function HowToSetStopLossTargetsBlog() {
  const { data: session } = useSession();

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>How to Set Stop Loss and Targets: Risk Management Made Simple</h1>
      <p>
        TradeCraft makes it easy to set smart stop loss and target levels for every trade. Our platform analyzes volatility, support/resistance, and your risk tolerance to recommend optimal levels—so you can protect your capital and maximize gains.
      </p>
      <h2>How TradeCraft Helps You Manage Risk</h2>
      <ul>
        <li>Automatic calculation of stop loss based on volatility and chart structure</li>
        <li>Target suggestions using recent highs/lows and risk/reward ratios</li>
        <li>Visual risk overlays on your trade plan chart</li>
        <li>Customizable settings for every trading style</li>
      </ul>
      <h2>Why Stop Losses and Targets Matter</h2>
      <p>
        Consistent risk management is the key to long-term trading success. TradeCraft gives you the tools to stay disciplined and avoid big losses.
      </p>
      <h2>Set Your Stops and Targets with Confidence</h2>
      <p>
        Use TradeCraft to automate your risk management and trade smarter every day.
      </p>
      {/* Show ads for free and not signed in users, hide for paid */}
      {(!session) && <AdSenseAd />}
    </main>
  );
}
