import { NextResponse } from 'next/server';
import { refreshCacheInBackground, shouldRefreshCache } from '@/lib/cache/auto-refresh';

export async function POST(request: Request) {
  try {
    const { symbol, source = 'api_trigger', maxAgeHours = 8 } = await request.json();

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    const upperSymbol = symbol.toUpperCase();

    // Check if refresh is needed
    const needsRefresh = await shouldRefreshCache(upperSymbol, maxAgeHours);
    
    if (needsRefresh) {
      // Start background refresh (non-blocking)
      refreshCacheInBackground(upperSymbol, {
        maxAgeHours,
        source
      }).catch(error => {
        console.error('Background refresh failed:', error);
      });

      return NextResponse.json({ 
        message: 'Background refresh triggered',
        symbol: upperSymbol,
        source
      });
    } else {
      return NextResponse.json({ 
        message: 'Cache is fresh, no refresh needed',
        symbol: upperSymbol 
      });
    }

  } catch (error) {
    console.error('Auto-refresh API error:', error);
    return NextResponse.json(
      { error: 'Failed to trigger auto-refresh' },
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
