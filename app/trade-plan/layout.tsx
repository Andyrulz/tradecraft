import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'AI-Powered Trade Plan Generator - Automated Trading Strategies | TradeCraft Pro',
  description: 'Generate personalized trade plans with AI-powered risk management, entry/exit strategies, and technical analysis. Professional trading plans for any stock or timeframe.',
  keywords: [
    'trade plan generator',
    'trading strategy',
    'risk management',
    'entry exit strategy',
    'stop loss calculator',
    'position sizing',
    'trading plan template',
    'swing trading plans',
    'day trading strategy',
    'technical analysis',
    'trade management',
    'automated trading plans',
    'trading risk calculator',
    'profit target calculator',
    'trading psychology'
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
