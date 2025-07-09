import { StructuredData } from './StructuredData';

export function HomepageStructuredData() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is TradeCraft Pro?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TradeCraft Pro is a professional trading platform that generates data-driven trade plans enhanced with AI insights. It provides momentum stock screening, market movers tracking, and real-time market news to help traders make informed decisions."
        }
      },
      {
        "@type": "Question",
        "name": "How does the AI-enhanced trade plan generation work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our system analyzes technical indicators, market data, and historical patterns to generate comprehensive trade plans with entry points, stop losses, price targets, and risk management strategies. The AI enhances these plans with additional insights and market context."
        }
      },
      {
        "@type": "Question",
        "name": "What makes TradeCraft different from other trading tools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TradeCraft combines data-driven analysis with AI insights to provide actionable trade plans, momentum stock screening, real-time market movers, and curated news in one platform. It's designed for clarity and confidence in trading decisions."
        }
      }
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TradeCraft Pro",
    "url": "https://www.tradingsetup.pro",
    "logo": "https://www.tradingsetup.pro/logo.png",
    "description": "Professional trading platform providing data-driven trade plans enhanced with AI insights",
    "sameAs": [
      "https://www.producthunt.com/products/tradecraft-2",
      "https://medium.com/@andrew.labyrinthventures",
      "https://www.linkedin.com/company/trade-craft-pro",
      "https://www.facebook.com/profile.php?id=61576935563708"
    ]
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
      <StructuredData data={faqData} />
      <StructuredData data={organizationData} />
      <StructuredData data={webApplicationData} />
    </>
  );
}
