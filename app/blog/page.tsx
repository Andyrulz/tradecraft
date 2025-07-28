import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import MobileLargeAd from '@/components/ui/MobileLargeAd';
import { StructuredData } from '@/components/seo/StructuredData';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Trading Education Blog - Stock Market Analysis & Trading Strategies | TradeCraft Pro',
  description: 'Learn advanced trading strategies, stock analysis techniques, and market insights. Expert guides on trade plan generation, risk management, momentum trading, and technical analysis.',
  keywords: [
    'trading blog',
    'stock market education',
    'trading strategies',
    'technical analysis',
    'momentum trading',
    'swing trading',
    'risk management',
    'trade plans',
    'stock analysis',
    'market analysis',
    'trading education',
    'investment strategies',
    'trading psychology',
    'market trends',
    'stock market guide'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/blog',
  ogImage: 'https://www.tradingsetup.pro/og-blog.jpg',
  ogType: 'website'
});

const blogPosts = [
  {
    href: '/blog/stan-weinstein-market-sentiment-june-2025',
    title: "Stan Weinstein's Market Sentiment – June Update",
    description: 'A technical market update inspired by Stan Weinstein: bullish intermediate-term, but caution as leadership stocks falter.',
    image: '/blog/stan-weinstein-june-update.png',
  },
  {
    href: '/blog/market-symmetry-in-base-patterns',
    title: 'Market Symmetry in Base Patterns',
    description: 'Why smooth, symmetrical bases are the foundation of winning stocks—and how to spot them with TradeCraft.',
    image: '/blog/market-symmetry-in-base-patterns.png',
  },
  {
    href: '/blog/trade-plan-generator',
    title: 'Trade Plan Generator',
    description: 'Instantly create a professional trading plan for any stock with TradeCraft.',
    image: '/blog/trade-plan-overview.png',
  },
  {
    href: '/blog/stock-entry-exit-tool',
    title: 'Stock Entry and Exit Tool',
    description: 'Find the best price levels to buy and sell stocks using TradeCraft.',
    image: '/blog/entry-exit-rules.png',
  },
  {
    href: '/blog/momentum-stock-screener',
    title: 'Momentum Stock Screener',
    description: 'Discover trending stocks with strong price and volume momentum.',
    image: '/blog/momentum-indicators-overview.png',
  },
  {
    href: '/blog/small-cap-stock-screener',
    title: 'Small Cap Stock Screener',
    description: 'Filter for high-growth small cap opportunities.',
    image: '/blog/roc-example.png',
  },
  {
    href: '/blog/how-to-set-stop-loss-targets',
    title: 'How to Set Stop Loss and Targets',
    description: 'Master risk management with TradeCraft’s tools.'
  },
  {
    href: '/blog/detailed-trading-plan-for-any-stock',
    title: 'Detailed Trading Plan for Any Stock',
    description: 'Step-by-step guidance for any ticker.'
  },
  {
    href: '/blog/how-to-spot-next-leading-momentum-stock-using-trade-craft',
    title: 'How to Spot the Next Leading Momentum Stock Using TradeCraft',
    description: 'Advanced momentum scanning techniques.'
  },
  {
    href: '/blog/identify-breakout-stocks-price-volume',
    title: 'Identify Breakout Stocks by Price & Volume',
    description: 'Spotting breakouts with TradeCraft tools.'
  },
  {
    href: '/blog/mastering-market-conditions-the-edge-most-traders-ignore',
    title: 'Mastering Market Conditions: The Edge Most Traders Ignore',
    description: 'Adapting your strategy to the market environment.'
  },
  {
    href: '/blog/step-by-step-trade-plan-risk-management',
    title: 'Step-by-Step Trade Plan & Risk Management',
    description: 'A practical guide to disciplined trading.'
  },
  {
    href: '/blog/top-5-momentum-indicators-midcap',
    title: 'Top 5 Momentum Indicators for Midcap Stocks',
    description: 'Tools and tips for midcap momentum trading.'
  },
  {
    href: '/blog/complete-guide-to-swing-trading-stocks',
    title: 'Complete Guide to Swing Trading Stocks',
    description: 'Master swing trading with proven strategies, risk management, and position sizing techniques.'
  },
  {
    href: '/blog/technical-analysis-guide-for-stock-trading',
    title: 'Technical Analysis Guide for Stock Trading',
    description: 'Complete guide to charts, indicators, patterns, and technical analysis strategies for successful trading.'
  },
  {
    href: '/blog/risk-management-in-stock-trading',
    title: 'Risk Management in Stock Trading',
    description: 'Essential risk management strategies, position sizing, and portfolio protection techniques for traders.'
  },
  {
    href: '/blog/options-trading-strategies-for-beginners',
    title: 'Options Trading Strategies for Beginners',
    description: 'Learn covered calls, protective puts, spreads, and risk management for successful options trading.'
  },
  {
    href: '/blog/day-trading-strategies-that-work',
    title: 'Day Trading Strategies That Actually Work',
    description: 'Proven day trading strategies including scalping, momentum trading, and gap trading with risk management.'
  },
  {
    href: '/blog/fundamental-analysis-complete-guide',
    title: 'Fundamental Analysis Complete Guide',
    description: 'Master financial statements, ratios, valuation methods, and company analysis for informed investing.'
  },
  {
    href: '/blog/cryptocurrency-trading-strategies-guide',
    title: 'Cryptocurrency Trading Strategies Guide',
    description: 'Complete guide to crypto trading including DCA, arbitrage, DeFi, and risk management strategies.'
  },
  {
    href: '/blog/trading-psychology-master-your-mind',
    title: 'Trading Psychology: Master Your Mind',
    description: 'Control emotions, overcome biases, and develop the mental discipline needed for consistent trading profits.'
  }
];

