/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
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
    ],
  },
  webpack: (config, { isServer }) => {
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
