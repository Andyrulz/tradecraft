'use client';

import { useEffect, useState } from 'react';
import { TradePlan, TimeHorizon } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, DollarSign, LineChart, Target, AlertTriangle, Info, BarChart, Copy, CheckCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { StockMetrics } from '@/lib/types';

interface TradingRecommendationProps {
  tradePlan: TradePlan;
  onTimeframeChange?: (timeframe: TimeHorizon) => void;
}

export function TradingRecommendation({ tradePlan, onTimeframeChange }: TradingRecommendationProps) {
  const [selectedTimeframe, setSelectedTimeframe] = useState<TimeHorizon>(tradePlan?.timeHorizon ?? 'swing');
  const [metrics, setMetrics] = useState<StockMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedValues, setCopiedValues] = useState<Record<string, boolean>>({});

  const handleTimeframeChange = (value: TimeHorizon) => {
    setSelectedTimeframe(value);
    onTimeframeChange?.(value);
  };

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedValues(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedValues(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(`/api/stock-metrics?symbol=${tradePlan.symbol}&timeframe=${selectedTimeframe}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch stock data');
        }
        setMetrics(data.metrics);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stock data');
        console.error('Error fetching stock data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [tradePlan.symbol, selectedTimeframe]);

  const getDirectionIcon = () => {
    switch (tradePlan.direction) {
      case 'bullish':
        return <ArrowUpRight className="h-5 w-5 text-green-500" />;
      case 'bearish':
        return <ArrowDownRight className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTimeframeDescription = () => {
    switch (tradePlan.timeHorizon) {
      case 'swing':
        return 'Short-term trade (3-10 days)';
      case 'positional':
        return 'Medium-term trade (2-6 weeks)';
      case 'longterm':
        return 'Long-term trade (2-6+ months)';
      default:
        return '';
    }
  };

  const getConfidenceColor = () => {
    switch (tradePlan.confidenceLevel) {
      case 'high':
        return 'bg-slate-100 text-slate-800';
      case 'medium':
        return 'bg-slate-100 text-slate-700';
      case 'low':
        return 'bg-slate-100 text-slate-600';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatNumber = (value: number | undefined, options: Intl.NumberFormatOptions = {}) => {
    if (value === undefined || isNaN(value)) return 'N/A';
    // Always use USD for US stocks
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      ...options
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Market Outlook with Progressive Disclosure */}
      <Card className="transition-all duration-300 hover:shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <LineChart className="h-6 w-6 text-blue-600" />
              Market Analysis
            </CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm font-medium border-blue-200 text-blue-700">
                {getTimeframeDescription()}
              </Badge>
              {getDirectionIcon()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Simplified Market Context */}
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold mb-2 flex items-center gap-2 text-blue-800">
                <TrendingUp className="h-4 w-4" />
                Market Context
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                {tradePlan.summary
                  .split(/(?<=[.!?])\s+/)
                  .filter(line =>
                    !/\b(entry|stop[- ]?loss|target|exit)\b/i.test(line)
                  )
                  .slice(0, 2) // Only show first 2 sentences
                  .join(' ')
                }
              </p>
            </div>

            {/* Action-Oriented Recommendation */}
            <div className={`p-4 rounded-xl border-2 ${
              tradePlan.confidenceLevel === 'high' ? 'bg-slate-50 border-slate-200' :
              tradePlan.confidenceLevel === 'medium' ? 'bg-slate-50 border-slate-200' :
              'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {tradePlan.confidenceLevel === 'high' ? (
                    <div className="h-6 w-6 rounded-full bg-slate-500 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  ) : tradePlan.confidenceLevel === 'medium' ? (
                    <div className="h-6 w-6 rounded-full bg-slate-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-slate-400 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">⚠</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">
                    {tradePlan.confidenceLevel === 'high' && 'Strong Signal - Consider Entry'}
                    {tradePlan.confidenceLevel === 'medium' && 'Moderate Signal - Wait for Confirmation'}
                    {tradePlan.confidenceLevel === 'low' && 'Weak Signal - Avoid or Minimal Size'}
                  </h4>
                  <p className="text-xs leading-relaxed opacity-80">
                    {tradePlan.confidenceLevel === 'high' && 'Multiple indicators align. Good risk/reward setup with volume confirmation.'}
                    {tradePlan.confidenceLevel === 'medium' && 'Some indicators align. Consider smaller position or wait for additional confirmation.'}
                    {tradePlan.confidenceLevel === 'low' && 'Mixed signals detected. High risk trade - consider avoiding or use learning position only.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trade Management */}
      <Card className="mb-8 border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Trade Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Trade Overview - Mobile Optimized Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Trade Setup</p>
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="self-start">
                    {(tradePlan?.setupType ?? '').replace('_', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={`${getConfidenceColor()} self-start`}>
                    {(tradePlan?.confidenceLevel ?? '').toUpperCase()}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {tradePlan.setupType === 'bullish_breakout' ? 'Look for volume confirmation on breakout' :
                   tradePlan.setupType === 'support_bounce' ? 'Enter on bounce from support' :
                   'Follow the trend with proper risk management'}
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Risk Management</p>
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="self-start">
                    {typeof tradePlan?.riskManagement?.riskRewardRatio === 'number' ? tradePlan.riskManagement.riskRewardRatio.toFixed(1) : 'N/A'}:1 Risk/Reward
                  </Badge>
                  <Badge variant="secondary" className="self-start">
                    0.5% Portfolio Risk
                  </Badge>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="self-start cursor-help">
                          {typeof tradePlan?.riskManagement?.suggestedPositionSize === 'number' ? tradePlan.riskManagement.suggestedPositionSize.toFixed(1) : 'N/A'}% Portfolio Allocation
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          <strong>Position Size Calculation:</strong><br/>
                          Allocate {typeof tradePlan?.riskManagement?.suggestedPositionSize === 'number' ? tradePlan.riskManagement.suggestedPositionSize.toFixed(1) : 'N/A'}% of your total portfolio to this trade.<br/><br/>
                          <strong>Risk Per Trade:</strong> 0.5% of entire portfolio if stop loss hits.<br/><br/>
                          <strong>Example:</strong> $10,000 portfolio → Invest ${typeof tradePlan?.riskManagement?.suggestedPositionSize === 'number' ? (10000 * tradePlan.riskManagement.suggestedPositionSize / 100).toFixed(0) : 'N/A'} → Risk $50 max.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>Risk Per Trade:</strong> This trade risks 0.5% of your entire portfolio if the stop loss is hit.<br/>
                  {typeof tradePlan?.riskManagement?.riskRewardRatio === 'number' ? (
                    tradePlan.riskManagement.riskRewardRatio >= 2 ? 'Excellent risk/reward ratio for this risk level.' :
                    tradePlan.riskManagement.riskRewardRatio >= 1.5 ? 'Good risk/reward ratio for this risk level.' :
                    'Consider skipping - poor risk/reward ratio.'
                  ) : 'Risk/reward data unavailable.'}
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Probability</p>
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="self-start">
                    {typeof tradePlan?.riskManagement?.probabilityScore === 'number' ? tradePlan.riskManagement.probabilityScore : 'N/A'}% Success
                  </Badge>
                  <Badge variant={tradePlan?.riskManagement?.volumeConfirmation ? "default" : "outline"} className="self-start">
                    {tradePlan?.riskManagement?.volumeConfirmation ? "Volume Confirmed" : "Needs Volume"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {typeof tradePlan?.riskManagement?.probabilityScore === 'number' ? (
                    tradePlan.riskManagement.probabilityScore > 70 ? 'High probability setup' :
                    tradePlan.riskManagement.probabilityScore > 50 ? 'Moderate probability setup' :
                    'Low probability setup'
                  ) : 'Probability data unavailable'}
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-lg border bg-card">
                <p className="text-sm text-muted-foreground">Pattern Reliability</p>
                <div className="flex flex-col gap-2">
                  <Badge variant="outline" className="self-start">
                    {typeof tradePlan?.riskManagement?.patternReliability === 'number' ? tradePlan.riskManagement.patternReliability : 'N/A'}% Reliable
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {typeof tradePlan?.riskManagement?.patternReliability === 'number' ? (
                    tradePlan.riskManagement.patternReliability > 80 ? 'Very reliable pattern' :
                    tradePlan.riskManagement.patternReliability > 60 ? 'Reliable pattern' :
                    'Pattern needs confirmation'
                  ) : 'Pattern reliability data unavailable'}
                </p>
              </div>
            </div>

            {/* Portfolio Risk Management Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">!</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-amber-800 text-sm mb-2">Portfolio Risk Management</h4>
                  <div className="space-y-2 text-xs text-amber-700 leading-relaxed">
                    <p>
                      <strong>Maximum Total Risk Rule:</strong> Never have more than <strong>5% total open risk</strong> across all your trades at once.
                    </p>
                    <p>
                      <strong>Before opening this trade:</strong> Calculate your current open risk from all existing positions. If adding this 0.5% risk would exceed 5% total, you must first close some trades or book profits/losses to stay under the limit.
                    </p>
                    <p className="text-amber-800 font-medium">
                      Example: If you have 9 trades open (9 × 0.5% = 4.5% risk), you can safely add this trade (4.5% + 0.5% = 5% total risk).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trade Execution - Stack on Mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Entry and Stop Loss */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Entry Zone</span>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Optimal price range to enter the trade</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        onClick={() => handleCopy(
                          `${formatNumber(tradePlan?.riskManagement?.entryZone?.low)} - ${formatNumber(tradePlan?.riskManagement?.entryZone?.high)}`, 
                          'entry-zone'
                        )}
                      >
                        {copiedValues['entry-zone'] ? (
                          <CheckCircle className="h-3 w-3 text-slate-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm cursor-pointer hover:bg-gray-50 p-1 rounded"
                       onClick={() => handleCopy(
                         `${formatNumber(tradePlan?.riskManagement?.entryZone?.low)} - ${formatNumber(tradePlan?.riskManagement?.entryZone?.high)}`, 
                         'entry-zone'
                       )}>
                    <span>{formatNumber(tradePlan?.riskManagement?.entryZone?.low)}</span>
                    <span>{formatNumber(tradePlan?.riskManagement?.entryZone?.high)}</span>
                  </div>
                  <Progress 
                    value={
                      typeof tradePlan?.riskManagement?.entryZone?.low === 'number' &&
                      typeof tradePlan?.riskManagement?.entryZone?.high === 'number' &&
                      tradePlan.riskManagement.entryZone.high !== tradePlan.riskManagement.entryZone.low
                        ? ((tradePlan.currentPrice - tradePlan.riskManagement.entryZone.low) /
                           (tradePlan.riskManagement.entryZone.high - tradePlan.riskManagement.entryZone.low)) * 100
                        : 0
                    }
                    className="h-2 mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {typeof tradePlan?.riskManagement?.entryZone?.low === 'number' &&
                     typeof tradePlan?.riskManagement?.entryZone?.high === 'number' ? (
                      tradePlan.currentPrice < tradePlan.riskManagement.entryZone.low ? 'Wait for price to enter zone' :
                      tradePlan.currentPrice > tradePlan.riskManagement.entryZone.high ? 'Missed entry zone, wait for pullback' :
                      'Price in entry zone, consider entering'
                    ) : 'Entry zone data unavailable'}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Stop Loss</span>
                    <div className="flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Price level to exit if trade moves against you</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        onClick={() => handleCopy(formatNumber(tradePlan?.riskManagement?.initialStopLoss?.price), 'stop-loss')}
                      >
                        {copiedValues['stop-loss'] ? (
                          <CheckCircle className="h-3 w-3 text-slate-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-slate-700 cursor-pointer hover:bg-gray-50 p-1 rounded"
                       onClick={() => handleCopy(formatNumber(tradePlan?.riskManagement?.initialStopLoss?.price), 'stop-loss')}>
                    {formatNumber(tradePlan?.riskManagement?.initialStopLoss?.price)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {tradePlan?.riskManagement?.initialStopLoss?.type === 'trailing' ?
                      'Trailing stop loss - moves with price' :
                      tradePlan?.riskManagement?.initialStopLoss?.type === 'fixed' ?
                      'Fixed stop loss - stays at entry level' :
                      'Stop loss type unavailable'}
                  </p>
                </div>
              </div>

              {/* Targets - Full Width on Mobile */}
              <div className="space-y-4 lg:col-span-2">
                <h4 className="text-sm text-muted-foreground mb-2">Price Targets</h4>
                {Array.isArray(tradePlan?.riskManagement?.targets) && tradePlan.riskManagement.targets.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {tradePlan.riskManagement.targets.map((target, index) => (
                      <div key={index} className="space-y-2 p-3 rounded-lg border bg-muted/20 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Target {index + 1}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {typeof target.riskRewardRatio === 'number' ? target.riskRewardRatio : 'N/A'}x
                            </Badge>
                            <Button                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 hover:bg-gray-100"
                        onClick={() => handleCopy(formatNumber(target.price), `target-${index}`)}
                            >                            {copiedValues[`target-${index}`] ? (
                              <CheckCircle className="h-3 w-3 text-slate-600" />
                            ) : (
                              <Copy className="h-3 w-3 text-muted-foreground" />
                            )}
                            </Button>
                          </div>
                        </div>
                        <div className="text-base font-semibold text-slate-700 cursor-pointer"
                             onClick={() => handleCopy(formatNumber(target.price), `target-${index}`)}>
                          {formatNumber(target.price)}
                        </div>
                        <Progress 
                          value={typeof target.probability === 'number' ? target.probability : 0} 
                          className="h-2"
                        />
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {typeof target.probability === 'number' ? (
                            target.probability > 70 ? 'High probability target' :
                            target.probability > 50 ? 'Moderate probability target' :
                            'Low probability target'
                          ) : 'Target probability unavailable'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No targets available</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Avoidance Reason */}
      {tradePlan.avoidanceReason && (
        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-base sm:text-lg text-red-800">Caution</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 leading-relaxed">{tradePlan.avoidanceReason}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}