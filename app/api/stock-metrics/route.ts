import { NextResponse } from 'next/server';
import { FinnhubService } from '@/lib/services/finnhub';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol')?.toUpperCase();
  const timeframe = searchParams.get('timeframe') || 'swing';

  if (!symbol) {
    return NextResponse.json(
      { error: 'Symbol is required' },
      { status: 400 }
    );
  }

  // Validate symbol format
  if (!/^[A-Z]{1,5}(\.NS)?$/.test(symbol)) {
    return NextResponse.json(
      { error: 'Invalid symbol format. Use 1-5 uppercase letters for US stocks or add .NS for Indian stocks' },
      { status: 400 }
    );
  }

  // Validate timeframe
  if (!['swing', 'positional', 'longterm'].includes(timeframe)) {
    return NextResponse.json(
      { error: 'Invalid timeframe. Must be one of: swing, positional, longterm' },
      { status: 400 }
    );
  }

  try {
    const metrics = await FinnhubService.getStockMetrics(symbol, timeframe);
    
    return NextResponse.json({
      success: true,
      metrics
    });
  } catch (error) {
    console.error('Error fetching stock metrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stock metrics' },
      { status: 500 }
    );
  }
}