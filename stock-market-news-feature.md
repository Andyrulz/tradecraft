# Stock Market News Feature Implementation Plan

## 1. Feature Analysis & Requirements

- Chronological feed of news headlines, each with:
  - Title (linked to the source)
  - Short summary or excerpt
  - Timestamp (e.g., “17 minutes ago”)
  - Source (e.g., CNBC, Forbes)
- News grouped by recency (minutes/hours ago)
- Some headlines have thumbnails or icons
- Filters/sections for “All Stocks”, “Press Releases”, etc.
- Sidebar and navigation links to other site sections

## 2. UI/UX Planning

- Sidebar Update: Add a “News” or “Stock Market News” link
- News Page Layout:
  - Main content: List of news items (headline, summary, time, source, link)
  - Optional: Filters (e.g., “All”, “Press Releases”, “By Stock”)
  - Responsive design for mobile/desktop
- News Item Component: Reusable component for each news entry

## 3. Data Source & Backend

- News API: Use a financial news API (e.g., Finnhub, NewsAPI, FinancialModelingPrep, or scraping if allowed)
- Backend Endpoint: Create a new API route (e.g., `/api/news`) to fetch and serve news data
- Caching: Implement caching to avoid excessive API calls and improve performance

## 4. Implementation Steps

a. Sidebar Navigation

- Update the sidebar component to include a “News” link
- Route it to `/news` or `/stock-news`

b. News Page

- Create a new page at `app/news/page.tsx`
- Fetch news data from the backend API
- Map and render news items using the News Item component

c. News Item Component

- Create a component (e.g., `components/news/NewsItem.tsx`) to display:
  - Headline (as a link)
  - Summary/excerpt
  - Timestamp (formatted as “x minutes/hours ago”)
  - Source
  - Optional: Thumbnail

d. API Integration

- Create a new API route (e.g., `app/api/news/route.ts`)
- Fetch news from the chosen news API
- Parse and return the data in a consistent format

e. Filters (Optional, for v2)

- Add filter buttons/tabs for “All”, “Press Releases”, etc.
- Update the API or frontend to support filtering

f. Styling

- Use Tailwind CSS for consistent styling
- Match the look and feel of your app and the reference site

g. Testing

- Test on desktop and mobile
- Handle API errors and loading states gracefully

## 5. Deployment & Monitoring

- Deploy the new feature
- Monitor API usage and errors
- Gather user feedback for improvements

## 6. Future Enhancements

- Add search functionality
- Allow filtering by stock ticker
- Add notifications for breaking news

---

# Market News Implementation Details (as of June 2025)

- News is scraped from https://stockanalysis.com/news/ using a script (`scripts/scrape-market-news.ts`).
- The script parses the latest headlines, links, sources, and timestamps, and stores them in the `market_news` table in Supabase.
- **Data Collection**: The scraper only collects news from the last 24 hours during each run.
- **Enhanced Scoring Algorithm**: Articles are scored using a sophisticated multi-factor algorithm:
  - **Recency** (0-72 points): Linear decay over 72 hours
  - **Visual Content** (+3 points): Articles with thumbnails
  - **Content Quality** (0-4 points): Based on summary length and depth
  - **Source Authority** (0-5 points): Bloomberg, Reuters, WSJ get highest scores
  - **Keyword Importance**: Weighted by impact level and position (title vs summary)
    - High-impact: Fed, inflation, recession (+3 in title, +2 in summary)
    - Medium-impact: Earnings, IPO, mergers (+2 in title, +1 in summary)
    - Market terms: Dow, Nasdaq, S&P (+1 each)
    - Policy terms: Political/regulatory news (+2 each)
  - **Breaking News** (+5 points): Urgent/developing stories
  - **Market Timing** (+1-2 points): Market hours content prioritized
  - **Data Richness** (+1 each): Presence of dollar amounts, percentages, numbers
- **Automatic Cleanup**: The scraper automatically deletes all news older than 72 hours from the database at the start of each run, ensuring a rolling 72-hour window.
- A new API route (`app/api/market-news/route.ts`) fetches news from Supabase (filtered to last 72 hours) and serves it to the frontend.
- The frontend page (`app/news/page.tsx`) uses a new component (`components/market-news/MarketNewsPage.tsx`), which renders a table of news items (`components/market-news/MarketNewsTable.tsx`).
- News items are displayed with headline, link, source, and time ago, similar to the reference site.
- The implementation closely follows the pattern used for Market Movers, with a dedicated API, table, and frontend components.
- To update news, run the scraping script on a schedule (e.g., via cron or serverless job).
- The system is modular and can be extended with filters, search, or richer summaries in the future.
- **Performance Optimization**: 72-hour data retention ensures faster API responses and reduced database storage.