export default function BlogIndexPage() {
  // Split blog posts for strategic ad placement
  const firstRowPosts = blogPosts.slice(0, 3);
  const middlePosts = blogPosts.slice(3, 6);
  const remainingPosts = blogPosts.slice(6);

  return (
    <HybridAdStrategy>
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.tradingsetup.pro"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Blog",
              "item": "https://www.tradingsetup.pro/blog"
            }
          ]
        }}
      />

      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "TradeCraft Trading Education Blog",
          "description": "Expert guides on trading strategies, stock analysis, technical analysis, and market insights to improve your trading results.",
          "url": "https://www.tradingsetup.pro/blog",
          "author": {
            "@type": "Person",
            "name": "Andrew",
            "url": "https://www.tradingsetup.pro/about"
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
          "inLanguage": "en-US",
          "about": [
            "Trading Strategies",
            "Stock Market Analysis",
            "Technical Analysis",
            "Risk Management",
            "Trade Planning",
            "Financial Education"
          ]
        }}
      />
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Trading Education Blog Posts",
          "description": "Collection of expert trading articles covering strategies, analysis techniques, and market insights",
          "url": "https://www.tradingsetup.pro/blog",
          "hasPart": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "url": `https://www.tradingsetup.pro${post.href}`,
            "image": post.image ? `https://www.tradingsetup.pro${post.image}` : undefined,
            "author": {
              "@type": "Person", 
              "name": "Andrew"
            },
            "publisher": {
              "@type": "Organization",
              "name": "TradeCraft Pro"
            }
          }))
        }}
      />
      
      <main className="max-w-6xl mx-auto px-4 py-8 bg-background">
        <div className="mb-10 text-center">
          <span className="inline-block bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider mb-3">Blog</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-primary tracking-tight">TradeCraft Blog</h1>
          <p className="text-lg text-muted-foreground mb-0 max-w-2xl mx-auto">Explore our in-depth guides on trading plans, stock screeners, and risk management. Learn how to use TradeCraft to improve your trading results.</p>
        </div>

        {/* Top banner ad */}
        <BannerWorkingAd className="flex justify-center mb-8" />

        {/* First row of blog posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {firstRowPosts.map(post => (
            <Link key={post.href} href={post.href} className="group block border border-border rounded-2xl shadow-sm hover:shadow-lg transition bg-background p-4 sm:p-6 h-full w-full min-h-[320px]">
              {post.image && (
                <Image src={post.image} alt={post.title} width={500} height={280} className="rounded-lg object-cover w-full h-36 sm:h-40 mb-4" />
              )}
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary group-hover:underline group-hover:text-primary/80 transition-colors">{post.title}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-0">{post.description}</p>
            </Link>
          ))}
        </div>

        {/* Strategic ad placement between content sections */}
        <div className="my-10">
          <div className="md:hidden">
            <MobileLargeAd />
          </div>
          <div className="hidden md:block">
            <LargeWorkingAd />
          </div>
        </div>

        {/* Middle section of blog posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {middlePosts.map(post => (
            <Link key={post.href} href={post.href} className="group block border border-border rounded-2xl shadow-sm hover:shadow-lg transition bg-background p-4 sm:p-6 h-full w-full min-h-[320px]">
              {post.image && (
                <Image src={post.image} alt={post.title} width={500} height={280} className="rounded-lg object-cover w-full h-36 sm:h-40 mb-4" />
              )}
              <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary group-hover:underline group-hover:text-primary/80 transition-colors">{post.title}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-0">{post.description}</p>
            </Link>
          ))}
        </div>

        {/* Remaining blog posts */}
        {remainingPosts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {remainingPosts.map(post => (
              <Link key={post.href} href={post.href} className="group block border border-border rounded-2xl shadow-sm hover:shadow-lg transition bg-background p-4 sm:p-6 h-full w-full min-h-[320px]">
                {post.image && (
                  <Image src={post.image} alt={post.title} width={500} height={280} className="rounded-lg object-cover w-full h-36 sm:h-40 mb-4" />
                )}
                <h2 className="text-lg sm:text-xl font-semibold mb-2 text-primary group-hover:underline group-hover:text-primary/80 transition-colors">{post.title}</h2>
                <p className="text-sm sm:text-base text-muted-foreground mb-0">{post.description}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom CTA and Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Get Expert Trading Insights
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join 10,000+ traders who get our weekly market analysis, trade setups, and educational content delivered to their inbox.
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Free. Unsubscribe anytime.</p>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Start Trading with TradeCraft</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md border text-center">
              <h3 className="text-xl font-bold mb-2">Stock Screener</h3>
              <p className="text-gray-600 mb-4">
                Find momentum stocks and breakout opportunities before they move.
              </p>
              <a 
                href="/screener" 
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Screener
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border text-center">
              <h3 className="text-xl font-bold mb-2">Trade Plan Generator</h3>
              <p className="text-gray-600 mb-4">
                Create professional trade plans with entry, exit, and risk management.
              </p>
              <a 
                href="/blog/trade-plan-generator" 
                className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Generate Plan
              </a>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border text-center">
              <h3 className="text-xl font-bold mb-2">Market Movers</h3>
              <p className="text-gray-600 mb-4">
                Track daily gainers and losers to spot market trends.
              </p>
              <a 
                href="/market-movers" 
                className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                View Movers
              </a>
            </div>
          </div>
        </div>

        {/* Bottom ad */}
        <div className="mt-12">
          <div className="md:hidden">
            <MobileLargeAd />
          </div>
          <div className="hidden md:block">
            <LargeWorkingAd />
          </div>
        </div>
      </main>
    </HybridAdStrategy>
  );
}