import { Metadata } from 'next';
import MarketNewsPageAutoAds from '@/components/market-news/MarketNewsPageAutoAds';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Real-Time Stock Market News & Analysis | TradeCraft Pro',
  description: 'Get the latest breaking stock market news, earnings reports, and market analysis. Real-time updates on market movers, economic data, and trading opportunities.',
  keywords: [
    'stock market news',
    'market breaking news',
    'earnings reports',
    'financial news',
    'market analysis',
    'stock market updates',
    'trading news',
    'market movers news',
    'economic news',
    'investment news',
    'wall street news',
    'financial market updates'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/news',
  ogImage: 'https://www.tradingsetup.pro/og-market-news.jpg',
  ogType: 'website'
});

export default function Page() {
  return <MarketNewsPageAutoAds />;
}
