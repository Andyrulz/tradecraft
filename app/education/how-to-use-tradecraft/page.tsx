import React from 'react';
import Head from 'next/head';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function HowToUseApp() {
  return (
    <>
      <Head>
        <title>TradeCraft Education: How to Use TradeCraft</title>
        <meta name="description" content="Learn how to use TradeCraft to generate actionable trade plans, analyze stocks, and discover momentum opportunities. Step-by-step guides and tips." />
        <meta property="og:title" content="TradeCraft Education: How to Use TradeCraft" />
        <meta property="og:description" content="Learn how to use TradeCraft to generate actionable trade plans, analyze stocks, and discover momentum opportunities. Step-by-step guides and tips." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/education/how-to-use-tradecraft" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft Education: How to Use TradeCraft" />
        <meta name="twitter:description" content="Learn how to use TradeCraft to generate actionable trade plans, analyze stocks, and discover momentum opportunities. Step-by-step guides and tips." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
      </Head>
      <main className="flex-1 pt-[68px] pb-12"> {/* 68px = header height (py-3 + text + padding) for mobile CLS fix */}
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[
            { label: 'Education', href: '/education/how-to-use-tradecraft' },
            { label: 'How to Use TradeCraft' }
          ]} />
          <h1 className="text-3xl font-bold mb-6">How to Use TradeCraft for Smarter Trading</h1>
          <p className="mb-4">TradeCraft is designed to help traders and investors make data-driven decisions with ease. Here’s a step-by-step guide to getting the most out of the platform:</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">1. Explore the Stock Screener</h2>
          <p className="mb-4">Use the <strong>Screener</strong> to filter stocks based on multi-bagger traits, technical signals, and fundamentals. Adjust filters to match your strategy and discover new opportunities.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">2. Generate a Trade Plan</h2>
          <p className="mb-4">On the <strong>Trade Plan</strong> page, enter a stock symbol and select your time horizon. TradeCraft will generate a detailed, actionable plan including entry, stop, targets, and risk management.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">3. Analyze Stocks in Depth</h2>
          <p className="mb-4">Visit <strong>Stock Analysis</strong> for a breakdown of technical and fundamental metrics, trend analysis, and actionable signals.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">4. Learn and Improve</h2>
          <p className="mb-4">Check the <strong>Blog</strong> and <strong>Education</strong> sections for trading strategies, case studies, and feature updates. Use these resources to refine your approach and stay ahead.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">5. Get Support</h2>
          <p className="mb-4">If you have questions or need help, use the <strong>Contact</strong> page to reach out. We’re here to help you succeed!</p>
        </div>
      </main>
    </>
  );
}