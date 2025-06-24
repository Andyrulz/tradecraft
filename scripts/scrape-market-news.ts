import { createClient } from '@supabase/supabase-js';
import axios from 'axios';
import * as cheerio from 'cheerio';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

// Helper to parse 'x minutes ago', 'x hours ago', etc.
function parseTimeAgo(str: string) {
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
  const newsItems: any[] = [];
  const now = new Date();
  // Helper: Enhanced scoring for news highlights
  function scoreNews(item: any) {
    let score = 0;
    const published = new Date(item.published_at);
    const hoursAgo = (now.getTime() - published.getTime()) / (1000 * 60 * 60);
    
    // 1. RECENCY SCORING (0-72 points) - Standardized with frontend
    score += Math.max(0, 72 - hoursAgo) * 1;
    
    // 2. VISUAL CONTENT (+3 points)
    if (item.thumbnail_url) score += 3;
    
    // 3. CONTENT QUALITY (0-4 points)
    if (item.summary && item.summary.length > 150) score += 4; // Rich content
    else if (item.summary && item.summary.length > 80) score += 2; // Decent content
    
    // 4. SOURCE AUTHORITY (0-5 points)
    const authorityMap: { [key: string]: number } = {
      'bloomberg': 5, 'reuters': 5, 'wall street journal': 5, 'wsj': 5,
      'cnbc': 4, 'marketwatch': 4, 'yahoo finance': 4,
      'seeking alpha': 3, 'motley fool': 3, 'benzinga': 3,
      'barron\'s': 4, 'financial times': 5, 'ft': 5
    };
    const source = (item.source || '').toLowerCase();
    for (const [sourceName, points] of Object.entries(authorityMap)) {
      if (source.includes(sourceName)) {
        score += points;
        break;
      }
    }
    
    // 5. KEYWORD SCORING - Weighted by importance and position
    const title = (item.title || '').toLowerCase();
    const summary = (item.summary || '').toLowerCase();
    
    // High-impact market keywords (3 points each in title, 2 in summary)
    const highImpactKeywords = ['fed', 'interest rate', 'inflation', 'gdp', 'unemployment', 'recession', 'crash', 'correction', 'bubble'];
    highImpactKeywords.forEach(keyword => {
      if (title.includes(keyword)) score += 3;
      else if (summary.includes(keyword)) score += 2;
    });
    
    // Medium-impact keywords (2 points in title, 1 in summary)
    const mediumImpactKeywords = ['earnings', 'ipo', 'merger', 'acquisition', 'buyback', 'dividend', 'guidance', 'outlook'];
    mediumImpactKeywords.forEach(keyword => {
      if (title.includes(keyword)) score += 2;
      else if (summary.includes(keyword)) score += 1;
    });
    
    // Market/Index keywords (1 point each)
    const marketKeywords = ['dow', 'nasdaq', 's&p', 'russell', 'market', 'stocks', 'bonds', 'futures'];
    marketKeywords.forEach(keyword => {
      if (title.includes(keyword) || summary.includes(keyword)) score += 1;
    });
    
    // Political/Policy keywords (2 points each)
    const policyKeywords = ['trump', 'biden', 'congress', 'senate', 'policy', 'regulation', 'tariff', 'trade war'];
    policyKeywords.forEach(keyword => {
      if (title.includes(keyword) || summary.includes(keyword)) score += 2;
    });
    
    // 6. BREAKING NEWS INDICATORS (+5 points)
    const breakingIndicators = ['breaking', 'urgent', 'alert', 'just in', 'developing'];
    breakingIndicators.forEach(indicator => {
      if (title.includes(indicator)) score += 5;
    });
    
    // 7. MARKET TIMING BONUS (market hours = +2, pre/post = +1)
    const hour = published.getHours();
    if (hour >= 9 && hour <= 16) score += 2; // Market hours EST
    else if ((hour >= 4 && hour < 9) || (hour > 16 && hour <= 20)) score += 1; // Pre/post market
    
    // 8. CONTENT INDICATORS (+1 each)
    const qualityIndicators = [/\$\d+/g, /\d+%/g, /\d+\.\d+/g]; // Dollar amounts, percentages, decimals
    qualityIndicators.forEach(pattern => {
      if (pattern.test(title + ' ' + summary)) score += 1;
    });
    
    return Math.round(score);
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
  // Clean up old news (older than 72 hours) before inserting new data
  const seventyTwoHoursAgo = new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString();
  const { error: deleteError, count: deletedCount } = await supabase
    .from('market_news')
    .delete()
    .lt('published_at', seventyTwoHoursAgo);
  
  if (deleteError) {
    console.error('Error cleaning up old news:', deleteError);
  } else {
    console.log(`Cleaned up ${deletedCount || 0} old news items (older than 72 hours)`);
  }

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
  console.log('Database now contains only news from the last 72 hours');
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});