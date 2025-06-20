# TradeCraft App Specification

## Overview

TradeCraft is a modern web application designed to help traders make informed, data-driven decisions in the stock market. It provides institutional-grade trade plans, technical and fundamental analysis, and a suite of tools for both beginners and experienced traders. The platform is built with Next.js (App Router), React, TypeScript, and Tailwind CSS, and integrates with external APIs such as Finnhub and Twelve Data for real-time and historical stock data.

## Value Proposition

- **Instant, actionable trade plans**: Generate detailed, professional-grade trade plans for any stock symbol, including entry/exit points, targets, stop-loss, and risk management.
- **Momentum screener**: Discover today's top momentum stocks using technical analysis and proprietary screening logic.
- **Education-first**: Designed for both beginners and experienced traders, with clear explanations, case studies, and strategy guides.
- **No guesswork**: Removes emotional and impulsive trading by providing structured, rules-based analysis.
- **Affordable and accessible**: Offers a free tier and affordable paid plans, making institutional-quality tools available to all.

## Target Audience

- **Beginner traders**: Those looking for guidance, structure, and education to avoid common mistakes and accelerate their learning curve.
- **Experienced traders**: Users seeking to save time, validate their ideas, and access advanced analytics and screeners.
- **DIY investors**: Individuals who want to make their own decisions but need reliable, data-driven support.
- **Traders in emerging markets**: Especially those who may not have access to expensive institutional tools.

## Key Features

- **Trade Plan Generator**: Enter a stock symbol and get a detailed trade plan with:
  - Entry zone (price range)
  - Stop loss (fixed or trailing)
  - Multiple targets (risk/reward multiples)
  - Trailing stops (ATR-based)
  - Position sizing suggestion
  - Confidence level (high, medium, low)
  - Technical and fundamental context
  - Key support/resistance levels
  - Trade setup type (breakout, support bounce, trend continuation)
  - Shareable plan URL
- **Momentum Screener**: Find high-momentum stocks using technical signals, volume, and price action.
- **Education & Blog**: Case studies, strategy guides, and feature breakdowns to help users learn and improve.
- **User Authentication**: Google OAuth login, with user upsert to Supabase on every sign-in.
- **Subscription Management**: Paid plans (Pro, Premium) via Gumroad, with instant access and plan enforcement.
- **Usage Tracking**: Daily request limits and feature gating based on user plan.
- **Responsive UI**: Modern, mobile-friendly design with clear navigation and fast performance.

---

## User Flow

1. **Landing Page**: User sees the value proposition, testimonials, and can immediately start generating a trade plan.
2. **Generate Trade Plan**: User enters a stock symbol and selects a time horizon. App fetches data, runs analysis, and displays a detailed plan. User can share the plan, review technicals, and see risk management details.
3. **Explore Screener**: User applies filters to find stocks with specific characteristics. Clicks a stock to view analysis or generate a plan.
4. **Education**: User browses blog posts, case studies, and strategy guides to learn more about trading and the platform's features.
5. **Upgrade**: User can upgrade to Pro or Premium for higher limits and advanced features. Payment is handled via Gumroad, with instant plan activation via webhook.
6. **Contact & Support**: User can fill out a contact form for support or feedback.
7. **Support the Platform**: (Optional) User can donate via Buy Me a Coffee (if enabled).

---

## Pain Points Addressed

- **Analysis paralysis**: Too many indicators and conflicting signals. TradeCraft distills analysis into clear, actionable plans.
- **Emotional trading**: Removes guesswork and impulsive decisions by enforcing structured, rules-based logic.
- **Lack of access**: Makes advanced tools and analytics available to all, not just institutional traders.
- **Time-consuming research**: Automates the process of screening, analysis, and plan generation.
- **Learning curve**: Provides education, case studies, and clear explanations to help users improve.

---

## Core Calculations & Logic

### Trade Plan Generation

- **Input:** Stock symbol, time horizon (swing, positional, long-term)
- **Data Fetch:**
  - Real-time quote and company profile from Finnhub API
  - Historical price and volume data
- **Technical Analysis:**
  - **Trend Detection:**
    - Calculate uptrend, downtrend, or sideways using price changes over recent periods
    - Detect recent trend changes (short-term vs. long-term)
  - **Volume Analysis:**
    - Detect volume spikes (recent vs. average)
    - Confirm trend with volume
  - **Support/Resistance:**
    - Identify swing highs/lows in price history
    - Remove duplicates, sort, and select nearest levels
  - **ATR (Average True Range):**
    - Calculate volatility for stop loss and target placement
  - **Breakout Strength:**
    - Score based on volume, price action, and setup type
  - **Setup Type Detection:**
    - Bullish breakout, support bounce, trend continuation
  - **Indicators:**
    - RSI, MACD, EMA, Bollinger Bands, SMA, etc.
