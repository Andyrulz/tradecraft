/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Performance optimizations
  compress: true,
  
  // Experimental features for performance
  experimental: {
    scrollRestoration: true,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  
  // Custom headers for caching optimization
  async headers() {
    return [
      // Performance headers for all pages
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ],
      },
      // Resource preloading for homepage
      {
        source: '/',
        headers: [
          {
            key: 'Link',
            value: '</og-homepage.jpg>; rel=preload; as=image, <https://api.producthunt.com>; rel=preconnect, <https://medium.com>; rel=preconnect'
          }
        ]
      },
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
    
    // Performance optimizations
    loader: 'default',
    domains: [], // Deprecated in favor of remotePatterns
    unoptimized: false,
    
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
        hostname: 'api.producthunt.com',
        pathname: '/widgets/**',
      },
      {
        protocol: 'https',
        hostname: 'www.tradingsetup.pro',
        pathname: '/**',
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
  webpack: (config, { isServer, dev }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
      
      // Enable filesystem cache in production
      config.cache = {
        type: 'filesystem',
        cacheDirectory: require('path').resolve('.next/cache/webpack')
      };
    } else {
      // Disable cache in development
      config.cache = false;
    }
    
    // Resolve fallbacks for better compatibility
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
    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
      /node_modules\/@supabase\/realtime-js/
    ];
    
    return config;
  },
};

module.exports = nextConfig;
