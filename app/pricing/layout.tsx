import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'TradeCraft Pro Pricing - Professional Trading Tools Plans | TradeCraft Pro',
  description: 'Choose from Free, Pro, or Premium plans. Get access to advanced stock screeners, AI trade plans, real-time market data, and professional trading tools. Cancel anytime.',
  keywords: [
    'trading software pricing',
    'stock analysis tools cost',
    'trading platform subscription',
    'stock screener pricing',
    'professional trading tools',
    'market data subscription',
    'trading software plans',
    'investment tools pricing',
    'stock research subscription',
    'trading platform cost',
    'financial tools pricing'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/pricing',
  ogImage: 'https://www.tradingsetup.pro/og-pricing.jpg',
  ogType: 'website'
});

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
