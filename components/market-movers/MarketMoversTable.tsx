import React, { useEffect, useState } from 'react';

interface StockRow {
  symbol: string;
  company_name: string;
  percent: string;
  price: string;
  volume: string;
  market_cap: string;
}

interface Props {
  type: 'gainers' | 'losers';
  period: 'day' | 'week' | 'month' | 'ytd';
}

type SortKey = keyof Pick<StockRow, 'symbol' | 'company_name' | 'percent' | 'price' | 'volume' | 'market_cap'>;

export default function MarketMoversTable({ type, period }: Props) {
  const [data, setData] = useState<StockRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('percent');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>(type === 'gainers' ? 'desc' : 'asc');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');
      setData([]);
      try {
        const res = await fetch(`/api/market-movers-db?type=${type}&period=${period}`);
        const json = await res.json();
        if (Array.isArray(json)) {
          setData(json);
        } else {
          setData([]);
        }
      } catch (e) {
        setError('Failed to load data.');
      }
      setLoading(false);
    }
    fetchData();
  }, [type, period]);

  // Sorting logic
  const sortedData = [...data].sort((a, b) => {
    let aVal: string | number = a[sortKey] || '';
    let bVal: string | number = b[sortKey] || '';
    // Numeric sort for percent, price, volume, market_cap
    if (["percent", "price", "volume", "market_cap"].includes(sortKey)) {
      // Remove % and commas, convert to float
      const parseNum = (v: string) => parseFloat(v.replace(/[%,$,M,B]/g, '').replace(/,/g, '')) || 0;
      aVal = parseNum(aVal as string);
      bVal = parseNum(bVal as string);
    }
    if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir(key === 'percent' ? (type === 'gainers' ? 'desc' : 'asc') : 'asc');
    }
  }

  function sortIcon(key: SortKey) {
    if (sortKey !== key) return <span className="ml-1 text-gray-300">⇅</span>;
    return sortDir === 'asc' ? <span className="ml-1">▲</span> : <span className="ml-1">▼</span>;
  }

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto w-full mb-4">
      <table className="min-w-full text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            <th className="px-2 sm:px-3 py-2 text-left font-semibold cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('symbol')}>Symbol{sortIcon('symbol')}</th>
            <th className="px-2 sm:px-3 py-2 text-left font-semibold cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('company_name')}>Company Name{sortIcon('company_name')}</th>
            <th className="px-2 sm:px-3 py-2 text-right font-semibold cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('percent')}>% Change{sortIcon('percent')}</th>
            <th className="px-2 sm:px-3 py-2 text-right font-semibold cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('price')}>Stock Price{sortIcon('price')}</th>
            <th className="px-2 sm:px-3 py-2 text-right font-semibold cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('volume')}>Volume{sortIcon('volume')}</th>
            <th className="px-2 sm:px-3 py-2 text-right font-semibold cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('market_cap')}>Market Cap{sortIcon('market_cap')}</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} className="text-center py-8 text-gray-400">Loading...</td></tr>
          ) : error ? (
            <tr><td colSpan={6} className="text-center py-8 text-red-500">{error}</td></tr>
          ) : sortedData.length === 0 ? (
            <tr><td colSpan={6} className="text-center py-8 text-gray-400">No data available.</td></tr>
          ) : (
            sortedData.map((row, i) => (
              <tr key={row.symbol + i} className="border-b hover:bg-gray-50">
                <td className="px-2 sm:px-3 py-2">
                  <a
                    href={`/trade-plan?symbol=${encodeURIComponent(row.symbol)}&horizon=swing`}
                    className="text-blue-700 font-semibold underline hover:text-blue-900 transition-colors"
                  >
                    {row.symbol}
                  </a>
                </td>
                <td className="px-2 sm:px-3 py-2">{row.company_name}</td>
                <td className={`px-2 sm:px-3 py-2 text-right font-bold ${type === 'gainers' ? 'text-green-600' : 'text-red-600'}`}>{row.percent}</td>
                <td className="px-2 sm:px-3 py-2 text-right">{row.price}</td>
                <td className="px-2 sm:px-3 py-2 text-right">{row.volume}</td>
                <td className="px-2 sm:px-3 py-2 text-right">{row.market_cap}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
