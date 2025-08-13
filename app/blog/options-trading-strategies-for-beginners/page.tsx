import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Options Trading Strategies for Beginners: Complete Guide 2024',
  description: 'Master options trading with our comprehensive beginner\'s guide. Learn covered calls, protective puts, spreads, and risk management strategies with real examples.',
  keywords: 'options trading, options strategies, covered calls, protective puts, options for beginners, options trading guide, stock options, derivatives trading',
  authors: [{ name: 'TradeCraft Team' }],
  openGraph: {
    title: 'Options Trading Strategies for Beginners: Complete Guide 2024',
    description: 'Master options trading with our comprehensive beginner\'s guide. Learn covered calls, protective puts, spreads, and risk management strategies with real examples.',
    type: 'article',
    publishedTime: '2024-01-15T00:00:00.000Z',
    authors: ['TradeCraft Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Options Trading Strategies for Beginners: Complete Guide 2024',
    description: 'Master options trading with our comprehensive beginner\'s guide. Learn covered calls, protective puts, spreads, and risk management strategies with real examples.',
  },
  alternates: {
    canonical: 'https://www.tradingsetup.pro/blog/options-trading-strategies-for-beginners',
  },
};

export default function OptionsTrading() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Options Trading Strategies for Beginners: Complete Guide 2024",
            "description": "Master options trading with our comprehensive beginner's guide. Learn covered calls, protective puts, spreads, and risk management strategies with real examples.",
            "author": {
              "@type": "Organization",
              "name": "TradeCraft Team"
            },
            "datePublished": "2024-01-15T00:00:00.000Z",
            "dateModified": "2024-01-15T00:00:00.000Z",
            "url": "https://www.tradingsetup.pro/blog/options-trading-strategies-for-beginners"
          })
        }}
      />
      
      <article className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Options Trading Strategies for Beginners: Complete Guide 2024
          </h1>
          <div className="text-gray-500 mb-6 flex items-center justify-center gap-4 text-sm">
            <time dateTime="2024-01-15" className="font-medium">January 15, 2024</time>
            <span className="text-gray-300">•</span>
            <span>15 min read</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Options trading can seem intimidating, but with the right strategies and understanding, 
            it becomes a powerful tool for generating income and managing risk. This comprehensive 
            guide covers everything beginners need to know about options trading strategies.
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What Are Options?</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <p className="text-lg leading-relaxed mb-8 text-gray-700">
                Options are financial contracts that give you the right (but not the obligation) to buy 
                or sell an underlying asset at a specific price within a certain timeframe. Unlike 
                stocks, options have expiration dates and can lose value over time due to time decay.
              </p>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-6 mt-12">Key Options Terminology</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-green-900">Call Option:</span>
                      <span className="text-green-700 ml-1">Gives you the right to buy a stock at a specific price</span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-red-50 rounded-lg">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-red-900">Put Option:</span>
                      <span className="text-red-700 ml-1">Gives you the right to sell a stock at a specific price</span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-blue-900">Strike Price:</span>
                      <span className="text-blue-700 ml-1">The price at which you can exercise the option</span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-purple-900">Expiration Date:</span>
                      <span className="text-purple-700 ml-1">When the option contract ends</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-orange-50 rounded-lg">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-orange-900">Premium:</span>
                      <span className="text-orange-700 ml-1">The cost to purchase the option</span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-indigo-50 rounded-lg">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-indigo-900">Intrinsic Value:</span>
                      <span className="text-indigo-700 ml-1">The immediate exercise value of an option</span>
                    </div>
                  </div>
                  <div className="flex items-start p-4 bg-teal-50 rounded-lg">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-3 mr-4 flex-shrink-0"></div>
                    <div>
                      <span className="font-semibold text-teal-900">Time Value:</span>
                      <span className="text-teal-700 ml-1">The portion of premium attributable to time until expiration</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Beginner-Friendly Options Strategies</h2>
            
            <div className="bg-gradient-to-br from-green-50 to-green-25 border border-green-100 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-green-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                1. Covered Call Strategy
              </h3>
              <p className="text-gray-700 mb-6">
                The covered call is one of the most popular options strategies for beginners. It involves 
                owning 100 shares of a stock and selling a call option against those shares to generate 
                additional income.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                      <div className="text-green-800">Own 100 shares of a stock (long position)</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                      <div className="text-green-800">Sell one call option with a strike price above the current stock price</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
                      <div className="text-green-800">Collect the premium from selling the option</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
                      <div className="text-green-800">If the stock stays below the strike price, keep the premium and the shares</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
                      <div className="text-green-800">If the stock goes above the strike price, your shares may be called away</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-25 border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Trade</h4>
                  <p className="text-gray-700 leading-relaxed">
                    You own 100 shares of XYZ stock trading at <span className="font-medium text-blue-700">$50</span>. 
                    You sell a call option with a <span className="font-medium text-green-700">$55 strike price</span> 
                    expiring in one month for <span className="font-medium text-purple-700">$2 premium ($200 total)</span>. 
                    If XYZ stays below $55, you keep the $200 premium. If it goes above $55, your shares are sold at $55, 
                    and you still keep the premium.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      Pros
                    </h4>
                    <div className="space-y-1 text-sm text-green-800">
                      <div>Generate income from existing stock holdings</div>
                      <div>Relatively low risk strategy</div>
                      <div>Provides some downside protection</div>
                    </div>
                  </div>
                  <div className="bg-red-100 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 mb-2 flex items-center">
                      <span className="text-red-600 mr-2">✗</span>
                      Cons
                    </h4>
                    <div className="space-y-1 text-sm text-red-800">
                      <div>Limited upside potential</div>
                      <div>May miss out on large gains</div>
                      <div>Still exposed to significant downside risk</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                2. Protective Put Strategy
              </h3>
              <p className="text-gray-700 mb-6">
                A protective put involves buying a put option while owning the underlying stock. This 
                strategy acts like insurance for your stock position, limiting downside risk.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                      <div className="text-blue-800">Own 100 shares of a stock</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                      <div className="text-blue-800">Buy a put option with a strike price below the current stock price</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
                      <div className="text-blue-800">Pay the premium for the put option</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
                      <div className="text-blue-800">If the stock falls below the strike price, exercise the put to limit losses</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
                      <div className="text-blue-800">If the stock rises, let the put expire and enjoy the gains</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-gray-50 to-gray-25 border border-gray-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Example Trade</h4>
                  <p className="text-gray-700 leading-relaxed">
                    You own 100 shares of ABC stock at <span className="font-medium text-blue-700">$60</span>. 
                    You buy a put option with a <span className="font-medium text-red-700">$55 strike price</span> 
                    for <span className="font-medium text-purple-700">$3 premium ($300 total)</span>. 
                    If ABC falls to $45, you can sell your shares at $55, limiting your loss to 
                    <span className="font-medium text-orange-700"> $8 per share</span> ($5 stock loss + $3 premium paid).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-25 border border-purple-100 rounded-xl p-8">
              <h3 className="text-2xl font-semibold text-purple-900 mb-6 flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                3. Cash-Secured Put Strategy
              </h3>
              <p className="text-gray-700 mb-6">
                This strategy involves selling put options while holding enough cash to purchase the 
                underlying stock if assigned. It&apos;s a way to potentially buy stocks at a discount while 
                generating income.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">1</div>
                      <div className="text-purple-800">Hold cash equal to 100 shares of the target stock</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">2</div>
                      <div className="text-purple-800">Sell a put option with a strike price you&apos;re comfortable buying the stock at</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">3</div>
                      <div className="text-purple-800">Collect the premium from selling the put</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">4</div>
                      <div className="text-purple-800">If the stock stays above the strike price, keep the premium</div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">5</div>
                      <div className="text-purple-800">If assigned, buy the stock at the strike price (effectively at a discount due to the premium)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Beginner Strategies</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-green-50 to-green-25 border border-green-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-green-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  Bull Call Spread
                </h3>
                <p className="text-gray-700 mb-6">
                  A bull call spread involves buying a call option at a lower strike price and selling 
                  a call option at a higher strike price. This strategy limits both risk and reward.
                </p>
                
                <div className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">When to Use</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-green-800">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You&apos;re moderately bullish on a stock</span>
                    </div>
                    <div className="flex items-center text-green-800">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You want to reduce the cost of buying a call option</span>
                    </div>
                    <div className="flex items-center text-green-800">
                      <span className="text-green-600 mr-2">•</span>
                      <span>You expect moderate price appreciation</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-red-25 border border-red-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-red-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  Bear Put Spread
                </h3>
                <p className="text-gray-700 mb-6">
                  Similar to the bull call spread but used when you&apos;re moderately bearish. You buy a put 
                  at a higher strike price and sell a put at a lower strike price.
                </p>
                
                <div className="bg-white/70 backdrop-blur-sm border border-red-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-red-900 mb-3">Strategy Benefits</h4>
                  <div className="space-y-2">
                    <div className="flex items-center text-red-800">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Limited risk and limited reward</span>
                    </div>
                    <div className="flex items-center text-red-800">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Lower cost than buying puts outright</span>
                    </div>
                    <div className="flex items-center text-red-800">
                      <span className="text-red-600 mr-2">•</span>
                      <span>Profit from moderate downward movement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Risk Management in Options Trading</h2>
            
            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                    Position Sizing
                  </h3>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-25 border border-orange-100 rounded-lg p-6 mb-6">
                    <p className="text-orange-800 leading-relaxed mb-4">
                      Never risk more than 1-2% of your total portfolio on a single options trade. Options 
                      can expire worthless, leading to a 100% loss of the premium paid.
                    </p>
                    <div className="bg-white/70 backdrop-blur-sm border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">Key Guidelines</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-orange-800">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span>Start small while learning</span>
                        </div>
                        <div className="flex items-center text-orange-800">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span>Use paper trading first</span>
                        </div>
                        <div className="flex items-center text-orange-800">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span>Never bet the farm on one trade</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    Time Decay Awareness
                  </h3>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-lg p-6">
                    <p className="text-blue-800 leading-relaxed mb-4">
                      Options lose value as they approach expiration. This time decay (theta) accelerates 
                      in the final 30 days before expiration. Be aware of this when buying options.
                    </p>
                    <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-900 mb-2">Time Decay Tips</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-blue-800">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Avoid options with less than 30 days to expiration</span>
                        </div>
                        <div className="flex items-center text-blue-800">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Consider selling options to benefit from time decay</span>
                        </div>
                        <div className="flex items-center text-blue-800">
                          <span className="text-blue-600 mr-2">•</span>
                          <span>Plan your exit strategy before entering</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Conclusion</h2>
            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-lg leading-relaxed mb-6 text-gray-700">
                  Options trading offers powerful tools for income generation and risk management when 
                  used properly. Start with simple strategies like covered calls and protective puts, 
                  focus on risk management, and gradually expand your knowledge and strategy repertoire.
                </p>
                <p className="text-lg leading-relaxed mb-8 text-gray-700">
                  Remember that options trading involves significant risk, including the potential for 
                  total loss of premium paid. Never trade with money you can&apos;t afford to lose, and 
                  always maintain proper position sizing and risk management.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-25 border border-blue-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Ready to Explore Options Trading?
                </h3>
                <p className="text-blue-800 mb-6 leading-relaxed">
                  Use TradeCraft&apos;s advanced tools to analyze options opportunities and develop 
                  comprehensive trading strategies with proper risk management.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/trade-plan/start-here" 
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Generate Trade Plan
                  </Link>
                  <Link 
                    href="/trade-plan/demo" 
                    className="inline-flex items-center justify-center bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Try Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
