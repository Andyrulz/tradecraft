import type { Metadata } from 'next';
import { AdSenseAd } from '@/components/ui/AdSenseAd';
import { useSession } from 'next-auth/react';

export const metadata: Metadata = {
  title: 'Trade Plan Generator – Create a Detailed Trading Plan for Any Stock | TradeCraft',
  description: 'Use TradeCraft’s Trade Plan Generator to instantly create a detailed, actionable trading plan for any stock. Get entry, exit, stop loss, and target levels based on real market data and momentum analysis.',
  alternates: { canonical: '/blog/trade-plan-generator' },
};

export default function TradePlanGeneratorBlog() {
  const { data: session } = useSession();

  return (
    <main className="prose mx-auto px-4 py-8">
      <h1>Trade Plan Generator: Build a Detailed Trading Plan Instantly</h1>
      <p>
        TradeCraft&apos;s Trade Plan Generator helps you create a professional, step-by-step trading plan for any stock in seconds. Enter your stock symbol, and TradeCraft analyzes price action, momentum, and risk to generate a plan that includes entry, exit, stop loss, and target levels. No more guesswork—get a clear, actionable plan tailored to your trading style.
      </p>
      <h2>How TradeCraft Generates Your Trading Plan</h2>
      <ul>
        <li>Automatic technical analysis of your chosen stock</li>
        <li>Entry and exit points based on momentum and support/resistance</li>
        <li>Customizable risk management: set your own stop loss and targets</li>
        <li>Visual plan with chart overlays and trade rationale</li>
      </ul>
      <h2>Why Use a Trade Plan Generator?</h2>
      <p>
        A detailed trading plan removes emotion and increases discipline. TradeCraft makes it easy to follow a proven process, so you can trade with confidence and consistency.
      </p>
      <h2>Try TradeCraft&apos;s Trade Plan Generator</h2>
      <p>
        Sign up and generate your first trading plan for free. See how a structured approach can improve your results.
      </p>
      {/* Show ads for free and not signed in users, hide for paid */}
      {(!session) && <AdSenseAd />}
    </main>
  );
}
