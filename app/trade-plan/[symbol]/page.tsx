import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TradePlanContent } from '@/components/trade-plan-seo/TradePlanContent';
import { getCachedTradePlan } from '@/lib/cache/trade-plan-cache';
import { generateTradePlanSEO, extractSEODataFromTradePlan, generateFallbackSEO } from '@/lib/seo/trade-plan-seo';
import { TOP_100_STOCKS } from '@/lib/config/top-stocks';
import { isValidStockSymbol } from '@/lib/config/top-stocks';

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

  // Basic validation for stock symbols
  if (!isValidStockSymbol(upperSymbol)) {
    notFound();
  }

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
    <main className="flex-1 pt-[68px] pb-12">
      <div className="container mx-auto px-3 sm:px-4">
        <TradePlanContent 
          symbol={upperSymbol} 
          initialCachedData={cachedTradePlan}
        />
      </div>
    </main>
  );
}
