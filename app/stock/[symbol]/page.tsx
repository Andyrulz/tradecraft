import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOP_100_STOCKS, isValidStockSymbol } from '@/lib/config/top-stocks';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import StockAnalysisContent from '@/components/stock-analysis/StockAnalysisContent';

interface StockPageProps {
  params: Promise<{
    symbol: string;
  }>;
}

// Generate static params for top stocks (SEO optimization)
export async function generateStaticParams() {
  // Generate pages for top 100+ stocks initially
  return TOP_100_STOCKS.slice(0, 100).map((stock) => ({
    symbol: stock.symbol.toLowerCase(),
  }));
}

// Generate SEO metadata for each stock page
export async function generateMetadata({ params }: StockPageProps): Promise<Metadata> {
  const { symbol } = await params;
  const symbolUpper = symbol.toUpperCase();
  
  if (!isValidStockSymbol(symbolUpper)) {
    return {
      title: 'Stock Not Found | TradeCraft Pro',
      description: 'The requested stock symbol was not found.',
    };
  }

  // Generate basic SEO metadata
  const stockInfo = TOP_100_STOCKS.find(s => s.symbol === symbolUpper);
  const title = `${symbolUpper} Stock Analysis - Live Price, Trading Strategy & Technical Analysis | TradeCraft Pro`;
  const description = `Get real-time ${symbolUpper} stock analysis with AI-enhanced trading strategies, technical indicators, and price predictions. Professional stock analysis for ${symbolUpper} trading.`;

  return generateSEOMetadata({
    title,
    description,
    keywords: [`${symbolUpper} stock`, `${symbolUpper} analysis`, `${symbolUpper} trading`, `${symbolUpper} price`],
    canonicalUrl: `https://www.tradingsetup.pro/stock/${symbol}`,
    ogImage: `https://www.tradingsetup.pro/og-stock-${symbol}.jpg`,
    ogType: 'article',
  });
}

export default async function StockPage({ params }: StockPageProps) {
  const { symbol } = await params;
  const symbolUpper = symbol.toUpperCase();
  
  // Check if stock exists in our top stocks
  if (!isValidStockSymbol(symbolUpper)) {
    notFound();
  }

  const stockInfo = TOP_100_STOCKS.find(s => s.symbol === symbolUpper);
  const stock = {
    symbol: symbolUpper,
    name: stockInfo?.symbol || symbolUpper,
    sector: 'Technology',
    marketCap: 'Large' as const,
    type: 'Stock' as const,
    exchange: 'NASDAQ' as const
  };

  // Generate breadcrumb structured data
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'Home', url: 'https://www.tradingsetup.pro' },
    { name: 'Stock Analysis', url: 'https://www.tradingsetup.pro/stocks' },
    { name: `${symbolUpper} Analysis`, url: `https://www.tradingsetup.pro/stock/${symbolUpper}` }
  ]);

  // Generate stock-specific structured data
  const stockStructuredData = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${symbolUpper} Stock`,
    "description": `Professional analysis and trade plans for ${stock.name} (${symbolUpper}) stock`,
    "provider": {
      "@type": "Organization",
      "name": "TradeCraft Pro",
      "url": "https://www.tradingsetup.pro"
    },
    "category": stock.sector,
    "url": `https://www.tradingsetup.pro/stock/${symbolUpper}`,
    "sameAs": `https://finance.yahoo.com/quote/${symbolUpper}`,
    "offers": {
      "@type": "Offer",
      "name": `${symbolUpper} Trade Plan Analysis`,
      "description": `AI-enhanced trade plan and technical analysis for ${symbolUpper}`,
      "category": "Financial Analysis"
    }
  };

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={breadcrumbData} />
      <StructuredData data={stockStructuredData} />
      
      {/* Main Content */}
      <StockAnalysisContent stock={stock} />
    </>
  );
}
