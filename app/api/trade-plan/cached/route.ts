import { NextResponse } from 'next/server';
import { getCachedTradePlan } from '@/lib/cache/trade-plan-cache';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/[...nextauth]/authOptions';

export async function GET(request: Request) {
  try {
    // Check authentication to prevent abuse of cached endpoint
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized access to cached data' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
      return NextResponse.json({ error: 'Symbol parameter is required' }, { status: 400 });
    }

    const cachedPlan = await getCachedTradePlan(symbol.toUpperCase());

    if (!cachedPlan) {
      return NextResponse.json({ error: 'No cached trade plan found' }, { status: 404 });
    }

    // Return the cached trade plan data
    return NextResponse.json({
      tradePlan: (cachedPlan as any).trade_plan,
      cached: true,
      lastUpdated: cachedPlan.updated_at,
      expiresAt: cachedPlan.cache_expires_at
    });

  } catch (error) {
    console.error('Error fetching cached trade plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cached trade plan' },
      { status: 500 }
    );
  }
}
