import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getStockData } from '@/lib/api';

// Rate limiter for Twelve Data API (55 calls per minute)
class TwelveDataRateLimiter {
  private callCount = 0;
  private windowStart = Date.now();
  private readonly maxCallsPerMinute = 50; // Conservative limit (55 - 5 buffer)
  private readonly windowMs = 60 * 1000; // 1 minute

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    
    // Reset counter if window expired
    if (now - this.windowStart >= this.windowMs) {
      this.callCount = 0;
      this.windowStart = now;
      console.log('🔄 Rate limit window reset');
    }
    
    // If approaching limit, wait for window reset
    if (this.callCount >= this.maxCallsPerMinute) {
      const waitTime = this.windowMs - (now - this.windowStart) + 2000; // 2s buffer
      console.log(`⏳ Rate limit reached (${this.callCount}/${this.maxCallsPerMinute}), waiting ${Math.round(waitTime/1000)}s...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.callCount = 0;
      this.windowStart = Date.now();
    }
  }
  
  recordCalls(count: number = 1): void {
    this.callCount += count;
    console.log(`📊 API calls: ${this.callCount}/${this.maxCallsPerMinute} in current window`);
  }
}

// Enhanced stock data fetching with rate limiting
async function getStockDataWithRateLimit(
  symbol: string,
  company_name: string,
  rateLimiter: TwelveDataRateLimiter,
  retries = 2
): Promise<any> {
  try {
    // Wait for rate limit before making calls
    await rateLimiter.waitIfNeeded();
    
    console.log(`🔍 Processing ${symbol} (${company_name})`);
    
    // Record the expected 5 API calls per stock
    rateLimiter.recordCalls(5);
    
    // Fetch trade plan data
    const tradePlan = await getStockData(symbol, 3, 'swing');
    
    const summary = tradePlan.summary || '';
    const setup = tradePlan.setupType || 'N/A';
    const confidence = tradePlan.confidenceLevel || 'N/A';
    const entry = tradePlan.riskManagement?.entryZone || null;
    const stoploss = tradePlan.riskManagement?.initialStopLoss || null;
    const targets = tradePlan.riskManagement?.targets || [];
    const price = tradePlan.currentPrice;
    
    const trade_recommendation =
      confidence === 'high'
        ? 'Strong setup. Consider for entry with proper risk management.'
        : confidence === 'medium'
        ? 'Some signals align, but wait for confirmation or use smaller position size.'
        : 'Signals are mixed or weak. Avoid new entries or use minimal size.';
    
    return {
      symbol,
      company_name,
      price,
      setup,
      confidence,
      summary,
      entry,
      stoploss,
      targets,
      trade_recommendation,
      planurl: `/trade-plan?symbol=${symbol}&horizon=swing`,
      refreshed_at: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      success: true
    };
    
  } catch (error) {
    console.error(`❌ Error processing ${symbol}:`, error);
    
    if (retries > 0) {
      console.log(`🔄 Retrying ${symbol}, attempts left: ${retries}`);
      await new Promise(resolve => setTimeout(resolve, 3000)); // 3s delay before retry
      return getStockDataWithRateLimit(symbol, company_name, rateLimiter, retries - 1);
    }
    
    // Return error result instead of throwing
    return {
      symbol,
      company_name,
      price: null,
      setup: 'N/A',
      confidence: 'N/A',
      summary: 'Data unavailable',
      entry: null,
      stoploss: null,
      targets: [],
      trade_recommendation: 'Data unavailable. Avoid entry.',
      planurl: `/trade-plan?symbol=${symbol}&horizon=swing`,
      refreshed_at: new Date().toISOString(),
      date: new Date().toISOString().slice(0, 10),
      success: false,
      error: error?.toString()
    };
  }
}

// Helper: Fetch a single page from Trendlyne
async function fetchTrendlynePage(page = 1) {
  const url = `https://trendlyne.com/us/fundamentals/tl-all-in-one-screener-data-get/?screenpk=455451&perPageCount=25&groupType=all&groupName=all&page=${page}`;
  const res = await fetch(url, {
    headers: {
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'x-requested-with': 'XMLHttpRequest',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
  });
  const data = await res.json();
  const tableData = data.body?.tableData || [];
  const hasNextPage = !!data.body?.isNextPage;
  return { tableData, hasNextPage };
}

// Fetch Nasdaq momentum stocks
async function fetchNasdaqMomentumStocks() {
  const res = await fetch('https://api.nasdaq.com/api/quote/list-type-extended/validea?queryString=MOMENTUM', {
    headers: {
      'accept': 'application/json, text/plain, */*',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
      'origin': 'https://www.nasdaq.com',
      'referer': 'https://www.nasdaq.com/',
    }
  });
  const data = await res.json();
  if (!data?.data?.rows) return [];
  return data.data.rows.map((row: any) => ({
    symbol: row.ticker,
    company_name: row.companyName,
    source: 'nasdaq',
  })).filter((s: any) => s.symbol && s.company_name);
}

const CRON = async () => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const startTime = Date.now();
    let page = 1;
    let hasNextPage = true;
    let maxPages = 5;
    let trendlyneStocks: any[] = [];
    let errors: any[] = [];
    
    console.log('🚀 Starting CRON momentum screener refresh...');
    
    // Phase 1: Universe collection (fast, no timeouts)
    console.log('📊 Phase 1: Collecting stock universe...');
    while (hasNextPage && page <= maxPages) {
      const { tableData, hasNextPage: nextPage } = await fetchTrendlynePage(page);
      for (const row of tableData) {
        const symbol = row[3];
        const name = row[2];
        if (!symbol || !name) continue;
        trendlyneStocks.push({ symbol, company_name: name, source: 'trendlyne' });
      }
      page++;
      hasNextPage = nextPage;
    }
    
    const nasdaqStocks = await fetchNasdaqMomentumStocks();
    const allStocksMap = new Map();
    for (const s of [...trendlyneStocks, ...nasdaqStocks]) {
      if (!allStocksMap.has(s.symbol)) {
        allStocksMap.set(s.symbol, s);
      }
    }
    const allStocks = Array.from(allStocksMap.values());
    
    // Upsert universe (fast)
    for (const s of allStocks) {
      const { error } = await supabase.from('momentum_screener_daily').upsert({
        symbol: s.symbol,
        company_name: s.company_name,
        date: today,
        is_momentum_candidate: false,
        is_top_pick: false,
        reason_summary: s.source === 'nasdaq' ? 'Nasdaq momentum' : 'Universe only',
      }, { onConflict: 'date,symbol' });
      if (error) errors.push({ symbol: s.symbol, error: error.message });
    }
    
    // Cleanup old data
    const todayDate = new Date().toISOString().slice(0, 10);
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    await supabase.from('momentum_screener_daily')
      .delete()
      .lt('date', threeDaysAgo)
      .not('date', 'eq', todayDate);

    console.log(`✅ Phase 1 completed: ${allStocks.length} stocks in universe`);

    // Phase 2: Process stocks with rate limiting
    console.log('📈 Phase 2: Processing stocks with rate limiting...');
    
    const { data: stocks, error } = await supabase
      .from('momentum_screener_daily')
      .select('symbol, company_name')
      .eq('date', today);
    
    if (error) return NextResponse.json({ success: false, error: error.message });
    if (!stocks || stocks.length === 0) return NextResponse.json({ success: false, error: 'No stocks for today' });

    // Process stocks in batches to respect rate limits
    const BATCH_SIZE = 10; // 10 stocks × 5 calls = 50 calls (within 55 call limit)
    const BATCH_DELAY = 65000; // 65 seconds between batches
    const MAX_STOCKS = 30; // Limit total stocks to avoid timeout
    
    const stocksToProcess = stocks.slice(0, MAX_STOCKS);
    const rateLimiter = new TwelveDataRateLimiter();
    const results: any[] = [];
    let successCount = 0;
    let errorCount = 0;

    console.log(`📊 Processing ${stocksToProcess.length} stocks in batches of ${BATCH_SIZE}`);

    // Process stocks in batches
    for (let i = 0; i < stocksToProcess.length; i += BATCH_SIZE) {
      const batch = stocksToProcess.slice(i, i + BATCH_SIZE);
      const batchNumber = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(stocksToProcess.length / BATCH_SIZE);
      
      console.log(`\n🔄 Processing batch ${batchNumber}/${totalBatches} (${batch.length} stocks)`);
      console.log(`📈 Stocks: ${batch.map(s => s.symbol).join(', ')}`);

      // Process batch stocks sequentially with rate limiting
      for (const stock of batch) {
        const result = await getStockDataWithRateLimit(
          stock.symbol, 
          stock.company_name, 
          rateLimiter
        );
        results.push(result);
        
        if (result.success) {
          successCount++;
        } else {
          errorCount++;
        }

        // Small delay between stocks in same batch
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Wait between batches (except for last batch)
      if (i + BATCH_SIZE < stocksToProcess.length) {
        console.log(`⏳ Batch ${batchNumber} completed. Waiting ${BATCH_DELAY/1000}s for next batch...`);
        await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
      } else {
        console.log(`✅ Final batch ${batchNumber} completed`);
      }
    }

    // Sort results by confidence
    const confidenceRank = { high: 3, medium: 2, low: 1, 'N/A': 0 };
    const validResults = results.filter(r => r.success);
    
    validResults.sort((a: any, b: any) => {
      const aRank = confidenceRank[a.confidence as keyof typeof confidenceRank] ?? 0;
      const bRank = confidenceRank[b.confidence as keyof typeof confidenceRank] ?? 0;
      return bRank - aRank;
    });

    const top15 = validResults.slice(0, 15);

    console.log(`\n📊 Results Summary:`);
    console.log(`✅ Successful: ${successCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`🏆 Top 15 selected for database`);

    // Clear and upsert results
    await supabase.from('momentum_screener_results').delete().not('id', 'is', null);

    let upserted = 0;
    let upsertErrors: any[] = [];
    for (const r of top15) {
      const { error: upsertError } = await supabase.from('momentum_screener_results').upsert(r, { onConflict: 'date,symbol' });
      if (!upsertError) upserted++;
      else upsertErrors.push({ symbol: r.symbol, error: upsertError.message });
    }

    // Debug info
    let debugRow = null;
    if (top15.length > 0) {
      const { data: debugData } = await supabase
        .from('momentum_screener_results')
        .select('*')
        .eq('date', today)
        .eq('symbol', top15[0].symbol)
        .order('refreshed_at', { ascending: false })
        .limit(1);
      debugRow = debugData && debugData.length > 0 ? debugData[0] : null;
    }

    const totalTime = Math.round((Date.now() - startTime) / 1000);
    console.log(`\n🎉 CRON momentum screener completed in ${totalTime}s`);

    return NextResponse.json({ 
      success: true, 
      upserted, 
      totalProcessed: results.length,
      successfulStocks: successCount,
      errorStocks: errorCount,
      universeSize: allStocks.length,
      stocksProcessed: stocksToProcess.length,
      processingTimeSeconds: totalTime,
      top15Count: top15.length,
      upsertErrors, 
      debugRow,
      batchInfo: {
        batchSize: BATCH_SIZE,
        totalBatches: Math.ceil(stocksToProcess.length / BATCH_SIZE),
        batchDelaySeconds: BATCH_DELAY / 1000
      }
    });
  } catch (error) {
    console.error('❌ CRON momentum screener failed:', error);
    return NextResponse.json({ 
      success: false, 
      error: error?.toString(),
      timestamp: new Date().toISOString()
    });
  }
};

export default CRON;
