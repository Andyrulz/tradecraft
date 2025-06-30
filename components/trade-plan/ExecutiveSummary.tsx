'use client';

import { useState } from 'react';
import { TradePlan } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Target,
  Shield,
  Copy,
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ExecutiveSummaryProps {
  tradePlan: TradePlan;
}

export function ExecutiveSummary({ tradePlan }: ExecutiveSummaryProps) {
  const [copiedValues, setCopiedValues] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);

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

  const getConfidenceIcon = () => {
    switch (tradePlan.confidenceLevel) {
      case 'high':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="h-5 w-5 text-slate-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };
  const getConfidenceColor = () => {
    switch (tradePlan.confidenceLevel) {
      case 'high':
        return 'bg-slate-50 border-slate-200 text-slate-800';
      case 'medium':
        return 'bg-slate-50 border-slate-200 text-slate-700';
      case 'low':
        return 'bg-slate-50 border-slate-200 text-slate-600';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getRecommendationText = () => {
    const confidence = tradePlan.confidenceLevel;
    const direction = tradePlan.direction;

    if (confidence === 'high' && direction === 'bullish') {
      return {
        text: 'Strong Buy Signal - High Probability Setup',
        action: 'Consider entering this trade with standard position size'
      };
    } else if (confidence === 'medium' && direction === 'bullish') {
      return {
        text: 'Moderate Buy Signal - Wait for Confirmation',
        action: 'Consider smaller position size or wait for entry confirmation'
      };
    } else if (confidence === 'low') {
      return {
        text: 'Avoid or Use Minimal Size',
        action: 'Skip this trade or use very small position size for learning'
      };
    }

    return {
      text: 'Review Required',
      action: 'Carefully review all signals before making a decision'
    };
  };

  const recommendation = getRecommendationText();
  const entryLow = tradePlan.riskManagement?.entryZone?.low;
  const entryHigh = tradePlan.riskManagement?.entryZone?.high;
  const stopLoss = tradePlan.riskManagement?.initialStopLoss?.price;
  const firstTarget = tradePlan.riskManagement?.targets?.[0]?.price;

  return (
    <Card className={`border-2 ${getConfidenceColor()} shadow-lg`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            {getConfidenceIcon()}
            Trade Recommendation
          </CardTitle>
          <Badge variant="outline" className="text-xs sm:text-sm">
            {tradePlan.timeHorizon.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Recommendation */}
        <div className={`p-4 rounded-lg border-2 ${getConfidenceColor()}`}>
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              {getConfidenceIcon()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm sm:text-base mb-1">
                {recommendation.text}
              </h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                {recommendation.action}
              </p>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">          {/* Entry Zone */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 font-medium">ENTRY</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopy(`${entryLow} - ${entryHigh}`, 'entry')}
                    >
                      {copiedValues.entry ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy entry range</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>            <div className="text-sm sm:text-base font-bold text-gray-700">
              {formatNumber(entryLow)} - {formatNumber(entryHigh)}
            </div>
          </div>

          {/* Stop Loss */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 font-medium">STOP</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopy(stopLoss?.toString() || '', 'stop')}
                    >                      {copiedValues.stop ? (
                      <CheckCircle className="h-3 w-3 text-slate-600" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy stop loss</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>            <div className="text-sm sm:text-base font-bold text-gray-700">
              {formatNumber(stopLoss)}
            </div>
          </div>

          {/* First Target */}          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 font-medium">TARGET 1</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0"
                      onClick={() => handleCopy(firstTarget?.toString() || '', 'target')}
                    >
                      {copiedValues.target ? (
                        <CheckCircle className="h-3 w-3 text-slate-600" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy first target</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-sm sm:text-base font-bold text-gray-700">
              {formatNumber(firstTarget)}
            </div>
          </div>

          {/* Risk/Reward */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-600 font-medium">R:R</span>
              <div className="h-6 w-6 flex items-center justify-center">
                <Target className="h-3 w-3 text-gray-600" />
              </div>
            </div>
            <div className="text-sm sm:text-base font-bold text-gray-700">
              1:{tradePlan.riskManagement?.riskRewardRatio || 'N/A'}
            </div>
          </div>
        </div>        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            className="flex-1 min-h-[44px]"
            variant="outline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                View Details
              </>
            )}
          </Button>
        </div>        {/* Expandable Risk Warning */}
        {tradePlan.confidenceLevel === 'low' && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-slate-700 text-sm">Risk Warning</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  This trade has low confidence signals. Consider paper trading first or using minimal position size.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsible Details */}
        {showDetails && (
          <div className="border-t pt-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Setup Type:</span>
                <span className="ml-2">{tradePlan.setupType?.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Probability:</span>
                <span className="ml-2">{tradePlan.riskManagement?.probabilityScore || 'N/A'}%</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Position Size:</span>
                <span className="ml-2">{tradePlan.riskManagement?.suggestedPositionSize || 'N/A'}%</span>
              </div>
              <div>
                <span className="font-medium text-gray-600">Volume Confirmation:</span>
                <span className="ml-2">
                  {tradePlan.riskManagement?.volumeConfirmation ? '✅ Yes' : '❌ No'}
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
