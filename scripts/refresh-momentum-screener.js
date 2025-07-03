// scripts/refresh-momentum-screener.js
// This script runs both the GET and POST refresh endpoints, ensuring each runs only once per day.

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GET_URL = 'https://www.tradingsetup.pro/api/momentum-screener/refresh';
const POST_URL = 'https://www.tradingsetup.pro/api/momentum-screener/refresh';
const LOG_FILE = path.join(__dirname, 'refresh-momentum-screener.log');

function log(msg) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${msg}\n`);
}

function request(url, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method }, res => {
      let data = '';
      res.on('data', chunk => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  // Check if already run today
  const today = new Date().toISOString().slice(0, 10);
  let lastRun = '';
  if (fs.existsSync(LOG_FILE)) {
    const lines = fs.readFileSync(LOG_FILE, 'utf8').split('\n');
    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].includes('FINISHED')) {
        lastRun = lines[i].split(' ')[0].replace('[', '').replace(']', '').slice(0, 10);
        break;
      }
    }
  }
  if (lastRun === today) {
    log('Already ran today. Exiting.');
    return;
  }
  log('STARTING GET');
  const getRes = await request(GET_URL, 'GET');
  log(`GET status: ${getRes.status}, response: ${getRes.data}`);
  // Wait 1 hour (3600 seconds)
  log('Waiting 1 hour before POST...');
  await new Promise(r => setTimeout(r, 3600 * 1000));
  log('STARTING POST');
  const postRes = await request(POST_URL, 'POST');
  log(`POST status: ${postRes.status}, response: ${postRes.data}`);
  log('FINISHED');
}

main().catch(e => {
  log('ERROR: ' + e.stack || e);
  process.exit(1);
});
