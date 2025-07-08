import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function ExampleTradePlan() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 py-12">
      <Head>
        <title>Example Trade Plan: MSFT | TradeCraft</title>
        <meta name="description" content="See a sample professional trade plan for Microsoft (MSFT) enhanced with AI insights. Includes entry, targets, and risk management. No sign-in required." />
        <meta property="og:title" content="Example Trade Plan: MSFT | TradeCraft" />
        <meta property="og:description" content="See a sample professional trade plan for Microsoft (MSFT) enhanced with AI insights. Includes entry, targets, and risk management. No sign-in required." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.tradingsetup.pro/trade-plan/example" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Example Trade Plan: MSFT | TradeCraft" />
        <meta name="twitter:description" content="See a sample professional trade plan for Microsoft (MSFT) enhanced with AI insights. Includes entry, targets, and risk management. No sign-in required." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <link rel="canonical" href="https://www.tradingsetup.pro/trade-plan/example" />
      </Head>
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-sky-900">Trade Plan Example: <span className="text-blue-700">MSFT</span></h1>
        <div className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/badges/medium.png" alt="MSFT logo" width={40} height={40} className="rounded" />
            <div>
              <div className="text-lg font-bold text-sky-800">Microsoft Corp (MSFT)</div>
              <div className="text-xs text-gray-500">Exchange: NASDAQ</div>
            </div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Time Horizon</div>
            <div className="font-semibold text-sky-700">Positional (2-8 weeks)</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Entry Zone</div>
            <div className="font-semibold">$420.00 – $423.50</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Targets</div>
            <ul className="list-disc ml-6">
              <li>Target 1: $430.00</li>
              <li>Target 2: $437.50</li>
              <li>Target 3: $445.00</li>
            </ul>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Stop Loss</div>
            <div className="font-semibold text-red-600">$415.00</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Risk/Reward</div>
            <div className="font-semibold">1:3.2</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Rationale</div>
            <div className="text-gray-700">MSFT is breaking out of a multi-week consolidation with strong volume and relative strength. The setup offers a favorable risk/reward for a positional swing trade.</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-500 mb-1">Risk Management</div>
            <ul className="list-disc ml-6 text-gray-700">
              <li>Risk only 1-2% of capital per trade</li>
              <li>Exit if price closes below stop loss</li>
              <li>Partial profit at each target</li>
            </ul>
          </div>
        </div>
        <div className="text-center">
          <Link href="/trade-plan/start-here" className="text-sky-700 underline font-medium">Generate your own trade plan →</Link>
        </div>
      </div>
    </main>
  );
}
