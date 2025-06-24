// scripts/refresh-market-movers-db.ts
// Scrapes and upserts market movers into the new Supabase table 'market_movers'.

import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
const BASE_URL = 'https://stockanalysis.com/markets';
const TYPES = ['gainers', 'losers'];
const PERIODS = ['day', 'week', 'month', 'ytd'];
const PERIOD_PATH = { day: '', week: '/week', month: '/month', ytd: '/ytd' };

async function scrape(
  type: 'gainers' | 'losers',
  period: 'day' | 'week' | 'month' | 'ytd'
): Promise<any[]> {
  const url = `${BASE_URL}/${type}${PERIOD_PATH[period]}/`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const rows: any[] = [];
  $('table tbody tr').each((i, el) => {
    const tds = $(el).find('td');
    rows.push({
      type,
      period,
      symbol: $(tds[1]).text().trim(),
      company_name: $(tds[2]).text().trim(),
      percent: $(tds[3]).text().trim(),
      price: $(tds[4]).text().trim(),
      volume: $(tds[5]).text().trim(),
      market_cap: $(tds[6]).text().trim(),
      date: new Date().toISOString().slice(0, 10),
      refreshed_at: new Date().toISOString(),
    });
  });
  return rows;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  let totalUpserts = 0;
  let totalErrors = 0;
  for (const type of TYPES) {
    for (const period of PERIODS) {
      const rows = await scrape(type as 'gainers' | 'losers', period as 'day' | 'week' | 'month' | 'ytd');
      let upserts = 0;
      for (const row of rows) {
        const { error } = await supabase.from('market_movers').upsert(row, { onConflict: 'type,period,symbol,date' });
        if (error) {
          totalErrors++;
          console.error(`[UPSERT ERROR]`, error.message, row);
        } else {
          upserts++;
        }
      }
      totalUpserts += upserts;
      console.log(`[${type.toUpperCase()} - ${period.toUpperCase()}] Upserted ${upserts} records. Errors: ${rows.length - upserts}`);
    }
  }
  // Cleanup: Delete rows older than 7 days
  //const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  //await supabase.from('market_movers').delete().lt('date', sevenDaysAgo);
  // Keep only the latest date's records
  const { data: latestRows } = await supabase
    .from('market_movers')
    .select('date')
    .order('date', { ascending: false })
    .limit(1);
  if (latestRows && latestRows.length > 0) {
    const keepDate = latestRows[0].date;
  await supabase.from('market_movers').delete().not('date', 'eq', keepDate);
}
  if (totalErrors === 0) {
    console.log(`All market movers upserted successfully. Total: ${totalUpserts}`);
  } else {
    console.log(`Finished with ${totalErrors} upsert errors. Check logs above.`);
  }
}

main().catch(e => { console.error(e); process.exit(1); });
