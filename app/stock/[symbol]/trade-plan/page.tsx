import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
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
  
  // SECURITY: Require authentication for trade plan pages
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    // Redirect to sign-in page with return URL
    redirect(`/auth/signin?callbackUrl=/stock/${symbolUpper}/trade-plan`);
  }
  
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
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": `${symbolUpper} Stock Trading Plan`,
          "description": `AI-enhanced trading plan for ${stockInfo?.symbol || symbolUpper} with professional entry zones, stop losses, price targets, and risk management.`,
          "url": `https://www.tradingsetup.pro/stock/${symbolUpper}/trade-plan`,
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro"
          },
          "category": "Stock Trading Analysis",
          "featureList": [
            "AI-enhanced entry zones",
            "Dynamic stop loss calculation",
            "Multi-target price analysis", 
            "Professional risk management",
            "Position sizing recommendations",
            "Technical indicator analysis"
          ]
        }}
      />
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "InvestmentOrDeposit",
          "name": `${symbolUpper} Stock Investment Analysis`,
          "description": `Professional investment analysis for ${symbolUpper} stock including entry strategies, risk assessment, and return projections.`,
          "url": `https://www.tradingsetup.pro/stock/${symbolUpper}/trade-plan`,
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft Pro"
          },
          "about": {
            "@type": "Corporation",
            "name": stockInfo?.symbol || symbolUpper,
            "tickerSymbol": symbolUpper
          },
          "riskRating": "Medium",
          "investmentType": "Stock"
        }}
      />
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${symbolUpper} Trade Plan - AI-Enhanced Trading Strategy`,
          "description": `Professional ${symbolUpper} trading plan with AI-enhanced analysis, entry zones, stop losses, and risk management strategies.`,
          "url": `https://www.tradingsetup.pro/stock/${symbolUpper}/trade-plan`,
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString(),
          "author": {
            "@type": "Organization",
            "name": "TradeCraft Pro"
          },
          "publisher": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.tradingsetup.pro/logo.png"
            }
          },
          "about": {
            "@type": "Corporation",
            "name": stockInfo?.symbol || symbolUpper,
            "tickerSymbol": symbolUpper
          },
          "articleSection": "Stock Analysis",
          "keywords": [
            `${symbolUpper} trading plan`,
            `${symbolUpper} stock analysis`,
            `${symbolUpper} entry points`,
            `${symbolUpper} investment strategy`,
            `${symbolUpper} risk management`,
            `how to trade ${symbolUpper}`,
            `${symbolUpper} technical analysis`
          ]
        }}
      />
      
      {/* Main Content */}
      <StockTradePlanContent stock={stock} />
    </>
  );
}
