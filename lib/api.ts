import { TechnicalIndicator, IndicatorSignal } from './types';

// API key rotation setup - Alpha Vantage alternative
const twelveDataApiKeys = [
  process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY_1 || '4b0c95181f434ef5be044c825bd15b37',
  process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY_2 || '4b0c95181f434ef5be044c825bd15b37',
];

// Alpha Vantage API keys (FREE alternative)
const alphaVantageApiKeys = [
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY_1 || 'demo',
  process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY_2 || 'demo',
];

let twelveDataKeyIndex = 0;
let alphaVantageKeyIndex = 0;

function getNextTwelveDataApiKey() {
  const key = twelveDataApiKeys[twelveDataKeyIndex];
  twelveDataKeyIndex = (twelveDataKeyIndex + 1) % twelveDataApiKeys.length;
  return key;
}

function getNextAlphaVantageApiKey() {
  const key = alphaVantageApiKeys[alphaVantageKeyIndex];
  alphaVantageKeyIndex = (alphaVantageKeyIndex + 1) % alphaVantageApiKeys.length;
  return key;
}

// Simple in-memory cache fallback (for SSR or Node)
const memoryCache: Record<string, { data: any; timestamp: number }> = {};

function getCacheKey(symbol: string) {
  return `stockdata_${symbol.toUpperCase()}`;
}

function getCachedStockData(symbol: string): any | null {
  const key = getCacheKey(symbol);
  if (typeof window !== 'undefined' && window.localStorage) {
    const cached = window.localStorage.getItem(key);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000) {
        return parsed.data;
      }
    }
  } else if (memoryCache[key]) {
    if (Date.now() - memoryCache[key].timestamp < 24 * 60 * 60 * 1000) {
      return memoryCache[key].data;
    }
  }
  return null;
}

function setCachedStockData(symbol: string, data: any) {
  const key = getCacheKey(symbol);
  const value = JSON.stringify({ data, timestamp: Date.now() });
  if (typeof window !== 'undefined' && window.localStorage) {
    window.localStorage.setItem(key, value);
  } else {
    memoryCache[key] = { data, timestamp: Date.now() };
  }
}

