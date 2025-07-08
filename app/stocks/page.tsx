import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import StocksDirectoryContent from '@/components/stock-analysis/StocksDirectoryContent';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Stock Analysis Directory - All Stocks with AI Trade Plans | TradeCraft Pro',
  description: 'Browse our complete directory of stock analysis and AI-enhanced trade plans. Find professional analysis for Apple, Tesla, Microsoft, and 500+ other stocks with technical indicators and trading strategies.',
  keywords: [
    'stock analysis directory',
    'all stocks list',
    'stock trade plans',
    'stock analysis tool',
    'AI stock analysis',
    'stock market analysis',
    'trading strategies',
    'stock research',
    'equity analysis',
    'stock picker',
    'stock finder',
    'investment research'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/stocks',
  ogImage: 'https://www.tradingsetup.pro/og-stocks-directory.jpg',
  ogType: 'website',
});

export default function StocksDirectoryPage() {
  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://www.tradingsetup.pro' },
    { name: 'Stocks Directory', url: 'https://www.tradingsetup.pro/stocks' }
  ]);

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={breadcrumbData} />
      
      {/* Main Content */}
      <StocksDirectoryContent />
    </>
  );
}
