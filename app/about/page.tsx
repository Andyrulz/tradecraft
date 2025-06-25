import { Metadata } from 'next';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';
import { HybridAdStrategy } from '@/components/ui/HybridAds';
import { BannerWorkingAd, LargeWorkingAd } from '@/components/ui/WorkingAdUnit';
import MobileLargeAd from '@/components/ui/MobileLargeAd';

export const metadata: Metadata = generateSEOMetadata({
  title: 'About TradeCraft Pro - Professional Trading Platform & Team | TradeCraft Pro',
  description: 'Learn about TradeCraft Pro, the leading AI-powered trading platform. Meet our team of experienced traders and developers creating advanced stock analysis tools.',
  keywords: [
    'about tradecraft',
    'trading platform team',
    'stock analysis company',
    'trading software company',
    'financial technology',
    'trading platform history',
    'market analysis experts',
    'trading education team'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/about',
  ogImage: 'https://www.tradingsetup.pro/og-about.jpg',
  ogType: 'website'
});

export default function AboutPage() {
  return (
    <HybridAdStrategy>
      <main className="flex-1 pt-[68px] pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Top banner ad */}
          <BannerWorkingAd className="flex justify-center mb-8" />
          
          <h1 className="text-3xl font-bold mb-6">About TradeCraft</h1>
          <p className="mb-6 text-lg">TradeCraft is dedicated to empowering traders and investors with institutional-grade trade plans, actionable analysis, and educational resources. Our mission is to democratize professional trading tools and make data-driven investing accessible to everyone, from beginners to experienced professionals.</p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">We believe that every trader deserves access to the same high-quality analysis and tools used by institutional investors. TradeCraft bridges this gap by providing:</p>
          <ul className="list-disc ml-6 mb-6">
            <li>AI-powered trade plan generation with precise entry and exit points</li>
            <li>Advanced momentum screening technology</li>
            <li>Real-time market analysis and news integration</li>
            <li>Educational resources based on proven trading methodologies</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Who We Are</h2>
          <p className="mb-4">TradeCraft is built by a passionate team of traders, technologists, and financial analysts with decades of combined experience in:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Quantitative trading and algorithmic development</li>
            <li>Technical analysis and market structure research</li>
            <li>Financial technology and data science</li>
            <li>Educational content creation and trader mentorship</li>
          </ul>
          <p className="mb-4">We believe in transparency, continuous education, and empowering users to make informed decisions in the stock market through data-driven insights and proven methodologies.</p>
          
          {/* Strategic ad placement between content sections */}
          <div className="my-10">
            <div className="md:hidden">
              <MobileLargeAd />
            </div>
            <div className="hidden md:block">
              <LargeWorkingAd />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Free Tools</h3>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>AI Trade Plan Generator:</strong> Get detailed entry, exit, and stop-loss levels for any stock</li>
              <li><strong>Market News Analysis:</strong> Curated financial news with market impact insights</li>
              <li><strong>Market Movers Tracker:</strong> Real-time top gainers and losers with volume analysis</li>
              <li><strong>Educational Resources:</strong> Comprehensive trading guides and strategy tutorials</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-2">Premium Features</h3>
            <ul className="list-disc ml-6 mb-4">
              <li><strong>Advanced Momentum Screener:</strong> Multi-factor stock screening with proprietary algorithms</li>
              <li><strong>Portfolio Analysis Tools:</strong> Advanced risk management and position sizing</li>
              <li><strong>Real-time Alerts:</strong> Custom notifications for your trading opportunities</li>
              <li><strong>Professional Trade Plans:</strong> Institutional-grade analysis with detailed risk metrics</li>
            </ul>
          </div>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology</h2>
          <p className="mb-4">TradeCraft leverages cutting-edge technology to deliver superior trading insights:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Machine learning algorithms for pattern recognition and trend analysis</li>
            <li>Real-time data processing from multiple financial data providers</li>
            <li>Advanced backtesting engines for strategy validation</li>
            <li>Cloud-based infrastructure for reliable, fast performance</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Values</h2>
          <ul className="list-disc ml-6 mb-6">
            <li><strong>Transparency:</strong> Clear methodology and honest performance reporting</li>
            <li><strong>Education:</strong> Empowering users with knowledge, not just signals</li>
            <li><strong>Innovation:</strong> Continuously improving our tools and methodologies</li>
            <li><strong>Accessibility:</strong> Making professional-grade tools available to all traders</li>
            <li><strong>Privacy:</strong> Protecting your data and maintaining strict security standards</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Community & Support</h2>
          <p className="mb-4">Join thousands of traders who trust TradeCraft for their market analysis. Our community includes:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>Day traders and swing traders</li>
            <li>Long-term investors and portfolio managers</li>
            <li>Trading educators and mentors</li>
            <li>Financial advisors and professionals</li>
          </ul>
          
          <p className="mt-8 text-lg">Ready to elevate your trading? <a href="/pricing" className="text-blue-600 underline font-medium">Explore our plans</a> or <a href="/contact" className="text-blue-600 underline font-medium">contact us</a> for questions and feedback.</p>
        </div>
      </main>
    </HybridAdStrategy>
  );
}