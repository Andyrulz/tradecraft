import { StockForm } from '@/components/landing/StockForm';
import Head from 'next/head';
import Link from 'next/link';

export default function TradePlanStartHere() {
  return (
    <main className="max-w-xl w-full mx-auto px-2 sm:px-4 py-8 sm:py-12">
      <Head>
        <title>Start Your Trade Plan | TradeCraft</title>
        <meta name="description" content="Enter a stock symbol and select a time frame to generate a detailed trade plan with entry, targets, and risk management." />
      </Head>
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Generate a Trade Plan</h1>
      <p className="mb-6 text-muted-foreground text-center text-base sm:text-lg">
        Enter your stock symbol and select a time horizon to instantly generate a detailed trade plan with entry points, targets, and risk management.
      </p>
      <div className="bg-white rounded-lg shadow p-4 sm:p-6">
        <StockForm />
        <Link
          href="/trade-plan/example"
          className="block w-full mt-4 text-center rounded-md border border-blue-200 bg-blue-50 py-3 font-semibold text-blue-700 hover:bg-blue-100 transition text-base"
        >
          See Example (No Sign-in Needed)
        </Link>
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-green-700 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
            10,000+ plans generated
          </div>
          <div className="flex items-center gap-2 text-blue-700 text-sm">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
            2,000+ momentum stocks scanned and traded
          </div>
        </div>
        <div className="mt-6 text-xs text-center text-gray-500">
          <Link href="/blog" className="underline hover:text-blue-700">Read our in-depth trading guides on the TradeCraft Blog</Link>
        </div>
      </div>
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Not sure what to enter? Try <b>AAPL</b> or <b>MSFT</b> for a sample plan.</p>
        <p className="mt-2">You can generate one free plan per day. Upgrade for more.</p>
      </div>
    </main>
  );
}
