import Image from 'next/image';
import Head from 'next/head';

export default function Top5MomentumIndicatorsMidcapBlog() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <main className="max-w-3xl mx-auto px-4 mt-28 mb-16">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Top 5 Momentum Indicators I Use for Midcap Trading
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Momentum trading is about catching stocks as they begin to move, not after the move is over. In this article, I’ll share the five momentum indicators that have consistently helped me spot high-potential midcap stocks before they break out. These tools are inspired by the approaches of Mark Minervini and Dan Zanger, but adapted for today’s markets.
            </p>
            <Image src="/blog/momentum-indicators-overview.png" alt="Momentum Indicators Overview" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </header>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">1. Relative Strength (RS) Rating</h2>
            <p>The RS Rating compares a stock’s price performance to the overall market. I look for stocks with RS Ratings in the top 10% of the market. This is often a precursor to institutional buying.</p>
            <Image src="/blog/rs-rating-example.png" alt="RS Rating Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">2. Moving Average Convergence Divergence (MACD)</h2>
            <p>MACD helps me spot momentum shifts. I look for bullish crossovers and positive histogram bars, especially when the stock is emerging from a base.</p>
            <Image src="/blog/macd-crossover.png" alt="MACD Crossover Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">3. Relative Volume (RVOL)</h2>
            <p>RVOL measures current volume versus average volume. A spike in RVOL (2x or more) often precedes a breakout. I use RVOL to confirm that a move is supported by real buying interest.</p>
            <Image src="/blog/rvol-spike.png" alt="RVOL Spike Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">4. Rate of Change (ROC)</h2>
            <p>ROC measures the speed of a stock’s price movement. I use it to filter for stocks with accelerating momentum, but avoid those that are overextended.</p>
            <Image src="/blog/roc-example.png" alt="ROC Example" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">5. Stochastic RSI</h2>
            <p>Stochastic RSI is a momentum oscillator that helps me time entries. I look for crossovers above 20 (bullish) or below 80 (bearish) to spot early reversals or confirm trends.</p>
            <Image src="/blog/stochrsi-crossover.png" alt="Stochastic RSI Crossover" width={700} height={380} className="rounded-xl shadow-lg border my-4" />
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">Putting It All Together</h2>
            <p>No single indicator is perfect. I use a combination of these tools to build conviction. For example, a midcap stock with a high RS Rating, bullish MACD, and RVOL spike is a prime candidate for my watchlist. Always confirm with price action and volume before entering.</p>
          </section>
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">Conclusion</h2>
            <p>Momentum trading is about stacking probabilities. By mastering these indicators and combining them with sound risk management, you can consistently find and ride the next wave of midcap leaders. For more indicator breakdowns and live trade setups, explore the rest of the TradeCraft blog.</p>
          </section>
          <footer className="mt-10 text-center">
            <a href="https://www.tradingsetup.pro/screener" target="_blank" rel="noopener noreferrer" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">Try the Momentum Screener</a>
          </footer>
        </article>
      </main>
    </>
  );
}