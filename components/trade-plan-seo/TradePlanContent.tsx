"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { TradePlanHeader } from '@/components/trade-plan/TradePlanHeader';
import { ExecutiveSummary } from '@/components/trade-plan/ExecutiveSummary';
import { TradingRecommendation } from '@/components/trade-plan/TradingRecommendation';
import { TechnicalAnalysis } from '@/components/trade-plan/TechnicalAnalysis';
import { TradingChart } from '@/components/trade-plan/TradingChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, Shield, Target, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { onStockPageAccess } from '@/lib/cache/auto-refresh';

interface TradePlanContentProps {
  symbol: string;
  initialCachedData?: any; // Optional cached data for immediate display
}

export function TradePlanContent({ symbol, initialCachedData }: TradePlanContentProps) {
  const { data: session } = useSession();
  
  // Generate unique ID for this component instance
  const componentId = useRef(Math.random().toString(36).substr(2, 9));
  
  const [tradePlan, setTradePlan] = useState<any>(initialCachedData || null);
  const [loading, setLoading] = useState(!initialCachedData); // Don't show loading if we have cached data
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'cached' | 'error'>(
    initialCachedData ? 'cached' : 'live'
  );
  const initializedRef = useRef(false);
  const tradePlanRef = useRef(tradePlan);
  const requestInProgressRef = useRef(false);
  const autoRefreshTriggeredRef = useRef(false);

  // Keep ref updated with current tradePlan state
  useEffect(() => {
    tradePlanRef.current = tradePlan;
  }, [tradePlan]);

  useEffect(() => {
    // Initialize with cached data if available on first render
    if (initialCachedData && !initializedRef.current) {
      setTradePlan(initialCachedData);
      setDataSource('cached');
      setLoading(false);
      initializedRef.current = true;
    }

    // New strategy: Use cached data only, no auto-refresh triggers
    // Fresh data generation is exclusively driven by user requests
    if (symbol && !autoRefreshTriggeredRef.current) {
      autoRefreshTriggeredRef.current = true;
      console.log(`[${componentId.current}] Using cache-only strategy for ${symbol} - no API calls triggered`);
    }
  }, [symbol, initialCachedData]); // Include initialCachedData dependency

  const fetchTradePlan = useCallback(async () => {
    // Prevent multiple simultaneous requests from the same component
    if (requestInProgressRef.current) {
      console.log(`[${componentId.current}] Request already in progress, skipping duplicate call`);
      return;
    }

    // Always try to get live data for authenticated users
    try {
      requestInProgressRef.current = true;
      setError(null);
      
      // Only show loading if we don't have any data
      if (!tradePlanRef.current && !initialCachedData) {
        setLoading(true);
      }

      console.log(`🚀 [${componentId.current}] Fetching trade plan for ${symbol}`);

      // Call your existing trade plan API for live data
      const response = await fetch('/api/trade-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol,
          horizon: 'swing', // Default to swing trading
        }),
      });

      if (!response.ok) {
        // Handle rate limiting specifically
        if (response.status === 429) {
          const errorData = await response.json();
          console.log('Rate limit 429 response:', errorData);
          
          // Check if this is a cooldown error (temporary) vs quota exceeded (needs upgrade)
          if (errorData.cooldown) {
            // This is a cooldown error - show temporary message instead of upgrade prompt
            throw new Error(JSON.stringify({
              type: 'COOLDOWN_ERROR',
              status: 429,
              message: 'Please wait a moment before making another request',
              ...errorData
            }));
          } else if (errorData.quotaExceeded) {
            // This is a real quota exceeded error - show upgrade prompt
            console.log('Quota exceeded, should show upgrade prompt', errorData);
            throw new Error(JSON.stringify({
              type: 'RATE_LIMIT_EXCEEDED',
              status: 429,
              ...errorData
            }));
          } else {
            // Unknown 429 error - treat as rate limit
            throw new Error(JSON.stringify({
              type: 'RATE_LIMIT_EXCEEDED',
              status: 429,
              ...errorData
            }));
          }
        }
        
        // For other errors, try to get the error message from response
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to generate trade plan');
        } catch {
          throw new Error('Failed to generate trade plan');
        }
      }

      const data = await response.json();
      setTradePlan(data.tradePlan || data); // Handle both response formats
      setDataSource('live');
      setLoading(false);
      requestInProgressRef.current = false;
      
    } catch (err) {
      requestInProgressRef.current = false;
      console.error('Failed to fetch live trade plan:', err);
      
      // Check if this is a rate limiting error
      let isRateLimitError = false;
      let isCooldownError = false;
      let rateLimitData = null;
      
      try {
        if (err instanceof Error && err.message.startsWith('{')) {
          const errorData = JSON.parse(err.message);
          if (errorData.type === 'RATE_LIMIT_EXCEEDED') {
            isRateLimitError = true;
            rateLimitData = errorData;
          } else if (errorData.type === 'COOLDOWN_ERROR') {
            isCooldownError = true;
            rateLimitData = errorData;
          }
        }
      } catch (parseErr) {
        // Not a JSON error message, continue with normal error handling
      }
      
      // If cooldown error, show temporary message (backend should handle deduplication now)
      if (isCooldownError) {
        console.log('Cooldown error - this should not happen with backend deduplication');
        setError('Please wait a moment and try again');
        setDataSource('error');
        setLoading(false);
        requestInProgressRef.current = false;
        return;
      }
      
      // If rate limit exceeded, don't fall back to cached data - show upgrade prompt
      if (isRateLimitError) {
        setError(JSON.stringify({
          type: 'QUOTA_EXCEEDED',
          ...rateLimitData
        }));
        setDataSource('error');
        setLoading(false);
        requestInProgressRef.current = false;
        return;
      }
      
      // Only fall back to cached data for non-rate-limit errors
      // If live data fails and we don't have current trade plan data, try to fetch cached data
      if (!tradePlanRef.current && !initialCachedData) {
        try {
          const cachedResponse = await fetch(`/api/trade-plan/cached?symbol=${symbol}`);
          if (cachedResponse.ok) {
            const cachedData = await cachedResponse.json();
            if (cachedData.tradePlan) {
              setTradePlan(cachedData.tradePlan);
              setDataSource('cached');
              setLoading(false);
              requestInProgressRef.current = false;
              return;
            }
          }
        } catch (cacheErr) {
          console.error('Failed to fetch cached trade plan:', cacheErr);
        }
      }
      
      // If we have cached data from SSR or state, keep it and just update the source
      if (tradePlanRef.current || initialCachedData) {
        setDataSource('cached');
        setLoading(false);
      } else {
        // No data available at all
        setError(err instanceof Error ? err.message : 'An error occurred');
        setDataSource('error');
        setLoading(false);
      }
      requestInProgressRef.current = false;
    }
  }, [symbol, initialCachedData]); // Keep dependencies for callback

  useEffect(() => {
    // Always fetch fresh data for authenticated users (cache is just for temporary display)
    // This ensures users get live data within their plan limits and proper quota checking
    console.log(`[${componentId.current}] Fetching fresh trade plan for authenticated user: ${symbol}`);
    fetchTradePlan();
  }, [fetchTradePlan, symbol]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 px-4 sm:px-6 lg:px-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <h1 className="text-2xl font-bold">Generating {symbol} Trade Plan...</h1>
        <p className="text-muted-foreground text-center max-w-md">
          AI is analyzing real-time market data to create your professional trading strategy.
        </p>
      </div>
    );
  }

  if (error || !tradePlan) {
    // Check if this is a quota exceeded error
    let isQuotaError = false;
    let quotaData = null;
    
    try {
      if (error && error.startsWith('{')) {
        const errorData = JSON.parse(error);
        if (errorData.type === 'QUOTA_EXCEEDED' || errorData.type === 'RATE_LIMIT_EXCEEDED') {
          isQuotaError = true;
          quotaData = errorData;
        }
      }
    } catch (parseErr) {
      // Not a JSON error, continue with normal error handling
    }
    
    if (isQuotaError && quotaData) {
      // Show quota exceeded / upgrade prompt
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 px-4 sm:px-6 lg:px-8">
          <Card className="max-w-lg">
            <CardHeader>
              <CardTitle className="text-center text-blue-900">Daily Quota Reached</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="flex items-center justify-center mb-4">
                <svg width="48" height="48" fill="none" viewBox="0 0 48 48" className="mb-2">
                  <circle cx="24" cy="24" r="24" fill="#DBEAFE"/>
                  <path d="M24 14v10" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round"/>
                  <circle cx="24" cy="32" r="2" fill="#2563EB"/>
                </svg>
              </div>
              
              <p className="text-muted-foreground">
                {quotaData.upgradeMessage || 'You have used up your daily quota. Upgrade for more requests!'}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Free Plan:</strong> 1 trade plan per day<br/>
                  <strong>Pro Plan:</strong> 100 trade plans per day<br/>
                  <strong>Premium Plan:</strong> 1000 trade plans per day
                </p>
              </div>
              
              <div className="flex flex-col gap-2">
                <Link href={quotaData.ctaLink || '/pricing'}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600">
                    {quotaData.cta || 'Upgrade Now'}
                  </Button>
                </Link>
                <Link href="/trade-plan/demo">
                  <Button variant="outline" className="w-full">
                    Try TSLA Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    // Normal error handling for non-quota errors
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Unable to Generate Trade Plan</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We couldn&apos;t generate a trade plan for {symbol}. This might be due to:
            </p>
            <ul className="text-sm text-left space-y-1">
              <li>• Invalid stock symbol</li>
              <li>• Insufficient market data</li>
              <li>• Market is currently closed</li>
            </ul>
            <div className="flex flex-col gap-2">
              <Link href="/trade-plan/start-here">
                <Button className="w-full">
                  Try Another Symbol
                </Button>
              </Link>
              <Link href="/screener">
                <Button variant="outline" className="w-full">
                  Browse Market Screener
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Data source indicator */}
      {dataSource === 'cached' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center gap-2 text-amber-800">
            <div className="h-2 w-2 bg-amber-500 rounded-full"></div>
            <span className="text-sm font-medium">
              Showing cached data - Live data will load automatically
            </span>
          </div>
        </div>
      )}

      {/* SEO-optimized header section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Badge variant="secondary">AI-Enhanced Analysis</Badge>
          <Badge variant="outline">
            {dataSource === 'live' ? 'Real-Time Data' : 'Cached Data'}
          </Badge>
          <Badge variant="outline">Professional Grade</Badge>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold">
          {symbol} Trade Plan - Professional Trading Strategy
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          AI-powered trade plan for {symbol} with precise entry points, stop loss levels, 
          profit targets, and comprehensive risk management. Updated with real-time market data.
        </p>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Technical Analysis
          </div>
          <div className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            Entry & Exit Points
          </div>
          <div className="flex items-center gap-1">
            <Shield className="h-4 w-4" />
            Risk Management
          </div>
          <div className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            Position Sizing
          </div>
        </div>
      </div>

      {/* Trade plan components using your existing components */}
      <TradePlanHeader tradePlan={tradePlan} />
      
      <ExecutiveSummary tradePlan={tradePlan} />
      
      <TradingChart 
        symbol={symbol}
        entryPrice={tradePlan.riskManagement?.entryZone?.high || tradePlan.currentPrice}
        stopLoss={tradePlan.riskManagement?.initialStopLoss?.price || tradePlan.currentPrice * 0.95}
        targetPrice={tradePlan.riskManagement?.targets?.[0]?.price || tradePlan.currentPrice * 1.1}
        timeHorizon="swing"
        entryZone={tradePlan.riskManagement?.entryZone}
        priceHistory={tradePlan.priceHistory}
      />

      <TradingRecommendation tradePlan={tradePlan} />

      <TechnicalAnalysis tradePlan={tradePlan} />

      {/* SEO content section */}
      <Card>
        <CardHeader>
          <CardTitle>About This {symbol} Trade Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This {symbol} trade plan is generated using advanced AI algorithms that analyze real-time market data, 
            technical indicators, and price action patterns. Our system considers multiple timeframes, volume analysis, 
            support and resistance levels, and volatility metrics to create a comprehensive trading strategy.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">What&apos;s Included:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Precise entry zone with optimal timing</li>
                <li>• Stop loss placement for risk management</li>
                <li>• Multiple profit targets with probabilities</li>
                <li>• Position sizing recommendations</li>
                <li>• Technical analysis and market context</li>
                <li>• Risk-reward ratio calculations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How to Use This Plan:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Wait for price to enter the suggested entry zone</li>
                <li>• Set your stop loss at the recommended level</li>
                <li>• Scale out profits at each target level</li>
                <li>• Monitor for any changes in market conditions</li>
                <li>• Always risk only 1-2% of your capital per trade</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Disclaimer:</strong> This trade plan is for educational purposes only and should not be considered 
              as financial advice. Always conduct your own research and consider consulting with a financial advisor 
              before making investment decisions. Past performance does not guarantee future results.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <CardContent className="text-center space-y-4 py-8">
          <h3 className="text-2xl font-bold">Get More Professional Trade Plans</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Generate unlimited AI-powered trade plans for any stock symbol. Join thousands of traders 
            using TradeCraft&apos;s professional-grade analysis tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trade-plan/start-here">
              <Button size="lg" className="min-w-[200px]">
                Generate New Trade Plan
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/screener">
              <Button variant="outline" size="lg" className="min-w-[200px]">
                Browse Stock Screener
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Related trade plans */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Trade Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NFLX', 'AMD', 'SPY', 'QQQ', 'IWM']
              .filter(s => s !== symbol)
              .slice(0, 6)
              .map((relatedSymbol) => (
                <Link 
                  key={relatedSymbol} 
                  href={`/trade-plan/${relatedSymbol}`}
                  className="group"
                >
                  <div className="p-3 border rounded-lg text-center hover:bg-blue-50 hover:border-blue-300 transition-colors">
                    <div className="font-medium text-sm group-hover:text-blue-600">
                      {relatedSymbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Trade Plan
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
