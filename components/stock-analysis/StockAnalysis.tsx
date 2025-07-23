'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, BarChart, Target, AlertTriangle } from 'lucide-react';
import type { StockAnalysis as StockAnalysisType } from '@/lib/stock-analysis';

interface StockAnalysisProps {
  analysis: StockAnalysisType;
}

export function StockAnalysis({ analysis }: StockAnalysisProps) {
  const getScoreColor = (score: 'low' | 'medium' | 'high') => {
    switch (score) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toFixed(2);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">{analysis.symbol}</CardTitle>
              <p className="text-lg text-muted-foreground">{analysis.name}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">${analysis.metrics.currentPrice}</div>
              <div className={`flex items-center ${analysis.metrics.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analysis.metrics.priceChange >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                ${analysis.metrics.priceChange} ({analysis.metrics.priceChangePercent}%)
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Scorecard */}
      <Card>
        <CardHeader>
          <CardTitle>Analysis Scorecard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Performance</span>
                <Badge className={getScoreColor(analysis.scorecard.performance.score)}>
                  {analysis.scorecard.performance.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{analysis.scorecard.performance.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Valuation</span>
                <Badge className={getScoreColor(analysis.scorecard.valuation.score)}>
                  {analysis.scorecard.valuation.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{analysis.scorecard.valuation.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Growth</span>
                <Badge className={getScoreColor(analysis.scorecard.growth.score)}>
                  {analysis.scorecard.growth.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{analysis.scorecard.growth.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Profitability</span>
                <Badge className={getScoreColor(analysis.scorecard.profitability.score)}>
                  {analysis.scorecard.profitability.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{analysis.scorecard.profitability.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Entry Point</span>
                <Badge className={getScoreColor(analysis.scorecard.entryPoint.score)}>
                  {analysis.scorecard.entryPoint.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{analysis.scorecard.entryPoint.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Red Flags</span>
                <Badge className={getScoreColor(analysis.scorecard.redFlags.score)}>
                  {analysis.scorecard.redFlags.score}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{analysis.scorecard.redFlags.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Valuation Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Market Cap</span>
                <span className="font-medium">${formatNumber(analysis.metrics.marketCap)}</span>
              </div>
              <div className="flex justify-between">
                <span>P/E Ratio</span>
                <span className="font-medium">{analysis.metrics.peRatio}</span>
              </div>
              <div className="flex justify-between">
                <span>P/B Ratio</span>
                <span className="font-medium">{analysis.metrics.pbRatio}</span>
              </div>
              <div className="flex justify-between">
                <span>Dividend Yield</span>
                <span className="font-medium">{analysis.metrics.dividendYield}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="w-5 h-5 mr-2" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>1 Day</span>
                <span className={`font-medium ${analysis.metrics.returns.oneDay >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.metrics.returns.oneDay >= 0 ? '+' : ''}{analysis.metrics.returns.oneDay}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>1 Week</span>
                <span className={`font-medium ${analysis.metrics.returns.oneWeek >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.metrics.returns.oneWeek >= 0 ? '+' : ''}{analysis.metrics.returns.oneWeek}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>1 Month</span>
                <span className={`font-medium ${analysis.metrics.returns.oneMonth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.metrics.returns.oneMonth >= 0 ? '+' : ''}{analysis.metrics.returns.oneMonth}%
                </span>
              </div>
              <div className="flex justify-between">
                <span>1 Year</span>
                <span className={`font-medium ${analysis.metrics.returns.oneYear >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analysis.metrics.returns.oneYear >= 0 ? '+' : ''}{analysis.metrics.returns.oneYear}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analyst Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Analyst Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{analysis.metrics.analystRecommendations.buy}</div>
              <div className="text-sm text-muted-foreground">Buy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{analysis.metrics.analystRecommendations.hold}</div>
              <div className="text-sm text-muted-foreground">Hold</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{analysis.metrics.analystRecommendations.sell}</div>
              <div className="text-sm text-muted-foreground">Sell</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{analysis.metrics.analystRecommendations.total}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
          <div className="text-center">
            <Badge variant="secondary" className="text-lg">
              {analysis.metrics.analystRecommendations.buyPercentage}% Buy Rating
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Peer Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Peer Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Company</th>
                  <th className="text-right py-2">P/E Ratio</th>
                  <th className="text-right py-2">1Y Return</th>
                  <th className="text-right py-2">Buy %</th>
                </tr>
              </thead>
              <tbody>
                {analysis.peers.map((peer, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">
                      <div>
                        <div className="font-medium">{peer.symbol}</div>
                        <div className="text-sm text-muted-foreground">{peer.name}</div>
                      </div>
                    </td>
                    <td className="text-right py-2">{peer.peRatio}</td>
                    <td className={`text-right py-2 ${peer.oneYearReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {peer.oneYearReturn >= 0 ? '+' : ''}{peer.oneYearReturn}%
                    </td>
                    <td className="text-right py-2">{peer.buyRecommendationPercentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
