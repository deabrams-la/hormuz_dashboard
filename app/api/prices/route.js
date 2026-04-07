import { TICKER_SYMBOLS, getTwelveDataSymbol } from '@/lib/symbols';

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET() {
  const now = Date.now();

  if (cache.data && (now - cache.timestamp) < CACHE_TTL) {
    return Response.json({ prices: cache.data, cached: true, updated: new Date(cache.timestamp).toISOString() });
  }

  const apiKey = process.env.TWELVE_DATA_API_KEY;
  if (!apiKey) {
    return Response.json({ prices: getFallbackPrices(), error: 'NO_API_KEY', updated: new Date(now).toISOString() });
  }

  const prices = {};
  const equityKeys = [];
  const forexKeys = [];

  for (const key of TICKER_SYMBOLS) {
    const sym = getTwelveDataSymbol(key);
    if (sym.includes('/')) {
      forexKeys.push({ key, symbol: sym });
    } else {
      equityKeys.push({ key, symbol: sym });
    }
  }

  // Fetch equities in small batches of 5
  const chunks = [];
  for (let i = 0; i < equityKeys.length; i += 5) {
    chunks.push(equityKeys.slice(i, i + 5));
  }

  for (let ci = 0; ci < chunks.length; ci++) {
    const chunk = chunks[ci];
    const syms = chunk.map(s => s.symbol).join(',');
    try {
      const res = await fetch(`https://api.twelvedata.com/price?symbol=${syms}&apikey=${apiKey}`);
      const data = await res.json();
      if (chunk.length === 1) {
        prices[chunk[0].key] = data.price ? parseFloat(data.price) : null;
      } else {
        for (const { key, symbol } of chunk) {
          prices[key] = data[symbol]?.price ? parseFloat(data[symbol].price) : null;
        }
      }
    } catch (e) {
      for (const { key } of chunk) prices[key] = null;
    }
    if (ci < chunks.length - 1 || forexKeys.length > 0) await sleep(9000);
  }

  // Fetch forex one at a time
  for (let fi = 0; fi < forexKeys.length; fi++) {
    const { key, symbol } = forexKeys[fi];
    try {
      const res = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`);
      const data = await res.json();
      prices[key] = data.price ? parseFloat(data.price) : null;
    } catch (e) {
      prices[key] = null;
    }
    if (fi < forexKeys.length - 1) await sleep(9000);
  }

  // Fill nulls with fallback
  const fb = getFallbackPrices();
  for (const key of TICKER_SYMBOLS) {
    if (prices[key] == null) prices[key] = fb[key] ?? null;
  }

  cache = { data: prices, timestamp: now };
  return Response.json({ prices, cached: false, updated: new Date(now).toISOString() });
}

function getFallbackPrices() {
  return {
    WTI: 111.54, XAU: 4677, XAG: 73.03,
    GLD: 437.5, SLV: 67.2, GDX: 39.8, BNO: 30.2,
    TLT: 85.5, DOW: 38.2, LYB: 82.5, CF: 92.3,
    MOS: 32.1, TSN: 52.8, UVXY: 16.2, VIX: 23.87, DXY: 99.99,
  };
}
