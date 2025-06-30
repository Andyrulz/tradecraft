'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TradingChartProps {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  targetPrice: number;
  timeHorizon?: 'swing' | 'positional' | 'longterm';
  entryZone?: {
    low: number;
    high: number;
  };
  priceHistory?: Array<{
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }>;
}

export function TradingChart({
  symbol,
  entryPrice,
  stopLoss,
  targetPrice,
  timeHorizon = 'swing',
  entryZone,
  priceHistory = [],
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    let chart: any = null;

    const initializeChart = async () => {
      if (!chartContainerRef.current || !mounted) return;

      try {
        setIsLoading(true);
        setError(null);

        // Import lightweight-charts dynamically
        const chartLib = await import('lightweight-charts');
        
        if (!mounted) return;

        const container = chartContainerRef.current;
        const rect = container.getBoundingClientRect();
        const width = rect.width || 600;
        const height = 400;

        // Create chart with minimal options for maximum compatibility
        chart = chartLib.createChart(container, {
          width: width,
          height: height,
          layout: {
            background: { 
              type: chartLib.ColorType.Solid, 
              color: '#ffffff' 
            },
            textColor: '#333',
          },
          grid: {
            vertLines: { color: '#f0f0f0' },
            horzLines: { color: '#f0f0f0' },
          },
          rightPriceScale: {
            borderColor: '#ddd',
          },
          timeScale: {
            borderColor: '#ddd',
            timeVisible: true,
          },
        });

        if (!mounted) return;        // Process real historical data from Twelve Data API with timeframe filtering
        const processHistoricalData = () => {
          if (!priceHistory || priceHistory.length === 0) {
            // Fallback to demo data if no real data available
            console.warn('No price history available, using demo data');
            return generateDemoData();
          }

          // Determine data duration based on timeframe
          const getDataDuration = () => {
            switch (timeHorizon) {
              case 'swing':
                return 30; // 30 days for swing trading
              case 'positional':
                return 90; // 90 days (3 months) for positional
              case 'longterm':
                return 252; // 252 days (1 year) for long term
              default:
                return 60; // Default fallback
            }
          };

          const daysToShow = getDataDuration();
          
          // Sort price history by date and take the most recent data points
          const sortedHistory = [...priceHistory]
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
          
          // Take the last N days based on timeframe
          const filteredHistory = sortedHistory.slice(-daysToShow);

          // Convert Twelve Data format to lightweight-charts format
          const data: Array<{time: number, value: number}> = filteredHistory.map((item) => {
            // Convert date string to Unix timestamp (seconds)
            const timestamp = Math.floor(new Date(item.date).getTime() / 1000);
            return {
              time: timestamp,
              value: item.close, // Use closing price for line chart
            };
          }).sort((a, b) => a.time - b.time); // Ensure chronological order

          console.log(`Using ${data.length} real data points from Twelve Data (${timeHorizon}: ${daysToShow} days)`);
          return data;
        };        // Fallback demo data generation (only if no real data) - respects timeframe
        const generateDemoData = () => {
          const data: Array<{time: number, value: number}> = [];
          const basePrice = entryPrice || 100;
          let price = basePrice * 0.95;
          const now = Date.now();
          
          // Adjust demo data duration based on timeframe
          const totalDays = timeHorizon === 'swing' ? 30 : 
                           timeHorizon === 'positional' ? 90 : 
                           252; // longterm = 1 year

          for (let i = totalDays; i >= 0; i--) {
            const timestamp = Math.floor((now - (i * 24 * 60 * 60 * 1000)) / 1000);
            const progressRatio = (totalDays - i) / totalDays;
            
            if (progressRatio > 0.7) {
              const targetPrice = entryPrice;
              const trendStrength = (progressRatio - 0.7) / 0.3;
              price += (targetPrice - price) * 0.02 * trendStrength;
            }
            
            // Adjust volatility based on timeframe
            const volatilityMultiplier = timeHorizon === 'swing' ? 0.015 : 
                                       timeHorizon === 'positional' ? 0.012 : 
                                       0.008; // Lower volatility for longer timeframes
            
            const volatility = basePrice * volatilityMultiplier;
            const change = (Math.random() - 0.5) * volatility * (1 + Math.sin(progressRatio * Math.PI * 4) * 0.3);
            price += change;
            price = Math.max(basePrice * 0.8, Math.min(basePrice * 1.3, price));
            
            data.push({
              time: timestamp,
              value: parseFloat(price.toFixed(2)),
            });
          }
          
          console.log(`Generated ${data.length} demo data points for ${timeHorizon} timeframe`);
          return data;
        };

        // Add line series using the correct API
        let series: any;
        try {
          // Use the correct addSeries method with LineSeries
          series = chart.addSeries(chartLib.LineSeries, {
            color: '#2563eb',
            lineWidth: 2,
          });
        } catch (e) {
          console.error('Series creation error:', e);
          throw new Error('Unable to create chart series');
        }        const data = processHistoricalData();
        console.log('Setting chart data:', data.slice(0, 3)); // Debug log
        series.setData(data);// Add price level lines and zones
        try {
          // Entry Zone Lines (if provided)
          if (entryZone && entryZone.low && entryZone.high) {
            // Entry zone high line
            series.createPriceLine({
              price: entryZone.high,
              color: '#3b82f6',
              lineWidth: 1,
              lineStyle: 1, // LineStyle.Dashed
              axisLabelVisible: true,
              title: 'Entry High',
            });

            // Entry zone low line
            series.createPriceLine({
              price: entryZone.low,
              color: '#3b82f6',
              lineWidth: 1,
              lineStyle: 1, // LineStyle.Dashed
              axisLabelVisible: true,
              title: 'Entry Low',
            });
          }

          // Main Entry Price Line (primary entry level)
          if (entryPrice) {
            series.createPriceLine({
              price: entryPrice,
              color: '#2563eb',
              lineWidth: 3,
              lineStyle: 0, // LineStyle.Solid
              axisLabelVisible: true,
              title: 'Entry Target',
            });
          }

          // Stop Loss Line
          if (stopLoss) {
            series.createPriceLine({
              price: stopLoss,
              color: '#dc2626',
              lineWidth: 2,
              lineStyle: 0, // LineStyle.Solid
              axisLabelVisible: true,
              title: 'Stop Loss',
            });
          }

          // Target Price Line
          if (targetPrice) {
            series.createPriceLine({
              price: targetPrice,
              color: '#16a34a',
              lineWidth: 2,
              lineStyle: 0, // LineStyle.Solid
              axisLabelVisible: true,
              title: 'Price Target',
            });
          }

          // Add markers for key price levels at the latest time point
          const markers = [];
          const currentTime = data[data.length - 1]?.time || Math.floor(Date.now() / 1000);
          
          // Entry marker
          if (entryPrice) {
            markers.push({
              time: currentTime,
              position: 'belowBar',
              color: '#2563eb',
              shape: 'arrowUp',
              text: 'ENTRY',
              size: 1,
            });
          }

          // Stop loss marker  
          if (stopLoss) {
            markers.push({
              time: currentTime,
              position: 'aboveBar',
              color: '#dc2626',
              shape: 'arrowDown',
              text: 'STOP',
              size: 1,
            });
          }

          // Target marker
          if (targetPrice) {
            markers.push({
              time: currentTime,
              position: 'belowBar',
              color: '#16a34a',
              shape: 'arrowUp',
              text: 'TARGET',
              size: 1,
            });
          }

          if (markers.length > 0) {
            series.setMarkers(markers);
          }

        } catch (priceLineError) {
          console.log('Price lines not supported:', priceLineError);
        }

        // Fit content
        try {
          chart.timeScale().fitContent();
        } catch (e) {
          // Fallback if fitContent doesn't work
        }

        // Handle resize
        const resizeHandler = () => {
          if (chart && chartContainerRef.current) {
            const newRect = chartContainerRef.current.getBoundingClientRect();
            chart.applyOptions({ 
              width: newRect.width || 600 
            });
          }
        };

        window.addEventListener('resize', resizeHandler);
        setIsLoading(false);

        // Cleanup function
        return () => {
          window.removeEventListener('resize', resizeHandler);
          if (chart) {
            chart.remove();
          }
        };

      } catch (err) {
        console.error('Chart error:', err);
        if (mounted) {
          setError('Unable to load chart');
          setIsLoading(false);
        }
      }
    };

    // Add a small delay to ensure the container is properly rendered
    const timer = setTimeout(initializeChart, 100);

    return () => {
      mounted = false;
      clearTimeout(timer);
      if (chart) {
        chart.remove();
      }
    };
  }, [symbol, entryPrice, stopLoss, targetPrice, entryZone, priceHistory, timeHorizon]);

  const retryChart = () => {
    setError(null);
    setIsLoading(true);
    // Force re-render by changing a key or triggering useEffect dependencies
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Price Chart - {symbol}
        </h3>
        <p className="text-sm text-slate-600">
          {(() => {
            const duration = timeHorizon === 'swing' ? '30 days' : 
                           timeHorizon === 'positional' ? '3 months' : 
                           '1 year';
            const dataType = priceHistory && priceHistory.length > 0 ? 'Real historical data' : 'Demo chart';
            const dataCount = priceHistory && priceHistory.length > 0 ? `(${Math.min(priceHistory.length, timeHorizon === 'swing' ? 30 : timeHorizon === 'positional' ? 90 : 252)} data points)` : '';
            return `${dataType} ${dataCount} - ${duration} view with entry zones and trading levels`;
          })()}
        </p>
      </div>
      
      <div className="relative bg-white border border-slate-100 rounded-lg overflow-hidden">
        <div 
          ref={chartContainerRef}
          className="w-full h-[400px]"
          style={{ minHeight: '400px' }}
        />
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
            <div className="flex items-center space-x-3 text-slate-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm">Loading chart...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-95">
            <div className="text-center">
              <div className="text-red-500 mb-3">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
              <button 
                onClick={retryChart}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </div>      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        {entryZone && entryZone.low && entryZone.high && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500 opacity-60 rounded-full"></div>
            <span className="text-slate-700">Entry Zone: ${entryZone.low?.toFixed(2)} - ${entryZone.high?.toFixed(2)}</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
          <span className="text-slate-700">Entry Target: ${entryPrice?.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-red-600 rounded-full"></div>
          <span className="text-slate-700">Stop Loss: ${stopLoss?.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-600 rounded-full"></div>
          <span className="text-slate-700">Price Target: ${targetPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
