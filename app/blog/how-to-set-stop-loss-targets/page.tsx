import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'How to Set Stop Loss and Targets – Risk Management Made Simple | TradeCraft',
  description: 'TradeCraft makes it easy to set smart stop loss and target levels for every trade. Get optimal levels based on volatility, support/resistance, and your risk tolerance.'
};

export default function HowToSetStopLossTargetsBlog() {
  return (
    <main className="max-w-3xl mx-auto px-4 mt-28 mb-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            How to Set Stop Loss and Targets: Risk Management Made Simple
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            TradeCraft makes it easy to set smart stop loss and target levels for every trade. Get optimal levels based on volatility, support/resistance, and your risk tolerance.
          </p>
          <div className="flex justify-center my-6">
            <Image src="/blog/example/stop-loss-targets.png" alt="Stop Loss and Targets Example" width={700} height={380} className="rounded-xl shadow-lg border" priority />
          </div>
        </header>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">1. Volatility & Support/Resistance Analysis</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>ATR-Based Stops:</b> Calculates stop loss using Average True Range to account for normal price swings.</li>
            <li><b>Support/Resistance Anchoring:</b> Places stops just beyond key levels to avoid getting shaken out by noise.</li>
            <li><b>Dynamic Adjustment:</b> Adapts stops for high-volatility or news-driven stocks.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">2. Target Setting Logic</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Risk/Reward Ratio:</b> Default targets are set for at least 2:1 reward-to-risk, but users can adjust as needed.</li>
            <li><b>Measured Move Projections:</b> Uses chart patterns and recent swings to estimate realistic targets.</li>
            <li><b>Multiple Targets:</b> Optionally set partial exits at different levels for scaling out.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">3. Visual & Workflow Features</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Chart Overlay:</b> Entry, stop, and target are shown visually for every plan.</li>
            <li><b>Editable Levels:</b> Users can drag and adjust stops/targets and see updated risk/reward instantly.</li>
            <li><b>Risk Calculator:</b> Shows position size and dollar risk for every trade.</li>
          </ul>
        </section>
        <section className="mb-8">
          <div className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded-xl shadow-sm mb-4">
            <strong>Why Use TradeCraft?</strong>
            <p className="mt-2">TradeCraft makes disciplined risk management easy and visual. You’ll never have to guess where to place your stops or targets again.</p>
          </div>
        </section>
        <footer className="mt-10 text-center">
          <a href="/trade-plan/example" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">See a Live Example</a>
        </footer>
      </article>
    </main>
  );
}
