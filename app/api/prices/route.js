import { TICKER_SYMBOLS, getTwelveDataSymbol } from '@/lib/symbols';

// Cache prices for 5 minutes to stay within Twelve Data free tier limits
let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const now = Date.now();

  // Return cached data if fresh
  if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
    return Response.json({ prices: cache.data, cached: true, updated: new Date(cache.timestamp).toISOString() });
  }

  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) {
    return Response.json({ error: 'TWELVE_DATA_API_KEY not set', prices: getFallbackPrices() }, { status: 200 });
  }

  try {
    // Batch request — Twelve Data supports comma-separated symbols
    // Split into equities and forex/commodity batches
    const equitySymbols = [];
    const forexSymbols = [];

    for (const key of TICKER_SYMBOLS) {
      const sym = getTwelveDataSymbol(key);
      if (sym.includes('/')) {
        forexSymbols.push({ key, symbol: sym });
      } else {
        equitySymbols.push({ key, symbol: sym });
      }
    }

    const prices = {};

    // Fetch equities batch
    if (equitySymbols.length > 0) {
      const syms = equitySymbols.map(s => s.symbol).join(',');
      const url = `https://api.twelvedata.com/price?symbol=${syms}&apikey=${apiKey}`;
      const res = await fetch(url, { next: { revalidate: 300 } });
      const data = await res.json();

      // Twelve Data returns { SYMBOL: { price: "123.45" } } for batch requests
      // or { price: "123.45" } for single symbol
      if (equitySymbols.length === 1) {
        const key = equitySymbols[0].key;
        prices[key] = data.price ? parseFloat(data.price) : null;
      } else {
        for (const { key, symbol } of equitySymbols) {
          if (data[symbol] && data[symbol].price) {
            prices[key] = parseFloat(data[symbol].price);
          } else {
            prices[key] = null;
          }
        }
      }
    }

    // Fetch forex/commodity individually (Twelve Data doesn't batch forex well)
    for (const { key, symbol } of forexSymbols) {
      try {
        const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
        const res = await fetch(url, { next: { revalidate: 300 } });
        const data = await res.json();
        prices[key] = data.price ? parseFloat(data.price) : null;
      } catch {
        prices[key] = null;
      }
    }

    // Update cache
    cache = { data: prices, timestamp: now };

    return Response.json({
      prices,
      cached: false,
      updated: new Date(now).toISOString(),
    });
  } catch (error) {
    console.error('Twelve Data fetch error:', error);
    return Response.json({
      error: error.message,
      prices: cache.data || getFallbackPrices(),
      cached: true,
      updated: cache.timestamp ? new Date(cache.timestamp).toISOString() : null,
    });
  }
}

// Fallback prices if API is unavailable (last known as of Apr 4, 2026)
function getFallbackPrices() {
  return {
    WTI: 111.54, XAU: 4677, XAG: 73.03,
    GLD: 437.5, SLV: 67.2, GDX: 39.8, BNO: 30.2,
    TLT: 85.5, DOW: 38.2, LYB: 82.5, CF: 92.3,
    MOS: 32.1, TSN: 52.8, UVXY: 16.2, VIX: 23.87, DXY: 99.99,
  };
}
