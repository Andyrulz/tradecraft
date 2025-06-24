import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Advanced Stock Screener - Find Momentum & Breakout Stocks | TradeCraft Pro',
  description: 'Professional stock screener to find momentum stocks, breakout patterns, and high-volume trades. Filter by technical indicators, fundamentals, and custom criteria.',
  keywords: [
    'stock screener',
    'momentum stock screener',
    'breakout stocks',
    'stock scanner',
    'stock filter',
    'technical analysis screener',
    'stock discovery',
    'momentum trading',
    'volume analysis',
    'stock patterns',
    'market scanner',
    'swing trading stocks',
    'day trading stocks',
    'stock research tools',
    'financial screening'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/screener',
  ogImage: 'https://www.tradingsetup.pro/og-screener.jpg',
  ogType: 'website'
});

export default function ScreenerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
