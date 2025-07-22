/**
 * SEO Content Generation Utilities for Trade Plan Pages
 * 
 * Phase 2: SEO Content Generator
 * - Generate SEO-optimized content from trade plan data
 * - Create meta descriptions, structured data, and rich content
 * - Ensure consistency across cached and live content
 */

import { TradePlan } from '@/lib/types';

export interface SEOContent {
  title: string;
  description: string;
  keywords: string[];
  content: string;
  structuredData: object;
  canonicalUrl: string;
  ogImage?: string;
}

export interface TradePlanSEOData {
  symbol: string;
  companyName?: string;
  currentPrice?: number;
  direction?: 'bullish' | 'bearish' | 'neutral';
  confidenceLevel?: string;
  setupType?: string;
  riskRewardRatio?: number;
  entryZone?: { low: number; high: number };
  targets?: Array<{ price: number; probability: number }>;
  stopLoss?: { price: number };
  timeHorizon?: string;
  summary?: string;
  lastUpdated?: Date;
}

/**
 * Generate comprehensive SEO content for a trade plan
 */
export function generateTradePlanSEO(data: TradePlanSEOData): SEOContent {
  const symbol = data.symbol.toUpperCase();
  const companyName = data.companyName || symbol;
  const price = data.currentPrice ? `$${data.currentPrice.toFixed(2)}` : '';
  const direction = data.direction || 'neutral';
  const confidence = data.confidenceLevel || 'moderate';
  const setupType = data.setupType || 'swing trade';
  const timeHorizon = data.timeHorizon || 'swing';
  
  // Generate title variants based on available data
  const title = generateTitle(symbol, companyName, direction, setupType);
  
  // Generate meta description
  const description = generateMetaDescription(data);
  
  // Generate keywords
  const keywords = generateKeywords(symbol, companyName, setupType, direction);
  
  // Generate rich content for SEO
  const content = generateRichContent(data);
  
  // Generate structured data
  const structuredData = generateStructuredData(data);
  
  return {
    title,
    description,
    keywords,
    content,
    structuredData,
    canonicalUrl: `https://www.tradingsetup.pro/trade-plan/${symbol.toLowerCase()}`,
    ogImage: 'https://www.tradingsetup.pro/bull-bear.png'
  };
}

/**
 * Generate optimized title for trade plan page
 */
function generateTitle(symbol: string, companyName: string, direction: string, setupType: string): string {
  const templates = [
    `${symbol} Trade Plan - ${capitalizeFirst(direction)} ${capitalizeFirst(setupType)} Strategy | TradeCraft`,
    `${symbol} Trading Strategy - Professional ${capitalizeFirst(setupType)} Plan with AI Insights | TradeCraft`,
    `${companyName} (${symbol}) Trade Plan - Professional Trading Analysis | TradeCraft`,
    `${symbol} ${capitalizeFirst(setupType)} Trade Setup - Entry, Exit & Risk Management | TradeCraft`
  ];
  
  // Choose template based on available data
  if (companyName !== symbol && direction !== 'neutral') {
    return templates[0];
  } else if (setupType !== 'swing trade') {
    return templates[1];
  } else if (companyName !== symbol) {
    return templates[2];
  } else {
    return templates[3];
  }
}

/**
 * Generate comprehensive meta description
 */
function generateMetaDescription(data: TradePlanSEOData): string {
  const symbol = data.symbol.toUpperCase();
  const price = data.currentPrice ? ` at $${data.currentPrice.toFixed(2)}` : '';
  const direction = data.direction ? ` ${data.direction}` : '';
  const confidence = data.confidenceLevel ? ` with ${data.confidenceLevel} confidence` : '';
  const timeHorizon = data.timeHorizon ? ` for ${data.timeHorizon} trading` : '';
  
  const riskReward = data.riskRewardRatio 
    ? ` Risk/reward ratio: ${data.riskRewardRatio.toFixed(1)}:1.`
    : '';
    
  const targets = data.targets && data.targets.length > 0
    ? ` Target: $${data.targets[0].price.toFixed(2)}.`
    : '';

  return `Professional trade plan for ${symbol} enhanced with AI insights${price}.${direction} setup${confidence}${timeHorizon}. Includes entry points, stop loss, profit targets, and risk management.${riskReward}${targets} Updated with real-time market data.`.substring(0, 160);
}

