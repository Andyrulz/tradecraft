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
    `${symbol} Trading Strategy - AI-Generated ${capitalizeFirst(setupType)} Plan | TradeCraft`,
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

  return `Professional AI-generated trade plan for ${symbol}${price}.${direction} setup${confidence}${timeHorizon}. Includes entry points, stop loss, profit targets, and risk management.${riskReward}${targets} Updated with real-time market data.`.substring(0, 160);
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
 * Generate rich, SEO-optimized content
 */
function generateRichContent(data: TradePlanSEOData): string {
  const symbol = data.symbol.toUpperCase();
  const companyName = data.companyName || symbol;
  const price = data.currentPrice ? `$${data.currentPrice.toFixed(2)}` : 'current market price';
  const direction = data.direction || 'neutral';
  const setupType = data.setupType || 'swing trade';
  const timeHorizon = data.timeHorizon || 'swing';
  const confidence = data.confidenceLevel || 'moderate';
  
  let content = `
# ${symbol} Trade Plan - Professional ${capitalizeFirst(setupType)} Strategy

## Executive Summary

This comprehensive trade plan for ${companyName} (${symbol}) provides a detailed ${direction} ${setupType} strategy based on advanced technical analysis and real-time market data. Our AI-powered system has analyzed multiple timeframes, volume patterns, and key technical indicators to generate this professional-grade trading strategy.

**Current Price**: ${price}
**Direction**: ${capitalizeFirst(direction)}
**Setup Type**: ${capitalizeFirst(setupType)}
**Time Horizon**: ${capitalizeFirst(timeHorizon)} Trading
**Confidence Level**: ${capitalizeFirst(confidence)}

## Trade Setup Analysis

### Technical Overview
The ${symbol} trade setup is based on comprehensive technical analysis including price action, volume analysis, support and resistance levels, and momentum indicators. Our system evaluates multiple factors to determine the optimal entry points, stop loss placement, and profit targets.

### Key Features of This Trade Plan:
- **Precise Entry Zone**: Optimal price levels for trade entry
- **Risk Management**: Strategic stop loss placement to limit downside
- **Profit Targets**: Multiple exit levels with probability assessments
- **Position Sizing**: Recommended position size based on risk tolerance
- **Technical Analysis**: Detailed market context and indicator analysis
`;

  // Add entry zone information if available
  if (data.entryZone) {
    content += `
### Entry Strategy
**Entry Zone**: $${data.entryZone.low.toFixed(2)} - $${data.entryZone.high.toFixed(2)}

Wait for ${symbol} to trade within this entry zone before initiating your position. This range represents the optimal risk-reward entry point based on current technical levels and market structure.
`;
  }

  // Add targets information if available
  if (data.targets && data.targets.length > 0) {
    content += `
### Profit Targets
`;
    data.targets.forEach((target, index) => {
      content += `**Target ${index + 1}**: $${target.price.toFixed(2)} (${target.probability}% probability)
`;
    });
  }

  // Add stop loss information if available
  if (data.stopLoss) {
    content += `
### Risk Management
**Stop Loss**: $${data.stopLoss.price.toFixed(2)}

This stop loss level is strategically placed to limit downside risk while allowing room for normal price fluctuation. Risk management is crucial for long-term trading success.
`;
  }

  // Add risk-reward information if available
  if (data.riskRewardRatio) {
    content += `
### Risk-Reward Analysis
**Risk-Reward Ratio**: ${data.riskRewardRatio.toFixed(1)}:1

This favorable risk-reward ratio means that for every dollar risked, the potential reward is $${data.riskRewardRatio.toFixed(1)}. This asymmetric risk profile is essential for profitable trading.
`;
  }

  content += `
## How to Use This ${symbol} Trade Plan

### Step-by-Step Execution:
1. **Monitor Entry Zone**: Wait for ${symbol} to trade within the specified entry range
2. **Execute Entry**: Enter your position when price action confirms the setup
3. **Set Stop Loss**: Immediately place your stop loss at the recommended level
4. **Manage Position**: Monitor the trade and adjust stops as price moves in your favor
5. **Take Profits**: Scale out of your position at each target level

### Important Trading Guidelines:
- Never risk more than 1-2% of your total capital on any single trade
- Always honor your stop loss levels - discipline is key to trading success
- Consider market conditions and overall sentiment before entering trades
- Keep a trading journal to track your performance and improve over time

## About TradeCraft Trade Plans

Our AI-powered trade plans combine advanced technical analysis with real-time market data to provide professional-grade trading strategies. Each plan is generated using sophisticated algorithms that analyze:

- **Price Action**: Chart patterns, support/resistance, and trend analysis
- **Volume Analysis**: Trading volume patterns and institutional activity
- **Technical Indicators**: RSI, MACD, moving averages, and momentum oscillators
- **Market Context**: Overall market sentiment and sector performance
- **Risk Assessment**: Volatility analysis and risk-adjusted position sizing

### Why Choose TradeCraft?
- **Professional Grade**: Institutional-quality analysis accessible to individual traders
- **Real-Time Data**: Always updated with the latest market information
- **Risk-First Approach**: Every plan includes comprehensive risk management
- **Proven Methodology**: Based on time-tested technical analysis principles
- **Easy to Follow**: Clear, actionable instructions for traders of all levels

## Disclaimer

This trade plan is for educational and informational purposes only. It should not be considered as financial advice or a recommendation to buy or sell any security. Trading involves substantial risk of loss and is not suitable for all investors. Past performance does not guarantee future results.

Always conduct your own research and consider consulting with a qualified financial advisor before making any investment decisions. The information provided is based on technical analysis and market data available at the time of generation and may not reflect current market conditions.

**Risk Warning**: Trading stocks and other financial instruments involves significant risk. You could lose some or all of your invested capital. Only trade with money you can afford to lose.
`;

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
    "description": `AI-generated trade plan for ${symbol} with entry points, stop loss, targets, and risk management.`,
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
    title: `${upperSymbol} Trade Plan - AI-Generated Trading Strategy | TradeCraft`,
    description: `Get a professional AI-generated trade plan for ${upperSymbol} with entry points, stop loss, targets, and risk management. Real-time analysis updated daily.`,
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

Professional AI-generated trading strategy for ${upperSymbol}. Get precise entry points, stop loss levels, profit targets, and comprehensive risk management analysis.

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
      "description": `AI-generated trade plan for ${upperSymbol}`,
      "author": {
        "@type": "Organization",
        "name": "TradeCraft"
      }
    },
    canonicalUrl: `https://www.tradingsetup.pro/trade-plan/${symbol.toLowerCase()}`
  };
}
