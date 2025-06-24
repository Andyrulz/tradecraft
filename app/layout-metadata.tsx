import { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo';

export const metadata: Metadata = generateMetadata({
  title: 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools',
  description: 'Professional stock market analysis tools, real-time market news, stock screeners, and automated trade plan generation. Make informed trading decisions with TradeCraft Pro.',
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
