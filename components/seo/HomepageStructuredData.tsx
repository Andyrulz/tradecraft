import { StructuredData } from './StructuredData';

export function HomepageStructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TradeCraft Pro",
    "url": "https://www.tradingsetup.pro",
    "logo": "https://www.tradingsetup.pro/logo.png",
    "description": "Build winning trading strategies with AI analysis, systematic trade plans, and momentum screening. Your professional platform for data-driven trading decisions.",
    "sameAs": [
      "https://www.producthunt.com/products/tradecraft-2",
      "https://medium.com/@andrew.labyrinthventures",
      "https://www.linkedin.com/company/trade-craft-pro",
      "https://www.facebook.com/profile.php?id=61576935563708"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@tradingsetup.pro"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TradeCraft Pro",
    "url": "https://www.tradingsetup.pro",
    "description": "Build winning trading strategies with AI analysis, systematic trade plans, and momentum screening. Your professional platform for data-driven trading decisions.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.tradingsetup.pro/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  const financialServiceData = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TradeCraft Pro",
    "url": "https://www.tradingsetup.pro",
    "description": "Build winning trading strategies with AI analysis, systematic trade plans, and momentum screening. Your professional platform for data-driven trading decisions.",
    "logo": "https://www.tradingsetup.pro/logo.png",
    "serviceType": "Stock Market Analysis",
    "areaServed": "United States",
    "currenciesAccepted": "USD",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Trading Tools and Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stock Screener",
            "description": "Advanced momentum stock screening and filtering tools"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Trade Plan Generator",
            "description": "AI-powered automated trade plan generation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Market News",
            "description": "Real-time stock market news and analysis"
          }
        }
      ]
    }
  };

  const webApplicationData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "TradeCraft Pro",
    "url": "https://www.tradingsetup.pro",
    "description": "Generate data-driven trade plans enhanced with AI insights, discover momentum stocks, track market movers, and stay updated with real-time market news",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "AI-Enhanced Trade Plans",
      "Momentum Stock Screener",
      "Market Movers Tracker",
      "Real-Time Market News"
    ]
  };

  return (
    <>
      <StructuredData data={organizationData} />
      <StructuredData data={websiteData} />
      <StructuredData data={financialServiceData} />
      <StructuredData data={webApplicationData} />
    </>
  );
}
