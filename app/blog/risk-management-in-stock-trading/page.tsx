import Image from 'next/image';
import Head from 'next/head';
import { generateMetadata } from '@/lib/seo';

export const metadata = generateMetadata({
  title: 'Risk Management in Stock Trading - Complete Guide to Protecting Your Capital',
  description: 'Master risk management in stock trading with our comprehensive guide covering position sizing, stop losses, portfolio management, and capital preservation strategies.',
  keywords: [
    'risk management trading',
    'stock trading risk management',
    'position sizing',
    'stop loss strategies',
    'trading risk control',
    'capital preservation',
    'portfolio risk management',
    'trading psychology risk'
  ],
});

export default function RiskManagementGuide() {
  return (
    <>
      <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7507424386197703" crossOrigin="anonymous"></script>
      </Head>
      <main className="max-w-4xl mx-auto px-4 mt-28 mb-16">
        <article>
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
              Risk Management in Stock Trading: The Ultimate Guide to Protecting Your Capital
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              Risk management is the most critical aspect of successful stock trading. This comprehensive guide covers everything you need to know about protecting your capital, from position sizing and stop losses to portfolio management and psychological risk control.
            </p>
            <div className="flex justify-center my-6">
              <Image 
                src="/blog/risk-management-guide/risk-management-overview.png" 
                alt="Risk Management in Stock Trading Guide" 
                width={800} 
                height={400} 
                className="rounded-xl shadow-lg border" 
                priority 
              />
            </div>
          </header>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Why Risk Management is Critical in Trading</h2>
            <p className="mb-4">
              While many traders focus on finding the perfect entry or the next big winner, professional traders know that success comes from managing risk. You can be right only 40% of the time and still be profitable if you manage risk properly, but you can be right 90% of the time and lose money if you don't.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl shadow-sm my-6">
              <h3 className="font-semibold text-lg mb-2">The Mathematics of Risk:</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>A 50% loss requires a 100% gain to break even</li>
                <li>A 20% loss requires a 25% gain to break even</li>
                <li>A 10% loss requires only an 11% gain to break even</li>
                <li><strong>Conclusion:</strong> Small losses are much easier to recover from than large ones</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">The 1% Rule: Foundation of Risk Management</h2>
            <p className="mb-4">
              The 1% rule is simple: never risk more than 1% of your total trading capital on any single trade. This rule alone can save you from catastrophic losses and ensure long-term survival in the markets.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Why the 1% Rule Works</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Mathematical Protection</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>You can have 100 consecutive losses and still have capital left</li>
                  <li>Prevents emotional decision-making under pressure</li>
                  <li>Allows for consistent position sizing across all trades</li>
                  <li>Creates predictable risk parameters</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Psychological Benefits</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Reduces anxiety and stress while trading</li>
                  <li>Enables objective decision-making</li>
                  <li>Prevents revenge trading after losses</li>
                  <li>Builds confidence in your system</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Calculating Position Size with the 1% Rule</h3>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl shadow-sm mb-6">
              <h4 className="font-semibold mb-2">Position Size Formula:</h4>
              <p className="mb-2 font-mono text-lg"><strong>Position Size = (Account Size × Risk %) ÷ (Entry Price - Stop Loss Price)</strong></p>
              <div className="text-sm space-y-1">
                <p><strong>Example:</strong></p>
                <p>• Account Size: $100,000</p>
                <p>• Risk per trade: 1% = $1,000</p>
                <p>• Stock Entry: $50</p>
                <p>• Stop Loss: $47</p>
                <p>• Risk per share: $50 - $47 = $3</p>
                <p>• Position Size: $1,000 ÷ $3 = 333 shares</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Stop Loss Strategies</h2>
            <p className="mb-4">
              A stop loss is your insurance policy against catastrophic losses. It's a predetermined price level at which you'll exit a losing trade to limit your loss.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Types of Stop Losses</h3>
            <div className="space-y-6 mb-8">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Technical Stop Loss</h4>
                <p className="text-sm mb-2">
                  Based on technical analysis levels such as support, resistance, or chart patterns.
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Examples:</strong>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Below key support level for long positions</li>
                    <li>Above resistance level for short positions</li>
                    <li>Below pattern lows (double bottom, triangle)</li>
                    <li>Below moving averages (20-day, 50-day)</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Percentage Stop Loss</h4>
                <p className="text-sm mb-2">
                  Fixed percentage below (for longs) or above (for shorts) your entry price.
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Common Percentages:</strong>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Conservative: 5-7% for large caps</li>
                    <li>Moderate: 8-12% for mid caps</li>
                    <li>Aggressive: 15-20% for small caps or growth stocks</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Volatility-Based Stop Loss (ATR)</h4>
                <p className="text-sm mb-2">
                  Uses Average True Range (ATR) to set stops based on the stock's normal volatility.
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>ATR Stop Formula:</strong>
                  <p>Stop Loss = Entry Price - (ATR × Multiplier)</p>
                  <p>Common multipliers: 1.5x to 3x ATR</p>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Time-Based Stop Loss</h4>
                <p className="text-sm mb-2">
                  Exit the position if it doesn't perform as expected within a certain timeframe.
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Examples:</strong>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Exit if no progress after 5-10 trading days</li>
                    <li>Close position before major events (earnings, FDA approvals)</li>
                    <li>End-of-week or end-of-month position reviews</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Advanced Stop Loss Techniques</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border rounded-lg p-4">
                <h4 className="font-semibold text-green-700 mb-2">Trailing Stops</h4>
                <p className="text-sm mb-2">Dynamic stops that move in your favor as the stock price moves favorably.</p>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li><strong>Percentage Trailing:</strong> Stop follows price by fixed percentage</li>
                  <li><strong>ATR Trailing:</strong> Uses volatility to determine trailing distance</li>
                  <li><strong>Moving Average Trailing:</strong> Uses MA as dynamic support/resistance</li>
                </ul>
              </div>
              <div className="bg-blue-50 border rounded-lg p-4">
                <h4 className="font-semibold text-blue-700 mb-2">Breakeven Stops</h4>
                <p className="text-sm mb-2">Move stop to entry price once trade reaches certain profit level.</p>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Eliminates risk of loss once implemented</li>
                  <li>Typically set when profit equals initial risk</li>
                  <li>Psychological comfort for holding winners longer</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Position Sizing Strategies</h2>
            <p className="mb-4">
              Position sizing determines how much capital you allocate to each trade. It's one of the most important decisions you'll make and directly impacts your long-term profitability.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Fixed Risk Position Sizing</h3>
            <p className="mb-4">
              This is the most common method where you risk the same dollar amount or percentage on every trade.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold mb-2">Fixed Risk Examples:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Fixed Dollar Amount:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Risk $1,000 per trade regardless of account size</li>
                    <li>Simple to calculate and implement</li>
                    <li>Good for beginners</li>
                  </ul>
                </div>
                <div>
                  <p><strong>Fixed Percentage:</strong></p>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Risk 1-2% of account per trade</li>
                    <li>Scales with account growth</li>
                    <li>Preferred by professional traders</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Kelly Criterion Position Sizing</h3>
            <p className="mb-4">
              A mathematical formula that calculates optimal position size based on your win rate and average win/loss ratio.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-xl shadow-sm mb-6">
              <h4 className="font-semibold mb-2">Kelly Formula:</h4>
              <p className="font-mono mb-2"><strong>f = (bp - q) / b</strong></p>
              <div className="text-sm space-y-1">
                <p>Where:</p>
                <ul className="list-disc ml-6 space-y-1">
                  <li><strong>f</strong> = fraction of capital to bet</li>
                  <li><strong>b</strong> = odds received (average win / average loss)</li>
                  <li><strong>p</strong> = probability of winning</li>
                  <li><strong>q</strong> = probability of losing (1-p)</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Volatility-Adjusted Position Sizing</h3>
            <p className="mb-4">
              Adjust position sizes based on the volatility of individual stocks to maintain consistent risk across your portfolio.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold mb-2">High Volatility Stocks</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Smaller position sizes</li>
                  <li>Wider stop losses</li>
                  <li>Higher potential returns</li>
                  <li>Examples: Small caps, biotech, growth stocks</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-semibold mb-2">Low Volatility Stocks</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Larger position sizes possible</li>
                  <li>Tighter stop losses</li>
                  <li>Lower but more consistent returns</li>
                  <li>Examples: Large caps, utilities, consumer staples</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Portfolio Risk Management</h2>
            <p className="mb-4">
              While individual trade risk is important, managing overall portfolio risk ensures that you can weather various market conditions and avoid catastrophic losses.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Diversification Strategies</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Sector Diversification</h4>
                <p className="text-sm mb-2">Spread risk across different market sectors to avoid concentration risk.</p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Guidelines:</strong>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>No more than 25% in any single sector</li>
                    <li>Avoid correlated sectors during market stress</li>
                    <li>Balance growth, value, and defensive sectors</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Market Cap Diversification</h4>
                <p className="text-sm mb-2">Balance between large, mid, and small-cap stocks for different risk/return profiles.</p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Typical Allocation:</strong>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Large cap: 50-70% (stability)</li>
                    <li>Mid cap: 20-30% (growth potential)</li>
                    <li>Small cap: 10-20% (high growth, high risk)</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Geographic Diversification</h4>
                <p className="text-sm mb-2">Include international exposure to reduce country-specific risks.</p>
                <div className="bg-gray-100 p-3 rounded text-sm">
                  <strong>Options:</strong>
                  <ul className="list-disc ml-6 space-y-1">
                    <li>International ETFs (VEA, VWO)</li>
                    <li>ADRs of foreign companies</li>
                    <li>Global sector ETFs</li>
                  </ul>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Correlation Risk Management</h3>
            <p className="mb-4">
              Understanding how your holdings move together is crucial for effective portfolio risk management.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-xl shadow-sm mb-6">
              <h4 className="font-semibold mb-2">High Correlation Risks:</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>Multiple tech stocks may fall together during sector rotation</li>
                <li>Similar market cap stocks often move in unison</li>
                <li>Stocks with similar business models show high correlation</li>
                <li>During market crashes, correlations increase dramatically</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Maximum Portfolio Risk Limits</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Conservative Approach</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Maximum 10% total portfolio risk</li>
                  <li>No more than 5% in any single position</li>
                  <li>Maximum 25% in any sector</li>
                  <li>Strong cash position (20-30%)</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Aggressive Approach</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Maximum 20% total portfolio risk</li>
                  <li>Up to 10% in high-conviction positions</li>
                  <li>Higher concentration in growth sectors</li>
                  <li>Lower cash position (5-15%)</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Psychological Risk Management</h2>
            <p className="mb-4">
              The biggest risk in trading often comes from within. Managing your emotions and psychological biases is just as important as managing financial risk.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Common Psychological Trading Risks</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 border rounded-lg p-4">
                <h4 className="font-semibold text-red-700 mb-2">Emotional Risks</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li><strong>Fear:</strong> Prevents taking necessary risks or causes premature exits</li>
                  <li><strong>Greed:</strong> Leads to oversized positions or holding winners too long</li>
                  <li><strong>Hope:</strong> Causes holding losers beyond stop loss levels</li>
                  <li><strong>Revenge Trading:</strong> Trying to "get even" after losses</li>
                </ul>
              </div>
              <div className="bg-red-50 border rounded-lg p-4">
                <h4 className="font-semibold text-red-700 mb-2">Cognitive Biases</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li><strong>Confirmation Bias:</strong> Only seeing information that confirms your view</li>
                  <li><strong>Anchoring:</strong> Fixating on entry price or recent high/low</li>
                  <li><strong>Loss Aversion:</strong> Taking small profits but large losses</li>
                  <li><strong>Overconfidence:</strong> Taking excessive risk after winning streaks</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Strategies for Psychological Risk Control</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Rule-Based Trading</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Develop and follow a written trading plan</li>
                  <li>Set rules for entry, exit, and position sizing</li>
                  <li>Never deviate from rules based on emotions</li>
                  <li>Review and update rules based on objective analysis</li>
                </ul>
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Position Sizing for Comfort</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Size positions so you can sleep well at night</li>
                  <li>If you're checking positions obsessively, reduce size</li>
                  <li>Never risk money you can't afford to lose</li>
                  <li>Start small and increase size as you gain confidence</li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Objective Record Keeping</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Keep detailed records of all trades and decisions</li>
                  <li>Note emotional state and market conditions</li>
                  <li>Review trades objectively, not emotionally</li>
                  <li>Identify patterns in both wins and losses</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Risk Management During Different Market Conditions</h2>
            <p className="mb-4">
              Effective risk management requires adapting your approach based on current market conditions and volatility regimes.
            </p>
            
            <h3 className="text-2xl font-semibold mb-3">Bull Market Risk Management</h3>
            <div className="bg-green-50 border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-green-700 mb-2">Characteristics and Risks</h4>
              <ul className="list-disc ml-6 text-sm space-y-1 mb-3">
                <li>Rising tide lifts most boats - easy to get overconfident</li>
                <li>Risk of becoming complacent about risk management</li>
                <li>Temptation to use more leverage or larger positions</li>
                <li>FOMO (Fear of Missing Out) can lead to poor decisions</li>
              </ul>
              <h4 className="font-semibold text-green-700 mb-2">Bull Market Strategies</h4>
              <ul className="list-disc ml-6 text-sm space-y-1">
                <li>Stick to position sizing rules despite winning streaks</li>
                <li>Use trailing stops to protect profits</li>
                <li>Take partial profits at technical resistance levels</li>
                <li>Prepare for inevitable market correction</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Bear Market Risk Management</h3>
            <div className="bg-red-50 border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-red-700 mb-2">Characteristics and Risks</h4>
              <ul className="list-disc ml-6 text-sm space-y-1 mb-3">
                <li>Correlations increase - diversification becomes less effective</li>
                <li>Volatility spikes dramatically</li>
                <li>Many technical patterns fail more frequently</li>
                <li>Emotional stress increases significantly</li>
              </ul>
              <h4 className="font-semibold text-red-700 mb-2">Bear Market Strategies</h4>
              <ul className="list-disc ml-6 text-sm space-y-1">
                <li>Reduce overall position sizes</li>
                <li>Increase cash allocation</li>
                <li>Use wider stops to account for higher volatility</li>
                <li>Focus on defensive sectors and high-quality names</li>
              </ul>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Sideways Market Risk Management</h3>
            <div className="bg-yellow-50 border rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-yellow-700 mb-2">Characteristics and Strategies</h4>
              <ul className="list-disc ml-6 text-sm space-y-1">
                <li>Range-bound trading with frequent whipsaws</li>
                <li>Mean reversion strategies often work better</li>
                <li>Shorter holding periods may be more effective</li>
                <li>Focus on individual stock selection over market beta</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Tools and Technology for Risk Management</h2>
            
            <h3 className="text-2xl font-semibold mb-3">Essential Risk Management Tools</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Position Sizing Calculators</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>TradeCraft risk calculator</li>
                  <li>Custom Excel spreadsheets</li>
                  <li>Broker-provided tools</li>
                  <li>Mobile apps for quick calculations</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Portfolio Monitoring</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Real-time P&L tracking</li>
                  <li>Correlation analysis tools</li>
                  <li>Sector allocation monitors</li>
                  <li>Risk metric dashboards</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Stop Loss Management</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Automated stop loss orders</li>
                  <li>Trailing stop systems</li>
                  <li>Alert systems for technical levels</li>
                  <li>Multi-timeframe monitoring</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <h4 className="font-semibold text-lg mb-2">Performance Analytics</h4>
                <ul className="list-disc ml-6 space-y-1 text-sm">
                  <li>Win/loss ratio analysis</li>
                  <li>Drawdown measurement</li>
                  <li>Risk-adjusted return metrics</li>
                  <li>Trade timing analysis</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">Key Risk Metrics to Monitor</h3>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Portfolio Level Metrics</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li><strong>Value at Risk (VaR):</strong> Maximum expected loss over specific time period</li>
                  <li><strong>Maximum Drawdown:</strong> Largest peak-to-trough decline</li>
                  <li><strong>Sharpe Ratio:</strong> Risk-adjusted return measurement</li>
                  <li><strong>Beta:</strong> Portfolio sensitivity to market movements</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Trade Level Metrics</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li><strong>Risk/Reward Ratio:</strong> Potential profit vs potential loss</li>
                  <li><strong>Win Rate:</strong> Percentage of profitable trades</li>
                  <li><strong>Average Win/Loss:</strong> Size of average winning vs losing trade</li>
                  <li><strong>Expectancy:</strong> Expected value per trade</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Creating Your Risk Management Plan</h2>
            
            <h3 className="text-2xl font-semibold mb-3">Step-by-Step Plan Development</h3>
            <div className="space-y-4">
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Step 1: Define Your Risk Tolerance</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Determine maximum acceptable drawdown (typically 10-20%)</li>
                  <li>Set maximum risk per trade (1-2% for most traders)</li>
                  <li>Define maximum portfolio concentration limits</li>
                </ul>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Step 2: Establish Position Sizing Rules</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Choose fixed percentage or fixed dollar approach</li>
                  <li>Create position sizing calculator or spreadsheet</li>
                  <li>Set rules for adjusting size based on conviction level</li>
                </ul>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Step 3: Define Stop Loss Strategy</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Choose primary stop loss method (technical, percentage, ATR)</li>
                  <li>Set rules for stop loss placement and adjustment</li>
                  <li>Define when to use trailing stops vs fixed stops</li>
                </ul>
              </div>
              <div className="bg-white border-l-4 border-blue-500 p-4 rounded shadow-sm">
                <h4 className="font-semibold mb-2">Step 4: Create Monitoring System</h4>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Set up daily risk monitoring routine</li>
                  <li>Create alerts for risk limit breaches</li>
                  <li>Establish weekly/monthly risk review process</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Common Risk Management Mistakes</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 border rounded-lg p-4">
                <h3 className="font-semibold text-red-700 mb-2">Beginner Mistakes</h3>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Risking too much per trade (&gt;2-3%)</li>
                  <li>Not using stop losses consistently</li>
                  <li>Moving stop losses against you</li>
                  <li>Doubling down on losing positions</li>
                  <li>No position sizing plan</li>
                </ul>
              </div>
              <div className="bg-red-50 border rounded-lg p-4">
                <h3 className="font-semibold text-red-700 mb-2">Advanced Mistakes</h3>
                <ul className="list-disc ml-6 text-sm space-y-1">
                  <li>Becoming complacent during winning streaks</li>
                  <li>Ignoring correlation risk</li>
                  <li>Not adjusting for market conditions</li>
                  <li>Over-diversifying and diluting returns</li>
                  <li>Focusing only on upside without considering downside</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3">How to Avoid These Mistakes</h3>
            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-xl shadow-sm mb-6">
              <h4 className="font-semibold mb-2">Best Practices for Risk Management:</h4>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Start conservative:</strong> Begin with smaller position sizes until you prove consistency</li>
                <li><strong>Never skip stops:</strong> Every trade must have a predetermined exit strategy</li>
                <li><strong>Keep detailed records:</strong> Track what works and what doesn't</li>
                <li><strong>Regular review:</strong> Assess your risk management effectiveness monthly</li>
                <li><strong>Stay disciplined:</strong> Rules are only effective if you follow them consistently</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-3xl font-bold mb-4 text-primary">Conclusion</h2>
            <p className="mb-4">
              Risk management is not about avoiding all losses—it's about controlling them and ensuring they don't derail your long-term trading success. The best traders are often not those who win the most, but those who lose the least when they're wrong.
            </p>
            <p className="mb-4">
              Remember that risk management is a skill that improves with practice and experience. Start with conservative rules and gradually refine them as you gain more experience and understanding of your own psychology and market conditions.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl shadow-sm">
              <h4 className="font-semibold mb-2">Ready to Implement Professional Risk Management?</h4>
              <p className="mb-3">
                Use TradeCraft's advanced risk management tools to calculate position sizes, set appropriate stops, and monitor your portfolio risk in real-time.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/trade-plan" className="inline-block bg-primary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition">
                  Generate Risk-Managed Trade Plans
                </a>
                <a href="/screener" className="inline-block bg-secondary text-white font-bold px-6 py-3 rounded-lg shadow hover:bg-secondary/90 transition">
                  Screen with Risk Parameters
                </a>
              </div>
            </div>
          </section>

          <footer className="mt-10 text-center border-t pt-6">
            <p className="text-sm text-muted-foreground mb-4">
              Disclaimer: This guide is for educational purposes only and should not be considered as financial advice. 
              Trading involves substantial risk of loss and is not suitable for all investors. Always implement proper 
              risk management and never risk more than you can afford to lose.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
