// scripts/refresh-market-movers.js
// Scrapes top gainers/losers for day, week, month, YTD and saves to a JSON file for API use.

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://stockanalysis.com/markets';
const TYPES = ['gainers', 'losers'];
const PERIODS = ['day', 'week', 'month', 'ytd'];
const PERIOD_PATH = {
  day: '',
  week: '/week',
  month: '/month',
  ytd: '/ytd',
};

async function scrape(type, period) {
  const url = `${BASE_URL}/${type}${PERIOD_PATH[period]}/`;
  const res = await axios.get(url);
  const $ = cheerio.load(res.data);
  const rows = [];
  $('table tbody tr').each((i, el) => {
    const tds = $(el).find('td');
    rows.push({
      no: i + 1,
      symbol: $(tds[1]).text().trim(),
      company: $(tds[2]).text().trim(),
      percent: $(tds[3]).text().trim(),
      price: $(tds[4]).text().trim(),
      volume: $(tds[5]).text().trim(),
      marketCap: $(tds[6]).text().trim(),
    });
  });
  return rows;
}

async function main() {
  const result = {};
  for (const type of TYPES) {
    result[type] = {};
    for (const period of PERIODS) {
      result[type][period] = await scrape(type, period);
    }
  }
  const outPath = path.join(__dirname, '../public/market-movers.json');
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
  console.log('Market movers data updated.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
