const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');
const cheerio = require('cheerio');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper to parse 'x minutes ago', 'x hours ago', etc.
function parseTimeAgo(str) {
  if (!str) return new Date();
  const [num, unit] = str.split(' ');
  const n = parseInt(num);
  const now = new Date();
  if (unit && unit.startsWith('second')) return new Date(now.getTime() - n * 1000);
  if (unit && unit.startsWith('minute')) return new Date(now.getTime() - n * 60 * 1000);
  if (unit && unit.startsWith('hour')) return new Date(now.getTime() - n * 60 * 60 * 1000);
  return now;
}

// Scrape news from stockanalysis.com/news/
async function scrapeAndStoreMarketNews() {
  const { data: html } = await axios.get('https://stockanalysis.com/news/');
  const $ = cheerio.load(html);
  // Define newsItems as an array of objects (plain JS for Node.js)
  const newsItems = [];
  const now = new Date();

  // Helper: Score news for highlights (recency, image, summary, keywords)
  function scoreNews(item) {
    let score = 0;
    const published = new Date(item.published_at);
    const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
    score += Math.max(0, 24 - hoursAgo) * 2;
    if (item.thumbnail_url) score += 3;
    if (item.summary && item.summary.length > 80) score += 2;
    const keywords = ['fed', 'earnings', 'crash', 'inflation', 'cut', 'rally', 'trump', 'market', 'stocks', 'dow', 'nasdaq'];
    const text = (item.title + ' ' + (item.summary || '')).toLowerCase();
    for (const kw of keywords) {
      if (text.includes(kw)) score += 1;
    }
    return score;
  }

  // Select news containers by their unique class pattern
  $("div.gap-4.border-gray-300.bg-default.p-4.shadow").each(function(_, el) {
    // Thumbnail
    let thumbnail_url = $(el).find('img').attr('src') || null;
    if (thumbnail_url && !thumbnail_url.startsWith('http')) {
      thumbnail_url = `https://stockanalysis.com${thumbnail_url}`;
    }
    // Title and link
    const titleEl = $(el).find('h3 a').first();
    const title = titleEl.text().trim();
    let url = titleEl.attr('href') || '';
    if (url && !url.startsWith('http')) {
      url = `https://stockanalysis.com${url}`;
    }
    // Summary
    const summary = $(el).find('p').first().text().trim();
    // Time and source (fix: extract from text node after summary/title)
    let meta = '';
    let published_at = now;
    let source = '';
    // Try to extract from <div class="mt-1 text-sm text-faded ..." title="...">
    const timeDiv = $(el).find('div.mt-1.text-sm.text-faded');
    if (timeDiv.length && timeDiv.attr('title')) {
      meta = timeDiv.text().trim();
      const titleAttr = timeDiv.attr('title');
      if (titleAttr) {
        published_at = new Date(titleAttr);
      }
      // Extract source from meta text if present
      const sourceMatch = meta.match(/- (.*)$/);
      if (sourceMatch) source = sourceMatch[1].trim();
    } else if (meta.match(/(minute|hour|day)s? ago/)) {
      const match = meta.match(/^(.*?) ago - (.*)$/);
      if (match) {
        published_at = parseTimeAgo(match[1].trim());
        source = match[2].trim();
      }
    } else if (meta.match(/\d{4}-\d{2}-\d{2}/)) {
      const dateMatch = meta.match(/(\d{4}-\d{2}-\d{2})/);
      if (dateMatch) published_at = new Date(dateMatch[1]);
      source = meta.replace(/.*\d{4}-\d{2}-\d{2}/, '').trim();
    }
    // Only include news from last 24 hours
    if ((now.getTime() - published_at.getTime()) > 24 * 60 * 60 * 1000) return;
    if (title && url) {
      const item = {
        title,
        url,
        summary,
        source,
        published_at: published_at.toISOString(),
        thumbnail_url,
        score: 0,
      };
      // Assign score for highlights
      item.score = scoreNews(item);
      newsItems.push(item);
    }
  });

  let upserted = 0;
  for (const item of newsItems) {
    const { error } = await supabase.from('market_news').upsert(item, { onConflict: 'url' });
    if (!error) upserted++;
    else console.error('Upsert error:', error, item);
  }
  return upserted;
}

scrapeAndStoreMarketNews().then(count => {
  console.log(`Done. News items upserted: ${count}`);
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
