# Market Movers Feature: End-to-End Architecture & Workflow

## 1. Data Source & Scraping Logic

- **Sources:**
  - [stockanalysis.com/markets/gainers/](https://stockanalysis.com/markets/gainers/) (and /week, /month, /ytd)
  - [stockanalysis.com/markets/losers/](https://stockanalysis.com/markets/losers/) (and /week, /month, /ytd)
- **What is scraped:**
  - For each period (day, week, month, YTD) and type (gainers, losers):
    - Symbol
    - Company Name
    - % Change
    - Stock Price
    - Volume
    - Market Cap
- **Scraping Implementation:**
  - Script: `scripts/refresh-market-movers-db.ts`
  - Uses `axios` to fetch HTML and `cheerio` to parse tables.
  - Iterates over all 8 combinations (2 types × 4 periods).
  - Extracts and normalizes data for each row.

## 2. Database Upsert Logic

- **Database:** Supabase Postgres
- **Table:** `market_movers`
- **Schema:**
  - id (serial, PK)
  - type (gainers/losers)
  - period (day/week/month/ytd)
  - symbol
  - company_name
  - percent
  - price
  - volume
  - market_cap
  - date (YYYY-MM-DD)
  - refreshed_at (timestamp)
  - Unique constraint: (type, period, symbol, date)
- **Upsert:**
  - Each scraped row is upserted (inserted or updated) using the unique constraint.
  - Uses the Supabase anon key (RLS must allow upserts for anon role).
- **Cleanup:**
  - Script deletes rows older than 7 days to keep the table fresh.

## 3. API Endpoint

- **File:** `app/api/market-movers-db/route.ts`
- **How it works:**
  - Accepts query params: `type` (gainers/losers), `period` (day/week/month/ytd)
  - Fetches and returns all matching rows from `market_movers` for the current date.
  - Example: `/api/market-movers-db?type=gainers&period=week`

## 4. Frontend Display

- **Page:** `/market-movers` (see `app/market-movers/page.tsx`)
- **Component:** `components/market-movers/MarketMoversPage.tsx`
- **UI/UX:**
  - Two tables side by side: Gainers and Losers.
  - Each table has its own period filter (Today, Week, Month, YTD).
  - Tables fetch data from the API endpoint using the selected type and period.
  - Data is displayed in a clean, sortable table with columns: Symbol, Company Name, % Change, Stock Price, Volume, Market Cap.
  - Loading and error states are handled.

## 5. Automation & Cron

- **Script:** `scripts/refresh-market-movers-db.ts`
- **How to run:**
  - Manually: `npx dotenv -e .env.local -- node scripts/refresh-market-movers-db.ts`
  - Cron: Schedule this command to run daily (or as needed) to keep data fresh.

## 6. Security & RLS

- **Supabase RLS:**
  - Table must have an RLS policy that allows upserts for the anon role for the script to work.
  - API endpoint reads are public by default, but can be restricted if needed.

## 7. Troubleshooting

- If no data appears in the table:
  - Check RLS policies.
  - Check environment variables (`SUPABASE_URL`, `SUPABASE_ANON_KEY`).
  - Run the script manually and check logs for upsert errors.
- If frontend shows no data:
  - Check API endpoint response in browser or with curl.
  - Check that the correct type/period is being sent in the query params.

---

**This architecture ensures a robust, scalable, and maintainable Market Movers feature, with clear separation of scraping, storage, API, and frontend display.**
