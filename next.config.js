/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Custom headers for caching optimization
  async headers() {
    return [
      // Cache static images for 1 year
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000 * 1000).toUTCString()
          }
        ],
      },
      // Cache public assets (logos, icons, etc.) for 1 year
      {
        source: '/:path*.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000 * 1000).toUTCString()
          }
        ],
      },
      // Cache Next.js static assets for 1 year
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 31536000 * 1000).toUTCString()
          }
        ],
      },
      // Cache Next.js image optimization for 1 week
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 604800 * 1000).toUTCString()
          }
        ],
      },
      // Cache blog images for 1 month
      {
        source: '/blog/:path*.(jpg|jpeg|png|gif|svg|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 2592000 * 1000).toUTCString()
          }
        ],
      },
      // Cache badges and external assets for 1 week
      {
        source: '/badges/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 604800 * 1000).toUTCString()
          }
        ],
      },
      // Cache avatars and profile images for 1 day (can change more frequently)
      {
        source: '/avatar.:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 86400 * 1000).toUTCString()
          }
        ],
      },
      // Cache manifest and favicon for 1 week
      {
        source: '/(favicon.ico|site.webmanifest|robots.txt)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800'
          },
          {
            key: 'Expires',
            value: new Date(Date.now() + 604800 * 1000).toUTCString()
          }
        ],
      }
    ];
  },
  
  images: {
    // Optimize image caching and performance
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache for optimized images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.snapi.dev',
      },
      {
        protocol: 'https',
        hostname: 'stockanalysis.com',
      },
      {
        protocol: 'https',
        hostname: 'static.seekingalpha.com',
      },
      {
        protocol: 'https',
        hostname: 'media.reuters.com',
      },
      {
        protocol: 'https',
        hostname: 'images.wsj.net',
      },
      {
        protocol: 'https',
        hostname: 's3-symbol-logo.tradingview.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.bwbx.io',
      },
      {
        protocol: 'https',
        hostname: 'www.barrons.com',
      },
      {
        protocol: 'https',
        hostname: 'www.marketwatch.com',
      },
      {
        protocol: 'https',
        hostname: 'www.foxbusiness.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fxempire.com',
      },
      {
        protocol: 'https',
        hostname: 'www.investing.com',
      },
      {
        protocol: 'https',
        hostname: 'www.cnbc.com',
      },
      {
        protocol: 'https',
        hostname: 'www.fool.com',
      },
      {
        protocol: 'https',
        hostname: 'www.investopedia.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nasdaq.com',
      },
      {
        protocol: 'https',
        hostname: 'www.zacks.com',
      },
      {
        protocol: 'https',
        hostname: 'www.yahoo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.benzinga.com',
      },
      {
        protocol: 'https',
        hostname: 'www.businessinsider.com',
      },
      {
        protocol: 'https',
        hostname: 'www.forbes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.ft.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bloomberg.com',
      },
      {
        protocol: 'https',
        hostname: 'www.seekingalpha.com',
      },
      {
        protocol: 'https',
        hostname: 'www.tradingview.com',
      },
      {
        protocol: 'https',
        hostname: 'www.prnewswire.com',
      },
      {
        protocol: 'https',
        hostname: 'www.globenewswire.com',
      },
      {
        protocol: 'https',
        hostname: 'www.marketpulse.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thestreet.com',
      },
      {
        protocol: 'https',
        hostname: 'www.investingcube.com',
      },
      {
        protocol: 'https',
        hostname: 'www.economist.com',
      },
      {
        protocol: 'https',
        hostname: 'www.moneycontrol.com',
      },
      {
        protocol: 'https',
        hostname: 'www.livemint.com',
      },
      {
        protocol: 'https',
        hostname: 'www.businesstoday.in',
      },
      {
        protocol: 'https',
        hostname: 'www.financialexpress.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thehindubusinessline.com',
      },
      {
        protocol: 'https',
        hostname: 'www.thehindu.com',
      },
      {
        protocol: 'https',
        hostname: 'www.reuters.com',
      },
      {
        protocol: 'https',
        hostname: 'www.bbc.com',
      },
      {
        protocol: 'https',
        hostname: 'www.nytimes.com',
      },
      {
        protocol: 'https',
        hostname: 'www.wsj.com',
      },
      {
        protocol: 'https',
        hostname: 'a57.foxnews.com',
      },
      {
        protocol: 'https',
        hostname: 'responsive.fxempire.com',
      },
      {
        protocol: 'https',
        hostname: 'nypost.com',
      },
      {
        protocol: 'https',
        hostname: 'image.cnbcfm.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.benzinga.com',
      },
      {
        protocol: 'https',
        hostname: 'api.producthunt.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    
    // Suppress Supabase realtime critical dependency warnings
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "crypto": false,
      "stream": false,
      "assert": false,
      "http": false,
      "https": false,
      "os": false,
      "url": false,
      "zlib": false,
    };
    
    // Filter out the critical dependency warning for Supabase realtime
    const originalWarn = config.infrastructureLogging?.debug;
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: 'error'
    };
    
    // Suppress specific webpack warnings
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /node_modules\/@supabase\/realtime-js/
    ];
    
    return config;
  },
};

module.exports = nextConfig;
