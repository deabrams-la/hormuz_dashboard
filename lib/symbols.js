// Twelve Data symbol mapping
// Commodities use a different endpoint format on Twelve Data
// For equities/ETFs: just the ticker symbol
// For forex/commodities: use the pair format

export const SYMBOLS = {
  // ETFs & Equities — direct ticker lookup
  GLD:  { symbol: 'GLD',  label: 'GOLD (GLD)',    type: 'etf' },
  SLV:  { symbol: 'SLV',  label: 'SILVER (SLV)',  type: 'etf' },
  GDX:  { symbol: 'GDX',  label: 'GDX MINERS',    type: 'etf' },
  BNO:  { symbol: 'BNO',  label: 'BRENT (BNO)',   type: 'etf' },
  TLT:  { symbol: 'TLT',  label: 'TLT BONDS',     type: 'etf' },
  DOW:  { symbol: 'DOW',  label: 'DOW INC',       type: 'stock' },
  LYB:  { symbol: 'LYB',  label: 'LYONDELLBASELL', type: 'stock' },
  CF:   { symbol: 'CF',   label: 'CF INDUSTRIES',  type: 'stock' },
  MOS:  { symbol: 'MOS',  label: 'MOSAIC',         type: 'stock' },
  TSN:  { symbol: 'TSN',  label: 'TYSON FOODS',    type: 'stock' },
  UVXY: { symbol: 'UVXY', label: 'UVXY (VIX)',     type: 'etf' },
  // Commodities — Twelve Data real-time quote
  WTI:  { symbol: 'WTI/USD',  label: 'WTI CRUDE',   type: 'commodity' },
  XAU:  { symbol: 'XAU/USD',  label: 'GOLD SPOT',    type: 'forex' },
  XAG:  { symbol: 'XAG/USD',  label: 'SILVER SPOT',  type: 'forex' },
  // Index
  VIX:  { symbol: 'VIX',  label: 'VIX',  type: 'index' },
  DXY:  { symbol: 'DXY',  label: 'DXY',  type: 'index' },
};

// Ticker symbols for the price bar — these get fetched via the API route
export const TICKER_SYMBOLS = ['WTI', 'XAU', 'XAG', 'GLD', 'BNO', 'TLT', 'DOW', 'LYB', 'CF', 'MOS', 'TSN', 'UVXY', 'VIX'];

// Map ticker to Twelve Data API symbol
export function getTwelveDataSymbol(key) {
  return SYMBOLS[key]?.symbol || key;
}

export function getLabel(key) {
  return SYMBOLS[key]?.label || key;
}
