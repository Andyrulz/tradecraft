'use client';

import React, { useEffect, useRef, useState } from 'react';

interface TradingChartProps {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  targetPrice: number;
}

export function TradingChart({
  symbol,
  entryPrice,
  stopLoss,
  targetPrice,
}: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartInstance, setChartInstance] = useState<any>(null);

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

        // Clean up existing chart
        if (chartInstance) {
          chartInstance.remove();
        }

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

        if (!mounted) return;

        // Generate sample data
        const generateData = () => {
          const data = [];
          const basePrice = entryPrice || 100;
          let price = basePrice;
          const now = new Date();

          for (let i = 30; i >= 0; i--) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            
            // Add some volatility
            const change = (Math.random() - 0.5) * basePrice * 0.02;
            price += change;
            
            data.push({
              time: date.toISOString().split('T')[0],
              value: parseFloat(price.toFixed(2)),
            });
          }
          
          return data;
        };

        // Add line series - using the most compatible method
        let series: any;
        try {
          // Try the most common method first
          series = (chart as any).addLineSeries({
            color: '#2563eb',
            lineWidth: 2,
          });
        } catch (e) {
          throw new Error('Unable to create chart series');
        }

        const data = generateData();
        series.setData(data);

        // Add price level lines if possible
        try {
          if (entryPrice && typeof series.createPriceLine === 'function') {
            series.createPriceLine({
              price: entryPrice,
              color: '#2563eb',
              lineWidth: 2,
              lineStyle: 2,
              axisLabelVisible: true,
              title: `Entry`,
            });
          }

          if (stopLoss && typeof series.createPriceLine === 'function') {
            series.createPriceLine({
              price: stopLoss,
              color: '#dc2626',
              lineWidth: 2,
              lineStyle: 2,
              axisLabelVisible: true,
              title: `Stop`,
            });
          }

          if (targetPrice && typeof series.createPriceLine === 'function') {
            series.createPriceLine({
              price: targetPrice,
              color: '#16a34a',
              lineWidth: 2,
              lineStyle: 2,
              axisLabelVisible: true,
              title: `Target`,
            });
          }
        } catch (priceLineError) {
          console.log('Price lines not supported');
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

        setChartInstance(chart);
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
  }, [symbol, entryPrice, stopLoss, targetPrice]);

  const retryChart = () => {
    setError(null);
    setIsLoading(true);
    // The useEffect will re-run and reinitialize the chart
    if (chartInstance) {
      chartInstance.remove();
      setChartInstance(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 sm:p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">
          Price Chart - {symbol}
        </h3>
        <p className="text-sm text-slate-600">
          Interactive chart showing price levels and trading zones
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
      </div>
      
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
          <span className="text-slate-700">Entry: ${entryPrice?.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-red-600 rounded-full"></div>
          <span className="text-slate-700">Stop Loss: ${stopLoss?.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-green-600 rounded-full"></div>
          <span className="text-slate-700">Target: ${targetPrice?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
