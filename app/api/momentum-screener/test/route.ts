import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const today = new Date().toISOString().slice(0, 10);
    console.log('🔍 Testing date:', today);
    
    // Check what's in the universe table for today
    const { data: todayData, error: todayError } = await supabase
      .from('momentum_screener_daily')
      .select('date, symbol, company_name, refreshed_at')
      .eq('date', today)
      .order('symbol')
      .limit(10);
      
    // Check all recent dates in the table
    const { data: allDates, error: datesError } = await supabase
      .from('momentum_screener_daily')
      .select('date')
      .order('date', { ascending: false })
      .limit(20);
      
    // Get count per date
    const { data: counts, error: countsError } = await supabase
      .from('momentum_screener_daily')
      .select('date')
      .order('date', { ascending: false });
      
    let dateCounts: Record<string, number> = {};
    if (counts) {
      dateCounts = counts.reduce((acc: Record<string, number>, row: any) => {
        acc[row.date] = (acc[row.date] || 0) + 1;
        return acc;
      }, {});
    }
    
    return NextResponse.json({
      success: true,
      testDate: today,
      todayRecords: {
        count: todayData?.length || 0,
        data: todayData,
        error: todayError?.message
      },
      allDates: {
        recent: allDates?.map(d => d.date).slice(0, 10),
        error: datesError?.message
      },
      dateCounts,
      serverTime: new Date().toISOString(),
      serverTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error?.toString(),
      serverTime: new Date().toISOString()
    });
  }
}
