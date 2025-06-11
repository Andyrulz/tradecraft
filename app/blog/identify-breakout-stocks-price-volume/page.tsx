import Image from 'next/image';

export default function IdentifyBreakoutStocksBlog() {
  return (
    <main className="max-w-3xl mx-auto px-4 mt-28 mb-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            How I Identify Breakout Stocks Using Price-Volume Analysis
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            Identifying true breakout stocks is both an art and a science. Drawing from the methods of Mark Minervini and Dan Zanger, I’ll walk you through the exact price and volume patterns I look for before entering a breakout. This guide is packed with actionable tips, real chart examples, and the nuances that separate failed breakouts from explosive winners.
          </p>
        </header>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">1. The Foundation: What is a Breakout?</h2>
          <p>A breakout occurs when a stock moves above a well-defined resistance level on increased volume. But not all breakouts are created equal. The best breakouts occur after a period of tight price consolidation, with volume drying up before the move. This is a hallmark of institutional accumulation.</p>
          <Image src="/blog/consolidation-volume-dryup.png" alt="Volume Dry-Up Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">2. The Minervini Criteria: Tightness, Volatility Contraction, and Volume</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li>Tightness: Look for price bars that get progressively tighter, with closes near the highs.</li>
            <li>Volatility Contraction: Each pullback should be shallower than the last, forming a volatility contraction pattern (VCP).</li>
            <li>Volume Dry-Up: Volume should decrease as the base forms, then surge on the breakout day.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">3. Dan Zanger’s Confirmation: Price-Volume Surge</h2>
          <p>Dan Zanger emphasizes the importance of a price surge on 2–3x average volume. The breakout should be clean, with little overhead resistance and a strong close near the high of the day. Avoid breakouts with choppy action or weak volume.</p>
          <Image src="/blog/zanger-breakout-volume.png" alt="Zanger Breakout Volume" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">4. Red Flags: What to Avoid</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li>Breakouts on low or average volume</li>
            <li>Overhead supply from prior failed breakouts</li>
            <li>Wide, loose price action in the base</li>
            <li>Breakouts during broad market weakness</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">5. Real-World Example: Annotated Chart</h2>
          <p>Below is a real chart example showing a textbook breakout. Note the tight price action, volume dry-up, and explosive move on volume. I annotate the entry, stop-loss, and target zones.</p>
          <Image src="/blog/annotated-breakout.png" alt="Annotated Breakout Chart" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">6. My Checklist Before Entering a Breakout</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li>Is the base tight and well-formed?</li>
            <li>Is there a clear resistance level?</li>
            <li>Has volume dried up, then surged on the breakout?</li>
            <li>Is the general market in an uptrend?</li>
            <li>Is there minimal overhead supply?</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">7. Conclusion</h2>
          <p>Breakout trading is about stacking the odds in your favor. By focusing on price and volume, and using the criteria above, you can dramatically improve your win rate. Study the greats, review your trades, and always manage risk. For more annotated charts and live trade examples, check out the rest of the TradeCraft blog.</p>
          <Image src="/blog/breakout-pattern-example.png" alt="Breakout Chart Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
        </section>
        <footer className="mt-10 text-center">
          <a href="https://www.tradingsetup.pro/screener" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">Try the Momentum Screener</a>
        </footer>
      </article>
    </main>
  );
}