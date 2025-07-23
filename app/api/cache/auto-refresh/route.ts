import { NextResponse } from 'next/server';
import { refreshCacheInBackground, shouldRefreshCache } from '@/lib/cache/auto-refresh';

export async function POST(request: Request) {
  try {
    const { symbol, source = 'api_trigger', maxAgeHours = 8 } = await request.json();

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    const upperSymbol = symbol.toUpperCase();

    // New strategy: Don't auto-refresh, let user requests drive fresh data
    console.log(`📋 Auto-refresh disabled for ${upperSymbol} (source: ${source}) - using cache-only strategy`);
    
    return NextResponse.json({ 
      message: 'Auto-refresh disabled - using user-driven cache strategy',
      symbol: upperSymbol,
      source,
      strategy: 'cache_only'
    });

  } catch (error) {
    console.error('Auto-refresh API error:', error);
    return NextResponse.json(
      { error: 'Failed to process auto-refresh request' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }

    // Import cache status function
    const { getCacheStatus } = await import('@/lib/cache/auto-refresh');
    const status = await getCacheStatus(symbol.toUpperCase());

    return NextResponse.json({
      symbol: symbol.toUpperCase(),
      ...status
    });

  } catch (error) {
    console.error('Cache status API error:', error);
    return NextResponse.json(
      { error: 'Failed to get cache status' },
      { status: 500 }
    );
  }
}
