import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOP_100_STOCKS, isValidStockSymbol } from '@/lib/config/top-stocks';
import { generateMetadata as generateSEOMetadata, generateBreadcrumbStructuredData } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import StockTradePlanContent from '@/components/stock-analysis/StockTradePlanContent';

interface StockTradePlanPageProps {
  params: Promise<{
    symbol: string;
  }>;
}

// Generate SEO metadata for stock trade plan pages
export async function generateMetadata({ params }: StockTradePlanPageProps): Promise<Metadata> {
  const { symbol } = await params;
  const symbolUpper = symbol.toUpperCase();
  
  if (!isValidStockSymbol(symbolUpper)) {
    return {
      title: 'Stock Not Found | TradeCraft Pro',
      description: 'The requested stock symbol was not found.',
    };
  }

  const stockInfo = TOP_100_STOCKS.find(s => s.symbol === symbolUpper);
  const stockName = stockInfo?.symbol || symbolUpper;

  return generateSEOMetadata({
    title: `${symbolUpper} Trade Plan - AI-Enhanced Trading Strategy for ${stockName} | TradeCraft Pro`,
    description: `Get a professional AI-enhanced trade plan for ${stockName} (${symbolUpper}). Includes entry zones, stop losses, price targets, risk management, and trading strategies for ${symbolUpper} stock.`,
    keywords: [
      `${symbolUpper} trade plan`,
      `${symbolUpper} trading strategy`,
      `${symbolUpper} entry points`,
      `${symbolUpper} stop loss`,
      `${symbolUpper} price targets`,
      `how to trade ${symbolUpper}`,
      `${symbolUpper} risk management`,
      `${stockName} trading plan`,
      `${symbolUpper} technical analysis`,
      `${symbolUpper} swing trading`,
      `${symbolUpper} position sizing`
    ],
    canonicalUrl: `https://www.tradingsetup.pro/stock/${symbolUpper}/trade-plan`,
    ogImage: `https://www.tradingsetup.pro/og-stock-tradeplan-${symbolUpper}.jpg`,
    ogType: 'article',
  });
}

export default async function StockTradePlanPage({ params }: StockTradePlanPageProps) {
  const { symbol } = await params;
  const symbolUpper = symbol.toUpperCase();
  
  // Check if stock exists
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
    { name: `${symbolUpper} Analysis`, url: `https://www.tradingsetup.pro/stock/${symbolUpper}` },
    { name: `${symbolUpper} Trade Plan`, url: `https://www.tradingsetup.pro/stock/${symbolUpper}/trade-plan` }
  ]);

  return (
    <>
      {/* SEO Structured Data */}
      <StructuredData data={breadcrumbData} />
      
      {/* Main Content */}
      <StockTradePlanContent stock={stock} />
    </>
  );
}
