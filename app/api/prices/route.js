import { TICKER_SYMBOLS, getTwelveDataSymbol } from '@/lib/symbols';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function GET() {
  const now = Date.now();
  const apiKey = process.env.TWELVE_DATA_API_KEY;

  if (!apiKey) {
    return Response.json({ prices: getFallbackPrices(), error: 'NO_API_KEY', ts: now });
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

  const chunks = [];
  for (let i = 0; i < equityKeys.length; i += 5) {
    chunks.push(equityKeys.slice(i, i + 5));
  }

  for (let ci = 0; ci < chunks.length; ci++) {
    const chunk = chunks[ci];
    const syms = chunk.map(s => s.symbol).join(',');
    try {
      const res = await fetch(`https://api.twelvedata.com/price?symbol=${syms}&apikey=${apiKey}`, { cache: 'no-store' });
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

  for (let fi = 0; fi < forexKeys.length; fi++) {
    const { key, symbol } = forexKeys[fi];
    try {
      const res = await fetch(`https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`, { cache: 'no-store' });
      const data = await res.json();
      prices[key] = data.price ? parseFloat(data.price) : null;
    } catch (e) {
      prices[key] = null;
    }
    if (fi < forexKeys.length - 1) await sleep(9000);
  }

  const fb = getFallbackPrices();
  for (const key of TICKER_SYMBOLS) {
    if (prices[key] == null) prices[key] = fb[key] ?? null;
  }

  return new Response(JSON.stringify({ prices, cached: false, updated: new Date(now).toISOString() }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  });
}

function getFallbackPrices() {
  return {
    WTI: 112.26, XAU: 4677, XAG: 73.03,
    GLD: 429.41, SLV: 67.2, GDX: 39.8, BNO: 54.12,
    TLT: 86.77, DOW: 41.4, LYB: 76.50, CF: 130.0,
    MOS: 32.1, TSN: 64.50, UVXY: 16.2, VIX: 23.87, DXY: 99.99,
  };
}
