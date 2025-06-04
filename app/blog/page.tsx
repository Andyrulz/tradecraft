import Link from 'next/link';

export const metadata = {
  title: 'TradeCraft Blog – Trading Plan, Stock Screeners, and Risk Management Guides',
  description: 'Explore TradeCraft blog articles on trade plan generation, entry/exit tools, momentum and small cap screeners, and risk management. Learn how to use TradeCraft for smarter trading.'
};

const blogPosts = [
  {
    href: '/blog/trade-plan-generator',
    title: 'Trade Plan Generator',
    description: 'Instantly create a professional trading plan for any stock with TradeCraft.'
  },
  {
    href: '/blog/stock-entry-exit-tool',
    title: 'Stock Entry and Exit Tool',
    description: 'Find the best price levels to buy and sell stocks using TradeCraft.'
  },
  {
    href: '/blog/momentum-stock-screener',
    title: 'Momentum Stock Screener',
    description: 'Discover trending stocks with strong price and volume momentum.'
  },
  {
    href: '/blog/small-cap-stock-screener',
    title: 'Small Cap Stock Screener',
    description: 'Filter for high-growth small cap opportunities.'
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
  }
];

export default function BlogIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8 mt-28">
      <h1 className="text-4xl font-bold mb-2">TradeCraft Blog</h1>
      <p className="text-lg text-muted-foreground mb-8">Explore our in-depth guides on trading plans, stock screeners, and risk management. Learn how to use TradeCraft to improve your trading results.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map(post => (
          <Link key={post.href} href={post.href} className="block border rounded-lg shadow-sm hover:shadow-lg transition bg-white p-6 h-full">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-base text-muted-foreground mb-0">{post.description}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}