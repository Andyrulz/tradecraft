'use client';

import React, { useEffect, useRef, useCallback } from 'react';

interface TradingChartProps {
  symbol: string;
  entryPrice: number;
  stopLoss: number;
  targetPrice: number;
}

const TradingChart: React.FC<TradingChartProps> = ({
  symbol,
  entryPrice,
  stopLoss,
  targetPrice,
}) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const generateMockData = useCallback(() => {
    const data = [];
    let basePrice = entryPrice || 100;
    const now = Date.now();
    
    for (let i = 0; i < 100; i++) {
      const time = Math.floor((now - (100 - i) * 24 * 60 * 60 * 1000) / 1000);
      const volatility = 0.02;
      const change = (Math.random() - 0.5) * volatility;
      
      const open = basePrice;
      const close = basePrice * (1 + change);
      const high = Math.max(open, close) * (1 + Math.random() * 0.01);
      const low = Math.min(open, close) * (1 - Math.random() * 0.01);
      
      data.push({
        time: time as any,
        open,
        high,
        low,
        close,
      });
      
      basePrice = close;
    }
    
    return data;
  }, [entryPrice]);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const initChart = async () => {
      try {
        // Import chart library dynamically
        const chartLib = await import('lightweight-charts');
        
        // Create chart
        const chart = chartLib.createChart(chartContainerRef.current!, {
          layout: {
            background: { type: chartLib.ColorType.Solid, color: '#ffffff' },
            textColor: '#1e293b',
          },
          width: chartContainerRef.current!.clientWidth,
          height: 400,
          grid: {
            vertLines: { color: '#f1f5f9' },
            horzLines: { color: '#f1f5f9' },
          },
          rightPriceScale: {
            borderColor: '#e2e8f0',
          },
          timeScale: {
            borderColor: '#e2e8f0',
            timeVisible: true,
          },
        });

        // Create candlestick series using the correct API
        const candlestickSeries = chart.addSeries(chartLib.CandlestickSeries, {
          upColor: '#10b981',
          downColor: '#ef4444',
          borderUpColor: '#10b981',
          borderDownColor: '#ef4444',
          wickUpColor: '#10b981',
          wickDownColor: '#ef4444',
        });

        // Set data
        const mockData = generateMockData();
        candlestickSeries.setData(mockData);

        // Add price lines for trading levels
        if (entryPrice) {
          candlestickSeries.createPriceLine({
            price: entryPrice,
            color: '#3b82f6',
            lineWidth: 2,
            lineStyle: 2, // Dashed
            axisLabelVisible: true,
            title: `Entry: $${entryPrice.toFixed(2)}`,
          });
        }

        if (stopLoss) {
          candlestickSeries.createPriceLine({
            price: stopLoss,
            color: '#ef4444',
            lineWidth: 2,
            lineStyle: 2, // Dashed
            axisLabelVisible: true,
            title: `Stop Loss: $${stopLoss.toFixed(2)}`,
          });
        }

        if (targetPrice) {
          candlestickSeries.createPriceLine({
            price: targetPrice,
            color: '#10b981',
            lineWidth: 2,
            lineStyle: 2, // Dashed
            axisLabelVisible: true,
            title: `Target: $${targetPrice.toFixed(2)}`,
          });
        }

        // Handle resize
        const handleResize = () => {
          if (chartContainerRef.current) {
            chart.applyOptions({
              width: chartContainerRef.current.clientWidth,
            });
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          chart.remove();
        };
      } catch (error) {
        console.error('Error initializing chart:', error);
      }
    };

    const cleanup = initChart();
    
    return () => {
      cleanup.then(cleanupFn => {
        if (cleanupFn) cleanupFn();
      });
    };
  }, [symbol, entryPrice, stopLoss, targetPrice, generateMockData]);

  return (
    <div className="w-full h-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          {symbol} Price Chart
        </h3>
        <p className="text-sm text-gray-600">
          Entry: ${entryPrice.toFixed(2)} | Stop Loss: ${stopLoss.toFixed(2)} | Target: ${targetPrice.toFixed(2)}
        </p>
      </div>
      <div 
        ref={chartContainerRef} 
        className="w-full h-96 border border-gray-200 rounded-lg"
      />
    </div>
  );
};

export default TradingChart;
