import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const { data, error } = await supabase
    .from('market_news')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(100);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  // Cache for 30 minutes (1800 seconds)
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'public, max-age=1800' }
  });
}
