/**
 * Stock Universe - Stock data and SEO utilities
 * Provides stock information and SEO data generation for stock pages
 */

import { TOP_100_STOCKS } from '@/lib/config/top-stocks';

// Export TOP_100_STOCKS as STOCK_UNIVERSE for compatibility
export const STOCK_UNIVERSE = TOP_100_STOCKS;

// Type definitions
export interface StockInfo {
  symbol: string;
  name: string;
  sector?: string;
  marketCap?: number;
}

export interface StockSEOData {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
}

// Interface for stock data used by components (compatibility)
export interface StockData {
  symbol: string;
  name: string;
  type: 'Stock' | 'ETF';
  exchange: 'NYSE' | 'NASDAQ' | 'AMEX';
  sector: string;
  marketCap: 'Large' | 'Mid' | 'Small' | 'Micro';
}

// Company names mapping
const COMPANY_NAMES: { [key: string]: string } = {
  'AAPL': 'Apple Inc.',
  'MSFT': 'Microsoft Corporation',
  'GOOGL': 'Alphabet Inc.',
  'AMZN': 'Amazon.com Inc.',
  'TSLA': 'Tesla Inc.',
  'META': 'Meta Platforms Inc.',
  'NVDA': 'NVIDIA Corporation',
  'NFLX': 'Netflix Inc.',
  'AMD': 'Advanced Micro Devices Inc.',
  'CRM': 'Salesforce Inc.',
  'ORCL': 'Oracle Corporation',
  'ADBE': 'Adobe Inc.',
  'PYPL': 'PayPal Holdings Inc.',
  'INTC': 'Intel Corporation',
  'CSCO': 'Cisco Systems Inc.',
  'PEP': 'PepsiCo Inc.',
  'AVGO': 'Broadcom Inc.',
  'TXN': 'Texas Instruments Inc.',
  'QCOM': 'Qualcomm Inc.',
  'COST': 'Costco Wholesale Corporation',
  'SPY': 'SPDR S&P 500 ETF',
  'QQQ': 'Invesco QQQ ETF',
  'IWM': 'iShares Russell 2000 ETF',
  'VTI': 'Vanguard Total Stock Market ETF',
};

// Convert TOP_100_STOCKS to StockData format
export const TOP_STOCKS: StockData[] = TOP_100_STOCKS.map(stock => ({
  symbol: stock.symbol,
  name: COMPANY_NAMES[stock.symbol] || `${stock.symbol} Corporation`,
  type: ['SPY', 'QQQ', 'IWM', 'VTI'].includes(stock.symbol) ? 'ETF' : 'Stock',
  exchange: 'NASDAQ',
  sector: stock.sector || 'Technology',
  marketCap: 'Large',
}));

// ETF data
export const TOP_ETFS: StockData[] = TOP_STOCKS.filter(stock => stock.type === 'ETF');

// Stock categories for navigation
export const STOCK_CATEGORIES = {
  'mega-cap': {
    title: 'Mega Cap Stocks',
    description: 'Largest companies by market capitalization',
    stocks: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA']
  },
  'tech': {
    title: 'Technology Stocks', 
    description: 'Leading technology and software companies',
    stocks: ['AAPL', 'MSFT', 'GOOGL', 'META', 'NVDA', 'AMD', 'ORCL', 'ADBE', 'CRM', 'INTC']
  },
  'healthcare': {
    title: 'Healthcare Stocks',
    description: 'Pharmaceutical and healthcare companies', 
    stocks: ['JNJ', 'PFE', 'UNH', 'ABBV', 'BMY', 'MRK', 'TMO', 'ABT', 'DHR', 'ISRG']
  },
  'finance': {
    title: 'Financial Stocks',
    description: 'Banks and financial services companies',
    stocks: ['JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'COF', 'USB', 'TFC', 'PNC']
  },
  'consumer': {
    title: 'Consumer Stocks', 
    description: 'Consumer goods and retail companies',
    stocks: ['AMZN', 'TSLA', 'HD', 'MCD', 'NKE', 'SBUX', 'DIS', 'COST', 'WMT', 'TGT']
  },
  'energy': {
    title: 'Energy Stocks',
    description: 'Oil, gas and renewable energy companies', 
    stocks: ['XOM', 'CVX', 'COP', 'EOG', 'SLB', 'PSX', 'VLO', 'MPC', 'OXY', 'HAL']
  },
  'etfs': {
    title: 'Popular ETFs',
    description: 'Exchange-traded funds for diversified exposure',
    stocks: ['SPY', 'QQQ', 'IWM', 'VTI', 'VOO', 'VEA', 'VWO', 'EFA', 'EEM', 'GLD']
  }
};

// Helper function to get stocks by category
export const getStocksByCategory = (category: string): StockData[] => {
  const categoryData = STOCK_CATEGORIES[category as keyof typeof STOCK_CATEGORIES];
  if (!categoryData) return [];
  
  return categoryData.stocks.map(symbol => {
    const stockData = TOP_STOCKS.find(s => s.symbol === symbol) || TOP_ETFS.find(s => s.symbol === symbol);
    return stockData || {
      symbol,
      name: `${symbol} Corporation`,
      sector: 'Technology',
      marketCap: 'Large' as const,
      type: 'Stock' as const,
      exchange: 'NASDAQ' as const
    };
  });
};

/**
 * Get stock information by symbol
 */
export function getStockBySymbol(symbol: string): StockInfo | null {
  const stock = TOP_100_STOCKS.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());
  if (!stock) return null;
  
  return {
    symbol: stock.symbol,
    name: stock.symbol, // Use symbol as name for now
    sector: stock.sector,
    marketCap: stock.marketCap
  };
}

/**
 * Generate SEO data for a stock
 */
export function generateStockSEOData(symbol: string): StockSEOData | null {
  const stock = getStockBySymbol(symbol);
  if (!stock) return null;
  
  return {
    title: `${stock.symbol} Stock Analysis - ${stock.symbol} Price, Charts & News | TradeCraft Pro`,
    description: `Comprehensive analysis of ${stock.symbol} stock. Get real-time price, technical indicators, trade plans, and market news for ${stock.symbol}.`,
    keywords: [
      `${stock.symbol} stock`,
      `${stock.symbol} analysis`,
      `${stock.symbol} price`,
      `${stock.symbol} news`,
      `${stock.symbol} chart`,
      `${stock.symbol} technical analysis`,
      `${stock.symbol} trading`,
      `${stock.symbol} forecast`,
      `${stock.symbol} buy sell`,
      `${stock.symbol} investment`,
      `${stock.symbol} stock price today`
    ],
    canonicalUrl: `https://www.tradingsetup.pro/stock/${symbol.toLowerCase()}`
  };
}

/**
 * Check if a stock symbol is valid
 */
export function isValidStock(symbol: string): boolean {
  return getStockBySymbol(symbol) !== null;
}

/**
 * Get stocks by sector
 */
export function getStocksBySector(sector: string): StockInfo[] {
  return TOP_100_STOCKS
    .filter(stock => stock.sector === sector)
    .map(stock => ({
      symbol: stock.symbol,
      name: stock.symbol, // Use symbol as name for now
      sector: stock.sector,
      marketCap: stock.marketCap
    }));
}

/**
 * Get top stocks by market cap
 */
export function getTopStocksByMarketCap(limit: number = 50): StockInfo[] {
  return TOP_100_STOCKS
    .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
    .slice(0, limit)
    .map(stock => ({
      symbol: stock.symbol,
      name: stock.symbol, // Use symbol as name for now
      sector: stock.sector,
      marketCap: stock.marketCap
    }));
}
