import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Small Cap Stock Screener – Discover High-Growth Opportunities | TradeCraft',
  description: 'TradeCraft’s Small Cap Stock Screener is designed for traders seeking explosive growth. Filter for small cap stocks with strong momentum, volume, and technical setups.'
};

export default function SmallCapStockScreenerBlog() {
  return (
    <main className="max-w-3xl mx-auto px-4 mt-28 mb-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Small Cap Stock Screener: Discover High-Growth Opportunities
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            TradeCraft’s Small Cap Stock Screener is built for traders who want to capture high-growth opportunities. Here’s how our system filters, scores, and surfaces the best small cap stocks in the market.
          </p>
          <div className="flex justify-center my-6">
            <Image src="/blog/example/small-cap-screener.png" alt="Small Cap Stock Screener Example" width={700} height={380} className="rounded-xl shadow-lg border" priority />
          </div>
        </header>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">1. Small Cap Universe & Filtering</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Market Cap Filter:</b> Focuses on stocks under $2B market cap, with customizable min/max settings.</li>
            <li><b>Liquidity & Price:</b> Screens for stocks with sufficient volume and price stability to avoid illiquid names.</li>
            <li><b>Sector & Industry:</b> Allows filtering by sector to find hot themes or avoid crowded trades.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">2. Momentum & Breakout Scoring</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Price & Volume Breakouts:</b> Flags small caps making new highs with volume confirmation.</li>
            <li><b>Relative Strength:</b> Ranks stocks by performance vs. peers and the overall market.</li>
            <li><b>Volatility Check:</b> Screens out names with excessive risk or news-driven spikes.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">3. Output & Workflow</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Top Small Cap List:</b> Shows the highest-scoring small caps, updated daily.</li>
            <li><b>Watchlist & Alerts:</b> Add to your watchlist or set alerts for new breakouts.</li>
            <li><b>Trade Plan Link:</b> Instantly generate a trade plan for any small cap in the screener.</li>
          </ul>
        </section>
        <section className="mb-8">
          <div className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded-xl shadow-sm mb-4">
            <strong>Why Use TradeCraft’s Small Cap Screener?</strong>
            <p className="mt-2">Small caps can deliver outsized returns, but require careful screening. TradeCraft gives you the edge with real-time data, proven filters, and actionable setups.</p>
          </div>
        </section>
        <footer className="mt-10 text-center">
          <a href="/small-cap-stock-screener" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">Try the Small Cap Screener</a>
        </footer>
      </article>
    </main>
  );
}