/**
 * Generate relevant keywords for SEO
 */
function generateKeywords(symbol: string, companyName: string, setupType: string, direction: string): string[] {
  const baseKeywords = [
    `${symbol} trade plan`,
    `${symbol} trading strategy`,
    `${symbol} swing trade`,
    `${symbol} entry exit points`,
    `how to trade ${symbol}`,
    `${symbol} technical analysis`,
    `${symbol} stock analysis`,
    `${symbol} trading signals`,
    `${symbol} price targets`,
    `${symbol} stop loss`,
  ];

  const companyKeywords = companyName !== symbol ? [
    `${companyName} trade plan`,
    `${companyName} trading strategy`,
    `${companyName} stock trade`,
  ] : [];

  const setupKeywords = [
    `${setupType} strategy`,
    `${setupType} trade setup`,
    `${setupType} analysis`,
  ];

  const directionKeywords = direction !== 'neutral' ? [
    `${direction} ${symbol}`,
    `${direction} trade setup`,
    `${direction} trading strategy`,
  ] : [];

  const generalKeywords = [
    'ai trading strategy',
    'professional trade plan',
    'stock trading signals',
    'technical analysis',
    'trading risk management',
    'entry exit strategy',
    'swing trading setup',
    'day trading plan',
  ];

  return [
    ...baseKeywords,
    ...companyKeywords,
    ...setupKeywords,
    ...directionKeywords,
    ...generalKeywords,
  ].slice(0, 25); // Limit to 25 keywords
}

/**
 * Generate rich, SEO-optimized content with enhanced depth and structure
 * Target: 2,500+ words for better SEO authority
 */