function getBaseUrl() {
  if (typeof window !== 'undefined') {
    // Client-side: relative URL is fine
    return '';
  }
  // Server-side: use env variable
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

// Helper to safely parse numbers from API responses
const safeNumber = (val: any) => {
  if (val === undefined || val === null || val === '' || val === 'null' || isNaN(Number(val))) return undefined;
  return Number(val);
};

export async function validateStockSymbol(symbol: string): Promise<boolean> {
  try {
    // Use Twelve Data to validate symbol by checking if we get a valid time_series response
    const twelveDataApiKey = getNextTwelveDataApiKey();
    const tdRes = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1min&outputsize=1&apikey=${twelveDataApiKey}`);
    const tdJson = await tdRes.json();
    return tdJson && Array.isArray(tdJson.values) && tdJson.values.length > 0 && !tdJson.code;
  } catch (error) {
    console.error('Error validating stock symbol:', error);
    return false;
  }
}

export async function getStockData(symbol: string, retries = 3, horizon: string = 'swing'): Promise<any> {
  // Check cache first
  const cached = getCachedStockData(symbol);
  if (cached) return cached;

  try {
    // Set interval and outputsize based on horizon
    let interval = '1day';
    let outputsize = 30;
    if (horizon === 'positional') outputsize = 60;
    if (horizon === 'longterm') {
      interval = '1week';
      outputsize = 104;
    }
    // Fetch historical + live price data from Twelve Data
    const twelveDataApiKey = getNextTwelveDataApiKey();
    if (!twelveDataApiKey || twelveDataApiKey === 'undefined' || twelveDataApiKey.length < 10) {
      console.error('Twelve Data API key is missing or invalid:', twelveDataApiKey);
      throw new Error('Twelve Data API key is missing or invalid');
    }
    let tdRes;
    try {
      tdRes = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${twelveDataApiKey}`);
    } catch (fetchErr) {
      console.error('Fetch failed for symbol', symbol, 'with error:', fetchErr);
      throw new Error(`Fetch failed for symbol ${symbol}: ${fetchErr}`);
    }
    if (!tdRes.ok) {
      let body = '';
      try { body = await tdRes.text(); } catch {}
      console.error('Twelve Data API returned non-200 for', symbol, 'status:', tdRes.status, 'body:', body);
      throw new Error(`Twelve Data API error for ${symbol}: status ${tdRes.status}, body: ${body}`);
    }
    const tdJson = await tdRes.json();
    if (!tdJson.values || !Array.isArray(tdJson.values)) {
      console.error('Failed to fetch historical data from Twelve Data for', symbol, 'response:', tdJson);
      throw new Error('Failed to fetch historical data from Twelve Data');
    }
    // The first value is the latest (live) data
    const priceHistory = tdJson.values.map((v: any) => ({
      date: v.datetime,
      open: parseFloat(v.open),
      high: parseFloat(v.high),
      low: parseFloat(v.low),
      close: parseFloat(v.close),
      volume: parseInt(v.volume, 10)
    })).reverse();
    const latest = tdJson.values[0];

    // Define closes and volumes arrays at the top for use in all analytics
    const closes = priceHistory.map((p: { close: number }) => p.close);
    const volumes = priceHistory.map((p: { volume: number }) => p.volume);

    // Calculate trend early so it is available for all analytics
    const trend = (() => {
      if (closes.length < 2) return 'sideways';
      const diff = closes[closes.length - 1] - closes[0];
      if (diff > 0.03 * closes[0]) return 'uptrend';
      if (diff < -0.03 * closes[0]) return 'downtrend';
      return 'sideways';
    })();

    // Volume status
    const volumeStatus = (() => {
      if (volumes.length < 20) return 'Normal';
      const avgVolume = volumes.slice(-20).reduce((a: number, b: number) => a + b, 0) / 20;
      const currentVolume = volumes[volumes.length - 1];
      if (currentVolume > avgVolume * 1.5) return 'Above Average';
      if (currentVolume < avgVolume * 0.7) return 'Below Average';
      return 'Normal';
    })();

    // Volume confirming
    const volumeConfirming = volumeStatus === 'Above Average';

    // Calculate ATR early so it is available for all analytics
    const atr = (() => {
      if (closes.length < 15) return 0;
      let trSum = 0;
      for (let i = 1; i < closes.length; i++) {
        trSum += Math.abs(closes[i] - closes[i - 1]);
      }
      return trSum / (closes.length - 1);
    })();

    // Calculate Average Daily Return and Volatility
    let avgReturn = 'N/A';
    let volatility = 'N/A';
    if (closes.length > 1) {
      const returns = closes.slice(1).map((c: number, i: number) => (c - closes[i]) / closes[i]);
      const mean = returns.reduce((a: number, b: number) => a + b, 0) / returns.length;
      avgReturn = (mean * 100).toFixed(2);
      const variance = returns.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / returns.length;
      volatility = (Math.sqrt(variance) * 100).toFixed(2);
    }

    // Fetch indicators from Twelve Data (with key rotation)
    const rsiKey = getNextTwelveDataApiKey();
    const macdKey = getNextTwelveDataApiKey();
    const bbKey = getNextTwelveDataApiKey();
    const [rsiRes, macdRes, bbRes] = await Promise.all([
      fetch(`https://api.twelvedata.com/rsi?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${rsiKey}`),
      fetch(`https://api.twelvedata.com/macd?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${macdKey}`),
      fetch(`https://api.twelvedata.com/bbands?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${bbKey}`)
    ]);
    const rsiJson = await rsiRes.json();
    const macdJson = await macdRes.json();
    const bbJson = await bbRes.json();

    // Get the latest indicator values
    const latestRSI = rsiJson.values && rsiJson.values.length > 0 ? parseFloat(rsiJson.values[0].rsi) : null;
    const latestMACD = macdJson.values && macdJson.values.length > 0 ? parseFloat(macdJson.values[0].macd) : null;
    const latestMACDSignal = macdJson.values && macdJson.values.length > 0 ? parseFloat(macdJson.values[0].macd_signal) : null;
    const latestMACDHist = macdJson.values && macdJson.values.length > 0 ? parseFloat(macdJson.values[0].macd_hist) : null;
    const latestBB = bbJson.values && bbJson.values.length > 0 ? {
      upper: parseFloat(bbJson.values[0].upper_band),
      middle: parseFloat(bbJson.values[0].middle_band),
      lower: parseFloat(bbJson.values[0].lower_band)
    } : null;

    // --- BEGIN: Build full TradePlan object ---

    // Calculate entryZone, stopLoss, and targets before using them in summary
    const entryZone = {
      low: closes[closes.length - 1] - atr,
      high: closes[closes.length - 1] + atr
    };
    
    // Use enhanced stop loss calculation with swing low priority
    const stopLoss = await calculateEnhancedStopLoss(
      symbol,
      closes[closes.length - 1],
      atr,
      horizon || 'swing'
    );
    
    // Calculate targets with proper risk-to-reward ratios
    const currentPrice = closes[closes.length - 1];
    const riskPerShare = Math.abs(currentPrice - stopLoss.price);
    const baseMultipliers = horizon === 'swing' ? [1.5, 2.5, 4] :
                          horizon === 'positional' ? [2, 3, 5] :
                          [2.5, 4, 6];
    
    const targets = [
      { 
        price: currentPrice + (riskPerShare * baseMultipliers[0]), 
        probability: 70, 
        riskRewardRatio: baseMultipliers[0] 
      },
      { 
        price: currentPrice + (riskPerShare * baseMultipliers[1]), 
        probability: 50, 
        riskRewardRatio: baseMultipliers[1] 
      },
      { 
        price: currentPrice + (riskPerShare * baseMultipliers[2]), 
        probability: 30, 
        riskRewardRatio: baseMultipliers[2] 
      }
    ];
    
    // Calculate actual risk-to-reward ratio using the first target
    const actualRiskRewardRatio = targets[0].riskRewardRatio;

    // Indicators (with actionable advice)
    const indicators = [
      {
        name: 'RSI (14)',
        value: latestRSI ?? 'N/A',
        signal: latestRSI !== null && latestRSI !== undefined ? (latestRSI > 60 ? 'bullish' : latestRSI < 40 ? 'bearish' : 'neutral') : 'neutral',
        description: 'Relative Strength Index',
        education: 'RSI measures momentum.',
        actionableAdvice: latestRSI !== null && latestRSI !== undefined ? getIndicatorAdvice('RSI (14)', latestRSI, (latestRSI > 60 ? 'bullish' : latestRSI < 40 ? 'bearish' : 'neutral')) : ''
      },
      {
        name: 'MACD',
        value: latestMACD ?? 'N/A',
        signal: latestMACD !== null && latestMACD !== undefined ? (latestMACD > 0 ? 'bullish' : latestMACD < 0 ? 'bearish' : 'neutral') : 'neutral',
        description: 'MACD momentum',
        education: 'MACD is a trend-following indicator.',
        actionableAdvice: latestMACD !== null && latestMACD !== undefined ? getIndicatorAdvice('MACD', latestMACD, (latestMACD > 0 ? 'bullish' : latestMACD < 0 ? 'bearish' : 'neutral')) : ''
      },
      {
        name: 'Bollinger Bands',
        value: latestBB ? `${latestBB.upper?.toFixed(2) ?? 'N/A'} / ${latestBB.middle?.toFixed(2) ?? 'N/A'} / ${latestBB.lower?.toFixed(2) ?? 'N/A'}` : '',
        signal: latestBB && closes.length > 0 ? (closes[closes.length - 1] > (latestBB.upper ?? 0) ? 'bearish' : closes[closes.length - 1] < (latestBB.lower ?? 0) ? 'bullish' : 'neutral') : 'neutral',
        description: 'Bollinger Bands',
        education: 'Bands show volatility.',
        actionableAdvice: latestBB && closes.length > 0 ? getIndicatorAdvice('Bollinger Bands', closes[closes.length - 1], (closes[closes.length - 1] > (latestBB.upper ?? 0) ? 'bearish' : closes[closes.length - 1] < (latestBB.lower ?? 0) ? 'bullish' : 'neutral')) : ''
      },
      {
        name: 'Average Daily Return',
        value: avgReturn !== 'N/A' ? `${avgReturn}%` : 'N/A',
        signal: avgReturn !== 'N/A' ? (parseFloat(avgReturn) > 0.1 ? 'bullish' : parseFloat(avgReturn) < -0.1 ? 'bearish' : 'neutral') : 'neutral',
        description: avgReturn !== 'N/A' ? `Average daily return is ${avgReturn}%.` : 'Not enough data.',
        education: 'Average daily return shows the mean percentage change per day over the selected period.',
        actionableAdvice: avgReturn !== 'N/A'
          ? (parseFloat(avgReturn) > 0.1
              ? 'Strong positive returns. Consider entering or holding.'
              : parseFloat(avgReturn) < -0.1
              ? 'Strong negative returns. Consider reducing exposure.'
              : 'Neutral returns. Wait for trend to develop.')
          : 'Data not available.'
      },
      {
        name: 'Volatility',
        value: volatility !== 'N/A' ? `${volatility}%` : 'N/A',
        signal: volatility !== 'N/A' ? (parseFloat(volatility) > 3.5 ? 'bearish' : parseFloat(volatility) < 1 ? 'bullish' : 'neutral') : 'neutral',
        description: volatility !== 'N/A' ? `Volatility (std dev of daily returns) is ${volatility}%.` : 'Not enough data.',
        education: 'Volatility measures the standard deviation of daily returns. Higher volatility means more risk.',
        actionableAdvice: volatility !== 'N/A'
          ? (parseFloat(volatility) > 3.5
              ? 'High volatility. Consider reducing position size to 50-70% of normal or waiting for stabilization.'
              : parseFloat(volatility) < 1
              ? 'Low volatility. Consider waiting for a breakout.'
              : 'Moderate volatility. Adjust position size accordingly.')
          : 'Data not available.'
      }
    ];

    // Data-driven confidence and summary
    const bullishSignals = indicators.filter((i: { signal: string }) => i.signal === 'bullish').length;
    const bearishSignals = indicators.filter((i: { signal: string }) => i.signal === 'bearish').length;
    let confidenceLevel = 'medium';
    if (bullishSignals >= 2 && trend === 'uptrend' && volumeConfirming) confidenceLevel = 'high';
    else if (bearishSignals >= 2 && trend === 'downtrend') confidenceLevel = 'low';
    else confidenceLevel = 'medium';

    let setupType = 'bullish_breakout';
    if (trend === 'downtrend' && bearishSignals >= 2) setupType = 'trend_continuation';
    else if (trend === 'sideways') setupType = 'support_bounce';

    let summary = '';
    const calculatedPositionSize = (() => {
      const riskPerTrade = horizon === 'swing' ? 2 : horizon === 'positional' ? 1.5 : 1;
      const stopLossDistance = Math.abs(parseFloat(latest.close) - stopLoss.price);
      const riskPerShare = stopLossDistance / parseFloat(latest.close) * 100;
      const calculatedSize = Math.min(riskPerTrade / (riskPerShare || 1), 10);
      const confidenceMultiplier = confidenceLevel === 'high' ? 1.2 : confidenceLevel === 'low' ? 0.6 : 1;
      const volatilityAdjustment = atr / parseFloat(latest.close) > 0.03 ? 0.7 : 1;
      return Math.round(Math.max(0.5, calculatedSize * confidenceMultiplier * volatilityAdjustment) * 10) / 10;
    })();
    
    if (confidenceLevel === 'high') {
      summary = `Strong alignment of trend, volume, and indicators. Consider ${calculatedPositionSize}% position size with proper risk management.`;
    } else if (confidenceLevel === 'medium') {
      summary = `Some signals align, but wait for confirmation or use ${Math.max(0.5, calculatedPositionSize * 0.7)}% position size.`;
    } else {
      summary = `Signals are mixed or weak. Avoid new entries or use minimal ${Math.max(0.5, calculatedPositionSize * 0.5)}% size.`;
    }
    // Use USD formatting for all price values in summary
    const { formatNumber } = await import('./utils');
    // Remove entry/stop/targets from summary for market outlook
    // summary += ` Current trend: ${trend}. ATR: ${atr.toFixed(2)}. Entry zone: ${formatNumber(entryZone.low)} - ${formatNumber(entryZone.high)}. Stop loss: ${formatNumber(stopLoss.price)}. Targets: ${targets.map(t => formatNumber(t.price)).join(', ')}.`;
    summary += ` Current trend: ${trend}. ATR: ${atr.toFixed(2)}.`;

    // --- END: Build full TradePlan object ---
    const tradePlan = {
      symbol,
      companyName: tdJson.meta?.name || symbol,
      currentPrice: parseFloat(latest.close),
      direction: bullishSignals > bearishSignals ? 'bullish' : bearishSignals > bullishSignals ? 'bearish' : 'neutral',
      timeHorizon: horizon,
      confidenceLevel,
      setupType,
      riskManagement: {
        probabilityScore: 70, // Placeholder, replace with real calculation if available
        riskRewardRatio: actualRiskRewardRatio, // Now using actual calculated ratio
        suggestedPositionSize: (() => {
          // CORRECT: Risk management - never risk more than 0.5% of portfolio per trade
          const maxPortfolioRisk = 0.5; // Always 0.5% max risk regardless of timeframe
          const stopLossDistance = Math.abs(parseFloat(latest.close) - stopLoss.price);
          const riskPerShare = stopLossDistance / parseFloat(latest.close) * 100; // Risk per share as %
          
          // Calculate position size: (Max Portfolio Risk %) / (Risk per Share %) = Position allocation ratio
          // Then convert ratio to percentage by multiplying by 100
          const calculatedSizeRatio = maxPortfolioRisk / Math.max(riskPerShare, 0.1); // Prevent division by zero
          const calculatedSize = Math.min(calculatedSizeRatio * 100, 25); // Convert to percentage and cap at 25%
          
          console.log('Backend Position Size Debug:', {
            stopLossDistance,
            riskPerShare: riskPerShare.toFixed(2) + '%',
            calculatedSize: calculatedSize.toFixed(1) + '%'
          });
          
          // Adjust based on confidence and volatility
          const confidenceMultiplier = confidenceLevel === 'high' ? 1.2 : confidenceLevel === 'low' ? 0.6 : 1;
          const volatilityAdjustment = atr / parseFloat(latest.close) > 0.03 ? 0.7 : 1; // Reduce size for high volatility
          
          const finalResult = Math.round(Math.min(calculatedSize * confidenceMultiplier * volatilityAdjustment, 25) * 10) / 10;
          
          console.log('Backend Final Position Size:', finalResult + '% of portfolio');
          
          return finalResult;
        })(),
        entryZone,
        initialStopLoss: stopLoss,
        targets,
        trailingStops: [], // Add logic if needed
        volumeConfirmation: volumeConfirming,
        patternReliability: 80 // Placeholder
      },
      summary,
      priceHistory,
      indicators,
      metrics: {
        trend,
        volumeStatus,
        volumeConfirming,
        averageVolume: volumes.length > 0 ? (volumes.reduce((a: number, b: number) => a + b, 0) / volumes.length) : 0,
        currentVolume: volumes.length > 0 ? volumes[volumes.length - 1] : 0,
        breakoutStrength: 0, // Placeholder
        hasRecentEarnings: false, // Placeholder
        listingAge: 0, // Placeholder
        marketCap: tdJson.meta?.market_cap || 0,
        peRatio: 0, // Placeholder
        industry: tdJson.meta?.industry || '',
        isInfantIndustry: false, // Placeholder
        hasCatalyst: false, // Placeholder
      },
      keyLevels: [], // Add logic if needed
      atr,
      exchange: tdJson?.meta?.exchange,
      chartData: { annotations: { entry: [], stop: [], targets: [], trailingStops: [] }, indicators: [] }
    };
    setCachedStockData(symbol, tradePlan);
    return tradePlan;
  } catch (error) {
    if (retries > 0) {
      await new Promise(res => setTimeout(res, 1500));
      return getStockData(symbol, retries - 1);
    }
    console.error('Error fetching stock data:', error, 'for symbol:', symbol);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch stock data');
  }
}

