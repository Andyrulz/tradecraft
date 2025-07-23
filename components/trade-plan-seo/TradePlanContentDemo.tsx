"use client";

import { useEffect, useState, useCallback, useRef } from 'react';
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

interface TradePlanContentDemoProps {
  symbol: string;
  initialCachedData?: any;
}

export function TradePlanContentDemo({ symbol, initialCachedData }: TradePlanContentDemoProps) {
  // SECURITY: Demo component should ONLY work with TSLA
  if (symbol.toUpperCase() !== 'TSLA') {
    console.error('SECURITY VIOLATION: Demo component called with non-TSLA symbol:', symbol);
    throw new Error('Demo is only available for TSLA');
  }

  const [tradePlan, setTradePlan] = useState<any>(initialCachedData || null);
  const [loading, setLoading] = useState(!initialCachedData);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'live' | 'cached' | 'error'>(
    initialCachedData ? 'cached' : 'live'
  );
  const initializedRef = useRef(false);
  const tradePlanRef = useRef(tradePlan);

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
  }, [initialCachedData]);

  const fetchTradePlan = useCallback(async () => {
    // Always try to get live data, even if we have cached data
    try {
      setError(null);
      
      // Only show loading if we don't have any data
      if (!tradePlanRef.current && !initialCachedData) {
        setLoading(true);
      }

      console.log('Fetching demo trade plan for:', symbol);

      // Call the demo API endpoint specifically
      const response = await fetch('/api/trade-plan/demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: symbol,
          horizon: 'swing',
        }),
      });

      console.log('Demo API response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Demo API error:', errorData);
        throw new Error(errorData.error || 'Failed to generate demo trade plan');
      }

      const data = await response.json();
      console.log('Demo API success:', { hasTradePlan: !!data.tradePlan, symbol: data.symbol });
      
      setTradePlan(data.tradePlan || data);
      setDataSource('live');
      setLoading(false);
      
    } catch (err) {
      console.error('Failed to fetch demo trade plan:', err);
      
      // If we have cached data from SSR or state, keep it and just update the source
      if (tradePlanRef.current || initialCachedData) {
        console.log('Using cached data due to fetch error');
        setDataSource('cached');
        setLoading(false);
      } else {
        // No data available at all
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error('No fallback data available, showing error:', errorMessage);
        setError(errorMessage);
        setDataSource('error');
        setLoading(false);
      }
    }
  }, [symbol, initialCachedData]);

  useEffect(() => {
    // OPTIMIZATION: Only fetch if we don't have initial cached data
    // This prevents duplicate API calls when SSR provides data
    if (!initialCachedData) {
      console.log('🔄 No initial cached data - fetching demo trade plan');
      fetchTradePlan();
    } else {
      console.log('✅ Using initial cached data for demo - skipping API call');
    }
  }, [fetchTradePlan, initialCachedData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <h1 className="text-2xl font-bold">Generating {symbol} Demo Trade Plan...</h1>
        <p className="text-muted-foreground text-center max-w-md">
          AI is analyzing real-time market data to create your demo trading strategy.
        </p>
      </div>
    );
  }

  if (error || !tradePlan) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-red-600">Demo Temporarily Unavailable</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              We couldn&apos;t generate the demo trade plan for {symbol}. This might be temporary.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/trade-plan/start-here">
                <Button className="w-full">
                  Try Full Trade Plan Generator
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Back to Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
          <Badge className="bg-green-100 text-green-800 border-green-300">Live Demo</Badge>
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

      {/* Demo-specific content section */}
      <Card>
        <CardHeader>
          <CardTitle>About This {symbol} Demo Trade Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This {symbol} demo trade plan showcases the full power of TradeCraft&apos;s AI using real market data. 
            Our production algorithms analyze technical indicators, price action patterns, volume, 
            support and resistance levels, and volatility metrics to create comprehensive trading strategies.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">What&apos;s Included in Full Access:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Unlimited trade plans for any stock symbol</li>
                <li>• Advanced stock screener with custom filters</li>
                <li>• Real-time market data and alerts</li>
                <li>• Portfolio tracking and management</li>
                <li>• Risk management tools and calculators</li>
                <li>• Priority customer support</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">How This Demo Works:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Uses the same AI technology as paid plans</li>
                <li>• Real TSLA market data and analysis</li>
                <li>• Professional-grade trading recommendations</li>
                <li>• Live technical indicators and signals</li>
                <li>• Comprehensive risk assessment</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Demo Notice:</strong> This trade plan uses real market data and our production AI algorithms 
              for demonstration purposes. Sign in to get started, or upgrade to Pro/Premium plans for unlimited trade plans.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
