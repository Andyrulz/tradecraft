const axios = require('axios');
const cheerio = require('cheerio');

(async () => {
  const url = 'https://stockanalysis.com/markets/gainers/';
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
      marketCap: $(tds[6]).text().trim()
    });
  });
  console.log(rows.slice(0, 10));
})();
