import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';
import { TradePlanContent } from '@/components/trade-plan-seo/TradePlanContent';
import { getCachedTradePlan } from '@/lib/cache/trade-plan-cache';
import { generateTradePlanSEO, extractSEODataFromTradePlan, generateFallbackSEO } from '@/lib/seo/trade-plan-seo';
import { TOP_100_STOCKS } from '@/lib/config/top-stocks';
import { isValidStockSymbol } from '@/lib/config/top-stocks';
import { onStockPageAccess } from '@/lib/cache/auto-refresh';
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { StructuredData } from '@/components/seo/StructuredData';

// Generate static params for all cached stocks
export async function generateStaticParams() {
  // Use our top 100 stocks list for static generation
  return TOP_100_STOCKS.slice(0, 50).map((stock) => ({
    symbol: stock.symbol.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }): Promise<Metadata> {
  const { symbol } = await params;
  const upperSymbol = symbol.toUpperCase();

  // Validate symbol format
  if (!isValidStockSymbol(upperSymbol)) {
    return {
      title: 'Invalid Stock Symbol | TradeCraft',
      description: 'The requested stock symbol is not valid.',
    };
  }

  try {
    // Try to get cached content for SEO metadata
    const cachedPlan = await getCachedTradePlan(upperSymbol);
    
    if (cachedPlan && (cachedPlan as any).trade_plan) {
      // Use cached data to generate optimal SEO metadata
      const seoData = extractSEODataFromTradePlan((cachedPlan as any).trade_plan);
      const seoContent = generateTradePlanSEO(seoData);
      
      return {
        title: seoContent.title,
        description: seoContent.description,
        keywords: seoContent.keywords.join(', '),
        openGraph: {
          title: seoContent.title,
          description: seoContent.description,
          type: 'website',
          url: seoContent.canonicalUrl,
          images: [
            {
              url: seoContent.ogImage || 'https://www.tradingsetup.pro/bull-bear.png',
              width: 1200,
              height: 630,
              alt: `${upperSymbol} Trade Plan`,
            },
          ],
        },
        twitter: {
          card: 'summary_large_image',
          title: seoContent.title,
          description: seoContent.description,
          images: [seoContent.ogImage || 'https://www.tradingsetup.pro/bull-bear.png'],
        },
        alternates: {
          canonical: seoContent.canonicalUrl,
        },
        other: {
          'application/ld+json': JSON.stringify(seoContent.structuredData),
        },
      };
    }
  } catch (error) {
    console.error('Error loading cached metadata for', upperSymbol, error);
  }

  // Fallback to basic metadata if no cached content
  const fallbackSEO = generateFallbackSEO(upperSymbol);
  
  return {
    title: fallbackSEO.title,
    description: fallbackSEO.description,
    keywords: fallbackSEO.keywords.join(', '),
    openGraph: {
      title: fallbackSEO.title,
      description: fallbackSEO.description,
      type: 'website',
      url: fallbackSEO.canonicalUrl,
      images: [
        {
          url: 'https://www.tradingsetup.pro/bull-bear.png',
          width: 1200,
          height: 630,
          alt: `${upperSymbol} Trade Plan`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fallbackSEO.title,
      description: fallbackSEO.description,
      images: ['https://www.tradingsetup.pro/bull-bear.png'],
    },
    alternates: {
      canonical: fallbackSEO.canonicalUrl,
    },
  };
}

export default async function TradePlanPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params;
  const upperSymbol = symbol.toUpperCase();

  // SECURITY: Require authentication for trade plan pages
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    // Redirect to sign-in page with return URL
    redirect(`/auth/signin?callbackUrl=/trade-plan/${upperSymbol}`);
  }

  // Basic validation for stock symbols
  if (!isValidStockSymbol(upperSymbol)) {
    notFound();
  }

  // Trigger auto-refresh in background (non-blocking)
  // This ensures fresh cache for SEO and future visitors
  onStockPageAccess(upperSymbol);

  // Try to get cached content for initial page load
  let cachedTradePlan = null;
  try {
    const cached = await getCachedTradePlan(upperSymbol);
    if (cached && (cached as any).trade_plan) {
      cachedTradePlan = (cached as any).trade_plan;
    }
  } catch (error) {
    console.error('Error loading cached trade plan for SSR:', error);
  }

  return (
    <HybridAdStrategy>
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": `${upperSymbol} Trading Plan`,
          "description": `Professional AI-generated trading plan for ${upperSymbol} stock with entry zones, stop losses, price targets, and risk management strategies.`,
          "url": `https://www.tradingsetup.pro/trade-plan/${upperSymbol}`,
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro"
          },
          "category": "Trading Analysis",
          "featureList": [
            "Entry zone recommendations",
            "Stop loss calculations", 
            "Price target analysis",
            "Risk management strategy",
            "Position sizing guidance",
            "Technical indicator analysis"
          ]
        }}
      />
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": `${upperSymbol} Trade Plan - Professional Trading Strategy Analysis`,
          "description": `Comprehensive trading plan for ${upperSymbol} including entry zones, stop losses, price targets, risk management, and technical analysis.`,
          "url": `https://www.tradingsetup.pro/trade-plan/${upperSymbol}`,
          "datePublished": new Date().toISOString(),
          "dateModified": new Date().toISOString(),
          "author": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro"
          },
          "publisher": {
            "@type": "Organization",
            "name": "TradeCraft Pro",
            "url": "https://www.tradingsetup.pro",
            "logo": {
              "@type": "ImageObject",
              "url": "https://www.tradingsetup.pro/logo.png"
            }
          },
          "about": {
            "@type": "FinancialService",
            "name": `${upperSymbol} Stock Trading Analysis`,
            "serviceType": "Investment Analysis"
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://www.tradingsetup.pro/trade-plan/${upperSymbol}`
          },
          "articleSection": "Trading Strategy",
          "keywords": [
            `${upperSymbol} trade plan`,
            `${upperSymbol} trading strategy`,
            `${upperSymbol} entry points`,
            `${upperSymbol} stop loss`,
            `${upperSymbol} price targets`,
            `how to trade ${upperSymbol}`,
            `${upperSymbol} risk management`,
            `${upperSymbol} technical analysis`
          ]
        }}
      />
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": `How to Trade ${upperSymbol} Stock - Step by Step Guide`,
          "description": `Professional step-by-step trading guide for ${upperSymbol} stock with specific entry, exit, and risk management instructions.`,
          "url": `https://www.tradingsetup.pro/trade-plan/${upperSymbol}`,
          "image": `https://www.tradingsetup.pro/og-stock-tradeplan-${upperSymbol}.jpg`,
          "totalTime": "PT5M",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "Trading Account"
            },
            {
              "@type": "HowToSupply", 
              "name": "Risk Capital"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "TradeCraft Trade Plan"
            }
          ],
          "step": [
            {
              "@type": "HowToStep",
              "name": "Review the Trade Plan",
              "text": `Analyze the complete ${upperSymbol} trade plan including market conditions, entry zones, and risk parameters.`
            },
            {
              "@type": "HowToStep", 
              "name": "Calculate Position Size",
              "text": "Determine appropriate position size based on your portfolio size and the recommended risk percentage."
            },
            {
              "@type": "HowToStep",
              "name": "Set Entry Orders",
              "text": "Place buy orders within the recommended entry zone price range."
            },
            {
              "@type": "HowToStep",
              "name": "Set Stop Loss",
              "text": "Immediately set stop loss order at the recommended stop loss price level."
            },
            {
              "@type": "HowToStep",
              "name": "Monitor Price Targets", 
              "text": "Track price movement toward the three target levels and take partial profits as targets are reached."
            }
          ]
        }}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <TradePlanContent symbol={upperSymbol} initialCachedData={cachedTradePlan} />
      </div>
    </HybridAdStrategy>
  );
}