function calculateSimpleTechnicalScore(quoteData: any): number {
  let score = 50; // Base score

  // Factor 1: Daily performance (up to ±15 points)
  const dailyChangePercent = quoteData.dp || 0;
  score += Math.min(Math.max(dailyChangePercent * 3, -15), 15);

  // Factor 2: Current price vs previous close (up to ±15 points)
  const previousClose = quoteData.pc || quoteData.c;
  const priceVsPrevClose = ((quoteData.c - previousClose) / previousClose * 100);
  score += Math.min(Math.max(priceVsPrevClose * 3, -15), 15);

  // Factor 3: Position within day's range (up to ±20 points)
  const dayRange = quoteData.h - quoteData.l;
  if (dayRange > 0) {
    const positionInRange = (quoteData.c - quoteData.l) / dayRange;
    score += (positionInRange - 0.5) * 40;
  }

  // Ensure score stays within 0-100 range
  return Math.max(0, Math.min(100, score));
}

function getIndicatorAdvice(name: string, value: any, signal: string) {
  if (name === 'RSI (14)') {
    if (value > 70) return 'Overbought. Consider taking profits or waiting for pullback.';
    if (value < 30) return 'Oversold. Look for potential buying opportunities.';
    if (value > 60) return 'Bullish momentum. Consider entering on pullbacks.';
    if (value < 40) return 'Bearish momentum. Consider reducing exposure.';
    return 'Neutral. Wait for clearer signals.';
  }
  if (name === 'MACD') {
    if (value > 0) return 'Bullish momentum. Consider entering on pullbacks.';
    if (value < 0) return 'Bearish momentum. Consider reducing exposure.';
    return 'Neutral. Wait for clearer signals.';
  }
  if (name === 'Bollinger Bands') {
    if (signal === 'bullish') return 'Price near lower band. Look for potential buying opportunities.';
    if (signal === 'bearish') return 'Price near upper band. Consider taking partial profits.';
    return 'Price within bands. Wait for breakout or breakdown.';
  }
  if (name === 'Average Daily Return') {
    if (value !== 'N/A') {
      const numericValue = parseFloat(value);
      if (numericValue > 0.1) return 'Strong positive returns. Consider entering or holding.';
      if (numericValue < -0.1) return 'Strong negative returns. Consider reducing exposure.';
      return 'Neutral returns. Wait for trend to develop.';
    }
  }
  if (name === 'Volatility') {
    if (value !== 'N/A') {
      const numericValue = parseFloat(value);
      if (numericValue > 3.5) return 'High volatility. Consider reducing position size to 50-70% of normal or waiting for stabilization.';
      if (numericValue < 1) return 'Low volatility. Consider waiting for a breakout.';
      return 'Moderate volatility. Adjust position size accordingly.';
    }
  }
  return '';
}

