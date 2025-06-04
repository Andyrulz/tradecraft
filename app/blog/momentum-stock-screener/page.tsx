import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Momentum Stock Screener – Find the Hottest Stocks Fast | TradeCraft',
  description: 'TradeCraft scans the market for stocks showing strong price and volume momentum. Discover breakout candidates and trending stocks before the crowd.'
};

export default function MomentumStockScreenerBlog() {
  return (
    <main className="max-w-3xl mx-auto px-4 mt-28 mb-16">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
            Momentum Stock Screener: Find the Hottest Stocks Fast
          </h1>
          <p className="text-lg text-muted-foreground mb-2">
            TradeCraft’s Momentum Stock Screener helps you discover the most actionable stocks every day. Here’s how our system finds, scores, and ranks the top momentum stocks in the market.
          </p>
          <div className="flex justify-center my-6">
            <Image src="/blog/example/momentum-screener.png" alt="Momentum Stock Screener Example" width={700} height={380} className="rounded-xl shadow-lg border" priority />
          </div>
        </header>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">1. Universe & Filtering</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Stock Universe:</b> We scan thousands of US equities, including large, mid, and small caps.</li>
            <li><b>Liquidity Filter:</b> Only stocks with sufficient average daily volume and price are considered to avoid illiquid names.</li>
            <li><b>Price Range:</b> Users can set min/max price and market cap to focus on their preferred segment.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">2. Momentum Scoring Model</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Price Momentum:</b> Measures % change over multiple timeframes (1-day, 5-day, 20-day) to capture both short- and medium-term moves.</li>
            <li><b>Volume Surge:</b> Detects stocks trading at 2x or more their average volume, signaling institutional interest.</li>
            <li><b>Relative Strength:</b> Ranks stocks by their performance vs. sector and S&P 500.</li>
            <li><b>Volatility & Risk:</b> Screens out stocks with excessive volatility or news-driven spikes.</li>
            <li><b>Technical Breakouts:</b> Flags stocks breaking above resistance or hitting new highs.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">3. Ranking & Output</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Composite Score:</b> Each stock receives a weighted score based on the above factors.</li>
            <li><b>Top 15 List:</b> The screener displays the 15 highest-scoring stocks, updated daily.</li>
            <li><b>Visual Charts:</b> Each result includes a mini-chart and key stats for quick review.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3 text-primary">4. How to Use the Results</h2>
          <ul className="list-disc list-inside space-y-2 text-base pl-2">
            <li><b>Watchlist Integration:</b> Add top stocks to your watchlist with one click.</li>
            <li><b>Trade Plan Link:</b> Instantly generate a trade plan for any screener result.</li>
            <li><b>Custom Filters:</b> Refine results by sector, float, or volatility to match your strategy.</li>
          </ul>
        </section>
        <section className="mb-8">
          <div className="bg-sky-50 border-l-4 border-sky-400 p-4 rounded-xl shadow-sm mb-4">
            <strong>Why Use TradeCraft’s Screener?</strong>
            <p className="mt-2">Our screener is designed for speed, clarity, and actionable results. By combining price, volume, and technical signals, you get a daily edge—no more endless scanning or FOMO.</p>
          </div>
        </section>
        <footer className="mt-10 text-center">
          <a href="https://www.tradingsetup.pro/screener" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">Try the Momentum Screener</a>
        </footer>
      </article>
    </main>
  );
}
