import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Deep Stock Analysis & Research Tools | TradeCraft Pro',
  description: 'Comprehensive stock analysis with technical indicators, fundamental data, earnings analysis, and price targets. Professional stock research for informed investment decisions.',
  keywords: [
    'stock analysis',
    'stock research',
    'fundamental analysis',
    'technical analysis',
    'stock valuation',
    'earnings analysis',
    'financial ratios',
    'stock metrics',
    'investment research',
    'stock due diligence',
    'company analysis',
    'price target analysis',
    'dividend analysis',
    'growth stocks',
    'value investing'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/stock-analysis',
  ogImage: 'https://www.tradingsetup.pro/og-stock-analysis.jpg',
  ogType: 'website'
});

export default function StockAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