// Swing low detection and stop loss calculation functions
function calculateSwingLow(
  prices: { open: number; high: number; low: number; close: number }[],
  leftCandles: number = 15,
  rightCandles: number = 15
): number | null {
  if (prices.length < leftCandles + rightCandles + 1) {
    return null;
  }

  let swingLow = null;
  let swingLowPrice = Infinity;

  // Start from leftCandles and go until length - rightCandles
  for (let i = leftCandles; i < prices.length - rightCandles; i++) {
    const currentLow = prices[i].low;
    let isSwingLow = true;

    // Check left candles
    for (let j = i - leftCandles; j < i; j++) {
      if (prices[j].low <= currentLow) {
        isSwingLow = false;
        break;
      }
    }

    if (!isSwingLow) continue;

    // Check right candles
    for (let j = i + 1; j <= i + rightCandles; j++) {
      if (prices[j].low <= currentLow) {
        isSwingLow = false;
        break;
      }
    }

    // If this is a swing low and it's the most recent valid one, use it
    if (isSwingLow && currentLow < swingLowPrice) {
      swingLow = currentLow;
      swingLowPrice = currentLow;
    }
  }

  return swingLow;
}

async function fetchTimeframeData(
  symbol: string,
  timeframe: 'swing' | 'positional' | 'longterm'
): Promise<{ open: number; high: number; low: number; close: number }[]> {
  try {
    // Always use daily data as base for consistency, but fetch enough history for different lookback periods
    const outputSizes = {
      swing: 30,      // 30 days for recent swing lows
      positional: 60, // 60 days for medium-term swing lows
      longterm: 120   // 120 days for major swing lows
    };

    const outputsize = outputSizes[timeframe];

    // Use the same API key rotation as the main function
    const apiKey = getNextTwelveDataApiKey();
    const response = await fetch(
      `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=${outputsize}&apikey=${apiKey}`
    );

    if (!response.ok) {
      console.warn(`Failed to fetch daily data for ${timeframe} swing low calculation`);
      return [];
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      console.warn(`API error fetching ${timeframe} data:`, data.message);
      return [];
    }

    return data.values?.map((item: any) => ({
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close)
    })) || [];
  } catch (error) {
    console.warn(`Error fetching ${timeframe} data:`, error);
    return [];
  }
}

