'use client';

import { useState } from 'react';
import { StockData } from '@/lib/stock-universe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Target, AlertTriangle, Info, ArrowUpRight, ArrowDownRight, DollarSign, BarChart } from 'lucide-react';
import Link from 'next/link';
import { HybridAdStrategy } from '@/components/ui/HybridAds';

interface StockTradePlanContentProps {
  stock: StockData;
}

type TimeHorizon = 'swing' | 'positional' | 'longterm';

export default function StockTradePlanContent({ stock }: StockTradePlanContentProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeHorizon>('swing');
  const [loading, setLoading] = useState(false);

  // Mock trade plan data (in production, generate from real AI/API)
  const generateMockTradePlan = (timeframe: TimeHorizon) => {
    const basePrice = Math.random() * 200 + 50;
    const volatility = timeframe === 'swing' ? 0.05 : timeframe === 'positional' ? 0.08 : 0.12;
    
    return {
      direction: Math.random() > 0.5 ? 'bullish' : 'bearish',
      confidenceLevel: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
      entryZone: {
        low: basePrice * (1 - volatility * 0.5),
        high: basePrice * (1 + volatility * 0.5)
      },
      stopLoss: basePrice * (1 - volatility),
      targets: [
        { price: basePrice * (1 + volatility * 1.5), probability: 75 },
        { price: basePrice * (1 + volatility * 2.5), probability: 50 },
        { price: basePrice * (1 + volatility * 3.5), probability: 25 }
      ],
      riskReward: 2.5,
      positionSize: 3.2,
      timeframe: timeframe
    };
  };

  const [tradePlan] = useState(() => generateMockTradePlan(selectedTimeframe));

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleTimeframeChange = (value: TimeHorizon) => {
    setSelectedTimeframe(value);
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => setLoading(false), 1000);
  };

  const getTimeframeDescription = (timeframe: TimeHorizon) => {
    switch (timeframe) {
      case 'swing':
        return 'Short-term trade (3-10 days)';
      case 'positional':
        return 'Medium-term trade (2-6 weeks)';
      case 'longterm':
        return 'Long-term investment (2-6+ months)';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {stock.symbol} Trade Plan
              </h1>
              <p className="text-xl text-gray-600 mb-4">
                AI-Enhanced Trading Strategy for {stock.name}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="secondary">{stock.sector}</Badge>
                <Badge variant="outline">{stock.marketCap} Cap</Badge>
                <Badge variant="default">AI-Powered</Badge>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Select value={selectedTimeframe} onValueChange={handleTimeframeChange}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="swing">Swing Trading (3-10 days)</SelectItem>
                  <SelectItem value="positional">Positional (2-6 weeks)</SelectItem>
                  <SelectItem value="longterm">Long-term (2-6+ months)</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-600 text-center">
                {getTimeframeDescription(selectedTimeframe)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Section */}
      <HybridAdStrategy>
        <div className="bg-gray-100 h-24 flex items-center justify-center text-gray-500">
          Ad Space
        </div>
      </HybridAdStrategy>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Generating trade plan for {stock.symbol}...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Trade Plan */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Market Outlook */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      Market Outlook
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={tradePlan.direction === 'bullish' ? 'default' : 'destructive'}>
                        {tradePlan.direction === 'bullish' ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {tradePlan.direction.toUpperCase()}
                      </Badge>
                      <Badge variant="outline">
                        {tradePlan.confidenceLevel.toUpperCase()} Confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      Based on our AI analysis of {stock.name} ({stock.symbol}), we have identified a{' '}
                      <strong>{tradePlan.direction}</strong> opportunity with{' '}
                      <strong>{tradePlan.confidenceLevel}</strong> confidence for the{' '}
                      <strong>{selectedTimeframe}</strong> timeframe. The analysis considers technical indicators, 
                      market sentiment, sector performance, and historical patterns.
                    </p>
                    
                    {tradePlan.confidenceLevel === 'high' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-900 mb-2">High Confidence Signal</h4>
                        <p className="text-sm text-green-800">
                          Multiple indicators align for this trade setup. Consider entering with standard position sizing.
                        </p>
                      </div>
                    )}
                    
                    {tradePlan.confidenceLevel === 'medium' && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-semibold text-yellow-900 mb-2">Medium Confidence Signal</h4>
                        <p className="text-sm text-yellow-800">
                          Some indicators align. Consider smaller position size or wait for additional confirmation.
                        </p>
                      </div>
                    )}
                    
                    {tradePlan.confidenceLevel === 'low' && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="font-semibold text-red-900 mb-2">Low Confidence Signal</h4>
                        <p className="text-sm text-red-800">
                          Mixed signals detected. Consider avoiding this trade or using minimal position size for learning.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Trade Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Trade Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Entry & Exit */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Entry Zone
                        </h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-blue-700">Buy Range:</span>
                            <span className="font-semibold text-blue-900">
                              {formatPrice(tradePlan.entryZone.low)} - {formatPrice(tradePlan.entryZone.high)}
                            </span>
                          </div>
                          <p className="text-xs text-blue-600">
                            Enter when price moves into this zone with volume confirmation
                          </p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Stop Loss
                        </h4>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-red-700">Stop Loss:</span>
                            <span className="font-semibold text-red-900">
                              {formatPrice(tradePlan.stopLoss)}
                            </span>
                          </div>
                          <p className="text-xs text-red-600">
                            Exit immediately if price drops below this level
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Targets */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Price Targets
                      </h4>
                      <div className="space-y-3">
                        {tradePlan.targets.map((target, index) => (
                          <div key={index} className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm text-green-700">Target {index + 1}:</span>
                              <span className="font-semibold text-green-900">
                                {formatPrice(target.price)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-green-600">Probability:</span>
                              <span className="text-xs font-medium text-green-800">{target.probability}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Management */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-purple-600" />
                    Risk Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-1">Risk/Reward</h4>
                        <p className="text-2xl font-bold text-purple-700">{tradePlan.riskReward}:1</p>
                        <p className="text-xs text-purple-600 mt-1">Excellent ratio</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-1">Position Size</h4>
                        <p className="text-2xl font-bold text-blue-700">{tradePlan.positionSize}%</p>
                        <p className="text-xs text-blue-600 mt-1">Of portfolio</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <h4 className="font-semibold text-amber-900 mb-1">Max Risk</h4>
                        <p className="text-2xl font-bold text-amber-700">0.5%</p>
                        <p className="text-xs text-amber-600 mt-1">Per trade</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-amber-900 mb-1">Important Risk Guidelines</h4>
                        <ul className="text-sm text-amber-800 space-y-1">
                          <li>• Never risk more than 0.5% of your total portfolio on any single trade</li>
                          <li>• Keep total open risk across all positions under 5% of portfolio</li>
                          <li>• Always use stop losses and stick to your plan</li>
                          <li>• Consider market conditions and your risk tolerance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Trading Strategy Guide */}
              <Card>
                <CardHeader>
                  <CardTitle>How to Execute This {stock.symbol} Trade Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3">Step-by-Step Execution</h4>
                      <ol className="space-y-3 text-sm">
                        <li className="flex gap-3">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</span>
                          <div>
                            <strong>Monitor Entry Zone:</strong> Watch for {stock.symbol} to move into the {formatPrice(tradePlan.entryZone.low)} - {formatPrice(tradePlan.entryZone.high)} range
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</span>
                          <div>
                            <strong>Confirm Volume:</strong> Look for increased volume when price enters the entry zone
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</span>
                          <div>
                            <strong>Place Orders:</strong> Enter your position and immediately set stop loss at {formatPrice(tradePlan.stopLoss)}
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">4</span>
                          <div>
                            <strong>Manage Targets:</strong> Take partial profits at each target level ({formatPrice(tradePlan.targets[0].price)}, {formatPrice(tradePlan.targets[1].price)}, {formatPrice(tradePlan.targets[2].price)})
                          </div>
                        </li>
                        <li className="flex gap-3">
                          <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">5</span>
                          <div>
                            <strong>Review & Learn:</strong> Document the trade outcome and analyze what worked or didn&apos;t work
                          </div>
                        </li>
                      </ol>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Trade Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trade Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Symbol:</span>
                      <span className="font-medium">{stock.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Direction:</span>
                      <Badge variant={tradePlan.direction === 'bullish' ? 'default' : 'destructive'} className="text-xs">
                        {tradePlan.direction}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Timeframe:</span>
                      <span className="font-medium">{selectedTimeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Confidence:</span>
                      <Badge variant="outline" className="text-xs">
                        {tradePlan.confidenceLevel}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk/Reward:</span>
                      <span className="font-medium">{tradePlan.riskReward}:1</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sidebar Ad */}
              <HybridAdStrategy>
                <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-500">
                  Sidebar Ad
                </div>
              </HybridAdStrategy>

              {/* Related Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Link href={`/stock/${stock.symbol}`}>
                      <Button variant="outline" className="w-full justify-start">
                        <BarChart className="h-4 w-4 mr-2" />
                        View Full Analysis
                      </Button>
                    </Link>
                    <Link href={`/stock/${stock.symbol}/technical-analysis`}>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Technical Analysis
                      </Button>
                    </Link>
                    <Link href={`/stock/${stock.symbol}/news`}>
                      <Button variant="outline" className="w-full justify-start">
                        <Info className="h-4 w-4 mr-2" />
                        Latest News
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-amber-700">
                    <AlertTriangle className="h-4 w-4 inline mr-2" />
                    Important Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    This trade plan is for educational purposes only and should not be considered as financial advice. 
                    Always do your own research and consider your risk tolerance before making any trading decisions. 
                    Past performance does not guarantee future results.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
