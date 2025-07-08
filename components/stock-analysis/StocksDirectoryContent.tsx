'use client';

import { useState } from 'react';
import { TOP_STOCKS, TOP_ETFS, STOCK_CATEGORIES, getStocksByCategory } from '@/lib/stock-universe';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, TrendingUp, BarChart, Target, Globe, Filter } from 'lucide-react';
import Link from 'next/link';
import { HybridAdStrategy } from '@/components/ui/HybridAds';

export default function StocksDirectoryContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedMarketCap, setSelectedMarketCap] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('top-stocks');

  // Get unique sectors and market caps for filtering
  const allStocks = [...TOP_STOCKS, ...TOP_ETFS];
  const sectors = ['all', ...Array.from(new Set(allStocks.map(stock => stock.sector)))];
  const marketCaps = ['all', ...Array.from(new Set(allStocks.map(stock => stock.marketCap)))];

  // Filter stocks based on search and filters
  const getFilteredStocks = () => {
    let stocks = selectedCategory === 'top-stocks' ? TOP_STOCKS : 
                 selectedCategory === 'etfs' ? TOP_ETFS : 
                 getStocksByCategory(selectedCategory);

    return stocks.filter(stock => {
      const matchesSearch = stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = selectedSector === 'all' || stock.sector === selectedSector;
      const matchesMarketCap = selectedMarketCap === 'all' || stock.marketCap === selectedMarketCap;
      
      return matchesSearch && matchesSector && matchesMarketCap;
    });
  };

  const filteredStocks = getFilteredStocks();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Stock Analysis Directory
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Browse our complete directory of AI-powered stock analysis and trade plans. 
              Get professional insights for 500+ stocks including Apple, Tesla, Microsoft, and more.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search stocks by symbol or company name (e.g., AAPL, Apple, Tesla)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 text-lg"
                />
              </div>
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

      {/* Filter Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-700">Filter by:</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-stocks">Top Stocks</SelectItem>
                  <SelectItem value="etfs">ETFs</SelectItem>
                  <SelectItem value="ai-stocks">AI Stocks</SelectItem>
                  <SelectItem value="dividend-stocks">Dividend Stocks</SelectItem>
                  <SelectItem value="growth-stocks">Growth Stocks</SelectItem>
                  <SelectItem value="meme-stocks">Meme Stocks</SelectItem>
                  <SelectItem value="ev-stocks">EV Stocks</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map(sector => (
                    <SelectItem key={sector} value={sector}>
                      {sector === 'all' ? 'All Sectors' : sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedMarketCap} onValueChange={setSelectedMarketCap}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Market Cap" />
                </SelectTrigger>
                <SelectContent>
                  {marketCaps.map(cap => (
                    <SelectItem key={cap} value={cap}>
                      {cap === 'all' ? 'All Market Caps' : `${cap} Cap`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm text-gray-600">
              {filteredStocks.length} stocks found
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* Stock Categories Quick Links */}
        {!searchTerm && selectedCategory === 'top-stocks' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Stock Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(STOCK_CATEGORIES).map(([key, category]) => (
                <Card key={key} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {category.stocks.slice(0, 3).map(symbol => (
                        <Badge key={symbol} variant="outline" className="text-xs">
                          {symbol}
                        </Badge>
                      ))}
                      {category.stocks.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.stocks.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => setSelectedCategory(key)}
                    >
                      View {category.title}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Stocks Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'top-stocks' ? 'Top Stocks' :
               selectedCategory === 'etfs' ? 'Popular ETFs' :
               STOCK_CATEGORIES[selectedCategory as keyof typeof STOCK_CATEGORIES]?.title || 'Stocks'}
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredStocks.length} results
            </div>
          </div>

          {filteredStocks.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No stocks found</h3>
                <p className="text-gray-600">
                  Try adjusting your search terms or filters to find the stocks you&apos;re looking for.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStocks.map((stock) => (
                <Card key={stock.symbol} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{stock.symbol}</CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {stock.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{stock.name}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {stock.sector}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {stock.marketCap} Cap
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <Link href={`/stock/${stock.symbol}`}>
                          <Button className="w-full justify-start" size="sm">
                            <BarChart className="h-3 w-3 mr-2" />
                            View Analysis
                          </Button>
                        </Link>
                        <div className="grid grid-cols-2 gap-2">
                          <Link href={`/stock/${stock.symbol}/trade-plan`}>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Target className="h-3 w-3 mr-1" />
                              Trade Plan
                            </Button>
                          </Link>
                          <Link href={`/stock/${stock.symbol}/technical-analysis`}>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Technical
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Load More Button */}
        {filteredStocks.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Looking for more stocks? We have analysis for 500+ stocks and ETFs.
            </p>
            <Link href="/screener">
              <Button variant="outline" size="lg">
                <Search className="h-4 w-4 mr-2" />
                Use Stock Screener
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* SEO Content Section */}
      <section className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Professional Stock Analysis for Every Investor
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed mb-4">
                Our comprehensive stock analysis directory provides AI-powered insights for over 500 stocks and ETFs. 
                Whether you&apos;re looking for blue-chip stocks like Apple (AAPL) and Microsoft (MSFT), growth stocks like Tesla (TSLA) 
                and NVIDIA (NVDA), or dividend-focused investments, we have professional analysis to help guide your trading decisions.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">What You Get with Each Stock Analysis</h3>
              <ul className="text-gray-600 space-y-2 mb-6">
                <li>• <strong>AI-Enhanced Trade Plans:</strong> Entry zones, stop losses, and price targets</li>
                <li>• <strong>Technical Analysis:</strong> RSI, MACD, moving averages, and support/resistance levels</li>
                <li>• <strong>Risk Management:</strong> Position sizing and portfolio risk guidelines</li>
                <li>• <strong>Real-time News:</strong> Latest news and market developments affecting each stock</li>
                <li>• <strong>Trading Strategies:</strong> Specific guidance for swing trading and long-term investing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Popular Stock Categories</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Browse stocks by category to find opportunities that match your investment style. Our AI stocks category includes 
                leaders like NVIDIA, Google, and Microsoft. For income investors, explore our dividend stocks selection featuring 
                Johnson & Johnson, Coca-Cola, and other reliable dividend payers. Growth investors can find analysis for Tesla, 
                Amazon, and other high-growth companies.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use This Directory</h3>
              <p className="text-gray-600 leading-relaxed">
                Use the search function to quickly find any stock by symbol or company name. Filter by sector (Technology, Healthcare, 
                Financial Services) or market cap (Large, Mid, Small) to narrow down your options. Each stock page provides comprehensive 
                analysis including current price data, technical indicators, and AI-enhanced trade plans tailored to different time horizons.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
