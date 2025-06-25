import { Metadata } from 'next';
import Head from 'next/head';
// Use Hybrid version with aggressive manual ads for better revenue
import MarketMoversPage from '@/components/market-movers/MarketMoversPage';
// Alternative: Use Auto Ads only version (less revenue but more conservative)
// import MarketMoversPageAutoAds from '@/components/market-movers/MarketMoversPageAutoAds';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Top Stock Market Movers - Real-Time Gainers & Losers | TradeCraft Pro',
  description: 'Track the biggest stock market gainers and losers in real-time. Daily, weekly, and monthly market movers with volume analysis. Find momentum stocks before they breakout.',
  keywords: [
    'stock market movers',
    'top gainers',
    'biggest losers',
    'momentum stocks',
    'market trends',
    'real-time stock data',
    'volume analysis',
    'breakout stocks',
    'stock performance',
    'market leaders',
    'stock winners',
    'stock laggards',
    'market momentum',
    'daily gainers',
    'stock volatility'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/market-movers',
  ogImage: 'https://www.tradingsetup.pro/og-market-movers.jpg',
  ogType: 'website'
});

export default function Page() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <MarketMoversPage />
    </>
  );
}