async function calculateEnhancedStopLoss(
  symbol: string,
  currentPrice: number,
  atr: number,
  horizon: string,
  setupType: string = 'bullish_breakout'
): Promise<any> {
  try {
    // Step 1: Try swing low calculation
    const swingLowResult = await calculateSwingLowStopLoss(symbol, currentPrice, atr, horizon, setupType);
    
    // Check if swing low risk is acceptable
    const swingLowRisk = ((currentPrice - swingLowResult.price) / currentPrice) * 100;
    const maxRisk = horizon === 'swing' ? 8 : horizon === 'positional' ? 15 : 20;
    
    if (swingLowRisk <= maxRisk && swingLowResult.method === 'swing_low_pivot') {
      console.log(`✅ Using swing low stop loss: $${swingLowResult.price.toFixed(2)} (${swingLowRisk.toFixed(2)}% risk)`);
      return swingLowResult;
    }
    
    // Step 2: Try ATR-based calculation if swing low too risky
    console.log(`⚠️ Swing low risk ${swingLowRisk.toFixed(2)}% > ${maxRisk}%, trying ATR fallback`);
    const atrResult = getATRBasedStopLoss(currentPrice, atr, horizon, setupType);
    const atrRisk = ((currentPrice - atrResult.price) / currentPrice) * 100;
    
    if (atrRisk <= maxRisk) {
      console.log(`✅ Using ATR stop loss: $${atrResult.price.toFixed(2)} (${atrRisk.toFixed(2)}% risk)`);
      return atrResult;
    }
    
    // Step 3: If both are too risky, proceed with swing low anyway (as requested)
    console.log(`⚠️ Both swing low and ATR exceed risk limits, proceeding with swing low`);
    return {
      ...swingLowResult,
      description: `${swingLowResult.description} (high risk accepted)`,
      riskWarning: true
    };
    
  } catch (error) {
    console.error('Error in enhanced stop loss calculation:', error);
    return getATRBasedStopLoss(currentPrice, atr, horizon, setupType);
  }
}

