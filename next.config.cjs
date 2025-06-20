/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'images.barrons.com',
      'static.foxbusiness.com',
      'static.seekingalpha.com',
      'images.marketwatch.com',
      'cdn.fxempire.com',
      's3-symbol-logo.tradingview.com',
      'media.reuters.com',
      'nypost.com',
      'static.benzinga.com',
      'api.producthunt.com',
      'gravatar.com',
      'twelve.tools',
      'www.traderinsight.com',
      'finviz.com',
      'stocktwits.com',
      'www.alphaquery.com',
      'www.smallcapdaily.com',
      // Add more as needed
    ],
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
