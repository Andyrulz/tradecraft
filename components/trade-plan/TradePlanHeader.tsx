"use client";

import { useState } from 'react';
import { TradePlan } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, DollarSign, BarChart, Copy, CheckCircle, Star } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface TradePlanHeaderProps {
  tradePlan: TradePlan & {
    request_count?: number;
    total_requests?: number;
  };
  onTimeframeChange?: (horizon: string) => void;
}

export function TradePlanHeader({ tradePlan, onTimeframeChange }: TradePlanHeaderProps) {
  const [copiedSymbol, setCopiedSymbol] = useState(false);

  const handleCopySymbol = async () => {
    try {
      await navigator.clipboard.writeText(tradePlan.symbol);
      setCopiedSymbol(true);
      setTimeout(() => setCopiedSymbol(false), 2000);
    } catch (err) {
      console.error('Failed to copy symbol:', err);
    }
  };

  const getConfidenceGradient = () => {
    switch (tradePlan.confidenceLevel) {
      case 'high':
        return 'from-slate-600 to-slate-700';
      case 'medium':
        return 'from-slate-500 to-slate-600';
      case 'low':
        return 'from-slate-400 to-slate-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <>
      {/* Enhanced Header with Visual Appeal */}
      <div className="mb-6">
        {/* Stock Info with Copy Function */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                {tradePlan.symbol}
              </h1>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                      onClick={handleCopySymbol}
                    >
                      {copiedSymbol ? (
                        <CheckCircle className="h-4 w-4 text-slate-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy symbol</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className={`h-3 w-3 rounded-full bg-gradient-to-r ${getConfidenceGradient()}`} />
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h2 className="text-lg sm:text-xl text-gray-700 font-medium">
                {tradePlan.companyName}
              </h2>
              {tradePlan.exchange && (
                <Badge variant="outline" className="self-start sm:self-center">
                  {tradePlan.exchange}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4 mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800">
                {formatNumber(tradePlan.currentPrice)}
              </div>
              <Badge 
                variant="outline" 
                className={`${tradePlan.confidenceLevel === 'high' ? 'border-slate-600 text-slate-700 bg-slate-50' : 
                  tradePlan.confidenceLevel === 'medium' ? 'border-slate-500 text-slate-600 bg-slate-50' : 
                  'border-slate-400 text-slate-500 bg-slate-50'} font-medium`}
              >
                {tradePlan.confidenceLevel?.toUpperCase()} CONFIDENCE
              </Badge>
            </div>
          </div>

          {/* Timeframe Selector - Enhanced */}
          {typeof onTimeframeChange === 'function' && (
            <div className="bg-white rounded-xl border-2 border-gray-100 p-4 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Horizon
              </label>
              <select
                className="w-full sm:w-48 border-0 bg-gray-50 rounded-lg px-4 py-3 text-sm font-medium min-h-[44px] focus:ring-2 focus:ring-slate-500 focus:bg-white transition-colors"
                value={tradePlan.timeHorizon}
                onChange={e => onTimeframeChange(e.target.value)}
              >
                <option value="swing">⚡ Swing (1-5 days)</option>
                <option value="positional">📈 Positional (2-4 weeks)</option>
                <option value="longterm">🏔️ Long Term (1+ months)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Enhanced Metrics Cards */}
      <Card className="border-0 bg-white shadow-sm">
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Time Horizon Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Time Horizon
                  </div>
                  <div className="font-semibold text-sm leading-tight mt-1 text-gray-800">
                    {tradePlan.timeHorizon === 'swing'
                      ? 'Swing Trade'
                      : tradePlan.timeHorizon === 'positional'
                      ? 'Positional'
                      : 'Long Term'}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {tradePlan.timeHorizon === 'swing'
                      ? '1-5 days'
                      : tradePlan.timeHorizon === 'positional'
                      ? '2-4 weeks'
                      : '1+ months'}
                  </div>
                </div>
              </div>
            </div>

            {/* Setup Type Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Setup Type
                  </div>
                  <div className="font-semibold text-sm leading-tight mt-1 text-gray-800">
                    {tradePlan.setupType?.replace('_', ' ')}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < (tradePlan.riskManagement?.probabilityScore || 0) / 33 ? 'text-gray-400 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk/Reward Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-5 w-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Risk/Reward
                  </div>
                  <div className="font-bold text-lg leading-tight mt-1 text-gray-800">
                    1:{tradePlan.riskManagement.riskRewardRatio}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {(tradePlan.riskManagement.riskRewardRatio || 0) >= 2 ? 'Excellent' : 
                     (tradePlan.riskManagement.riskRewardRatio || 0) >= 1.5 ? 'Good' : 'Poor'}
                  </div>
                </div>
              </div>
            </div>

            {/* Entry Range Card */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <BarChart className="h-5 w-5 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    Entry Range
                  </div>
                  <div className="font-semibold text-xs leading-tight mt-1 text-gray-800">
                    {formatNumber(tradePlan.riskManagement.entryZone?.low)} - 
                  </div>
                  <div className="font-semibold text-xs leading-tight text-gray-800">
                    {formatNumber(tradePlan.riskManagement.entryZone?.high)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}