async function calculateSwingLowStopLoss(
  symbol: string, 
  currentPrice: number, 
  atr: number, 
  horizon: string,
  setupType: string
): Promise<any> {
  try {
    // Fetch daily data for consistent swing low detection
    const timeframeData = await fetchTimeframeData(symbol, horizon as 'swing' | 'positional' | 'longterm');
    
    if (timeframeData.length === 0) {
      console.warn('No timeframe data available, falling back to ATR-based stop loss');
      return getATRBasedStopLoss(currentPrice, atr, horizon, setupType);
    }

    // Use different lookback periods based on timeframe for progressive risk tolerance
    const lookbackPeriods = {
      swing: { left: 5, right: 5 },     // Recent swing lows for quick exits
      positional: { left: 10, right: 10 }, // Medium-term swing lows
      longterm: { left: 20, right: 20 }    // Major swing lows for longer holds
    };

    const periods = lookbackPeriods[horizon as keyof typeof lookbackPeriods] || lookbackPeriods.swing;
    const swingLowPrice = calculateSwingLow(timeframeData, periods.left, periods.right);
    
    if (swingLowPrice === null) {
      console.warn('No swing low found, falling back to ATR-based stop loss');
      return getATRBasedStopLoss(currentPrice, atr, horizon, setupType);
    }

    // Progressive risk parameters ensuring longer timeframes have wider stops
    const riskParams = {
      swing: { buffer: 0.005, maxRisk: 0.08, minDistance: 0.02 },     // 0.5% buffer, 8% max risk, 2% min distance
      positional: { buffer: 0.015, maxRisk: 0.15, minDistance: 0.05 }, // 1.5% buffer, 15% max risk, 5% min distance  
      longterm: { buffer: 0.025, maxRisk: 0.25, minDistance: 0.08 }    // 2.5% buffer, 25% max risk, 8% min distance
    };

    const params = riskParams[horizon as keyof typeof riskParams] || riskParams.swing;
    
    // Apply buffer below swing low
    let finalStopLoss = swingLowPrice * (1 - params.buffer);
    
    // Ensure minimum distance for timeframe (critical for proper risk hierarchy)
    const minStopLossDistance = currentPrice * params.minDistance;
    const currentDistance = currentPrice - finalStopLoss;
    
    if (currentDistance < minStopLossDistance) {
      console.log(`Enforcing minimum ${(params.minDistance * 100).toFixed(1)}% distance for ${horizon} timeframe`);
      finalStopLoss = currentPrice - minStopLossDistance;
    }
    
    // Check maximum risk tolerance
    const maxStopLossDistance = currentPrice * params.maxRisk;
    const stopLossDistance = currentPrice - finalStopLoss;
    
    if (stopLossDistance > maxStopLossDistance) {
      console.warn(`Swing low exceeds ${(params.maxRisk * 100).toFixed(1)}% max risk for ${horizon}, using max distance`);
      finalStopLoss = currentPrice - maxStopLossDistance;
    }

    return {
      price: finalStopLoss,
      type: 'fixed' as const,
      description: `Stop loss below swing low (${horizon}, ${(params.buffer * 100).toFixed(1)}% buffer)`,
      method: 'swing_low_pivot',
      swingLowPrice: swingLowPrice,
      bufferPercentage: params.buffer,
      enforced: currentDistance < minStopLossDistance ? 'minimum_distance' : stopLossDistance > maxStopLossDistance ? 'maximum_risk' : 'swing_low'
    };

  } catch (error) {
    console.error('Error calculating swing low stop loss:', error);
    return getATRBasedStopLoss(currentPrice, atr, horizon, setupType);
  }
}

function getATRBasedStopLoss(currentPrice: number, atr: number, horizon: string, setupType: string) {
  const atrMultiplier = horizon === 'swing' ? 1.5 : horizon === 'positional' ? 2 : 2.5;
  
  return {
    price: currentPrice - (atr * atrMultiplier),
    type: 'fixed' as const,
    description: `ATR-based stop loss (${atrMultiplier}x ATR)`,
    atrMultiple: atrMultiplier,
    method: 'atr_fallback'
  };
}