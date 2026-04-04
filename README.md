# Hormuz Crisis — Prolonged Disruption Model

Live tactical commodities trade desk with real-time price feeds via Twelve Data.

## Deploy in 5 Steps

### 1. Get a Twelve Data API Key (free)
- Go to [twelvedata.com](https://twelvedata.com)
- Create a free account
- Copy your API key from the [API Keys page](https://twelvedata.com/account/api-keys)

### 2. Create a GitHub repo
```bash
cd hormuz-dashboard
git init
git add .
git commit -m "Initial commit"
gh repo create hormuz-dashboard --private --push
```
Or create the repo on GitHub.com and push manually.

### 3. Connect to Vercel
- Go to [vercel.com/new](https://vercel.com/new)
- Import your `hormuz-dashboard` repo
- **Before deploying**, add your environment variable:
  - Click **Environment Variables**
  - Name: `TWELVE_DATA_API_KEY`
  - Value: *(paste your Twelve Data API key)*
- Click **Deploy**

### 4. Done
Your dashboard is live at `https://hormuz-dashboard.vercel.app` (or whatever Vercel assigns).

Prices refresh every 5 minutes during market hours. The API route caches responses to stay within Twelve Data's free tier (800 calls/day).

## Local Development

```bash
npm install
cp .env.local.example .env.local
# Edit .env.local with your API key
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Updating Trades

Edit `lib/trades.js` to modify:
- Position rankings and allocations
- Theses, catalysts, and risk notes
- Scenario P&L estimates
- Capital base and cash APR

Push to GitHub and Vercel auto-deploys.

## Architecture

```
app/
  layout.js          — Root layout with metadata
  globals.css        — Fonts and base styles
  page.js            — Main dashboard (client component)
  api/prices/route.js — Serverless API that fetches Twelve Data + caches
lib/
  trades.js          — Trade data (edit this to update positions)
  symbols.js         — Twelve Data symbol mapping
```

## Price Feed Details

- **Equities/ETFs**: Batch-fetched from Twelve Data `/price` endpoint
- **Commodities** (WTI, Gold, Silver spot): Fetched as forex pairs (XAU/USD, XAG/USD, WTI/USD)
- **Cache**: 5-minute TTL on the serverless function to stay within rate limits
- **Fallback**: If API is unavailable, displays last known prices from April 4, 2026

## Twelve Data Free Tier Limits
- 800 API credits/day
- 8 API credits/minute
- ~13 symbols × ~78 refreshes/day (6.5hr market) = ~1,014 calls
- To stay under 800, the cache ensures max ~78 calls/day (one batch every 5 min)
- If you need more headroom: Basic plan is $29/mo for 12,000 credits/day