function generateRichContent(data: TradePlanSEOData): string {
  const symbol = data.symbol.toUpperCase();
  const companyName = data.companyName || symbol;
  const price = data.currentPrice ? `$${data.currentPrice.toFixed(2)}` : 'current market price';
  const direction = data.direction || 'neutral';
  const setupType = data.setupType || 'swing trade';
  const timeHorizon = data.timeHorizon || 'swing';
  const confidence = data.confidenceLevel || 'moderate';
  const riskReward = data.riskRewardRatio || 2.5;
  
  let content = `# ${symbol} Trade Plan - Professional Trading Strategy & Complete Analysis Guide

## Executive Summary

This comprehensive trading guide for ${companyName} (${symbol}) provides a professional-grade ${direction} ${setupType} strategy developed using advanced AI-powered technical analysis. Our system combines real-time market data, institutional flow analysis, and proven trading methodologies to deliver actionable trading strategies for both novice and experienced traders.

**Symbol**: ${symbol} | **Company**: ${companyName} | **Current Price**: ${price}
**Trading Direction**: ${capitalizeFirst(direction)} | **Setup Type**: ${capitalizeFirst(setupType)} | **Time Horizon**: ${capitalizeFirst(timeHorizon)}
**Confidence Level**: ${capitalizeFirst(confidence)} | **Risk/Reward Ratio**: ${riskReward.toFixed(1)}:1

---

## ${symbol} Technical Analysis Deep Dive

### Chart Pattern & Price Action Analysis
The ${symbol} chart reveals ${direction === 'bullish' ? 'constructive price action with strong momentum indicators supporting upward movement' : direction === 'bearish' ? 'deteriorating technical conditions with selling pressure evident across multiple timeframes' : 'a consolidation pattern with potential for significant directional movement'}. Our multi-timeframe analysis examines price behavior across daily, 4-hour, and hourly charts to identify the highest-probability trading opportunities.

**Key Technical Observations:**
- **Trend Structure**: ${direction === 'bullish' ? 'Higher highs and higher lows pattern intact' : direction === 'bearish' ? 'Lower highs and lower lows establishing downtrend' : 'Sideways consolidation between key support and resistance'}
- **Volume Profile**: ${direction === 'bullish' ? 'Institutional accumulation evident on up moves' : direction === 'bearish' ? 'Distribution patterns suggesting professional selling' : 'Balanced volume profile indicating accumulation phase'}
- **Moving Average Analysis**: Price relationship to 20-day, 50-day, and 200-day moving averages
- **Support & Resistance**: Critical price levels that have historical significance

### Advanced Technical Indicators Analysis
Our proprietary analysis engine evaluates multiple technical indicators to confirm trade direction and timing:

**Momentum Indicators:**
- **RSI (Relative Strength Index)**: Measures overbought/oversold conditions
- **MACD (Moving Average Convergence Divergence)**: Trend change and momentum signals
- **Stochastic Oscillator**: Short-term momentum and reversal signals

**Volume Indicators:**
- **Volume Weighted Average Price (VWAP)**: Institutional reference price
- **On-Balance Volume (OBV)**: Cumulative volume flow analysis
- **Volume Profile**: Price levels with highest trading activity

### Market Context & Sector Analysis
${companyName}'s performance cannot be analyzed in isolation. The broader market environment, sector rotation patterns, and industry-specific factors significantly impact individual stock behavior.

**Market Environment Assessment:**
- Overall market trend and volatility regime
- Sector rotation patterns affecting ${symbol}
- Economic indicators relevant to the industry
- Institutional positioning and flow data
- Correlation with major market indices

**Industry & Sector Considerations:**
- Relative strength vs. sector peers
- Industry-specific catalysts and headwinds
- Regulatory environment impact
- Supply chain and operational factors
- Competitive positioning analysis

---

## ${symbol} Trading Strategy Guide

### Entry Strategy & Timing
Successful ${symbol} trading requires precise entry execution based on confirmed technical signals. Our recommended approach focuses on high-probability setups that offer favorable risk-reward characteristics.

**Primary Entry Techniques:**
1. **Breakout Entry**: Entry above key resistance with volume confirmation
2. **Pullback Entry**: Entry on retest of broken resistance (now support)
3. **Pattern Completion**: Entry upon completion of chart patterns
4. **Momentum Entry**: Entry on strong momentum with proper risk management

**Entry Confirmation Checklist:**
- [ ] Volume exceeds 20-day average on breakout
- [ ] Multiple timeframe alignment confirmed
- [ ] No major resistance overhead in near term
- [ ] Risk-reward ratio minimum 2:1
- [ ] Market environment supportive

### Position Sizing & Risk Management
Proper position sizing is crucial for long-term trading success. Our approach emphasizes capital preservation while maximizing profit potential through systematic risk management.

**Position Sizing Methodology:**
- **Account Risk**: Never risk more than 1-2% of total capital per trade
- **Volatility Adjustment**: Position size adjusted for stock's volatility
- **Correlation Analysis**: Reduce size if highly correlated to existing positions
- **Market Conditions**: Smaller positions during high-volatility periods

**Risk Management Framework:**
- **Initial Stop Loss**: Placed below key technical level
- **Trailing Stops**: Dynamic stop adjustment as trade moves favorably
- **Partial Profit Taking**: Scale out at predetermined target levels
- **Position Monitoring**: Continuous assessment of trade thesis

### Exit Strategy & Profit Maximization
A well-defined exit strategy is essential for capturing profits and minimizing losses. Our systematic approach includes multiple exit scenarios.

**Profit-Taking Strategy:**
- **Target 1**: Conservative target at first resistance level (25% position)
- **Target 2**: Measured move target based on pattern (50% position)
- **Target 3**: Extended target for trend continuation (25% position)
- **Trailing Stop**: Protect profits while allowing for extended moves

**Stop Loss Strategy:**
- **Initial Stop**: Below key support level or pattern low
- **Breakeven Stop**: Move to breakeven after first target hit
- **Trailing Stop**: Progressive stop tightening as profits accumulate`;

  // Add specific entry zone information
  if (data.entryZone) {
    content += `

---

## ${symbol} Entry Zone Analysis

### Optimal Entry Range
**Entry Zone**: $${data.entryZone.low.toFixed(2)} - $${data.entryZone.high.toFixed(2)}

This entry zone represents the optimal risk-reward range for initiating a ${symbol} position. The range is calculated based on:
- Technical support and resistance levels
- Volume profile analysis and institutional reference points
- Volatility-adjusted pricing models
- Historical price reaction at similar levels

**Entry Zone Strategy:**
- **Lower Range** ($${data.entryZone.low.toFixed(2)}): Aggressive entry with tighter stop
- **Mid Range** ($${((data.entryZone.low + data.entryZone.high) / 2).toFixed(2)}): Balanced risk-reward entry
- **Upper Range** ($${data.entryZone.high.toFixed(2)}): Conservative entry with wider stop

### Entry Timing Considerations
- Monitor for volume confirmation on approach to entry zone
- Wait for price action confirmation (hammer, doji, or engulfing patterns)
- Consider broader market conditions and sector sentiment
- Avoid entries during major news events or earnings announcements`;
  }

  // Add profit targets section
  if (data.targets && data.targets.length > 0) {
    content += `

---

## ${symbol} Profit Targets & Price Projections

### Target Analysis
Our price target methodology combines multiple analytical approaches to provide realistic profit expectations:`;

    data.targets.forEach((target, index) => {
      content += `

**Target ${index + 1}: $${target.price.toFixed(2)}** (${target.probability}% probability)
- Distance from entry: ${data.entryZone ? `${(((target.price - ((data.entryZone.low + data.entryZone.high) / 2)) / ((data.entryZone.low + data.entryZone.high) / 2)) * 100).toFixed(1)}%` : 'TBD'}
- Technical basis: ${index === 0 ? 'First resistance level and volume node' : index === 1 ? 'Measured move and pattern target' : 'Extended projection and trend continuation'}
- Recommended action: ${index === 0 ? 'Scale out 25-30% of position' : index === 1 ? 'Scale out 50% of remaining position' : 'Trail stop for maximum profit'}`;
    });

    content += `

### Target Achievement Strategy
- **Systematic Scaling**: Take partial profits at each target level
- **Trend Continuation**: Hold remaining position for extended moves
- **Market Conditions**: Adjust targets based on overall market environment
- **Risk Management**: Never let winners turn into losers`;
  }

  // Add stop loss section
  if (data.stopLoss) {
    content += `

---

## ${symbol} Risk Management & Stop Loss Strategy

### Stop Loss Analysis
**Initial Stop Loss**: $${data.stopLoss.price.toFixed(2)}

This stop loss level is strategically positioned to:
- Limit maximum loss to acceptable risk parameters
- Allow for normal price volatility and market noise
- Maintain favorable risk-reward ratio for the trade
- Preserve capital for future trading opportunities

### Dynamic Risk Management
**Risk Adjustment Techniques:**
- **Breakeven Stop**: Move stop to entry price after first target hit
- **Trailing Stop**: Progressive tightening as profits accumulate
- **Time Stop**: Exit if trade doesn't work within expected timeframe
- **Fundamental Stop**: Exit if company fundamentals deteriorate

### Position Monitoring Guidelines
- Review position daily for technical deterioration
- Monitor sector and market conditions for changes
- Watch for volume anomalies or institutional activity
- Be prepared to exit if trade thesis is invalidated`;
  }

  // Add risk-reward analysis
  if (data.riskRewardRatio) {
    content += `

---

## ${symbol} Risk-Reward Analysis

### Trade Mathematics
**Risk-Reward Ratio**: ${data.riskRewardRatio.toFixed(1)}:1

This favorable risk-reward profile means:
- For every $1 risked, potential reward is $${data.riskRewardRatio.toFixed(1)}
- Break-even win rate required: ${(100 / (1 + data.riskRewardRatio)).toFixed(1)}%
- Expected value positive with modest win rate
- Suitable for systematic trading approach

### Probability Assessment
Based on historical analysis and current market conditions:
- **Success Probability**: ${confidence === 'high' ? '65-75%' : confidence === 'moderate' ? '55-65%' : '45-55%'}
- **Expected Return**: Positive expectancy over multiple trades
- **Maximum Risk**: Limited to stop loss level
- **Reward Potential**: Multiple target levels for profit optimization`;
  }

  content += `

---

## How to Trade ${symbol}: Step-by-Step Execution Guide

### Pre-Trade Checklist
Before entering any ${symbol} trade, ensure the following conditions are met:
- [ ] Technical setup confirmed on multiple timeframes
- [ ] Entry zone clearly defined with specific price levels
- [ ] Stop loss level determined based on technical analysis
- [ ] Profit targets set with realistic expectations
- [ ] Position size calculated based on account risk
- [ ] Market conditions favorable for the trade direction
- [ ] No major news events scheduled during trade timeframe

### Trade Execution Process
**Step 1: Market Preparation**
- Review overnight news and premarket activity
- Check overall market sentiment and sector performance
- Confirm technical levels remain valid

**Step 2: Entry Execution**
- Place conditional orders at entry zone levels
- Monitor for volume confirmation on approach
- Execute entry with appropriate position size
- Immediately place stop loss order

**Step 3: Trade Management**
- Monitor price action for confirmation of thesis
- Adjust stops according to predefined plan
- Take partial profits at predetermined target levels
- Keep detailed records for performance analysis

**Step 4: Exit Strategy**
- Scale out systematically at target levels
- Trail stops for remaining position
- Exit completely if stop loss hit or thesis invalidated
- Review trade performance for learning opportunities

### Common ${symbol} Trading Mistakes to Avoid
- **Chasing Price**: Never enter above defined entry zone
- **Ignoring Stops**: Always honor predetermined stop loss levels
- **Oversizing Positions**: Stick to calculated position sizes
- **Emotional Trading**: Follow the plan regardless of emotions
- **Lack of Patience**: Wait for proper setup confirmation

---

## ${symbol} Market Analysis & Context

### Industry Overview
${companyName} operates in a dynamic industry environment where multiple factors influence stock performance:

**Industry Trends:**
- Technology adoption and innovation cycles
- Regulatory changes and compliance requirements
- Competitive landscape and market share dynamics
- Economic sensitivity and cyclical patterns

**Company-Specific Factors:**
- Management quality and strategic vision
- Financial health and growth prospects
- Competitive advantages and market position
- Operational efficiency and cost structure

### Economic Environment Impact
Broader economic conditions significantly impact ${symbol} trading opportunities:

**Market Factors:**
- Interest rate environment and Fed policy
- Inflation trends and purchasing power
- Economic growth and recession risks
- Currency fluctuations and global trade

**Sector Rotation Patterns:**
- Growth vs. value leadership cycles
- Defensive vs. cyclical preferences
- Large-cap vs. small-cap performance
- Sector-specific catalysts and headwinds

---

## ${symbol} Trading Psychology & Discipline

### Mental Preparation for ${symbol} Trading
Successful trading requires proper psychological preparation and emotional discipline:

**Pre-Trade Mental State:**
- Clear mind free from emotional bias
- Confidence in analysis and methodology
- Acceptance of potential loss scenarios
- Focus on process rather than outcomes

**During-Trade Psychology:**
- Stick to predetermined plan
- Avoid second-guessing entries and exits
- Monitor emotions for decision-making clarity
- Maintain perspective on larger trading goals

### Building Trading Discipline
- **Rule-Based Approach**: Follow systematic methodology
- **Record Keeping**: Maintain detailed trading journal
- **Performance Review**: Regular analysis of wins and losses
- **Continuous Learning**: Adapt and improve based on experience

---

## Frequently Asked Questions About ${symbol} Trading

### Q: What makes this ${symbol} trade plan different from others?
A: Our AI-powered analysis combines multiple technical indicators, real-time market data, and institutional flow analysis to provide comprehensive trading strategies. Each plan includes specific entry zones, multiple profit targets, and detailed risk management guidelines.

### Q: How often should I review my ${symbol} position?
A: Daily monitoring is recommended for active trades, with more frequent checks during volatile market conditions. However, avoid over-managing positions based on short-term price fluctuations.

### Q: Can this trade plan be used for different account sizes?
A: Yes, the plan includes position sizing guidelines that can be scaled to any account size. The key is maintaining proper risk management regardless of capital amount.

### Q: What if ${symbol} gaps above or below my entry zone?
A: Gaps require special consideration. Small gaps (< 2%) can often be traded with adjusted stop levels. Large gaps may invalidate the setup and require waiting for new opportunities.

### Q: How do I know when to exit if targets aren't hit?
A: Use time-based stops, technical deterioration signals, or fundamental changes as exit triggers. Never let a winning trade turn into a significant loss.

### Q: Is this suitable for day trading ${symbol}?
A: This plan is optimized for ${timeHorizon} trading. For day trading, use shorter timeframes and tighter risk parameters while maintaining the same analytical principles.

---

## About TradeCraft AI Trading Plans

### Our Methodology
TradeCraft's AI-powered trading plans represent the fusion of advanced technology and proven trading principles. Our system analyzes:

**Technical Analysis:**
- Multi-timeframe chart pattern recognition
- Volume profile and institutional flow analysis
- Momentum and trend-following indicators
- Support and resistance level identification

**Market Context:**
- Overall market sentiment and trend
- Sector rotation and relative strength
- Economic indicators and news impact
- Institutional positioning and flow data

**Risk Management:**
- Volatility-adjusted position sizing
- Dynamic stop loss placement
- Systematic profit-taking strategies
- Portfolio correlation analysis

### Why Choose TradeCraft?
- **Professional Grade**: Institutional-quality analysis for individual traders
- **Real-Time Data**: Always current with latest market information
- **Risk-First Approach**: Capital preservation is our primary focus
- **Proven Methodology**: Based on decades of trading research and experience
- **Easy Implementation**: Clear, actionable instructions for all skill levels

---

## Important Disclaimers & Risk Warnings

### Educational Purpose Only
This ${symbol} trade plan is provided for educational and informational purposes only. It should not be considered as financial advice or a recommendation to buy or sell any security. All trading involves substantial risk of loss.

### Risk Warnings
- **Capital Risk**: You could lose some or all of your invested capital
- **Market Risk**: Past performance does not guarantee future results
- **Volatility Risk**: Stock prices can move rapidly in either direction
- **Liquidity Risk**: Some securities may be difficult to buy or sell

### Professional Advice Recommendation
Always conduct your own research and consider consulting with a qualified financial advisor before making any investment decisions. The information provided is based on technical analysis and market data available at the time of generation and may not reflect current market conditions.

### Terms of Use
By using this trade plan, you acknowledge that:
- Trading involves substantial risk and is not suitable for all investors
- You are responsible for your own trading decisions
- TradeCraft is not liable for any trading losses
- You should only trade with money you can afford to lose

---

*This comprehensive ${symbol} trading guide provides professional-grade analysis and strategy development. Remember that successful trading requires discipline, patience, and continuous learning. Always prioritize risk management over profit potential.*

**Last Updated**: ${new Date().toLocaleDateString()}
**Next Review**: Recommended within 24-48 hours or upon significant market changes`;

  return content;
}

