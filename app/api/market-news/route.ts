import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data, error } = await supabase
    .from('market_news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Debug: log the first 5 news items to server logs
  console.log('First 5 news:', data?.slice(0, 5));
  // Disable cache for debugging
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' }
  });
}
