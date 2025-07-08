'use client';

import { useState, useEffect } from 'react';
import { StockData } from '@/lib/stock-universe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, BarChart, Target, ArrowUpRight, ArrowDownRight, Info, Clock, Globe, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { HybridAdStrategy } from '@/components/ui/HybridAds';

interface StockAnalysisContentProps {
  stock: StockData;
}

export default function StockAnalysisContent({ stock }: StockAnalysisContentProps) {
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate stock price data (in production, fetch from real API)
  useEffect(() => {
    const mockPrice = Math.random() * 200 + 50; // Random price between $50-$250
    const mockChange = (Math.random() - 0.5) * 10; // Random change ±$5
    
    setTimeout(() => {
      setCurrentPrice(mockPrice);
      setPriceChange(mockChange);
      setLoading(false);
    }, 500);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)} (${sign}${((change / (currentPrice || 1)) * 100).toFixed(2)}%)`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stock Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                  {stock.symbol}
                </h1>
                <Badge variant="outline" className="text-sm">
                  {stock.type} • {stock.exchange}
                </Badge>
              </div>
              <h2 className="text-xl text-gray-600 mb-4">
                {stock.name}
              </h2>
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="secondary">{stock.sector}</Badge>
                <Badge variant="outline">{stock.marketCap} Cap</Badge>
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-6 bg-gray-200 animate-pulse rounded"></div>
                    <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold">
                      {currentPrice ? formatPrice(currentPrice) : 'N/A'}
                    </span>
                    {priceChange !== null && (
                      <div className={`flex items-center gap-1 ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {priceChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                        <span className="font-medium">{formatChange(priceChange)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href={`/stock/${stock.symbol}/trade-plan`}>
                <Button size="lg" className="w-full sm:w-auto">
                  <Target className="h-4 w-4 mr-2" />
                  Generate Trade Plan
                </Button>
              </Link>
              <Link href={`/stock/${stock.symbol}/technical-analysis`}>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <BarChart className="h-4 w-4 mr-2" />
                  Technical Analysis
                </Button>
              </Link>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Analysis Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* AI Trade Plan Preview */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    AI-Enhanced {stock.symbol} Trade Plan
                  </CardTitle>
                  <Badge variant="default">Free Preview</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Get a comprehensive, AI-powered trade plan for {stock.name} ({stock.symbol}) including 
                    entry zones, stop losses, price targets, and risk management strategies. Our advanced 
                    algorithms analyze technical indicators, market sentiment, and historical patterns.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-900 mb-1">Entry Analysis</h4>
                      <p className="text-sm text-blue-700">Optimal entry zones and timing</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-900 mb-1">Risk Management</h4>
                      <p className="text-sm text-green-700">Stop losses and position sizing</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-900 mb-1">Price Targets</h4>
                      <p className="text-sm text-purple-700">Multiple exit strategies</p>
                    </div>
                  </div>

                  <Link href={`/stock/${stock.symbol}/trade-plan`}>
                    <Button className="w-full mt-4">
                      Generate Full Trade Plan for {stock.symbol}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Technical Analysis Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-green-600" />
                  {stock.symbol} Technical Analysis Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Key Technical Indicators</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">RSI (14)</span>
                          <span className="text-sm font-medium">52.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">MACD</span>
                          <span className="text-sm font-medium text-green-600">Bullish</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Moving Avg (50)</span>
                          <span className="text-sm font-medium">Above</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Volume Trend</span>
                          <span className="text-sm font-medium text-blue-600">Increasing</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-3">Support & Resistance</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Resistance 1</span>
                          <span className="text-sm font-medium">{currentPrice ? formatPrice(currentPrice * 1.05) : 'Loading...'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Resistance 2</span>
                          <span className="text-sm font-medium">{currentPrice ? formatPrice(currentPrice * 1.12) : 'Loading...'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Support 1</span>
                          <span className="text-sm font-medium">{currentPrice ? formatPrice(currentPrice * 0.95) : 'Loading...'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Support 2</span>
                          <span className="text-sm font-medium">{currentPrice ? formatPrice(currentPrice * 0.88) : 'Loading...'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link href={`/stock/${stock.symbol}/technical-analysis`}>
                    <Button variant="outline" className="w-full">
                      View Complete Technical Analysis
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Stock News Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-orange-600" />
                  Latest {stock.symbol} News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Mock news items - in production, fetch real news */}
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {stock.name} Reports Q4 Earnings Beat Expectations
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Company shows strong revenue growth and positive outlook for 2025...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>2 hours ago</span>
                      <span>•</span>
                      <span>MarketWatch</span>
                    </div>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-medium text-gray-900 mb-1">
                      Analysts Upgrade {stock.symbol} Price Target
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Multiple Wall Street firms raise price targets following strong performance...
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>5 hours ago</span>
                      <span>•</span>
                      <span>Bloomberg</span>
                    </div>
                  </div>

                  <Link href={`/stock/${stock.symbol}/news`}>
                    <Button variant="outline" className="w-full mt-4">
                      View All {stock.symbol} News
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* How to Trade Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-purple-600" />
                  How to Trade {stock.symbol} Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    Trading {stock.name} ({stock.symbol}) requires understanding the {stock.sector} sector dynamics, 
                    company fundamentals, and market conditions. Here&apos;s a comprehensive guide to trading {stock.symbol} stock effectively.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">For Swing Traders</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Monitor {stock.sector} sector trends</li>
                        <li>• Watch for earnings announcements</li>
                        <li>• Use 3-5% stop losses</li>
                        <li>• Hold positions 3-10 days</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900">For Long-term Investors</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Analyze company fundamentals</li>
                        <li>• Consider dollar-cost averaging</li>
                        <li>• Focus on business growth</li>
                        <li>• Hold for months or years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Cap</span>
                    <span className="text-sm font-medium">{stock.marketCap}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sector</span>
                    <span className="text-sm font-medium">{stock.sector}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Exchange</span>
                    <span className="text-sm font-medium">{stock.exchange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium">{stock.type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad Section */}
            <HybridAdStrategy>
              <div className="bg-gray-100 h-32 flex items-center justify-center text-gray-500">
                Sidebar Ad
              </div>
            </HybridAdStrategy>

            {/* Related Tools */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Link href="/screener">
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart className="h-4 w-4 mr-2" />
                      Stock Screener
                    </Button>
                  </Link>
                  <Link href="/market-movers">
                    <Button variant="outline" className="w-full justify-start">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Market Movers
                    </Button>
                  </Link>
                  <Link href="/news">
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="h-4 w-4 mr-2" />
                      Market News
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Similar Stocks */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Similar {stock.sector} Stocks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {/* Mock related stocks - in production, fetch from stock universe */}
                  <Link href="/stock/AAPL" className="block p-2 hover:bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">AAPL</span>
                      <span className="text-sm text-gray-600">Apple Inc.</span>
                    </div>
                  </Link>
                  <Link href="/stock/MSFT" className="block p-2 hover:bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">MSFT</span>
                      <span className="text-sm text-gray-600">Microsoft Corp.</span>
                    </div>
                  </Link>
                  <Link href="/stock/GOOGL" className="block p-2 hover:bg-gray-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">GOOGL</span>
                      <span className="text-sm text-gray-600">Alphabet Inc.</span>
                    </div>
                  </Link>
                </div>
                <Link href={`/stocks/sector/${stock.sector.toLowerCase().replace(' ', '-')}`}>
                  <Button variant="outline" className="w-full mt-3">
                    View All {stock.sector} Stocks
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