- **Risk Management:**
  - Entry zone (price range)
  - Initial stop loss (fixed or trailing)
  - Multiple targets (risk/reward multiples)
  - Trailing stops (ATR-based)
  - Position sizing suggestion
- **Confidence Level:**
  - High, medium, low based on probability score, risk/reward, and volume confirmation
- **Summary & Avoidance Reason:**
  - Human-readable summary of the plan
  - Warning if the setup is not favorable

### Screener Logic

- **Filters:** Sector, market cap, technical signals, etc.
- **Results:** List of stocks matching criteria
- **Quick Analysis:** On click, fetches and displays summary analysis

### Contact Form

- **Formspree Integration:**
  - Name, email, message fields
  - Success/error feedback

### Social Proof

- **Testimonials:**
  - Static or rotating user reviews
- **Buy Me a Coffee:**
  - Icon in header with tooltip
  - Section in footer with personal message

### Analytics & Ads

- **Google Analytics:**
  - Tracks page views, user flow, and engagement
- **Google AdSense:**
  - Displays ads for monetization

---

## Technology Stack

- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend/API:** Next.js API routes, Supabase (Postgres)
- **Authentication:** Google OAuth (NextAuth.js, Supabase)
- **Database/User Management:** Supabase (user records, upsert on sign-in)
- **Analytics:** Google Analytics
- **Payments:** Gumroad (subscriptions, webhook integration)
- **Other:** Lucide React icons, Radix UI, Recharts, technicalindicators

---

## Extensibility & Future Ideas

- User authentication and saved plans
- More advanced screeners (fundamental, options, etc.)
- Community features (comments, sharing, leaderboards)
- Premium features (alerts, advanced analytics)
- Mobile app version

---

## File Structure (Key Files)

- `app/layout.tsx` — Root layout, includes header/footer and analytics scripts
- `app/page.tsx` — Landing page
- `app/trade-plan/page.tsx` — Trade plan generator and analysis
- `app/screener/page.tsx` — Stock screener
- `app/contact/page.tsx` — Contact form
- `components/layout/Header.tsx` — Header/navigation
- `components/layout/Footer.tsx` — Footer
- `components/ui/BuyMeCoffeeButton.tsx` — Buy Me a Coffee button/icon
- `components/ui/BuyMeCoffeeMessage.tsx` — Footer message for donations
- `lib/services/finnhub.ts` — Finnhub API integration
- `lib/types.ts` — TypeScript types
- `lib/stock-analysis.ts` — Core analysis logic

---

## API Specification

## Overview

This document describes the API endpoints exposed by the TradeCraft application, including authentication, stock data, metrics, and technical indicators. All endpoints return JSON responses.

---

## Authentication

### `POST /api/auth/[...nextauth]`

- **Purpose:** Google OAuth login via NextAuth.js. On sign-in, user email is upserted to Supabase.
- **Request:**
  - Handled by NextAuth.js (OAuth flow)
- **Response:**
  - Session JWT, user info
- **Errors:**
  - Standard NextAuth errors

---

## Stock Data Endpoints

### `GET /api/finnhub`

- **Description:** Fetches real-time quote and company profile for a given stock symbol (from Finnhub).
- **Query Parameters:**
  - `symbol` (string, required): Stock symbol (e.g., AAPL, AAPL.NS)
- **Response:**
  - Real-time quote and company profile (Finnhub only)

---

### `GET /api/stock-metrics`

- **Description:** Returns computed stock metrics for a symbol and timeframe.
- **Query Parameters:**
  - `symbol` (string, required)
  - `timeframe` (string, optional: swing | positional | longterm, default: swing)
- **Response:**
  - Metrics are computed using real-time quote/profile from Finnhub **and** historical price/volume from Twelve Data (via `getStockData` in `lib/api.ts`).
  - All analytics (trend, ATR, support/resistance, volume spike, setup detection, etc.) are based on historical data and indicators from Twelve Data.

---

### `GET /api/technical-indicators`

- **Description:** Returns technical indicators for a symbol and resolution (Finnhub, but not used for main analytics).

---

## Twelve Data API (via `lib/api.ts`)

- **Endpoints Used:**
  - `/time_series` for historical price/volume (30 days)
  - `/rsi`, `/macd`, `/bbands` for technical indicators
- **Data Used For:**
  - All analytics, risk management, and trade plan logic in `app/trade-plan/page.tsx`
  - Trend, ATR, support/resistance, volume analysis, setup detection, confidence scoring, and technical analysis UI
- **API Key Rotation:**
  - Multiple API keys are rotated for reliability and quota management

---

## Error Handling

- All endpoints return appropriate HTTP status codes and a JSON error message on failure.
- Rate limiting and API quota errors are surfaced to the client.

---

_Last updated: 10 May 2025_
