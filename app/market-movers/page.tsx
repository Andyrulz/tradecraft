import { Metadata } from 'next';
import MarketMoversPage from '@/components/market-movers/MarketMoversPage';

export const metadata: Metadata = {
  title: 'Market Movers | Top Gainers & Losers',
  description: 'See the top stock market gainers and losers for today, week, month, and YTD. Updated daily.'
};

export default function Page() {
  return <MarketMoversPage />;
}
