import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Stan Weinstein's Market Sentiment – June Update | TradeCraft Blog",
  description: "A technical market update inspired by Stan Weinstein: bullish intermediate-term, but caution as leadership stocks falter.",
  alternates: { canonical: '/blog/stan-weinstein-market-sentiment-june-2025' },
};

export default function StanWeinsteinMarketSentimentJune2025() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-12 mt-24">
      <div className="mb-8 flex items-center gap-2">
        <Link href="/blog" className="inline-flex items-center text-sky-700 hover:underline text-sm font-semibold">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
        </Link>
      </div>
      <div className="bg-gradient-to-br from-sky-50 via-white to-blue-100 rounded-2xl shadow-lg p-8 border border-sky-100">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-sky-900 flex items-center gap-2">
          <span role="img" aria-label="chart">📈</span> Stan Weinstein&apos;s Market Sentiment – June Update
        </h1>
        <p className="text-sky-600 text-base mb-6">June 11, 2025</p>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Intermediate-Term Outlook</h2>
          <p className="text-green-800 text-lg font-semibold mb-2">Still <span className="font-bold">bullish</span> overall.</p>
          <p className="text-gray-700">The market continues to show strength in the intermediate term, with major indexes holding up well and trends remaining intact. This suggests that, for swing traders and position traders, the broader environment is still supportive of new opportunities—provided you remain selective and disciplined.</p>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Near-Term View: <span className="text-yellow-700">Unbelievably mixed</span></h2>
          <p className="text-gray-700 mb-2">While the indexes (such as the S&amp;P 500 and Nasdaq) continue to print new highs or hover near them, there are troubling signs beneath the surface. Leadership stocks—especially those in the so-called <span className="font-semibold">Glamour Average</span>—are showing weakness. This divergence between the indexes and the true market leaders is a classic warning sign for experienced traders.</p>
          <ul className="list-disc list-inside text-base text-gray-800 pl-4">
            <li><span className="font-bold">Signs of strength</span> in the indexes can mask underlying distribution in key stocks.</li>
            <li>Watch for failed breakouts and increased volatility in former leaders.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-2">Cautions &amp; Warnings</h2>
          <ul className="list-disc list-inside space-y-2 text-base text-gray-800 pl-4">
            <li>The ongoing weakness in the <span className="font-semibold">Glamour Average</span> may be a <span className="font-bold">leading indicator</span> of a <span className="font-bold">near-term correction</span>. If the best stocks can’t make progress, the rest of the market often follows.</li>
            <li>The rotational nature of the market indicates <span className="font-bold">churning</span>, not trending. Sectors are taking turns leading and lagging, making it harder to find sustained moves.</li>
            <li>NYSE’s low number of new highs, despite major indexes nearing all-time highs, is <span className="font-bold">concerning</span>. Breadth is narrowing, which often precedes pullbacks or corrections.</li>
          </ul>
        </section>
        <div className="mb-8">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-sm">
            <p className="text-yellow-900 text-lg font-semibold flex items-center gap-2">
              <span role="img" aria-label="warning">⚠️</span> Stay alert. It’s not a clear runway — <span className="underline">pick your spots carefully</span>.
            </p>
          </div>
        </div>
        <section className="mt-8 text-gray-600 text-base">
          <h3 className="text-lg font-bold mb-2">What Should Traders Do?</h3>
          <ul className="list-disc list-inside pl-4 space-y-1">
            <li>Be highly selective—focus on stocks with both strong technicals and relative strength.</li>
            <li>Keep position sizes moderate and use stop losses to protect capital.</li>
            <li>Watch for signs of sector rotation and avoid chasing extended names.</li>
            <li>Stay flexible: if the market confirms a correction, be ready to move to cash or defensive setups.</li>
          </ul>
        </section>
        <div className="text-gray-500 text-sm mt-8 border-t pt-4">
          For more technical insights and actionable trade plans, explore our latest tools and guides on the <Link href="/blog" className="text-sky-700 underline">TradeCraft Blog</Link>.
        </div>
      </div>
    </main>
  );
}
