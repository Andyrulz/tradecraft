import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Free Trade Plan Generator - AI Stock Analysis Tool | TradeCraft Pro',
  description: 'Generate free trade plans for any stock with AI-powered analysis. Get entry points, stop losses, profit targets, and risk management. Used by 10,000+ traders.',
  keywords: [
    'free trade plan generator',
    'AI stock analysis tool',
    'automated trade plans',
    'stock entry exit calculator',
    'trading strategy generator',
    'risk management calculator',
    'stop loss calculator',
    'position sizing calculator',
    'swing trading plans',
    'technical analysis tool',
    'stock screener',
    'trading plan template',
    'profit target calculator',
    'day trading strategy',
    'momentum trading strategy'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/trade-plan',
  ogImage: 'https://www.tradingsetup.pro/og-trade-plan.jpg',
  ogType: 'website'
});

export default function TradePlanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
