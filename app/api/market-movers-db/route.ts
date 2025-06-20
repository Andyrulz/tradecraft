import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type') || 'gainers';
  const period = searchParams.get('period') || 'day';
  const { data, error } = await supabase
    .from('market_movers')
    .select('*')
    .eq('type', type)
    .eq('period', period)
    .order('percent', { ascending: type === 'losers' });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Cache for 6 hours (21600 seconds)
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=21600' }
  });
}
