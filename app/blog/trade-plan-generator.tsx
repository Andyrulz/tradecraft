import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Shield, Calculator } from 'lucide-react';
import { StructuredData } from '@/components/seo/StructuredData';
import { generateMetadata as generateSEOMetadata } from '@/lib/seo';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Free Trade Plan Generator - Create Professional Trading Plans | TradeCraft',
  description: 'Generate detailed trading plans instantly with AI-powered analysis. Get entry points, stop losses, and profit targets for any stock. Free tool used by 10,000+ traders.',
  keywords: [
    'trade plan generator',
    'trading plan creator',
    'stock trading plan',
    'automated trading plans',
    'entry exit calculator',
    'stop loss calculator',
    'trading strategy generator',
    'risk management tool',
    'technical analysis tool',
    'free trading tools'
  ],
  canonicalUrl: 'https://www.tradingsetup.pro/blog/trade-plan-generator',
  ogImage: 'https://www.tradingsetup.pro/blog/trade-plan-overview.png',
  ogType: 'article'
});

export default function TradePlanGeneratorBlog() {
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Free Trade Plan Generator - Create Professional Trading Plans",
        "description": "Learn how to use TradeCraft's AI-powered trade plan generator to create professional trading plans with automated risk management.",
        "author": {
          "@type": "Organization",
          "name": "TradeCraft Pro",
          "url": "https://www.tradingsetup.pro"
        },
        "publisher": {
          "@type": "Organization", 
          "name": "TradeCraft Pro",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.tradingsetup.pro/logo.png"
          }
        },
        "datePublished": "2025-01-08T12:00:00.000Z",
        "dateModified": "2025-01-08T12:00:00.000Z",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.tradingsetup.pro/blog/trade-plan-generator"
        },
        "image": {
          "@type": "ImageObject",
          "url": "https://www.tradingsetup.pro/blog/trade-plan-overview.png",
          "width": 1200,
          "height": 630
        }
      }} />

      <main className="min-h-screen bg-background pt-16 pb-12">
        <article className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 flex items-center gap-2">
            <Link href="/blog" className="inline-flex items-center text-sky-700 hover:underline text-sm font-semibold">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
            </Link>
          </div>

          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 leading-tight">
              Free Trade Plan Generator: Create Professional Trading Plans Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Generate detailed, actionable trading plans for any stock in seconds. Our AI-powered tool analyzes technical indicators, calculates risk management, and provides entry/exit strategies used by professional traders.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <span>Updated January 8, 2025</span>
              <span>•</span>
              <span>8 min read</span>
              <span>•</span>
              <span>Free Tool</span>
            </div>
            <div className="flex justify-center my-8">
              <Image
                src="/blog/trade-plan-overview.png"
                alt="TradeCraft Trade Plan Generator Interface"
                width={800}
                height={400}
                className="rounded-xl shadow-lg border"
                priority
              />
            </div>
          </header>

          {/* Quick CTA */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-center">
            <h2 className="text-lg font-bold mb-3 text-blue-900">Try the Trade Plan Generator Now</h2>
            <p className="text-blue-800 mb-4">
              Generate your first professional trading plan in under 30 seconds. Completely free to start.
            </p>
            <Link 
              href="/trade-plan" 
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Trade Plan →
            </Link>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">What is a Trade Plan Generator?</h2>
            <p className="text-lg mb-6 leading-relaxed">
              A trade plan generator is an AI-powered tool that automatically creates comprehensive trading strategies for individual stocks. Instead of spending hours analyzing charts and calculating risk levels manually, you can generate a complete trading plan in seconds.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <Target className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-green-900">Automated Analysis</h3>
                <p className="text-green-800">Instantly analyzes 20+ technical indicators and price patterns</p>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <Shield className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-blue-900">Risk Management</h3>
                <p className="text-blue-800">Calculates optimal position sizes and stop-loss levels</p>
              </div>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <Calculator className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-bold text-lg mb-2 text-purple-900">Entry & Exit Points</h3>
                <p className="text-purple-800">Identifies precise entry zones and profit targets</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">How TradeCraft Generates Your Trading Plan</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Technical Analysis</h3>
                  <p className="text-gray-700">
                    Our AI analyzes price action, volume patterns, moving averages, RSI, MACD, and 15+ other indicators to determine the stock's current trend and momentum.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Support & Resistance Detection</h3>
                  <p className="text-gray-700">
                    Identifies key support and resistance levels using swing high/low analysis and volume-weighted price levels for optimal entry and exit planning.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Risk Assessment</h3>
                  <p className="text-gray-700">
                    Calculates appropriate stop-loss levels based on Average True Range (ATR), recent swing lows, and volatility to protect your capital.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Trade Plan Generation</h3>
                  <p className="text-gray-700">
                    Combines all analysis into a comprehensive plan with entry zones, multiple profit targets, position sizing recommendations, and risk-reward ratios.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">What&apos;s Included in Your Trade Plan</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Entry Strategy</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Optimal entry price range</li>
                  <li>Entry timing conditions</li>
                  <li>Volume confirmation signals</li>
                  <li>Multiple timeframe analysis</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Risk Management</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Stop-loss placement strategy</li>
                  <li>Position sizing calculations</li>
                  <li>Risk-reward ratio analysis</li>
                  <li>Maximum loss scenarios</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Exit Strategy</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Multiple profit target levels</li>
                  <li>Trailing stop recommendations</li>
                  <li>Exit timing indicators</li>
                  <li>Partial position scaling</li>
                </ul>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Technical Analysis</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Trend direction assessment</li>
                  <li>Momentum indicators summary</li>
                  <li>Support/resistance levels</li>
                  <li>Pattern recognition</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">Why Use TradeCraft's Trade Plan Generator?</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-green-900">🎯 Remove Emotional Trading</h3>
                <p className="text-green-800">
                  Having a predetermined plan eliminates emotional decision-making. You&apos;ll know exactly when to enter, exit, and cut losses before you place the trade.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-blue-900">⚡ Save Time & Effort</h3>
                <p className="text-blue-800">
                  What takes professional traders hours of analysis, TradeCraft does in seconds. Focus on execution rather than endless chart analysis.
                </p>
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-purple-900">📊 Professional-Grade Analysis</h3>
                <p className="text-purple-800">
                  Access the same quality of analysis used by institutional traders, with comprehensive risk management and multiple scenario planning.
                </p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3 text-orange-900">🎓 Learn While You Trade</h3>
                <p className="text-orange-800">
                  Each plan includes explanations of the analysis, helping you understand why certain decisions were made and improving your trading skills.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-primary">How to Use the Trade Plan Generator</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong>Enter Stock Symbol:</strong> Type in any US stock symbol (e.g., AAPL, TSLA, NVDA)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong>Select Timeframe:</strong> Choose swing trading (5-30 days), positional (1-3 months), or long-term (3+ months)
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  <div>
                    <strong>Generate Plan:</strong> Click generate and receive your comprehensive trading plan in seconds
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  <div>
                    <strong>Review & Execute:</strong> Study the plan, set up your alerts, and execute according to the strategy
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Generate Your First Trade Plan?</h3>
              <p className="text-xl mb-6">
                Join 10,000+ traders using TradeCraft's AI-powered analysis to make better trading decisions.
              </p>
              <Link 
                href="/trade-plan" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
              >
                Start Free Analysis →
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Related Tools & Guides</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  <Link href="/screener" className="text-blue-600 hover:text-blue-800">
                    Stock Screener
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">
                  Find the best momentum stocks to analyze with our free screening tool.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-2">
                  <Link href="/blog/how-to-analyze-stocks-for-beginners" className="text-blue-600 hover:text-blue-800">
                    How to Analyze Stocks for Beginners
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn the fundamentals of stock analysis before generating your trade plans.
                </p>
              </div>
            </div>
          </section>

          <footer className="text-gray-500 text-sm mt-12 border-t pt-8">
            <p>
              <strong>Disclaimer:</strong> This tool is for educational purposes only and does not constitute investment advice. 
              Always conduct your own research and consider consulting with a financial advisor before making investment decisions.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
