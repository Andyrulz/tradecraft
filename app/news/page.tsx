import { Metadata } from 'next';
import MarketNewsPage from '@/components/market-news/MarketNewsPage';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';

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
  return (
    <>
      {/* Page-specific Structured Data */}
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Stock Market News - TradeCraft Pro",
        "url": "https://www.tradingsetup.pro/news",
        "description": "Latest stock market news, earnings reports, and financial market analysis",
        "mainEntity": {
          "@type": "NewsMediaOrganization", 
          "name": "TradeCraft Pro News",
          "url": "https://www.tradingsetup.pro/news",
          "logo": "https://www.tradingsetup.pro/logo.png",
          "sameAs": [
            "https://www.tradingsetup.pro"
          ]
        },
        "about": {
          "@type": "Thing",
          "name": "Stock Market News",
          "description": "Breaking news and analysis of stock market movements, earnings, and economic indicators"
        }
      }} />
      
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "Financial News Collection",
        "description": "Curated collection of the latest stock market and financial news",
        "url": "https://www.tradingsetup.pro/news",
        "provider": {
          "@type": "Organization",
          "name": "TradeCraft Pro",
          "url": "https://www.tradingsetup.pro"
        },
        "about": [
          {
            "@type": "Thing",
            "name": "Stock Market",
            "description": "Financial market where shares of publicly traded companies are bought and sold"
          },
          {
            "@type": "Thing", 
            "name": "Earnings Reports",
            "description": "Quarterly financial statements released by public companies"
          },
          {
            "@type": "Thing",
            "name": "Market Analysis",
            "description": "Professional analysis of market trends and trading opportunities"
          }
        ]
      }} />
      
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "Financial News Aggregation",
        "description": "Real-time aggregation and curation of stock market news from multiple sources",
        "provider": {
          "@type": "Organization",
          "name": "TradeCraft Pro",
          "url": "https://www.tradingsetup.pro"
        },
        "serviceType": "News Service",
        "areaServed": "United States",
        "audience": {
          "@type": "Audience",
          "audienceType": "Traders and Investors"
        }
      }} />
      
      <MarketNewsPage />
    </>
  );
}
