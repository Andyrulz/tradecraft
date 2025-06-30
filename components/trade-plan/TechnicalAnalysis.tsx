'use client';

import { TechnicalIndicator } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface TechnicalAnalysisProps {
  tradePlan: any;
  onHorizonChange?: (horizon: string) => void;
}

export function TechnicalAnalysis({ tradePlan }: TechnicalAnalysisProps) {
  const indicators = tradePlan.indicators || [];
  const horizon = tradePlan.timeHorizon;
  const timeframeLabel = horizon === 'longterm' ? 'Long-Term' : horizon === 'positional' ? 'Positional' : 'Swing';
  const bullishCount = indicators.filter((i: TechnicalIndicator) => i.signal === 'bullish').length;
  const bearishCount = indicators.filter((i: TechnicalIndicator) => i.signal === 'bearish').length;
  let actionableSummary = '';
  let summaryColor = 'text-gray-700';
  if (bullishCount >= 2) {
    actionableSummary = `Most signals are bullish for ${timeframeLabel} trading. Consider entering on pullbacks or breakouts.`;
    summaryColor = 'text-green-700';
  } else if (bearishCount >= 2) {
    actionableSummary = `Most signals are bearish for ${timeframeLabel} trading. Avoid new entries or consider shorting.`;
    summaryColor = 'text-red-700';
  } else {
    actionableSummary = `Signals are mixed or neutral for ${timeframeLabel} trading. Wait for confirmation before acting.`;
    summaryColor = 'text-yellow-700';
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'bg-green-100 text-green-800';
      case 'bearish':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      {/* Technical Analysis Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg sm:text-xl">Actionable Technical Insights <span className="ml-2 text-xs font-normal text-muted-foreground">[{timeframeLabel}]</span></CardTitle>
          </div>
          <div className={`mt-2 text-sm sm:text-base font-semibold ${summaryColor} leading-relaxed`}>{actionableSummary}</div>
        </CardHeader>
        <CardContent>
          {indicators.length === 0 ? (
            <div className="text-muted-foreground text-sm">No technical indicators available for this stock.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {indicators.map((indicator: TechnicalIndicator, index: number) => (
                <div key={index} className="space-y-3 p-4 rounded-lg border bg-muted/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base">{indicator.name}</h3>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{indicator.education}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <Badge className={`${getSignalColor(indicator.signal)} self-start sm:self-center`}>
                      {indicator.signal.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {indicator.description}
                  </div>
                  <div className="text-sm font-medium bg-blue-50 p-3 rounded-lg">
                    <span className="font-semibold">What to do:</span> {indicator.actionableAdvice || ''}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}