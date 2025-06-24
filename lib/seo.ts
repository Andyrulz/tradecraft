import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noIndex?: boolean;
}

const DEFAULT_TITLE = 'TradeCraft Pro - Advanced Stock Market Analysis & Trading Tools';
const DEFAULT_DESCRIPTION = 'Professional stock market analysis tools, real-time market news, stock screeners, and automated trade plan generation. Make informed trading decisions with TradeCraft Pro.';
const SITE_URL = 'https://www.tradingsetup.pro';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function generateMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false
}: SEOProps): Metadata {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | TradeCraft Pro`;
  const url = canonicalUrl || SITE_URL;

  const defaultKeywords = [
    'stock market analysis',
    'trading tools',
    'market news',
    'stock screener',
    'trade plans',
    'momentum stocks',
    'market movers',
    'financial analysis',
    'stock research',
    'trading strategies'
  ];

  const allKeywords = [...defaultKeywords, ...keywords].join(', ');

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: allKeywords,
    authors: [{ name: 'TradeCraft Pro' }],
    creator: 'TradeCraft Pro',
    publisher: 'TradeCraft Pro',
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: 'TradeCraft Pro',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: '@tradecraftpro',
      site: '@tradecraftpro',    },
    verification: {
      google: 'iz8NGLR7L-w5Ez2rqw-HR0J9v_Y9R8psYhLjovnHMEg', // Google Search Console verification
    },
    metadataBase: new URL(SITE_URL),
  };

  return metadata;
}

// Structured Data Generators
export function generateArticleStructuredData({
  title,
  description,
  url,
  imageUrl,
  publishedTime,
  modifiedTime,
  authorName = 'TradeCraft Pro',
  section = 'Finance'
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "TradeCraft Pro",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": imageUrl ? {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    } : undefined,
    "articleSection": section,
    "inLanguage": "en-US"
  };
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "TradeCraft Pro",
    "url": SITE_URL,
    "description": DEFAULT_DESCRIPTION,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TradeCraft Pro",
    "url": SITE_URL,
    "logo": `${SITE_URL}/logo.png`,
    "description": DEFAULT_DESCRIPTION,
    "sameAs": [
      "https://twitter.com/tradecraftpro",
      "https://linkedin.com/company/tradecraftpro"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@tradingsetup.pro"
    }
  };
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

export function generateBlogPostStructuredData({
  title,
  description,
  url,
  imageUrl,
  publishedTime,
  modifiedTime,
  authorName = 'TradeCraft Pro',
  tags = []
}: {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  publishedTime: string;
  modifiedTime?: string;
  authorName?: string;
  tags?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "url": url,
    "datePublished": publishedTime,
    "dateModified": modifiedTime || publishedTime,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": SITE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": "TradeCraft Pro",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "image": imageUrl ? {
      "@type": "ImageObject",
      "url": imageUrl,
      "width": 1200,
      "height": 630
    } : undefined,
    "keywords": tags.join(', '),
    "articleSection": "Trading Education",
    "inLanguage": "en-US",
    "genre": "Finance",
    "about": {
      "@type": "Thing",
      "name": "Stock Trading",
      "description": "Stock market trading strategies and analysis"
    }
  };
}

export function generateFinancialServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TradeCraft Pro",
    "url": SITE_URL,
    "description": DEFAULT_DESCRIPTION,
    "logo": `${SITE_URL}/logo.png`,
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
            "description": "Advanced stock screening and filtering tools"
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
}
