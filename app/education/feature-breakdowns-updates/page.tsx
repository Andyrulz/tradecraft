import React from 'react';
import Head from 'next/head';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function FeatureBreakdowns() {
  return (
    <>
      <Head>
        <title>TradeCraft Education: Feature Breakdowns & Updates</title>
        <meta name="description" content="Stay up to date with the latest TradeCraft features, platform updates, and improvements. Learn how new tools and enhancements can help your trading." />
        <meta property="og:title" content="TradeCraft Education: Feature Breakdowns & Updates" />
        <meta property="og:description" content="Stay up to date with the latest TradeCraft features, platform updates, and improvements. Learn how new tools and enhancements can help your trading." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/education/feature-breakdowns-updates" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft Education: Feature Breakdowns & Updates" />
        <meta name="twitter:description" content="Stay up to date with the latest TradeCraft features, platform updates, and improvements. Learn how new tools and enhancements can help your trading." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
      </Head>
      <main className="flex-1 pt-[68px] pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Breadcrumbs items={[
            { label: 'Education', href: '/education/feature-breakdowns-updates' },
            { label: 'Feature Breakdowns & Updates' }
          ]} />
          <h1 className="text-3xl font-bold mb-6">Feature Breakdowns and Updates</h1>
          <p className="mb-4">Stay up to date with the latest features and improvements in TradeCraft. Here’s a breakdown of key tools and recent updates:</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Stock Screener (Upcoming)</h2>
          <p className="mb-4">We are working on a powerful Stock Screener that will allow you to filter stocks based on multi-bagger traits, technical signals, and fundamentals. The screener will feature advanced filters, real-time data, and actionable insights to help you discover new opportunities. Stay tuned for updates on this highly requested feature!</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Trade Plan Generator</h2>
          <p className="mb-4">Generate institutional-grade trade plans with clear entries, stops, targets, and risk management. Recent updates include more timeframes, improved technical analysis, and a more intuitive user interface. The Trade Plan Generator now provides detailed risk/reward calculations and scenario analysis to help you make informed decisions.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Stock Analysis</h2>
          <p className="mb-4">Dive deep into technical and fundamental metrics. The analysis page now includes more indicators, easier-to-read charts, and a summary of actionable signals. You can review historical price action, key support/resistance levels, and sector/industry comparisons to gain a comprehensive view of any stock.</p>
          <h2 className="text-xl font-semibold mt-8 mb-2">Education & Blog</h2>
          <p className="mb-4">Access actionable articles, strategies, and case studies to keep learning and improving. The Education section is updated monthly with new content, including feature breakdowns, trading psychology, and user success stories. We encourage you to explore the blog for the latest updates and community highlights.</p>
        </div>
      </main>
    </>
  );
}