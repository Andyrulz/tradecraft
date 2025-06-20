import { StockForm } from '@/components/landing/StockForm';
import Head from 'next/head';

export default function TradePlanStartHere() {
  return (
    <main className="max-w-xl mx-auto px-4 py-12">
      <Head>
        <title>Start Your Trade Plan | TradeCraft</title>
        <meta name="description" content="Enter a stock symbol and select a time frame to generate a detailed trade plan with entry, targets, and risk management." />
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-center">Generate a Trade Plan</h1>
      <p className="mb-6 text-muted-foreground text-center">
        Enter your stock symbol and select a time horizon to instantly generate a detailed trade plan with entry points, targets, and risk management.
      </p>
      <div className="bg-white rounded-lg shadow p-6">
        <StockForm />
      </div>
      <div className="mt-8 text-sm text-gray-500 text-center">
        <p>Not sure what to enter? Try <b>AAPL</b> or <b>MSFT</b> for a sample plan.</p>
        <p className="mt-2">You can generate one free plan per day. Upgrade for more.</p>
      </div>
    </main>
  );
}
