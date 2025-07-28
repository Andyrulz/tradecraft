import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'TradeCraft Pro - AI Trading Strategy & Stock Analysis Tools',
  description: 'Build winning trading strategies with AI-powered analysis, systematic trade planning, and momentum screening. Professional trading strategy development platform.',
  keywords: [
    'stock market analysis',
    'trading tools',
    'stock screener',
    'market news',
    'trade plans',
    'momentum stocks',
    'technical analysis',
    'stock research',
    'financial tools',
    'trading platform'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro',
  ogImage: 'https://www.tradingsetup.pro/og-home.jpg'
});

export default function HomePage({ children }: { children: React.ReactNode }) {
  return children;
}
