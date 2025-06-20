"use client";

import React, { useState } from 'react';
import MarketMoversTable from './MarketMoversTable';

const PERIODS = [
  { label: 'Today', value: 'day' },
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'YTD', value: 'ytd' },
];

export default function MarketMoversPage() {
  const [gainersPeriod, setGainersPeriod] = useState<'day' | 'week' | 'month' | 'ytd'>('day');
  const [losersPeriod, setLosersPeriod] = useState<'day' | 'week' | 'month' | 'ytd'>('day');

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Market Movers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gainers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Top Gainers</h2>
            <div className="flex gap-1">
              {PERIODS.map(p => (
                <button
                  key={p.value}
                  className={`px-3 py-1 rounded font-medium text-xs border transition-colors ${gainersPeriod === p.value ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setGainersPeriod(p.value as 'day' | 'week' | 'month' | 'ytd')}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <MarketMoversTable type="gainers" period={gainersPeriod} />
        </div>
        {/* Losers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Top Losers</h2>
            <div className="flex gap-1">
              {PERIODS.map(p => (
                <button
                  key={p.value}
                  className={`px-3 py-1 rounded font-medium text-xs border transition-colors ${losersPeriod === p.value ? 'bg-red-50 border-red-500 text-red-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setLosersPeriod(p.value as 'day' | 'week' | 'month' | 'ytd')}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <MarketMoversTable type="losers" period={losersPeriod} />
        </div>
      </div>
    </div>
  );
}
