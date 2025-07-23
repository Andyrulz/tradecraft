import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fundamental Analysis for Stock Trading: Complete Guide 2024',
  description: 'Master fundamental analysis with our comprehensive guide. Learn to evaluate financial statements, ratios, and company valuation for informed stock trading decisions.',
  keywords: 'fundamental analysis, stock valuation, financial statements, P/E ratio, DCF model, balance sheet analysis, income statement, cash flow analysis',
  authors: [{ name: 'TradeCraft Team' }],
  openGraph: {
    title: 'Fundamental Analysis for Stock Trading: Complete Guide 2024',
    description: 'Master fundamental analysis with our comprehensive guide. Learn to evaluate financial statements, ratios, and company valuation for informed stock trading decisions.',
    type: 'article',
    publishedTime: '2024-01-17T00:00:00.000Z',
    authors: ['TradeCraft Team'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fundamental Analysis for Stock Trading: Complete Guide 2024',
    description: 'Master fundamental analysis with our comprehensive guide. Learn to evaluate financial statements, ratios, and company valuation for informed stock trading decisions.',
  },
  alternates: {
    canonical: 'https://www.tradingsetup.pro/blog/fundamental-analysis-complete-guide',
  },
};

export default function FundamentalAnalysis() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": "Fundamental Analysis for Stock Trading: Complete Guide 2024",
            "description": "Master fundamental analysis with our comprehensive guide. Learn to evaluate financial statements, ratios, and company valuation for informed stock trading decisions.",
            "author": {
              "@type": "Organization",
              "name": "TradeCraft Team"
            },
            "datePublished": "2024-01-17T00:00:00.000Z",
            "dateModified": "2024-01-17T00:00:00.000Z",
            "url": "https://www.tradingsetup.pro/blog/fundamental-analysis-complete-guide"
          })
        }}
      />
      
      <article className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Fundamental Analysis for Stock Trading: Complete Guide 2024
          </h1>
          <div className="text-gray-500 mb-6 flex items-center justify-center gap-4 text-sm">
            <time dateTime="2024-01-17" className="font-medium">January 17, 2024</time>
            <span className="text-gray-300">•</span>
            <span>20 min read</span>
          </div>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Fundamental analysis is the cornerstone of value investing and long-term wealth building. 
            This comprehensive guide teaches you how to evaluate companies using financial statements, 
            ratios, and valuation models to make informed investment decisions.
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What is Fundamental Analysis?</h2>
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <p className="text-lg leading-relaxed mb-8 text-gray-700">
                Fundamental analysis is a method of evaluating a company&apos;s intrinsic value by examining 
                its financial statements, business model, competitive position, management quality, and 
                economic factors. The goal is to determine whether a stock is overvalued, undervalued, 
                or fairly priced.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Fundamental vs. Technical Analysis</h3>
              <div className="bg-gradient-to-r from-gray-50 to-gray-25 rounded-lg p-6 overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="px-4 py-4 text-left text-sm font-bold text-gray-900">Aspect</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-blue-900">Fundamental Analysis</th>
                      <th className="px-4 py-4 text-left text-sm font-bold text-green-900">Technical Analysis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Focus</td>
                      <td className="px-4 py-3 text-sm text-blue-700">Company intrinsic value</td>
                      <td className="px-4 py-3 text-sm text-green-700">Price patterns & trends</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Time Frame</td>
                      <td className="px-4 py-3 text-sm text-blue-700">Long-term (months to years)</td>
                      <td className="px-4 py-3 text-sm text-green-700">Short to medium-term</td>
                    </tr>
                    <tr className="hover:bg-white/50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">Data Source</td>
                      <td className="px-4 py-3 text-sm text-blue-700">Financial statements & reports</td>
                      <td className="px-4 py-3 text-sm text-green-700">Price and volume data</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">The Three Financial Statements</h2>

            <div className="grid gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  1. Income Statement (Profit & Loss)
                </h3>
                <p className="text-gray-700 mb-6">
                  The income statement shows a company&apos;s revenues, expenses, and profits over a specific 
                  period. It reveals how much money the company made and how efficiently it operated.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Components:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Revenue (Sales):</span>
                          <span className="text-gray-700 ml-1">Total income from business operations</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Cost of Goods Sold (COGS):</span>
                          <span className="text-gray-700 ml-1">Direct costs of producing goods/services</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Gross Profit:</span>
                          <span className="text-gray-700 ml-1">Revenue minus COGS</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Operating Expenses:</span>
                          <span className="text-gray-700 ml-1">Costs of running the business (R&D, marketing, admin)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Net Income:</span>
                          <span className="text-gray-700 ml-1">Final profit after all expenses and taxes</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">What to Look For:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Consistent revenue growth over multiple years</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Improving gross margins (efficiency gains)</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Controlled operating expenses relative to revenue</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Growing earnings per share (EPS)</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Quality of earnings (cash vs. accounting earnings)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-25 border border-green-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-green-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  2. Balance Sheet
                </h3>
                <p className="text-gray-700 mb-6">
                  The balance sheet provides a snapshot of a company&apos;s financial position at a specific 
                  point in time, showing what the company owns (assets) and owes (liabilities).
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Components:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Assets:</span>
                          <span className="text-gray-700 ml-1">Everything the company owns (cash, inventory, equipment)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Liabilities:</span>
                          <span className="text-gray-700 ml-1">Everything the company owes (debt, accounts payable)</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Shareholders&apos; Equity:</span>
                          <span className="text-gray-700 ml-1">Assets minus liabilities (owners&apos; stake)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Balance Sheet Analysis:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Strong cash position for operational flexibility</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Manageable debt levels (debt-to-equity ratio)</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Growing book value over time</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>High-quality assets vs. intangible assets</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Working capital management efficiency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-25 border border-purple-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-purple-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  3. Cash Flow Statement
                </h3>
                <p className="text-gray-700 mb-6">
                  The cash flow statement tracks actual cash movements in and out of the business, 
                  providing insight into the company&apos;s liquidity and cash management.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Three Types of Cash Flow:</h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Operating Cash Flow:</span>
                          <span className="text-gray-700 ml-1">Cash from core business operations</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Investing Cash Flow:</span>
                          <span className="text-gray-700 ml-1">Cash from buying/selling assets and investments</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-medium text-gray-900">Financing Cash Flow:</span>
                          <span className="text-gray-700 ml-1">Cash from borrowing, stock issuance, dividends</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Positive and growing operating cash flow</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Free cash flow (operating cash flow minus capex)</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Cash flow vs. net income quality</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-green-600 mr-2">✓</span>
                        <span>Cash conversion cycle efficiency</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Financial Ratios</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid gap-8">
                
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-25 border border-emerald-100 rounded-lg p-6">
                  <h3 className="text-2xl font-semibold text-emerald-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                    Profitability Ratios
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">1. Gross Profit Margin</h4>
                        <p className="text-sm text-emerald-700 font-mono mb-2">(Revenue - COGS) ÷ Revenue × 100</p>
                        <p className="text-sm text-gray-700">Measures profit after direct costs. Higher margins indicate better pricing power.</p>
                      </div>
                      
                      <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">2. Operating Margin</h4>
                        <p className="text-sm text-emerald-700 font-mono mb-2">Operating Income ÷ Revenue × 100</p>
                        <p className="text-sm text-gray-700">Shows profit after all operating expenses. Indicates operational efficiency.</p>
                      </div>
                      
                      <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">3. Net Profit Margin</h4>
                        <p className="text-sm text-emerald-700 font-mono mb-2">Net Income ÷ Revenue × 100</p>
                        <p className="text-sm text-gray-700">Bottom line profitability showing how much of each dollar becomes profit.</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">4. Return on Assets (ROA)</h4>
                        <p className="text-sm text-emerald-700 font-mono mb-2">Net Income ÷ Total Assets × 100</p>
                        <p className="text-sm text-gray-700">Measures how efficiently a company uses assets to generate profit.</p>
                      </div>
                      
                      <div className="bg-white/60 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">5. Return on Equity (ROE)</h4>
                        <p className="text-sm text-emerald-700 font-mono mb-2">Net Income ÷ Shareholders&apos; Equity × 100</p>
                        <p className="text-sm text-gray-700">Warren Buffett&apos;s favorite metric for consistent wealth creation.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                      Liquidity Ratios
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Current Ratio</h4>
                        <p className="text-xs text-blue-700 font-mono">Current Assets ÷ Current Liabilities</p>
                        <p className="text-xs text-gray-600 mt-1">Ability to pay short-term obligations. 1.5-3.0 is healthy.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Quick Ratio</h4>
                        <p className="text-xs text-blue-700 font-mono">(Current Assets - Inventory) ÷ Current Liabilities</p>
                        <p className="text-xs text-gray-600 mt-1">More stringent test excluding hard-to-sell inventory.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Cash Ratio</h4>
                        <p className="text-xs text-blue-700 font-mono">(Cash + Short-term Investments) ÷ Current Liabilities</p>
                        <p className="text-xs text-gray-600 mt-1">Most conservative liquidity measure.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-orange-25 border border-orange-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-orange-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-orange-500 rounded-full mr-3"></div>
                      Leverage Ratios
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Debt-to-Equity</h4>
                        <p className="text-xs text-orange-700 font-mono">Total Debt ÷ Total Equity</p>
                        <p className="text-xs text-gray-600 mt-1">Financial leverage. Lower ratios = lower risk.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Interest Coverage</h4>
                        <p className="text-xs text-orange-700 font-mono">Operating Income ÷ Interest Expense</p>
                        <p className="text-xs text-gray-600 mt-1">Ability to pay interest on debt.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Debt-to-Assets</h4>
                        <p className="text-xs text-orange-700 font-mono">Total Debt ÷ Total Assets</p>
                        <p className="text-xs text-gray-600 mt-1">Percentage of assets financed through debt.</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-25 border border-indigo-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-indigo-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                      Efficiency Ratios
                    </h3>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Asset Turnover</h4>
                        <p className="text-xs text-indigo-700 font-mono">Revenue ÷ Average Total Assets</p>
                        <p className="text-xs text-gray-600 mt-1">How efficiently assets generate sales.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Inventory Turnover</h4>
                        <p className="text-xs text-indigo-700 font-mono">COGS ÷ Average Inventory</p>
                        <p className="text-xs text-gray-600 mt-1">How quickly inventory is sold.</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">Receivables Turnover</h4>
                        <p className="text-xs text-indigo-700 font-mono">Revenue ÷ Average Accounts Receivable</p>
                        <p className="text-xs text-gray-600 mt-1">Efficiency of collecting customer payments.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Valuation Methods</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid gap-8">
                
                <div className="bg-gradient-to-br from-pink-50 to-pink-25 border border-pink-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-pink-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-pink-500 rounded-full mr-3"></div>
                    1. Price-to-Earnings (P/E) Ratio
                  </h3>
                  <div className="bg-white/60 backdrop-blur-sm border border-pink-200 rounded-lg p-4 mb-6">
                    <p className="text-pink-700 font-mono text-lg font-semibold">Formula: Stock Price ÷ Earnings Per Share</p>
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The most common valuation metric. Compares a company&apos;s stock price to its earnings. 
                    Lower P/E ratios may indicate undervaluation, but consider industry averages and growth rates.
                  </p>

                  <div className="bg-white/80 backdrop-blur-sm border border-pink-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">P/E Ratio Interpretation:</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Low P/E (5-15):</span>
                          <span className="text-gray-700 ml-1">May indicate value opportunity or declining business</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Moderate P/E (15-25):</span>
                          <span className="text-gray-700 ml-1">Typical for mature, stable companies</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">High P/E (25+):</span>
                          <span className="text-gray-700 ml-1">High growth expectations or potential overvaluation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-25 border border-teal-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-teal-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                      2. Price-to-Book (P/B) Ratio
                    </h3>
                    <div className="bg-white/60 backdrop-blur-sm border border-teal-200 rounded-lg p-3 mb-4">
                      <p className="text-teal-700 font-mono text-sm font-semibold">Stock Price ÷ Book Value Per Share</p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Compares market value to accounting book value. Value investors often look for P/B ratios below 1.0.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-cyan-25 border border-cyan-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-cyan-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                      3. Price-to-Sales (P/S) Ratio
                    </h3>
                    <div className="bg-white/60 backdrop-blur-sm border border-cyan-200 rounded-lg p-3 mb-4">
                      <p className="text-cyan-700 font-mono text-sm font-semibold">Market Cap ÷ Annual Revenue</p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Useful for companies with no earnings or during market volatility. Compare within industry.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-amber-50 to-amber-25 border border-amber-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                      4. PEG Ratio
                    </h3>
                    <div className="bg-white/60 backdrop-blur-sm border border-amber-200 rounded-lg p-3 mb-4">
                      <p className="text-amber-700 font-mono text-sm font-semibold">P/E Ratio ÷ Annual EPS Growth Rate</p>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Adjusts P/E ratio for growth. PEG ratios below 1.0 may indicate undervaluation relative to growth.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-violet-50 to-violet-25 border border-violet-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-violet-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-violet-500 rounded-full mr-3"></div>
                      5. Discounted Cash Flow (DCF)
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                      The DCF model estimates a company&apos;s intrinsic value by projecting future cash flows 
                      and discounting them to present value.
                    </p>
                    
                    <div className="bg-white/80 backdrop-blur-sm border border-violet-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-3 text-sm">DCF Steps:</h4>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">1</div>
                          <span className="text-xs text-gray-700">Project future free cash flows (5-10 years)</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">2</div>
                          <span className="text-xs text-gray-700">Estimate terminal value</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">3</div>
                          <span className="text-xs text-gray-700">Determine appropriate discount rate (WACC)</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">4</div>
                          <span className="text-xs text-gray-700">Calculate present value of all cash flows</span>
                        </div>
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-violet-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">5</div>
                          <span className="text-xs text-gray-700">Add cash and subtract debt for equity value</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-50 to-slate-25 border border-slate-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">DCF Formula:</h4>
                  <div className="bg-white/80 backdrop-blur-sm border border-slate-300 rounded-lg p-4 mb-4">
                    <p className="text-slate-700 font-mono text-lg font-semibold text-center">
                      Intrinsic Value = Σ [FCF / (1 + r)^t] + Terminal Value / (1 + r)^n
                    </p>
                  </div>
                  <p className="text-gray-600 text-sm text-center italic">
                    Where FCF = Free Cash Flow, r = discount rate, t = time period
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Industry and Competitive Analysis</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-25 border border-indigo-100 rounded-xl p-8 mb-8">
                <h3 className="text-2xl font-semibold text-indigo-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                  Porter&apos;s Five Forces
                </h3>
                <p className="text-gray-700 mb-8 leading-relaxed">
                  Michael Porter&apos;s framework helps analyze industry attractiveness and competitive position:
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  <div className="bg-white/70 backdrop-blur-sm border border-red-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                      1. Competitive Rivalry
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Number and strength of competitors</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Market share concentration</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Product differentiation</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Switching costs for customers</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm border border-orange-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                      2. Supplier Power
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Number of suppliers</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Uniqueness of supplier products</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Cost of switching suppliers</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Supplier concentration</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      3. Buyer Power
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Number of customers</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Customer concentration</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Switching costs for buyers</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Price sensitivity</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm border border-blue-200 rounded-lg p-6">
                    <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      4. Threat of Substitution
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Alternative products/services</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Relative price performance</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Switching costs</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Customer propensity to substitute</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-lg p-6 md:col-span-2 lg:col-span-1">
                    <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      5. Barriers to Entry
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Capital requirements</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Economies of scale</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Brand loyalty</span>
                      </div>
                      <div className="flex items-start">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">Regulatory barriers</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-25 border border-emerald-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-emerald-900 mb-6 flex items-center">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  Competitive Advantages (Economic Moats)
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Warren Buffett&apos;s concept of economic moats describes sustainable competitive advantages:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">💰</div>
                        <div>
                          <h4 className="font-semibold text-emerald-900 mb-1">Cost Advantage</h4>
                          <p className="text-sm text-gray-700">Ability to produce at lower cost than competitors</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🌐</div>
                        <div>
                          <h4 className="font-semibold text-emerald-900 mb-1">Network Effects</h4>
                          <p className="text-sm text-gray-700">Product becomes more valuable as more people use it</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🏷️</div>
                        <div>
                          <h4 className="font-semibold text-emerald-900 mb-1">Brand Power</h4>
                          <p className="text-sm text-gray-700">Strong brand commands premium pricing</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🔒</div>
                        <div>
                          <h4 className="font-semibold text-emerald-900 mb-1">Switching Costs</h4>
                          <p className="text-sm text-gray-700">High cost/difficulty for customers to switch</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🏛️</div>
                        <div>
                          <h4 className="font-semibold text-emerald-900 mb-1">Regulatory Protection</h4>
                          <p className="text-sm text-gray-700">Government-granted monopoly or license</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Management Quality Assessment</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid gap-8">
                
                <div className="bg-gradient-to-br from-teal-50 to-teal-25 border border-teal-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-teal-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                    Key Leadership Indicators
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-sm border border-teal-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">📈</div>
                          <div>
                            <h4 className="font-semibold text-teal-900 mb-1">Track Record</h4>
                            <p className="text-sm text-gray-700">Past performance and decision-making history</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-teal-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">💼</div>
                          <div>
                            <h4 className="font-semibold text-teal-900 mb-1">Capital Allocation</h4>
                            <p className="text-sm text-gray-700">How management deploys shareholder capital</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-teal-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">💬</div>
                          <div>
                            <h4 className="font-semibold text-teal-900 mb-1">Communication</h4>
                            <p className="text-sm text-gray-700">Transparency and honesty with shareholders</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-sm border border-teal-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">💰</div>
                          <div>
                            <h4 className="font-semibold text-teal-900 mb-1">Compensation</h4>
                            <p className="text-sm text-gray-700">Alignment of management pay with shareholder returns</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-teal-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-teal-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🏠</div>
                          <div>
                            <h4 className="font-semibold text-teal-900 mb-1">Insider Ownership</h4>
                            <p className="text-sm text-gray-700">Management&apos;s personal investment in the company</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-red-25 border border-red-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-red-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    Red Flags to Watch
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-600 mr-3">⚠️</span>
                        <span className="text-sm">Frequent accounting restatements</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-600 mr-3">⚠️</span>
                        <span className="text-sm">High executive turnover</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-600 mr-3">⚠️</span>
                        <span className="text-sm">Aggressive accounting practices</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-600 mr-3">⚠️</span>
                        <span className="text-sm">Excessive executive compensation</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-600 mr-3">⚠️</span>
                        <span className="text-sm">Poor communication with shareholders</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-red-600 mr-3">⚠️</span>
                        <span className="text-sm">Related party transactions</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Macroeconomic Factors</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid gap-8">
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-25 border border-blue-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-blue-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    Economic Indicators to Monitor
                  </h3>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        Growth Indicators
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">📊</span>
                          <span className="text-sm">GDP growth rate</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">👥</span>
                          <span className="text-sm">Employment data</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">🛒</span>
                          <span className="text-sm">Consumer spending</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">🏭</span>
                          <span className="text-sm">Business investment</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-orange-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-orange-900 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                        Inflation Indicators
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">🏷️</span>
                          <span className="text-sm">Consumer Price Index (CPI)</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">🏭</span>
                          <span className="text-sm">Producer Price Index (PPI)</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">💰</span>
                          <span className="text-sm">Wage growth</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">🛢️</span>
                          <span className="text-sm">Commodity prices</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm border border-purple-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                        Monetary Policy
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">📈</span>
                          <span className="text-sm">Interest rates</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">💵</span>
                          <span className="text-sm">Money supply</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">🏛️</span>
                          <span className="text-sm">Federal Reserve policy</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">🏦</span>
                          <span className="text-sm">Credit availability</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-25 border border-indigo-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                    Sector-Specific Factors
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Different industries are affected by different economic factors:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Technology:</span>
                          <span className="text-gray-700 ml-1">Innovation cycles, regulatory changes</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Financials:</span>
                          <span className="text-gray-700 ml-1">Interest rates, credit quality</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Consumer Discretionary:</span>
                          <span className="text-gray-700 ml-1">Economic growth, consumer confidence</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Utilities:</span>
                          <span className="text-gray-700 ml-1">Interest rates, regulatory environment</span>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <div>
                          <span className="font-semibold text-gray-900">Energy:</span>
                          <span className="text-gray-700 ml-1">Commodity prices, geopolitical events</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Building a Fundamental Analysis Process</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="bg-gradient-to-br from-slate-50 to-slate-25 border border-slate-100 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center">
                  <div className="w-3 h-3 bg-slate-500 rounded-full mr-3"></div>
                  Step-by-Step Analysis Framework
                </h3>

                <div className="grid gap-6">
                  
                  <div className="bg-white/80 backdrop-blur-sm border border-blue-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">1</div>
                      Initial Screening
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span className="text-sm">Use quantitative screens to identify candidates</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span className="text-sm">Look for consistent earnings growth</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span className="text-sm">Screen for reasonable valuation metrics</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-blue-600 mr-2">✓</span>
                          <span className="text-sm">Check for financial stability</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">2</div>
                      Business Analysis
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-sm">Understand the business model</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-sm">Analyze competitive position</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-sm">Assess industry dynamics</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-sm">Evaluate growth prospects</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-purple-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">3</div>
                      Financial Analysis
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span className="text-sm">Analyze 5-10 years of financial statements</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span className="text-sm">Calculate and trend key ratios</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span className="text-sm">Compare to industry benchmarks</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-purple-600 mr-2">✓</span>
                          <span className="text-sm">Assess quality of earnings</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm border border-orange-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-orange-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">4</div>
                      Valuation
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span className="text-sm">Apply multiple valuation methods</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span className="text-sm">Perform sensitivity analysis</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span className="text-sm">Consider margin of safety</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-orange-600 mr-2">✓</span>
                          <span className="text-sm">Compare to current market price</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm border border-red-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">5</div>
                      Risk Assessment
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-red-600 mr-2">✓</span>
                          <span className="text-sm">Identify key business risks</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-red-600 mr-2">✓</span>
                          <span className="text-sm">Analyze financial risks</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-700">
                          <span className="text-red-600 mr-2">✓</span>
                          <span className="text-sm">Consider regulatory/legal risks</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <span className="text-red-600 mr-2">✓</span>
                          <span className="text-sm">Evaluate management risks</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Tools and Resources for Fundamental Analysis</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid gap-8">
                
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-25 border border-cyan-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-cyan-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full mr-3"></div>
                    Financial Data Sources
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-sm border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">📋</div>
                          <div>
                            <h4 className="font-semibold text-cyan-900 mb-1">SEC Filings</h4>
                            <p className="text-sm text-gray-700">10-K, 10-Q, 8-K forms on EDGAR</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🌐</div>
                          <div>
                            <h4 className="font-semibold text-cyan-900 mb-1">Company Websites</h4>
                            <p className="text-sm text-gray-700">Investor relations sections</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/70 backdrop-blur-sm border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">💼</div>
                          <div>
                            <h4 className="font-semibold text-cyan-900 mb-1">Financial Databases</h4>
                            <p className="text-sm text-gray-700">Bloomberg, FactSet, Morningstar</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm border border-cyan-200 rounded-lg p-4">
                        <div className="flex items-start">
                          <div className="w-8 h-8 bg-cyan-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 mt-1 flex-shrink-0">🆓</div>
                          <div>
                            <h4 className="font-semibold text-cyan-900 mb-1">Free Resources</h4>
                            <p className="text-sm text-gray-700">Yahoo Finance, Google Finance, FRED</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-25 border border-emerald-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-emerald-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                      Analysis Software
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-emerald-600 mr-2">📊</span>
                        <span className="text-sm">Excel or Google Sheets for modeling</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-emerald-600 mr-2">⚡</span>
                        <span className="text-sm">Specialized valuation software</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-emerald-600 mr-2">🔍</span>
                        <span className="text-sm">Screening tools for initial filtering</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-emerald-600 mr-2">📈</span>
                        <span className="text-sm">Charting software for trend analysis</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-amber-50 to-amber-25 border border-amber-100 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-3"></div>
                      Industry Research
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-amber-600 mr-2">🏢</span>
                        <span className="text-sm">Industry association reports</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-amber-600 mr-2">🏛️</span>
                        <span className="text-sm">Government statistics</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-amber-600 mr-2">📰</span>
                        <span className="text-sm">Trade publications</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-amber-600 mr-2">📊</span>
                        <span className="text-sm">Research analyst reports</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Fundamental Analysis Mistakes</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="space-y-6">
                
                <div className="bg-gradient-to-r from-red-50 to-red-25 border border-red-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-red-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-red-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">1</div>
                    Relying on Single Metrics
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Don&apos;t base investment decisions on one ratio or metric. Use multiple approaches 
                    for a comprehensive view.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-25 border border-orange-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-orange-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-orange-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">2</div>
                    Ignoring Quality
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    A low P/E ratio doesn&apos;t automatically mean a good investment. Consider the quality 
                    of the business and its prospects.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-yellow-50 to-yellow-25 border border-yellow-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-yellow-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-yellow-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">3</div>
                    Overlooking Industry Context
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Always compare metrics to industry averages and consider industry-specific factors.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-25 border border-green-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-green-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">4</div>
                    Focusing Only on Historical Data
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    While historical analysis is important, consider future prospects and changing 
                    business conditions.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-25 border border-blue-100 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-lg flex items-center justify-center text-sm font-bold mr-4 flex-shrink-0">5</div>
                    Ignoring Macroeconomic Factors
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Even great companies can struggle in challenging economic environments. Consider 
                    the broader economic context.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Integrating Technical and Fundamental Analysis</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="bg-gradient-to-br from-violet-50 to-violet-25 border border-violet-100 rounded-xl p-8">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  While this guide focuses on fundamental analysis, combining it with technical analysis 
                  can improve timing and risk management:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Use fundamental analysis to identify what to buy</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Use technical analysis to determine when to buy</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Combine both for position sizing and risk management</span>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-violet-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">Monitor both fundamental changes and technical breakdowns</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm border border-violet-200 rounded-lg p-6 mt-6">
                  <p className="text-gray-700 leading-relaxed">
                    <Link href="/trade-plan" className="text-violet-600 hover:text-violet-800 underline font-medium">
                    TradeCraft&apos;s trade plan generator</Link> combines both fundamental and technical 
                    analysis to provide comprehensive stock evaluations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Building Your Fundamental Analysis Skills</h2>

            <div className="bg-white border border-gray-100 rounded-xl p-8 shadow-sm">
              <div className="grid gap-8">
                
                <div className="bg-gradient-to-br from-teal-50 to-teal-25 border border-teal-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-teal-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-teal-500 rounded-full mr-3"></div>
                    Practice Recommendations
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-teal-600 mr-3">💡</span>
                        <span className="text-sm">Start by analyzing companies you know well</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-teal-600 mr-3">📚</span>
                        <span className="text-sm">Read annual reports (10-K) of successful companies</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-teal-600 mr-3">📧</span>
                        <span className="text-sm">Follow investment newsletters and research reports</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-teal-600 mr-3">🔧</span>
                        <span className="text-sm">Practice building financial models</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-teal-600 mr-3">👥</span>
                        <span className="text-sm">Join investment clubs or online communities</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-indigo-50 to-indigo-25 border border-indigo-100 rounded-xl p-8">
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-6 flex items-center">
                    <div className="w-3 h-3 bg-indigo-500 rounded-full mr-3"></div>
                    Continuous Learning
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-indigo-600 mr-3">📖</span>
                        <span className="text-sm">Study successful investors like Buffett, Graham, Lynch</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-indigo-600 mr-3">📚</span>
                        <span className="text-sm">Read classic investing books</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-indigo-600 mr-3">📊</span>
                        <span className="text-sm">Stay updated on accounting standards changes</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <span className="text-indigo-600 mr-3">🌐</span>
                        <span className="text-sm">Understand new industry dynamics and business models</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <span className="text-indigo-600 mr-3">🎯</span>
                        <span className="text-sm">Practice with different sectors and company types</span>
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
                  Fundamental analysis is a powerful tool for identifying undervalued companies and 
                  building long-term wealth. While it requires time and effort to master, the ability 
                  to evaluate a company&apos;s true worth provides a significant advantage in the stock market.
                </p>
                <p className="text-lg leading-relaxed mb-6 text-gray-700">
                  Remember that fundamental analysis works best for long-term investing rather than 
                  short-term trading. Focus on finding quality companies trading at reasonable prices, 
                  and be patient as the market recognizes their true value.
                </p>
                <p className="text-lg leading-relaxed mb-8 text-gray-700">
                  Start with simple metrics and gradually build your analytical skills. Most importantly, 
                  always maintain a margin of safety and never invest in businesses you don&apos;t understand.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-25 border border-blue-200 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  Start Your Analysis Today
                </h3>
                <p className="text-blue-800 mb-6 leading-relaxed">
                  Use TradeCraft&apos;s tools to analyze stocks using both fundamental and technical factors 
                  for comprehensive investment decisions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/trade-plan" 
                    className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Analyze Stocks
                  </Link>
                  <Link 
                    href="/screener" 
                    className="inline-flex items-center justify-center bg-white text-blue-600 border border-blue-200 px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                  >
                    Screen for Value
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