/**
 * Generate structured data for SEO
 */
function generateStructuredData(data: TradePlanSEOData): object {
  const symbol = data.symbol.toUpperCase();
  const companyName = data.companyName || symbol;
  const currentDate = new Date().toISOString();
  const lastUpdated = data.lastUpdated ? data.lastUpdated.toISOString() : currentDate;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${symbol} Trade Plan - Professional Trading Strategy`,
    "description": `Professional trade plan for ${symbol} enhanced with AI insights, including entry points, stop loss, targets, and risk management.`,
    "author": {
      "@type": "Organization",
      "name": "TradeCraft",
      "url": "https://www.tradingsetup.pro"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TradeCraft",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.tradingsetup.pro/bull-bear.png"
      }
    },
    "datePublished": currentDate,
    "dateModified": lastUpdated,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.tradingsetup.pro/trade-plan/${symbol.toLowerCase()}`
    },
    "about": {
      "@type": "Corporation",
      "name": companyName,
      "tickerSymbol": symbol,
      "exchange": "NASDAQ" // Default, could be made dynamic
    },
    "keywords": generateKeywords(symbol, companyName, data.setupType || 'swing trade', data.direction || 'neutral').join(', '),
    "articleSection": "Trading",
    "wordCount": 1500, // Approximate
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "image": {
      "@type": "ImageObject",
      "url": "https://www.tradingsetup.pro/bull-bear.png",
      "width": 1200,
      "height": 630
    }
  };
}

