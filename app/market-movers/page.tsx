import { Metadata } from 'next';
import Head from 'next/head';
// Use Hybrid version with aggressive manual ads for better revenue
import MarketMoversPage from '@/components/market-movers/MarketMoversPage';
// Alternative: Use Auto Ads only version (less revenue but more conservative)
// import MarketMoversPageAutoAds from '@/components/market-movers/MarketMoversPageAutoAds';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

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
      
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.tradingsetup.pro"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Market Movers",
            "item": "https://www.tradingsetup.pro/market-movers"
          }
        ]
      }} />

      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Stock Market Movers - TradeCraft Pro",
        "url": "https://www.tradingsetup.pro/market-movers",
        "description": "Real-time tracking of the biggest stock market gainers and losers with volume analysis and momentum indicators.",
        "mainEntity": {
          "@type": "Dataset",
          "name": "Stock Market Movers Data",
          "description": "Real-time data of top stock market gainers and losers",
          "publisher": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro"
          },
          "distribution": {
            "@type": "DataDownload",
            "encodingFormat": "application/json",
            "contentUrl": "https://www.tradingsetup.pro/api/market-movers"
          },
          "keywords": ["stock market", "gainers", "losers", "volume", "momentum"],
          "temporalCoverage": "real-time",
          "spatialCoverage": "United States"
        }
      }} />
      
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "FinancialService",
        "name": "Market Movers Tracker",
        "description": "Real-time tracking service for stock market gainers and losers",
        "url": "https://www.tradingsetup.pro/market-movers",
        "provider": {
          "@type": "Organization",
          "name": "TradeCraft Pro",
          "url": "https://www.tradingsetup.pro"
        },
        "serviceType": "Market Data Service",
        "areaServed": "United States",
        "audience": {
          "@type": "Audience",
          "audienceType": "Traders and Investors"
        },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }} />
      
      <MarketMoversPage />
    </>
  );
}
