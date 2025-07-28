"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { TradingRecommendation } from '@/components/trade-plan/TradingRecommendation';
import { TechnicalAnalysis } from '@/components/trade-plan/TechnicalAnalysis';
import { ExecutiveSummary } from '@/components/trade-plan/ExecutiveSummary';
import { TradingChart } from '@/components/trade-plan/TradingChart';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Share2 } from 'lucide-react';
import { TradePlanHeader } from '@/components/trade-plan/TradePlanHeader';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';
import { StructuredData } from '@/components/seo/StructuredData';

export const dynamic = "force-dynamic";

function TradePlanPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const symbol = searchParams.get('symbol') || 'AAPL';
  const initialHorizon = searchParams.get('horizon') || 'swing';

  const [horizon, setHorizon] = useState<string>(initialHorizon);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tradePlan, setTradePlan] = useState<any | null>(null);
  const [indicators, setIndicators] = useState<any[]>([]);
  const [indicatorsLoading, setIndicatorsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);
  const [usageInfo, setUsageInfo] = useState<{ request_count: number; total_requests: number; date: string } | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'pro' | 'premium'>('free');
  const [showSignIn, setShowSignIn] = useState(false);

  // Handler for timeframe toggle
  const handleHorizonChange = (newHorizon: string) => {
    setHorizon(newHorizon);
    // Update the URL for shareability
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set('horizon', newHorizon);
    router.replace(`?${params.toString()}`);
  };

  // Calculate trend type based on price history
  const calculateTrend = (prices: number[] = []): 'uptrend' | 'downtrend' | 'sideways' => {
    if (!Array.isArray(prices) || prices.length === 0) return 'sideways';
    const periods = 20; // Look at last 20 periods
    const recentPrices = prices.slice(-periods);
    const priceChanges = recentPrices.map((price, i) => 
      i > 0 ? price - recentPrices[i - 1] : 0
    ).slice(1);

    const positiveChanges = priceChanges.filter(change => change > 0).length;
    const negativeChanges = priceChanges.filter(change => change < 0).length;

    if (positiveChanges > negativeChanges * 1.5) return 'uptrend';
    if (negativeChanges > positiveChanges * 1.5) return 'downtrend';
    return 'sideways';
  };

  // Calculate if there's a volume spike
  const hasVolumeSpike = (volumes: number[]): boolean => {
    const recentVolumes = volumes.slice(-5);
    const avgVolume = volumes.slice(-20, -5).reduce((a, b) => a + b, 0) / 15;
    return recentVolumes.some(vol => vol > avgVolume * 1.5);
  };

  // Calculate if there's a recent trend change
  const hasRecentTrendChange = (prices: number[]): boolean => {
    const shortTerm = calculateTrend(prices.slice(-10));
    const longTerm = calculateTrend(prices.slice(-30, -10));
    return shortTerm !== longTerm;
  };

  // Calculate ATR (Average True Range)
  const calculateATR = (prices: number[], period: number = 14): number => {
    const trueRanges = prices.map((price, i) => {
      if (i === 0) return 0;
      const high = Math.max(price, prices[i - 1]);
      const low = Math.min(price, prices[i - 1]);
      return high - low;
    });
    
    return trueRanges.slice(-period).reduce((sum, tr) => sum + tr, 0) / period;
  };

  // Find support and resistance levels
  const findSupportResistanceLevels = (prices: number[], period: number = 20): { support: number[], resistance: number[] } => {
    const levels = {
      support: [] as number[],
      resistance: [] as number[]
    };

    // Look for swing highs and lows
    for (let i = period; i < prices.length - period; i++) {
      const window = prices.slice(i - period, i + period);
      const current = prices[i];
      
      // Check for resistance
      if (current === Math.max(...window)) {
        levels.resistance.push(current);
      }
      // Check for support
      if (current === Math.min(...window)) {
        levels.support.push(current);
      }
    }

    // Remove duplicates and sort
    levels.support = Array.from(new Set(levels.support)).sort((a, b) => a - b);
    levels.resistance = Array.from(new Set(levels.resistance)).sort((a, b) => a - b);

    return levels;
  };

  // Detect trade setup type
  const detectTradeSetup = (
    prices: { open: number; high: number; low: number; close: number }[],
    volumes: number[],
    support: number[],
    resistance: number[],
    atr: number
  ): 'bullish_breakout' | 'support_bounce' | 'trend_continuation' => {
    const current = prices[prices.length - 1];
    const prev = prices[prices.length - 2];
    const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
    const currentVolume = volumes[volumes.length - 1];

    // Check for bullish breakout
    const nearestResistance = resistance.filter(r => r < current.close).pop();
    if (nearestResistance && 
        current.close > nearestResistance && 
        currentVolume > avgVolume * 1.5) {
      return 'bullish_breakout';
    }

    // Check for support bounce
    const nearestSupport = support.filter(s => s < current.close).pop();
    if (nearestSupport && 
        Math.abs(current.close - nearestSupport) < atr * 0.5 &&
        current.close > current.open &&
        currentVolume > avgVolume) {
      return 'support_bounce';
    }

    // Check for trend continuation
    const ema20 = calculateEMA(prices.map(p => p.close), 20);
    const ema50 = calculateEMA(prices.map(p => p.close), 50);
    const isInsideBar = current.high < prev.high && current.low > prev.low;
    
    if (ema20[ema20.length - 1] > ema50[ema50.length - 1] &&
        isInsideBar &&
        current.close > prev.close) {
      return 'trend_continuation';
    }

    return 'bullish_breakout'; // Default to breakout if no clear pattern
  };

  // Calculate EMA
  const calculateEMA = (prices: number[], period: number): number[] => {
    const k = 2 / (period + 1);
    const ema = [prices[0]];
    
    for (let i = 1; i < prices.length; i++) {
      ema.push(prices[i] * k + ema[i - 1] * (1 - k));
    }
    
    return ema;
  };

  // Calculate breakout strength
  const calculateBreakoutStrength = (
    prices: { open: number; high: number; low: number; close: number }[],
    volumes: number[],
    setupType: 'bullish_breakout' | 'support_bounce' | 'trend_continuation',
    atr: number
  ): number => {
    const current = prices[prices.length - 1];
    const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;
    const currentVolume = volumes[volumes.length - 1];
    
    let strength = 0;
    
    // Volume factor
    const volumeRatio = currentVolume / avgVolume;
    strength += Math.min(volumeRatio * 20, 40);
    
    // Price action factor
    const bodySize = Math.abs(current.close - current.open);
    const totalRange = current.high - current.low;
    const bodyRatio = bodySize / totalRange;
    strength += bodyRatio * 30;
    
    // Setup type factor
    switch (setupType) {
      case 'bullish_breakout':
        strength += 20;
        break;
      case 'support_bounce':
        strength += 15;
        break;
      case 'trend_continuation':
        strength += 10;
        break;
    }
    
    return Math.min(strength, 100);
  };

  // Generate technical indicators
  const generateIndicators = (trend: 'bullish' | 'bearish' | 'neutral'): any[] => {
    return [
      {
        name: 'Trend Direction',
        value: trend,
        signal: trend,
        description: `The stock shows ${trend} signals based on recent price action.`,
        education: 'Trend direction helps identify the overall market sentiment and potential future movement.'
      },
      {
        name: 'Volume Analysis',
        value: 'Volume Confirmation',
        signal: trend,
        description: 'Volume analysis confirms the trend direction.',
        education: 'Volume confirmation is crucial for validating price movements.'
      },
      {
        name: 'Momentum Strength',
        value: 'Momentum Analysis',
        signal: trend,
        description: 'Momentum indicators align with the trend direction.',
        education: 'Momentum helps identify the strength of the current trend.'
      }
    ];
  };

  // Calculate confidence level
  const calculateConfidenceLevel = (
    riskManagement: any,
    metrics: any
  ): 'high' | 'medium' | 'low' => {
    const score = riskManagement.probabilityScore;
    
    if (score >= 70 && 
        riskManagement.riskRewardRatio >= 2 &&
        metrics.volumeConfirmation &&
        metrics.breakoutStrength >= 70) {
      return 'high';
    }
    
    if (score >= 50 && 
        riskManagement.riskRewardRatio >= 1.5 &&
        (metrics.volumeConfirmation || metrics.breakoutStrength >= 50)) {
      return 'medium';
    }
    
    return 'low';
  };

  // Calculate swing lows with pivot detection
  const calculateSwingLow = (
    prices: { open: number; high: number; low: number; close: number }[],
    leftCandles: number = 15,
    rightCandles: number = 15
  ): number | null => {
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
  };

  // Enhanced swing low calculation with proper risk hierarchy
  const calculateEnhancedSwingLow = async (
    symbol: string,
    timeframe: 'swing' | 'positional' | 'longterm'
  ): Promise<number | null> => {
    try {
      // Always use daily data as the base for consistency
      const response = await fetch(`/api/swing-low-data?symbol=${symbol}&interval=1day&outputsize=100`);
      
      if (!response.ok) {
        console.warn(`Failed to fetch daily data for swing low calculation`);
        return null;
      }

      const data = await response.json();
      const dailyData = data.values || [];
      
      if (dailyData.length === 0) return null;

      // Calculate swing low on daily data with different lookback periods based on timeframe
      const lookbackPeriods = {
        swing: { left: 5, right: 5 },     // Shorter lookback for swing (recent swing lows)
        positional: { left: 10, right: 10 }, // Medium lookback for positional
        longterm: { left: 20, right: 20 }    // Longer lookback for long term (major swing lows)
      };

      const { left, right } = lookbackPeriods[timeframe];
      const swingLow = calculateSwingLow(dailyData, left, right);
      
      return swingLow;
    } catch (error) {
      console.warn(`Error in enhanced swing low calculation:`, error);
      return null;
    }
  };

  // Generate risk management data
  const generateRiskManagement = async (
    prices: { open: number; high: number; low: number; close: number }[],
    volumes: number[],
    metrics: any,
    atr: number,
    setupType: 'bullish_breakout' | 'support_bounce' | 'trend_continuation',
    horizon: 'swing' | 'positional' | 'longterm',
    symbol: string
  ): Promise<any> => {
    const current = prices[prices.length - 1];
    const trend = metrics.trend;
    const recentVolume = volumes.slice(-5);
    const avgVolume = volumes.slice(-20, -5).reduce((a, b) => a + b, 0) / 15;
    
    // Find support and resistance levels
    const { support, resistance } = findSupportResistanceLevels(prices.map(p => p.close));
    
    // Find nearest support and resistance
    const nearestSupport = support.filter(s => s < current.close).pop() || (current.close - (atr * 2));
    const nearestResistance = resistance.filter(r => r > current.close).shift() || (current.close + (atr * 2));
    
    // Calculate trend strength based on timeframe
    const trendStrength = (() => {
      const lookbackPeriod = horizon === 'swing' ? 10 : horizon === 'positional' ? 20 : 50;
      const recentPrices = prices.slice(-lookbackPeriod);
      const priceChanges = recentPrices.map((price, i) => 
        i > 0 ? price.close - recentPrices[i - 1].close : 0
      ).slice(1);
      
      const positiveChanges = priceChanges.filter(change => change > 0).length;
      return positiveChanges / priceChanges.length;
    })();

    // Entry zone based on setup type and timeframe
    const entryZone = (() => {
      const atrMultiplier = horizon === 'swing' ? 0.5 : horizon === 'positional' ? 0.75 : 1;
      switch (setupType) {
        case 'bullish_breakout':
          return {
            low: current.close,
            high: current.close + (atr * atrMultiplier),
            description: 'Enter on breakout confirmation with volume',
            momentum: 'strong' as const
          };
        case 'support_bounce':
          return {
            low: Math.max(current.close - (atr * atrMultiplier), nearestSupport),
            high: current.close,
            description: 'Enter on bounce from support with volume confirmation',
            momentum: 'moderate' as const
          };
        case 'trend_continuation':
          return {
            low: current.close - (atr * atrMultiplier),
            high: current.close + (atr * atrMultiplier),
            description: 'Enter on continuation with volume confirmation',
            momentum: 'moderate' as const
          };
      }
    })();

    // Enhanced swing low stop loss calculation with proper risk hierarchy
    const calculateSwingLowStopLoss = async (symbol: string): Promise<any> => {
      try {
        // Get swing low using enhanced calculation
        const swingLowPrice = await calculateEnhancedSwingLow(symbol, horizon as 'swing' | 'positional' | 'longterm');
        
        if (swingLowPrice === null) {
          console.warn('No swing low found, falling back to ATR-based stop loss');
          return getATRBasedStopLoss();
        }

        // Progressive buffer and risk tolerance based on timeframe
        const riskParams = {
          swing: { buffer: 0.005, maxRisk: 0.08, minDistance: 0.02 },     // 0.5% buffer, 8% max risk, 2% min distance
          positional: { buffer: 0.015, maxRisk: 0.15, minDistance: 0.05 }, // 1.5% buffer, 15% max risk, 5% min distance  
          longterm: { buffer: 0.025, maxRisk: 0.25, minDistance: 0.08 }    // 2.5% buffer, 25% max risk, 8% min distance
        };

        const params = riskParams[horizon as keyof typeof riskParams] || riskParams.swing;
        
        // Apply buffer below swing low
        let finalStopLoss = swingLowPrice * (1 - params.buffer);
        
        // Ensure minimum distance for timeframe (longer timeframes need wider stops)
        const minStopLossDistance = current.close * params.minDistance;
        const currentDistance = current.close - finalStopLoss;
        
        if (currentDistance < minStopLossDistance) {
          console.log(`Enforcing minimum ${(params.minDistance * 100).toFixed(1)}% distance for ${horizon} timeframe`);
          finalStopLoss = current.close - minStopLossDistance;
        }
        
        // Check if within maximum risk tolerance
        const maxStopLossDistance = current.close * params.maxRisk;
        const stopLossDistance = current.close - finalStopLoss;
        
        if (stopLossDistance > maxStopLossDistance) {
          console.warn(`Swing low exceeds ${(params.maxRisk * 100).toFixed(1)}% max risk for ${horizon}, using max distance`);
          finalStopLoss = current.close - maxStopLossDistance;
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
        return getATRBasedStopLoss();
      }
    };

    // Fallback ATR-based stop loss function
    const getATRBasedStopLoss = () => {
      const atrMultiplier = horizon === 'swing' ? 1.5 : horizon === 'positional' ? 2 : 2.5;
      switch (setupType) {
        case 'bullish_breakout':
          return {
            price: Math.max(current.close - (atr * atrMultiplier), nearestSupport),
            type: 'trailing_stop' as const,
            description: 'Stop loss below breakout level (ATR-based fallback)',
            atrMultiple: atrMultiplier,
            method: 'atr_fallback'
          };
        case 'support_bounce':
          return {
            price: nearestSupport - (atr * atrMultiplier),
            type: 'trailing_stop' as const,
            description: 'Stop loss below support level (ATR-based fallback)',
            atrMultiple: atrMultiplier,
            method: 'atr_fallback'
          };
        case 'trend_continuation':
          return {
            price: current.close - (atr * atrMultiplier),
            type: 'trailing_stop' as const,
            description: 'Stop loss below trend continuation (ATR-based fallback)',
            atrMultiple: atrMultiplier,
            method: 'atr_fallback'
          };
        default:
          return {
            price: current.close - (atr * atrMultiplier),
            type: 'fixed' as const,
            description: 'Default ATR-based stop loss',
            atrMultiple: atrMultiplier,
            method: 'atr_fallback'
          };
      }
    };

    // Enhanced stop loss logic with swing low priority and intelligent fallbacks
    const calculateEnhancedStopLoss = async (symbol: string): Promise<any> => {
      try {
        // Step 1: Try swing low calculation
        const swingLowResult = await calculateSwingLowStopLoss(symbol);
        
        // Check if swing low risk is acceptable
        const swingLowRisk = ((current.close - swingLowResult.price) / current.close) * 100;
        const maxRisk = horizon === 'swing' ? 8 : horizon === 'positional' ? 15 : 20;
        
        if (swingLowRisk <= maxRisk && swingLowResult.method === 'swing_low_pivot') {
          console.log(`✅ ${horizon.toUpperCase()}: Using swing low stop loss: $${swingLowResult.price.toFixed(2)} (${swingLowRisk.toFixed(2)}% risk) vs ${maxRisk}% max`);
          return swingLowResult;
        }
        
        // Step 2: Try ATR-based calculation if swing low too risky
        console.log(`⚠️ ${horizon.toUpperCase()}: Swing low risk ${swingLowRisk.toFixed(2)}% > ${maxRisk}%, trying ATR fallback`);
        const atrResult = getATRBasedStopLoss();
        const atrRisk = ((current.close - atrResult.price) / current.close) * 100;
        
        if (atrRisk <= maxRisk) {
          console.log(`✅ ${horizon.toUpperCase()}: Using ATR stop loss: $${atrResult.price.toFixed(2)} (${atrRisk.toFixed(2)}% risk) vs ${maxRisk}% max`);
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
        return getATRBasedStopLoss();
      }
    };

    // Calculate all three stop losses to ensure proper hierarchy
    const calculateAllStopLosses = async (symbol: string): Promise<{
      swing: any;
      positional: any;
      longterm: any;
      selected: any;
    }> => {
      const stopLosses: {
        swing: any;
        positional: any;
        longterm: any;
        selected: any;
      } = {
        swing: null,
        positional: null,
        longterm: null,
        selected: null
      };

      // Calculate stop loss for each timeframe
      for (const timeframe of ['swing', 'positional', 'longterm'] as const) {
        try {
          // Get swing low for this timeframe
          const swingLowPrice = await calculateEnhancedSwingLow(symbol, timeframe);
          
          // Risk parameters for this timeframe
          const riskParams = {
            swing: { buffer: 0.005, maxRisk: 0.08, minDistance: 0.02 },
            positional: { buffer: 0.015, maxRisk: 0.15, minDistance: 0.05 },
            longterm: { buffer: 0.025, maxRisk: 0.25, minDistance: 0.08 }
          };
          
          const params = riskParams[timeframe];
          let stopLossPrice;
          let method = 'swing_low_pivot';
          
          if (swingLowPrice !== null) {
            // Apply buffer below swing low
            let finalStopLoss = swingLowPrice * (1 - params.buffer);
            
            // Ensure minimum distance
            const minStopLossDistance = current.close * params.minDistance;
            const currentDistance = current.close - finalStopLoss;
            
            if (currentDistance < minStopLossDistance) {
              finalStopLoss = current.close - minStopLossDistance;
              method = 'minimum_distance_enforced';
            }
            
            // Check maximum risk
            const maxStopLossDistance = current.close * params.maxRisk;
            const stopLossDistance = current.close - finalStopLoss;
            
            if (stopLossDistance > maxStopLossDistance) {
              finalStopLoss = current.close - maxStopLossDistance;
              method = 'maximum_risk_enforced';
            }
            
            stopLossPrice = finalStopLoss;
          } else {
            // Fallback to ATR
            const atrMultiplier = timeframe === 'swing' ? 1.5 : timeframe === 'positional' ? 2 : 2.5;
            stopLossPrice = current.close - (atr * atrMultiplier);
            method = 'atr_fallback';
          }
          
          const riskPercent = ((current.close - stopLossPrice) / current.close) * 100;
          
          stopLosses[timeframe] = {
            price: stopLossPrice,
            type: 'fixed' as const,
            timeframe,
            method,
            riskPercent,
            description: `${timeframe} stop loss (${method}, ${riskPercent.toFixed(2)}% risk)`
          };
          
        } catch (error) {
          console.error(`Error calculating ${timeframe} stop loss:`, error);
          // Fallback to ATR
          const atrMultiplier = timeframe === 'swing' ? 1.5 : timeframe === 'positional' ? 2 : 2.5;
          const stopLossPrice = current.close - (atr * atrMultiplier);
          const riskPercent = ((current.close - stopLossPrice) / current.close) * 100;
          
          stopLosses[timeframe] = {
            price: stopLossPrice,
            type: 'fixed' as const,
            timeframe,
            method: 'atr_fallback_error',
            riskPercent,
            description: `${timeframe} stop loss (ATR fallback due to error)`
          };
        }
      }
      
      // Verify hierarchy: swing >= positional >= longterm (tighter to wider stops)
      const swingStop = stopLosses.swing.price;
      const positionalStop = stopLosses.positional.price;
      const longtermStop = stopLosses.longterm.price;
      
      // Log the hierarchy for debugging
      console.log('Stop Loss Hierarchy Check:', {
        swing: `$${swingStop.toFixed(2)} (${stopLosses.swing.riskPercent.toFixed(2)}%)`,
        positional: `$${positionalStop.toFixed(2)} (${stopLosses.positional.riskPercent.toFixed(2)}%)`,
        longterm: `$${longtermStop.toFixed(2)} (${stopLosses.longterm.riskPercent.toFixed(2)}%)`
      });
      
      // Enforce hierarchy if needed
      if (swingStop < positionalStop) {
        console.warn('⚠️ Hierarchy fix: Swing stop below positional, adjusting...');
        stopLosses.swing.price = positionalStop;
        stopLosses.swing.method = 'hierarchy_enforced';
        stopLosses.swing.riskPercent = ((current.close - positionalStop) / current.close) * 100;
      }
      
      if (positionalStop < longtermStop) {
        console.warn('⚠️ Hierarchy fix: Positional stop below longterm, adjusting...');
        stopLosses.positional.price = longtermStop;
        stopLosses.positional.method = 'hierarchy_enforced';
        stopLosses.positional.riskPercent = ((current.close - longtermStop) / current.close) * 100;
      }
      
      // Re-check swing after positional adjustment
      if (stopLosses.swing.price < stopLosses.positional.price) {
        stopLosses.swing.price = stopLosses.positional.price;
        stopLosses.swing.method = 'hierarchy_enforced';
        stopLosses.swing.riskPercent = ((current.close - stopLosses.positional.price) / current.close) * 100;
      }
      
      // Select the appropriate stop loss for current timeframe
      stopLosses.selected = stopLosses[horizon as keyof typeof stopLosses];
      
      return stopLosses;
    };

    // Use the new comprehensive stop loss calculation
    const allStopLosses = await calculateAllStopLosses(symbol);
    const initialStopLoss: any = allStopLosses.selected;

    // Targets based on setup type, risk:reward, and timeframe
    const baseMultipliers = horizon === 'swing' ? [1.5, 2.5, 4] :
                          horizon === 'positional' ? [2, 3, 5] :
                          [2.5, 4, 6];
    const riskPerShare = Math.abs(current.close - initialStopLoss.price);
    const targets = [
      {
        price: current.close + (riskPerShare * baseMultipliers[0]),
        type: 'target',
        probability: 70,
        description: `First target at ${baseMultipliers[0]}x risk`,
        riskRewardRatio: baseMultipliers[0]
      },
      {
        price: current.close + (riskPerShare * baseMultipliers[1]),
        type: 'target',
        probability: 40,
        description: `Second target at ${baseMultipliers[1]}x risk`,
        riskRewardRatio: baseMultipliers[1]
      },
      {
        price: current.close + (riskPerShare * baseMultipliers[2]),
        type: 'target',
        probability: 20,
        description: `Third target at ${baseMultipliers[2]}x risk`,
        riskRewardRatio: baseMultipliers[2]
      }
    ];
    // Trailing stops based on setup type and timeframe
    const atrMultipliers = horizon === 'swing' ? [1.5, 1] :
                          horizon === 'positional' ? [2, 1.5] :
                          [2.5, 2];
    const trailingStops = [
      {
        price: current.close - (atr * atrMultipliers[0]),
        type: 'trailing_stop' as const,
        description: `First trailing stop at ${atrMultipliers[0]} ATR`,
        atrMultiple: atrMultipliers[0],
        pivotType: 'swing_low' as const
      },
      {
        price: current.close - (atr * atrMultipliers[1]),
        type: 'trailing_stop' as const,
        description: `Second trailing stop at ${atrMultipliers[1]} ATR`,
        atrMultiple: atrMultipliers[1],
        pivotType: 'moving_average' as const
      }
    ];
    // Calculate risk per share (current price - stop loss)
    const entryPrice = current.close; // Use current price as entry (consistent with target calculation)
    const stopLossPrice = initialStopLoss.price;
    // Find the target with the highest probability
    const highestProbTarget = targets.reduce((max, t) => t.probability > max.probability ? t : max, targets[0]);
    const risk = Math.abs(entryPrice - stopLossPrice);
    const reward = Math.abs(highestProbTarget.price - entryPrice);
    const riskRewardRatio = risk > 0 ? parseFloat((reward / risk).toFixed(2)) : 0;

    // Calculate probability score with timeframe adjustments
    const probabilityScore = (() => {
      let score = 0;
      
      // Setup type factor with timeframe adjustment
      const setupTypeMultiplier = horizon === 'swing' ? 1.2 : horizon === 'positional' ? 1 : 0.8;
      switch (setupType) {
        case 'bullish_breakout':
          score += 25 * setupTypeMultiplier;
          break;
        case 'support_bounce':
          score += 20 * setupTypeMultiplier;
          break;
        case 'trend_continuation':
          score += 15 * setupTypeMultiplier;
          break;
      }
      
      // Volume confirmation with timeframe adjustment
      const volumeMultiplier = horizon === 'swing' ? 1.2 : horizon === 'positional' ? 1 : 0.8;
      if (metrics.volumeConfirmation) score += 20 * volumeMultiplier;
      
      // Trend alignment with timeframe adjustment
      const trendMultiplier = horizon === 'swing' ? 1 : horizon === 'positional' ? 1.2 : 1.5;
      if (trend === 'uptrend') score += 15 * trendMultiplier;
      if (metrics.above200SMA) score += 10 * trendMultiplier;
      
      // Price action with timeframe adjustment
      const priceActionMultiplier = horizon === 'swing' ? 1 : horizon === 'positional' ? 1.2 : 1.5;
      if (metrics.percentFrom52WeekLow >= 50) score += 10 * priceActionMultiplier;
      if (current.close > nearestSupport + atr) score += 10 * priceActionMultiplier;
      
      // Risk:Reward with timeframe adjustment
      const riskRewardMultiplier = horizon === 'swing' ? 1 : horizon === 'positional' ? 1.2 : 1.5;
      if (riskPerShare * 2.5 <= Math.abs(current.close - nearestResistance)) score += 10 * riskRewardMultiplier;
      
      return Math.min(score, 100);
    })();

    const breakoutStrength = calculateBreakoutStrength(prices, volumes, setupType, atr);
    const trendAlignment = trend === 'uptrend' ? 100 : trend === 'sideways' ? 50 : 0;

    return {
      initialStopLoss: {
        price: initialStopLoss.price,
        type: initialStopLoss.type === 'trailing' ? 'trailing' : 'fixed',
      },
      allStopLosses: {
        swing: allStopLosses.swing,
        positional: allStopLosses.positional,
        longterm: allStopLosses.longterm
      },
      trailingStops: trailingStops.map(stop => ({
        price: stop.price,
        trigger: stop.atrMultiple ?? 1,
        type: 'trailing_stop' as const,
      })),
      targets: targets.map(target => ({
        price: target.price,
        probability: target.probability ?? 50,
        riskRewardRatio: target.riskRewardRatio ?? 2,
        type: 'target' as const,
      })),
      entryZone,
      riskRewardRatio, // Use calculated value
      probabilityScore,
      volumeConfirmation: recentVolume.some(vol => vol > avgVolume * 1.5),
      patternReliability: probabilityScore,
      suggestedPositionSize: (() => {
        // CORRECT: Risk management - never risk more than 0.5% of portfolio per trade
        const maxPortfolioRisk = 0.5; // Always 0.5% max risk regardless of timeframe
        const stopLossDistance = Math.abs(current.close - initialStopLoss.price);
        const riskPerShare = (stopLossDistance / current.close) * 100; // Risk per share as %
        
        // Calculate position size: (Max Portfolio Risk %) / (Risk per Share %) = Position allocation ratio
        // Then convert ratio to percentage by multiplying by 100
        const calculatedSizeRatio = maxPortfolioRisk / Math.max(riskPerShare, 0.00001); // Prevent division by zero
        const calculatedSize = calculatedSizeRatio * 100; // Convert to percentage: 0.25 → 25%
        
        // Debug logging
        console.log('Position Size Debug:', {
          stopLossDistance,
          riskPerShare: riskPerShare.toFixed(2) + '%',
          calculatedSizeRatio,
          calculatedSize: calculatedSize.toFixed(1) + '%'
        });
        
        const finalCalculatedSize = Math.min(calculatedSize, 25); // Cap at 25% allocation
        
        // Adjust based on confidence and setup quality
        const confidenceMultiplier = probabilityScore > 80 ? 1.2 : probabilityScore > 60 ? 1 : 0.8;
        const volatilityAdjustment = atr / current.close > 0.03 ? 0.7 : 1; // Reduce size for high volatility
        const volumeAdjustment = recentVolume.some(vol => vol > avgVolume * 1.5) ? 1.1 : 0.9;
        
        const finalSize = finalCalculatedSize * confidenceMultiplier * volatilityAdjustment * volumeAdjustment;
        
        const result = Math.round(Math.min(finalSize, 25) * 10) / 10; // Cap at 25% max
        
        // Debug final result
        console.log('Final Position Size:', result + '% of portfolio');
        
        return result;
      })(),
    };
  };

  // Add new timeframe-specific analysis functions
  const analyzeSwingTimeframe = (
    prices: any[],
    volumes: number[],
    ema20: number[],
    rsi: number[]
  ): { signals: { bullish: number; bearish: number }; details: string[] } => {
    const signals = { bullish: 0, bearish: 0 };
    const details: string[] = [];
    const current = prices[prices.length - 1];
    const prev = prices[prices.length - 2];
    const currentRSI = rsi[rsi.length - 1];
    const prevRSI = rsi[rsi.length - 2];
    const currentEMA20 = ema20[ema20.length - 1];
    const prevEMA20 = ema20[ema20.length - 2];

    // RSI Analysis
    if (currentRSI > 55 && currentRSI > prevRSI) {
      signals.bullish++;
      details.push('RSI above 55 and rising');
    } else if (currentRSI < 45 && currentRSI < prevRSI) {
      signals.bearish++;
      details.push('RSI below 45 and falling');
    }

    // Trend Confirmation
    if (current.close > currentEMA20 && currentEMA20 > prevEMA20) {
      signals.bullish++;
      details.push('Price above rising 20 EMA');
    } else if (current.close < currentEMA20 && currentEMA20 < prevEMA20) {
      signals.bearish++;
      details.push('Price below falling 20 EMA');
    }

    // Volume Analysis
    const recentVolumes = volumes.slice(-5);
    const upDays = recentVolumes.filter((vol, i) => 
      i > 0 && prices[prices.length - i].close > prices[prices.length - i - 1].close
    ).length;
    const downDays = recentVolumes.filter((vol, i) => 
      i > 0 && prices[prices.length - i].close < prices[prices.length - i - 1].close
    ).length;

    if (upDays > downDays) {
      signals.bullish++;
      details.push('More up days than down days in recent volume');
    } else if (downDays > upDays) {
      signals.bearish++;
      details.push('More down days than up days in recent volume');
    }

    // Price Action
    const recentHigh = Math.max(...prices.slice(-10).map(p => p.high));
    const recentLow = Math.min(...prices.slice(-10).map(p => p.low));
    const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;

    if (current.close > recentHigh && current.volume > avgVolume * 1.5) {
      signals.bullish++;
      details.push('Breakout above recent high on high volume');
    } else if (current.close < recentLow && current.volume > avgVolume * 1.5) {
      signals.bearish++;
      details.push('Breakdown below recent low on high volume');
    }

    return { signals, details };
  };

  const analyzePositionalTimeframe = (
    prices: any[],
    volumes: number[],
    ema50: number[],
    ema200: number[],
    macd: { line: number[]; signal: number[]; histogram: number[] }
  ): { signals: { bullish: number; bearish: number }; details: string[] } => {
    const signals = { bullish: 0, bearish: 0 };
    const details: string[] = [];
    const current = prices[prices.length - 1];
    const currentEMA50 = ema50[ema50.length - 1];
    const prevEMA50 = ema50[ema50.length - 2];
    const currentEMA200 = ema200[ema200.length - 1];
    const currentMACD = macd.line[macd.line.length - 1];
    const prevMACD = macd.line[macd.line.length - 2];
    const currentSignal = macd.signal[macd.signal.length - 1];
    const prevSignal = macd.signal[macd.signal.length - 2];
    const currentHist = macd.histogram[macd.histogram.length - 1];
    const prevHist = macd.histogram[macd.histogram.length - 2];

    // Moving Averages
    if (current.close > currentEMA50 && currentEMA50 > currentEMA200) {
      signals.bullish++;
      details.push('Price above 50 DMA and 50 DMA above 200 DMA');
    } else if (current.close < currentEMA50 && currentEMA50 < currentEMA200) {
      signals.bearish++;
      details.push('Price below 50 DMA and 50 DMA below 200 DMA');
    }

    // MACD
    if (currentMACD > currentSignal && currentHist > prevHist) {
      signals.bullish++;
      details.push('MACD bullish crossover with rising histogram');
    } else if (currentMACD < currentSignal && currentHist < prevHist) {
      signals.bearish++;
      details.push('MACD bearish crossover with declining histogram');
    }

    // 52-Week Range
    const yearHigh = Math.max(...prices.slice(-252).map(p => p.high));
    const yearLow = Math.min(...prices.slice(-252).map(p => p.low));
    const range = yearHigh - yearLow;
    const position = (current.close - yearLow) / range;

    if (position > 0.8 && position < 0.9) {
      signals.bullish++;
      details.push('Price consolidating near 52-week high');
    } else if (position < 0.2) {
      signals.bearish++;
      details.push('Price near 52-week low');
    }

    // Bollinger Bands
    const bb = calculateBollingerBands(prices.map((p: any) => p.close));
    const currentBB = bb[bb.length - 1];
    const avgVolume = volumes.slice(-20).reduce((a, b) => a + b, 0) / 20;

    if (current.close > currentBB.upper && current.volume > avgVolume * 1.5) {
      signals.bullish++;
      details.push('Price breaking upper Bollinger Band with volume');
    } else if (current.close < currentBB.lower && current.volume > avgVolume) {
      signals.bearish++;
      details.push('Price at lower Bollinger Band with expansion');
    }

    return { signals, details };
  };

  const analyzeLongTermTimeframe = (
    prices: any[],
    weeklyPrices: any[],
    indexPrices: any[]
  ): { signals: { bullish: number; bearish: number }; details: string[] } => {
    const signals = { bullish: 0, bearish: 0 };
    const details: string[] = [];
    const current = prices[prices.length - 1];
    const weeklyEMA40 = calculateEMA(weeklyPrices.map(p => p.close), 40);
    const currentWeeklyEMA = weeklyEMA40[weeklyEMA40.length - 1];
    const prevWeeklyEMA = weeklyEMA40[weeklyEMA40.length - 2];

    // 200 WMA Analysis
    if (current.close > currentWeeklyEMA && currentWeeklyEMA > prevWeeklyEMA) {
      signals.bullish++;
      details.push('Price above rising 40-week EMA');
    } else if (current.close < currentWeeklyEMA && currentWeeklyEMA < prevWeeklyEMA) {
      signals.bearish++;
      details.push('Price below falling 40-week EMA');
    }

    // Stage Analysis
    const stage = analyzeStage(weeklyPrices);
    if (stage === 'stage2') {
      signals.bullish++;
      details.push('Stage 2 breakout from long base');
    } else if (stage === 'stage4') {
      signals.bearish++;
      details.push('Stage 4 decline');
    }

    // Relative Strength
    const rs = calculateRelativeStrength(prices, indexPrices);
    if (rs > 0) {
      signals.bullish++;
      details.push('Positive relative strength vs index');
    } else if (rs < 0) {
      signals.bearish++;
      details.push('Negative relative strength vs index');
    }

    // Trend Structure
    const trendStructure = analyzeTrendStructure(weeklyPrices);
    if (trendStructure === 'higher_highs_lows') {
      signals.bullish++;
      details.push('Series of higher highs and higher lows');
    } else if (trendStructure === 'lower_highs_lows') {
      signals.bearish++;
      details.push('Series of lower highs and lower lows');
    }

    return { signals, details };
  };

  // Helper functions
  const calculateBollingerBands = (prices: number[], period: number = 20, stdDev: number = 2) => {
    const sma = calculateSMA(prices, period);
    const bands = prices.map((_, i) => {
      if (i < period - 1) return { upper: 0, middle: 0, lower: 0 };
      const slice = prices.slice(i - period + 1, i + 1);
      const mean = sma[i];
      const squaredDiffs = slice.map(price => Math.pow(price - mean, 2));
      const variance = squaredDiffs.reduce((a, b) => a + b, 0) / period;
      const std = Math.sqrt(variance);
      return {
        upper: mean + (stdDev * std),
        middle: mean,
        lower: mean - (stdDev * std)
      };
    });
    return bands;
  };

  const calculateSMA = (prices: number[], period: number): number[] => {
    return prices.map((_, i) => {
      if (i < period - 1) return 0;
      const slice = prices.slice(i - period + 1, i + 1);
      return slice.reduce((a, b) => a + b, 0) / period;
    });
  };

  const calculateRSI = (prices: number[], period: number = 14): number[] => {
    const changes = prices.map((price, i) => i > 0 ? price - prices[i - 1] : 0);
    const gains = changes.map(change => change > 0 ? change : 0);
    const losses = changes.map(change => change < 0 ? -change : 0);
    
    const avgGain = calculateSMA(gains, period);
    const avgLoss = calculateSMA(losses, period);
    
    return prices.map((_, i) => {
      if (i < period) return 50;
      const rs = avgGain[i] / avgLoss[i];
      return 100 - (100 / (1 + rs));
    });
  };

  const calculateMACD = (prices: number[]): { line: number[]; signal: number[]; histogram: number[] } => {
    const ema12 = calculateEMA(prices, 12);
    const ema26 = calculateEMA(prices, 26);
    const macdLine = prices.map((_, i) => ema12[i] - ema26[i]);
    const signalLine = calculateEMA(macdLine, 9);
    const histogram = macdLine.map((macd, i) => macd - signalLine[i]);
    
    return { line: macdLine, signal: signalLine, histogram };
  };

  const analyzeStage = (weeklyPrices: any[]): 'stage1' | 'stage2' | 'stage3' | 'stage4' => {
    const ema40 = calculateEMA(weeklyPrices.map(p => p.close), 40);
    const current = weeklyPrices[weeklyPrices.length - 1];
    const currentEMA = ema40[ema40.length - 1];
    
    // Simplified stage analysis
    if (current.close > currentEMA * 1.1) return 'stage2';
    if (current.close < currentEMA * 0.9) return 'stage4';
    return 'stage1';
  };

  const calculateRelativeStrength = (prices: any[], indexPrices: any[]): number => {
    const priceChange = (prices[prices.length - 1].close - prices[0].close) / prices[0].close;
    const indexChange = (indexPrices[indexPrices.length - 1].close - indexPrices[0].close) / indexPrices[0].close;
    return priceChange - indexChange;
  };

  const analyzeTrendStructure = (weeklyPrices: any[]): 'higher_highs_lows' | 'lower_highs_lows' | 'mixed' => {
    const highs: number[] = [];
    const lows: number[] = [];
    
    for (let i = 2; i < weeklyPrices.length - 2; i++) {
      if (weeklyPrices[i].high > weeklyPrices[i-1].high && weeklyPrices[i].high > weeklyPrices[i+1].high) {
        highs.push(weeklyPrices[i].high);
      }
      if (weeklyPrices[i].low < weeklyPrices[i-1].low && weeklyPrices[i].low < weeklyPrices[i+1].low) {
        lows.push(weeklyPrices[i].low);
      }
    }
    
    const higherHighs = highs.every((high, i) => i === 0 || high > highs[i-1]);
    const higherLows = lows.every((low, i) => i === 0 || low > lows[i-1]);
    const lowerHighs = highs.every((high, i) => i === 0 || high < highs[i-1]);
    const lowerLows = lows.every((low, i) => i === 0 || low < lows[i-1]);
    
    if (higherHighs && higherLows) return 'higher_highs_lows';
    if (lowerHighs && lowerLows) return 'lower_highs_lows';
    return 'mixed';
  };

  // Fetch and calculate technical indicators using Twelve Data API values
  useEffect(() => {
    setIndicatorsLoading(true);
    try {
      if (!tradePlan || !tradePlan.externalIndicators) {
        setIndicators([]);
        setIndicatorsLoading(false);
        return;
      }
      let priceHistory = tradePlan.priceHistory || [];
      let windowSize = 30;
      if (horizon === 'positional') windowSize = 60;
      if (horizon === 'longterm') windowSize = 200;
      priceHistory = priceHistory.slice(-windowSize);
      const closes = priceHistory.map((p: any) => p.close);

      // Use external indicators from API
      const rsi = tradePlan.externalIndicators.rsi;
      const macd = tradePlan.externalIndicators.macd;
      const bb = tradePlan.externalIndicators.bbands;

      // Average Daily Return
      let avgReturn = null;
      if (closes.length > 1) {
        const returns = closes.slice(1).map((c: number, i: number) => (c - closes[i]) / closes[i]);
        avgReturn = 100 * (returns.reduce((a: number, b: number) => a + b, 0) / returns.length);
      }

      // Volatility (Standard Deviation of Returns)
      let volatility = null;
      if (closes.length > 1) {
        const returns = closes.slice(1).map((c: number, i: number) => (c - closes[i]) / closes[i]);
        const mean = returns.reduce((a: number, b: number) => a + b, 0) / returns.length;
        const variance = returns.reduce((a: number, b: number) => a + Math.pow(b - mean, 2), 0) / returns.length;
        volatility = 100 * Math.sqrt(variance);
      }

      // Adjust thresholds based on timeframe
      const rsiThresholds = horizon === 'longterm' ? { bullish: 55, bearish: 45 } : horizon === 'positional' ? { bullish: 60, bearish: 40 } : { bullish: 65, bearish: 35 };
      const macdThreshold = horizon === 'longterm' ? 0.5 : horizon === 'positional' ? 0.2 : 0.1;
      const volatilityBearish = horizon === 'longterm' ? 2.5 : horizon === 'positional' ? 3 : 3.5;
      const avgReturnBullish = horizon === 'longterm' ? 0.05 : horizon === 'positional' ? 0.1 : 0.15;
      const avgReturnBearish = horizon === 'longterm' ? -0.05 : horizon === 'positional' ? -0.1 : -0.15;

      // Build indicators using API values and refined logic
      const newIndicators: any[] = [
        {
          name: 'RSI (14)',
          value: rsi ?? 'N/A',
          signal: rsi !== null && rsi !== undefined ? (rsi > rsiThresholds.bullish ? 'bullish' : rsi < rsiThresholds.bearish ? 'bearish' : 'neutral') : 'neutral',
          description: rsi !== null && rsi !== undefined ? `RSI is ${rsi.toFixed(2)}. ${rsi > rsiThresholds.bullish ? 'Bullish momentum.' : rsi < rsiThresholds.bearish ? 'Bearish momentum.' : 'Neutral momentum.'}` : 'RSI not available.',
          education: 'RSI measures the speed and change of price movements. Thresholds are adjusted for the selected timeframe.',
          actionableAdvice: rsi !== null && rsi !== undefined
            ? (rsi > rsiThresholds.bullish
                ? 'Bullish. Consider entering or adding on pullbacks.'
                : rsi < rsiThresholds.bearish
                ? 'Bearish. Consider reducing exposure or waiting.'
                : 'Neutral. Wait for clearer signals.')
            : 'No actionable advice.'
        },
        {
          name: 'MACD',
          value: macd ?? 'N/A',
          signal: macd !== null && macd !== undefined ? (macd > macdThreshold ? 'bullish' : macd < -macdThreshold ? 'bearish' : 'neutral') : 'neutral',
          description: macd !== null && macd !== undefined ? `MACD is ${macd.toFixed(2)}. ${macd > macdThreshold ? 'Bullish momentum.' : macd < -macdThreshold ? 'Bearish momentum.' : 'Neutral.'}` : 'MACD not available.',
          education: 'MACD is a trend-following momentum indicator. Thresholds are adjusted for the selected timeframe.',
          actionableAdvice: macd !== null && macd !== undefined
            ? (macd > macdThreshold
                ? 'Bullish momentum. Consider entering or holding.'
                : macd < -macdThreshold
                ? 'Bearish momentum. Consider reducing exposure.'
                : 'Neutral. Wait for momentum shift.')
            : 'No actionable advice.'
        },
        {
          name: 'Bollinger Bands',
          value: bb ? `${bb.upper?.toFixed(2) ?? 'N/A'} / ${bb.middle?.toFixed(2) ?? 'N/A'} / ${bb.lower?.toFixed(2) ?? 'N/A'}` : '',
          signal: bb && closes.length > 0 ? (closes[closes.length - 1] > (bb.upper ?? 0) ? 'bearish' : closes[closes.length - 1] < (bb.lower ?? 0) ? 'bullish' : 'neutral') : 'neutral',
          description: bb ? `Price is ${closes[closes.length - 1] > (bb.upper ?? 0) ? 'above upper band (overbought)' : closes[closes.length - 1] < (bb.lower ?? 0) ? 'below lower band (oversold)' : 'within bands (neutral)'}.` : 'Bollinger Bands not available.',
          education: 'Bollinger Bands consist of a moving average and two standard deviations. Price above upper band is overbought, below lower is oversold.',
          actionableAdvice: bb && closes.length > 0
            ? (closes[closes.length - 1] > (bb.upper ?? 0)
                ? 'Overbought. Consider waiting for a pullback.'
                : closes[closes.length - 1] < (bb.lower ?? 0)
                ? 'Oversold. Watch for reversal or confirmation.'
                : 'Price within bands. Wait for breakout or breakdown.')
            : 'No actionable advice.'
        },
        {
          name: 'Average Daily Return',
          value: avgReturn !== null ? avgReturn.toFixed(2) + '%' : 'N/A',
          signal: avgReturn !== null ? (avgReturn > avgReturnBullish ? 'bullish' : avgReturn < avgReturnBearish ? 'bearish' : 'neutral') : 'neutral',
          description: avgReturn !== null ? `Average daily return is ${avgReturn.toFixed(2)}%.` : 'Not enough data.',
          education: 'Average daily return shows the mean percentage change per day over the selected period.',
          actionableAdvice: avgReturn !== null
            ? (avgReturn > avgReturnBullish
                ? 'Strong positive returns. Consider entering or holding.'
                : avgReturn < avgReturnBearish
                ? 'Strong negative returns. Consider reducing exposure.'
                : 'Neutral returns. Wait for trend to develop.')
            : 'No actionable advice.'
        },
        {
          name: 'Volatility',
          value: volatility !== null ? volatility.toFixed(2) + '%' : 'N/A',
          signal: volatility !== null ? (volatility > volatilityBearish ? 'bearish' : volatility < 1 ? 'bullish' : 'neutral') : 'neutral',
          description: volatility !== null ? `Volatility (std dev of daily returns) is ${volatility.toFixed(2)}%.` : 'Not enough data.',
          education: 'Volatility measures the standard deviation of daily returns. Higher volatility means more risk.',
          actionableAdvice: volatility !== null
            ? (volatility > volatilityBearish
                ? 'High volatility. Consider reducing position size or waiting for stabilization.'
                : volatility < 1
                ? 'Low volatility. Consider waiting for a breakout.'
                : 'Moderate volatility. Adjust position size accordingly.')
            : 'No actionable advice.'
        }
      ];
      setIndicators(newIndicators);
    } catch (e) {
      setIndicators([]);
    } finally {
      setIndicatorsLoading(false);
    }
  }, [tradePlan, horizon]);

  // Helper to call the backend API for trade plan generation and usage tracking
  const fetchTradePlan = useCallback(async (symbol: string, horizon: string) => {
    setLoading(true);
    setError(null);
    setQuotaExceeded(false);
    try {
      const res = await fetch('/api/trade-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symbol, horizon })
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401) {
          setShowSignIn(true);
          setError('Please sign in to generate trade plans.');
        } else if (data.quotaExceeded) {
          setQuotaExceeded(true);
          setUsageInfo({ request_count: data.request_count, total_requests: data.total_requests, date: data.date });
          setError(data.error || 'You have used up your daily quota. Please come back tomorrow.');
        } else {
          setError(data.error || 'Failed to generate trade plan.');
        }
        setTradePlan(null);
        return null;
      }
      setTradePlan(data.tradePlan);
      setUsageInfo({ request_count: data.request_count, total_requests: data.total_requests, date: data.date });
      return data.tradePlan;
    } catch (err) {
      setError('Failed to generate trade plan. Please try again later.');
      setTradePlan(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Helper to get cache key for localStorage
  const getCacheKey = (symbol: string, horizon: string) => `tradePlan_${symbol}_${horizon}`;

  // On mount and when symbol/horizon changes, try to load from cache, else fetch and cache
  useEffect(() => {
    if (!session) return;
    const cacheKey = getCacheKey(symbol, horizon);
    const cached = typeof window !== 'undefined' ? localStorage.getItem(cacheKey) : null;
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Only use cache if not stale (1 hour)
        if (parsed && parsed.timestamp && Date.now() - parsed.timestamp < 60 * 60 * 1000) {
          setTradePlan(parsed.data);
          setLoading(false);
          return;
        }
      } catch {}
    }
    // If not cached or stale, fetch and cache
    fetchTradePlan(symbol, horizon).then((plan) => {
      if (plan) {
        localStorage.setItem(cacheKey, JSON.stringify({ data: plan, timestamp: Date.now() }));
      }
    });
  }, [session, symbol, horizon, fetchTradePlan]);

  // Helper to compute time remaining until quota reset (midnight UTC)
  function getTimeUntilQuotaReset(dateStr?: string): string {
    if (!dateStr) return '';
    // dateStr is in 'YYYY-MM-DD' (UTC)
    const now = new Date();
    const utcNow = new Date(now.toISOString().slice(0, 19) + 'Z');
    const nextMidnightUTC = new Date(dateStr + 'T00:00:00Z');
    nextMidnightUTC.setUTCDate(nextMidnightUTC.getUTCDate() + 1);
    const ms = nextMidnightUTC.getTime() - utcNow.getTime();
    if (ms <= 0) return 'refreshing soon';
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  }

  useEffect(() => {
    async function fetchPlan() {
      if (!session?.user?.email) return;
      const res = await fetch('/api/auth/session');
      const sessionData = await res.json();
      if (!sessionData?.user?.email) return;
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { data: user } = await supabase
        .from('users')
        .select('id')
        .eq('email', sessionData.user.email)
        .single();
      if (!user) return;
      const { data: sub } = await supabase
        .from('user_subscriptions')
        .select('plan_type')
        .eq('user_id', user.id)
        .single();
      setUserPlan(sub?.plan_type || 'free');
    }
    fetchPlan();
  }, [session]);

  // Check authentication status and show sign-in modal if needed
  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (status === 'unauthenticated') {
      setShowSignIn(true);
      setLoading(false);
    }
  }, [status]);

  // Close sign-in modal when user becomes authenticated
  useEffect(() => {
    if (session && showSignIn) {
      setShowSignIn(false);
      // Automatically start trade plan generation after successful sign-in
      fetchTradePlan(symbol, horizon);
    }
  }, [session, showSignIn, symbol, horizon, fetchTradePlan]);

  if (quotaExceeded) {
    // Parse upgrade info from error or API fields
    let upgradeMessage, cta, ctaLink;
    if (typeof error === 'string') {
      try {
        const parsed = JSON.parse(error);
        upgradeMessage = parsed.upgradeMessage;
        cta = parsed.cta;
        ctaLink = parsed.ctaLink || '/pricing';
      } catch {
        upgradeMessage = undefined;
        cta = undefined;
        ctaLink = '/pricing';
      }
    } else if (error && typeof error === 'object') {
      upgradeMessage = (error as any).upgradeMessage;
      cta = (error as any).cta;
      ctaLink = (error as any).ctaLink || '/pricing';
    }
    // fallback to API fields if available
    if (!upgradeMessage && typeof (globalThis as any).upgradeMessage === 'string') {
      upgradeMessage = (globalThis as any).upgradeMessage;
    }
    if (!cta && typeof (globalThis as any).cta === 'string') {
      cta = (globalThis as any).cta;
    }
    if (!ctaLink && typeof (globalThis as any).ctaLink === 'string') {
      ctaLink = (globalThis as any).ctaLink;
    }
    return (
      <main className="flex-1 pt-[68px] pb-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col min-h-[60vh] justify-center items-center">
          <div className="max-w-lg w-full">
            <div className="bg-white/90 border border-blue-200 rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col items-center animate-fade-in">
              <div className="flex flex-col items-center mb-4">
                <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2">
                  <circle cx="24" cy="24" r="24" fill="#DBEAFE"/>
                  <path d="M24 14v10" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="24" cy="32" r="2" fill="#2563EB"/>
                </svg>
                <h1 className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 text-center">Daily Quota Reached</h1>
                <p className="text-sm text-muted-foreground text-center max-w-md px-2 leading-relaxed">
                  {upgradeMessage ? null : (typeof error === 'string' ? error : 'You have used up your daily quota. Please come back tomorrow.')}
                </p>
                <div className="mt-2 text-xs text-blue-800 font-medium bg-blue-100 rounded-lg px-3 py-2">
                  {/* Removed requests today indicator */}
                </div>
              </div>
              {upgradeMessage && (
                <div className="w-full text-center mb-6">
                  <div className="text-sm sm:text-base font-semibold text-blue-900 mb-2 animate-fade-in-slow px-2 leading-relaxed">
                    {upgradeMessage}
                  </div>
                  {cta && (
                    <a
                      href={ctaLink}
                      className="mt-4 px-6 sm:px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-200 text-base sm:text-lg animate-pulse-slow min-h-[48px] flex items-center justify-center text-center"
                      style={{ animation: 'pulse 2.5s infinite' }}
                    >
                      {cta}
                    </a>
                  )}
                  <div className="mt-4 text-xs text-muted-foreground px-2 leading-relaxed">
                    Premium unlocks 10x more requests, exclusive features, and priority support. Invest in your trading edge!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <style jsx global>{`
          @keyframes pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(37,99,235,0.4); }
            50% { transform: scale(1.04); box-shadow: 0 0 16px 4px rgba(37,99,235,0.15); }
          }
          .animate-pulse-slow {
            animation: pulse 2.5s infinite;
          }
        `}</style>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex-1 pt-[68px] pb-12">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col min-h-[60vh] justify-center items-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Generating Trade Plan...</h1>
          <p className="mb-6 text-muted-foreground text-center max-w-md px-4 leading-relaxed">
            Your trade plan is being generated. This may take a few moments.
          </p>
          <div className="animate-spin rounded-full h-24 w-24 sm:h-32 sm:w-32 border-t-4 border-b-4 border-primary mb-4"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 pt-[68px] pb-12">
        <div className="container mx-auto px-3 sm:px-4 flex flex-col min-h-[60vh] justify-center items-center">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">Error Generating Trade Plan</h1>
          <p className="mb-6 text-muted-foreground text-center max-w-md px-4 leading-relaxed">
            {error}
          </p>
          {showSignIn ? (
            <Button onClick={() => signIn('google')} className="w-full max-w-xs bg-sky-600 hover:bg-sky-700 min-h-[48px]" size="lg">
              Sign In with Google
            </Button>
          ) : (
            <Button onClick={() => fetchTradePlan(symbol, horizon)} className="w-full max-w-xs min-h-[48px]" size="lg">
              Retry
            </Button>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 pt-[68px] pb-12">
      <Head>
        <title>TradeCraft Trade Plan Generator</title>
        <meta name="description" content="Generate actionable trade plans for any stock. Get entry, stop, targets, and risk management in seconds. Upgrade for more daily requests and premium features." />
        <meta property="og:title" content="TradeCraft Trade Plan Generator" />
        <meta property="og:description" content="Generate actionable trade plans for any stock. Get entry, stop, targets, and risk management in seconds. Upgrade for more daily requests and premium features." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tradingsetup.pro/trade-plan" />
        <meta property="og:image" content="https://www.tradingsetup.pro/bull-bear.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeCraft Trade Plan Generator" />
        <meta name="twitter:description" content="Generate actionable trade plans for any stock. Get entry, stop, targets, and risk management in seconds. Upgrade for more daily requests and premium features." />
        <meta name="twitter:image" content="https://www.tradingsetup.pro/bull-bear.png" />
      </Head>
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "TradeCraft Trade Plan Generator",
          "description": "Professional AI-powered trading plan generator for stocks with technical analysis, risk management, and entry/exit strategies",
          "url": "https://www.tradingsetup.pro/trade-plan",
          "applicationCategory": "FinanceApplication",
          "operatingSystem": "Web",
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft",
            "url": "https://www.tradingsetup.pro"
          },
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
            "description": "Free trade plan generator with 3 daily requests"
          },
          "featureList": [
            "AI-powered stock analysis",
            "Technical indicator analysis",
            "Risk management calculations",
            "Entry and exit strategies",
            "Stop loss recommendations",
            "Position sizing guidance"
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1247"
          }
        }}
      />
      
      <StructuredData 
        data={{
          "@context": "https://schema.org",
          "@type": "FinancialService",
          "name": "Stock Trading Plan Analysis",
          "description": "Professional trading plan generation service with technical analysis and risk management for individual stocks",
          "provider": {
            "@type": "Organization",
            "name": "TradeCraft",
            "url": "https://www.tradingsetup.pro"
          },
          "serviceType": "Financial Analysis",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Trading Plans",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Basic Trade Plan",
                  "description": "AI-generated trading plan with entry, exit, and risk management"
                },
                "price": "0",
                "priceCurrency": "USD"
              }
            ]
          }
        }}
      />
      
      <div className="container mx-auto px-3 sm:px-4">
        {/* Trade Plan Introduction Section */}
        {tradePlan && (
          <div className="mb-6 sm:mb-8">
            <div className="text-center mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                Trade Plan for {tradePlan.symbol}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Comprehensive analysis with entry zones, targets, and risk management for your trading strategy.
              </p>
            </div>
          </div>
        )}
        
        {/* Place TradePlanHeader at the top for consistent UX, pass onTimeframeChange */}
        {tradePlan && (
          <TradePlanHeader
            tradePlan={{
              ...tradePlan,
              onTimeframeChange: (horizon: string) => handleHorizonChange(horizon),
              request_count: usageInfo?.request_count ?? 0,
              total_requests: usageInfo?.total_requests ?? 5
            }}
          />
        )}
        {/* Show requests used and time until reset if usageInfo is present and quota not exceeded */}
        {usageInfo && !quotaExceeded && (
          <div className="mt-4 text-xs text-blue-800 font-medium bg-blue-100 rounded-lg px-3 py-2 inline-block">
            Requests used: {usageInfo.request_count}
            {usageInfo.date && (
              <span className="ml-2 text-blue-700">(Resets in {getTimeUntilQuotaReset(usageInfo.date)})</span>
            )}
          </div>
        )}
        {/* Only render trade plan components if tradePlan exists */}
        {tradePlan && (
          <>
            <div className="mt-6 sm:mt-8">
              <ExecutiveSummary tradePlan={tradePlan} />
            </div>
            <div className="mt-6 sm:mt-8">
              <TradingChart 
                symbol={symbol}
                entryPrice={tradePlan.riskManagement?.entryZone?.high || tradePlan.currentPrice}
                stopLoss={tradePlan.riskManagement?.initialStopLoss?.price || tradePlan.currentPrice * 0.95}
                targetPrice={tradePlan.riskManagement?.targets?.[0]?.price || tradePlan.currentPrice * 1.1}
                timeHorizon={horizon as 'swing' | 'positional' | 'longterm'}
                entryZone={tradePlan.riskManagement?.entryZone}
                priceHistory={tradePlan.priceHistory}
              />
            </div>
            <div className="mt-6 sm:mt-8">
              <TradingRecommendation tradePlan={tradePlan} onTimeframeChange={handleHorizonChange} />
            </div>
            <div className="mt-6 sm:mt-8">
              <TechnicalAnalysis tradePlan={tradePlan} onHorizonChange={handleHorizonChange} />
            </div>
          </>
        )}
        <div className="mt-8 sm:mt-12 space-y-6">
          {/* Action Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => {
                setCopied(true);
                navigator.clipboard.writeText(window.location.href);
              }}
              className="w-full sm:w-auto min-w-[200px] min-h-[48px] text-base bg-slate-700 hover:bg-slate-800 text-white"
              size="lg"
            >
              {copied ? 'Link Copied!' : 'Share This Analysis'}
              <Share2 className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] min-h-[48px] text-base"
              size="lg"
            >
              Generate New Plan
            </Button>
          </div>
          
          {/* Additional Resources */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 text-xs text-muted-foreground bg-muted/30 rounded-lg px-4 py-2">
              <span>Need help?</span>
              <a href="/education" className="text-slate-600 hover:text-slate-800 hover:underline font-medium">Trading Education</a>
              <span>•</span>
              <a href="/faq" className="text-slate-600 hover:text-slate-800 hover:underline font-medium">FAQ</a>
            </div>
          </div>
        </div>
        <div className="mt-6 sm:mt-8">
          {/* Show ads for free and not signed in users, hide for paid */}
          {/* No ads in paid trade plan feature */}
        </div>
        <div className="mt-6 sm:mt-8">
          <p className="text-xs text-muted-foreground text-center px-4 leading-relaxed">
            This analysis is for educational purposes only. Always conduct your own research before making investment decisions.
          </p>
        </div>
      </div>
      
      {/* Sign In modal for unauthorized access */}
      <Dialog open={showSignIn} onOpenChange={setShowSignIn}>
        <DialogContent className="max-w-md mx-auto">
          <div className="text-center p-2 sm:p-4">
            <h2 className="text-xl sm:text-2xl font-bold mb-2 text-sky-800">Welcome to TradeCraft</h2>
            <p className="mb-4 text-gray-700 text-base sm:text-lg leading-relaxed px-2">
              Sign in with Google to generate professional trade plans and access TradeCraft&apos;s powerful analysis tools.
            </p>
            <div className="mb-4">
              <div className="flex items-center gap-2 text-green-700 text-sm justify-center mb-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
                10,000+ trade plans generated
              </div>
              <div className="flex items-center gap-2 text-blue-700 text-sm justify-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                Professional risk management & analysis
              </div>
            </div>
            <Button
              size="lg"
              className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-base sm:text-lg px-6 sm:px-8 py-3 rounded-xl shadow-lg min-h-[48px]"
              onClick={() => signIn('google')}
            >
              Sign In with Google
            </Button>
            <p className="text-xs text-gray-500 mt-4 px-2">
              Free to start • No credit card required
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

export default function TradePlanPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TradePlanPage />
    </Suspense>
  );
}