/**
 * Utility function to capitalize first letter
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Extract SEO data from trade plan object
 */
export function extractSEODataFromTradePlan(tradePlan: any): TradePlanSEOData {
  return {
    symbol: tradePlan.symbol || '',
    companyName: tradePlan.companyName,
    currentPrice: tradePlan.currentPrice,
    direction: tradePlan.direction,
    confidenceLevel: tradePlan.confidenceLevel,
    setupType: tradePlan.setupType,
    riskRewardRatio: tradePlan.riskManagement?.riskRewardRatio,
    entryZone: tradePlan.riskManagement?.entryZone,
    targets: tradePlan.riskManagement?.targets,
    stopLoss: tradePlan.riskManagement?.initialStopLoss,
    timeHorizon: tradePlan.timeHorizon,
    summary: tradePlan.summary,
    lastUpdated: new Date()
  };
}

/**
 * Generate minimal SEO content for fallback scenarios
 */
export function generateFallbackSEO(symbol: string): SEOContent {
  const upperSymbol = symbol.toUpperCase();
  
  return {
    title: `${upperSymbol} Trade Plan - Professional Trading Strategy with AI Insights | TradeCraft`,
    description: `Get a professional trade plan for ${upperSymbol} enhanced with AI insights. Includes entry points, stop loss, targets, and risk management. Real-time analysis updated daily.`,
    keywords: [
      `${upperSymbol} trade plan`,
      `${upperSymbol} trading strategy`,
      `${upperSymbol} swing trade`,
      `${upperSymbol} entry exit points`,
      `how to trade ${upperSymbol}`,
      'ai trading strategy',
      'professional trade plan',
      'technical analysis'
    ],
    content: `# ${upperSymbol} Trade Plan

Professional trading strategy for ${upperSymbol} enhanced with AI insights. Get precise entry points, stop loss levels, profit targets, and comprehensive risk management analysis.

## Features:
- Real-time technical analysis
- Entry and exit strategies
- Risk management guidelines
- Professional-grade insights

This trade plan provides institutional-quality analysis for individual traders, helping you make informed trading decisions with proper risk management.`,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": `${upperSymbol} Trade Plan - Trading Strategy`,
      "description": `Professional trade plan for ${upperSymbol} with AI insights`,
      "author": {
        "@type": "Organization",
        "name": "TradeCraft"
      }
    },
    canonicalUrl: `https://www.tradingsetup.pro/trade-plan/${symbol.toLowerCase()}`
  };
}
