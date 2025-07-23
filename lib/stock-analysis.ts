/**
 * Type definitions for stock analysis data structures
 */

export interface StockAnalysis {
  symbol: string;
  name: string;
  metrics: {
    currentPrice: number;
    priceChange: number;
    priceChangePercent: number;
    marketCap: number;
    peRatio: string | number;
    pbRatio: string | number;
    dividendYield: string | number;
    returns: {
      oneDay: number;
      oneWeek: number;
      oneMonth: number;
      oneYear: number;
    };
    analystRecommendations: {
      buy: number;
      hold: number;
      sell: number;
      total: number;
      buyPercentage: string | number;
    };
  };
  scorecard: {
    performance: {
      score: 'low' | 'medium' | 'high';
      description: string;
    };
    valuation: {
      score: 'low' | 'medium' | 'high';
      description: string;
    };
    growth: {
      score: 'low' | 'medium' | 'high';
      description: string;
    };
    profitability: {
      score: 'low' | 'medium' | 'high';
      description: string;
    };
    entryPoint: {
      score: 'low' | 'medium' | 'high';
      description: string;
    };
    redFlags: {
      score: 'low' | 'medium' | 'high';
      description: string;
    };
  };
  peers: PeerComparison[];
}

export interface PeerComparison {
  symbol: string;
  name: string;
  peRatio: string | number;
  oneYearReturn: number;
  buyRecommendationPercentage: string | number;
}

// Re-export the main type as default for convenience
export type { StockAnalysis as default };
