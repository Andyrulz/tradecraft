import { MetadataRoute } from 'next';
import { TOP_100_STOCKS } from '@/lib/config/top-stocks';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.tradingsetup.pro';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static pages with their priorities and update frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/market-movers`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trade-plan`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/screener`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/education/how-to-use-tradecraft`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/education/feature-breakdowns-updates`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/education/case-studies-success-stories`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/education/trading-strategies-and-concepts`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Blog posts (you can extend this to fetch dynamically from your CMS/database)
  const blogPosts = [
    'stan-weinstein-market-sentiment-june-2025',
    'market-symmetry-in-base-patterns',
    'trade-plan-generator',
    'stock-entry-exit-tool',
    'momentum-stock-screener',
    'small-cap-stock-screener',
    'detailed-trading-plan-for-any-stock',
    'how-to-set-stop-loss-targets',
    'how-to-spot-next-leading-momentum-stock-using-trade-craft',
    'identify-breakout-stocks-price-volume',
    'mastering-market-conditions-the-edge-most-traders-ignore',
    'step-by-step-trade-plan-risk-management'
  ];

  const blogSitemap: MetadataRoute.Sitemap = blogPosts.map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Popular stocks for trade plan SEO (using TOP_100_STOCKS configuration)
  // Generate trade plan pages for all top 100 stocks
  const tradePlanPages: MetadataRoute.Sitemap = TOP_100_STOCKS.map(stock => ({
    url: `${baseUrl}/trade-plan/${stock.symbol}`,
    lastModified: currentDate,
    changeFrequency: 'daily' as const,
    priority: Math.min(0.9, Math.max(0.7, stock.priority / 100)), // Priority based on stock importance
  }));

  return [...staticPages, ...blogSitemap, ...tradePlanPages];
}
