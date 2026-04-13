// ACTUAL PORTFOLIO — Entry prices as of April 8-13, 2026
// Update this file to modify positions, allocations, or theses

export const CAPITAL = 200000;
export const CASH_APR = 3.29;

// Actual entry prices for signal monitoring
export const ENTRIES = {
  DOW: { price: 40.84, shares: 185, cost: 7555 },
  LYB: { price: 79.19, shares: 100, cost: 7919 },
  CF:  { price: 134.91, shares: 90, cost: 12142 },
  MOS: { price: 26.62, shares: 452, cost: 12032 },
  SLV: { price: 39.67, shares: 233, cost: 9243 },
  GLD: { price: 440.00, shares: null, cost: null }, // separate account, qty unknown
  TLT_PUTS: { price: 0.25, contracts: 130, cost: 3336, strike: 83, expiry: '05/15/2026' },
  // TSN puts: not yet entered, planning re-entry
  // BNO: no position
  // GDX: no position
  // UVXY: no position
};

export const TRADES = [
  {
    rank: 1, dir: "BUY", inst: "DOW / LYB (US Petrochemicals)", ticker: "DOW, LYB",
    priceKeys: ["DOW", "LYB"], alloc: 15,
    conviction: "Highest", category: "2nd Order",
    thesis: "US ethane-based producers buy feedstock at Henry Hub while Asian competitors pay naphtha up 74%. 31 force majeure declarations globally. Polymer prices up 41-42%. Margin explosion is STRUCTURAL as long as Strait is closed. Blockade re-escalation on April 13 reinforces thesis.",
    catalyst: "LYB Q1 earnings Apr 24. Every week Hormuz stays closed widens the advantage.",
    risk: "Permanent ceasefire reopens global supply. BofA downgraded LYB to Underperform.",
    target: "+25-40%", maxLoss: "-12%", timeframe: "4-12 weeks",
    sc_prolonged: 35, sc_escalation: 50, sc_resolution: -8
  },
  {
    rank: 2, dir: "BUY", inst: "GLD (Gold)", ticker: "GLD",
    priceKeys: ["GLD", "XAU"], alloc: 15,
    conviction: "Highest", category: "Core Macro",
    thesis: "Gold at ~$4,718 — down 16% from ATH but rallied through the ceasefire. March CPI printed 0.9% MoM (hottest since mid-2022), confirming stagflation. Goldman maintains $5,400 year-end target. China CB buying 17th consecutive month. Gold now trading as inflation hedge, not just war hedge.",
    catalyst: "Stagflation confirmed by CPI. Blockade re-escalation. Rate cut expectations shifting.",
    risk: "Fed emergency hike. Gold < $4,200 with real yields > 2.5%.",
    target: "+15-30% ($5,400-6,000)", maxLoss: "-10%", timeframe: "4-16 weeks",
    sc_prolonged: 22, sc_escalation: 40, sc_resolution: -5
  },
  {
    rank: 3, dir: "SHORT", inst: "TLT (Long Bonds)", ticker: "TLT puts",
    priceKeys: ["TLT"], alloc: 3,
    conviction: "High", category: "Core Macro",
    thesis: "130 contracts May $83 puts at $0.25 cost basis. CPI 0.9% MoM confirms inflation persistence. 10Y at 4.30%. Blockade re-escalation pushes energy costs higher = more inflation pressure. Puts need TLT to drop ~4% to hit strike.",
    catalyst: "Continued hot inflation prints. War spending. Treasury supply pressure.",
    risk: "Flight to safety if war escalates dramatically could briefly lift bonds. Ceasefire rallied TLT.",
    target: "+15-25%", maxLoss: "-100% of premium ($3,336)", timeframe: "5 weeks (expires 5/15)",
    sc_prolonged: 20, sc_escalation: 30, sc_resolution: -5
  },
  {
    rank: 4, dir: "BUY", inst: "CF Industries (Fertilizer)", ticker: "CF",
    priceKeys: ["CF"], alloc: 6,
    conviction: "Medium", category: "2nd Order",
    thesis: "CAUTION: Entered at $134.91, stock now ~$121. Already down 10%. CF hit ATH $141.96 on Mar 30 — up 71% YTD before pullback. Ceasefire briefly broke the thesis. Blockade re-escalation helps but stock hasn't recovered. May have entered too late in the cycle.",
    catalyst: "Blockade re-escalation. Spring planting still underway with elevated fertilizer costs.",
    risk: "Permanent ceasefire. Fertilizer rally was front-loaded. Mizuho downgraded to Underperform.",
    target: "+20-35% from here", maxLoss: "-15% (stop at ~$115)", timeframe: "4-12 weeks",
    sc_prolonged: 28, sc_escalation: 40, sc_resolution: -8
  },
  {
    rank: 5, dir: "BUY", inst: "MOS (Mosaic — Phosphate)", ticker: "MOS",
    priceKeys: ["MOS"], alloc: 6,
    conviction: "Medium", category: "2nd Order",
    thesis: "Sulfur angle — 44% of global seaborne sulfur through Gulf. Entered at $26.62, currently ~$24.74, down 7%. Blockade re-escalation supports thesis. Domestic sulfur sourcing advantage from US refineries.",
    catalyst: "Phosphate price spikes as global sulfur shortage bites. Blockade intensification.",
    risk: "Ceasefire/resolution. Phosphate market smaller and less liquid than nitrogen.",
    target: "+20-30%", maxLoss: "-12%", timeframe: "4-12 weeks",
    sc_prolonged: 25, sc_escalation: 35, sc_resolution: -10
  },
  {
    rank: 6, dir: "BUY", inst: "SLV (Silver)", ticker: "SLV",
    priceKeys: ["SLV", "XAG"], alloc: 8,
    conviction: "High", category: "Leveraged Precious",
    thesis: "BIGGEST WINNER — entered at $39.67, now ~$68. UP 72%. Dual monetary + industrial demand. Consider taking partial profits (sell 1/3) to lock in gains and redeploy.",
    catalyst: "Gold breakout pulls silver. Industrial demand from AI/solar.",
    risk: "More volatile than gold. Rate hike fears hit silver harder.",
    target: "+20-40% from here", maxLoss: "Trailing stop at $58 (-15% from current)", timeframe: "4-16 weeks",
    sc_prolonged: 25, sc_escalation: 45, sc_resolution: -8
  },
  {
    rank: 7, dir: "SHORT", inst: "TSN (Tyson Foods)", ticker: "TSN puts (PLANNED)",
    priceKeys: ["TSN"], alloc: 5,
    conviction: "Medium", category: "2nd Order Short",
    thesis: "PROCESSOR SQUEEZE — structural, not war-dependent. $319M Q1 beef loss. Cattle at 74-year low. $400-600M projected FY26 beef losses. Plant closures. Feed cost pressure from corn spike. Consumer trading down. 2022 analogue: TSN fell 53% over 18 months after initial rally.",
    catalyst: "Q2 earnings early May. Corn price spikes. Consumer protein trade-down.",
    risk: "Piper upgraded to Overweight. Mizuho initiated Outperform at $72. Street is split.",
    target: "+15-25%", maxLoss: "-12%", timeframe: "4-12 weeks",
    sc_prolonged: 18, sc_escalation: 28, sc_resolution: -10
  },
  {
    rank: "-", dir: "CASH", inst: "Cash Reserve (3.29% APR)", ticker: "Money Market",
    priceKeys: [], alloc: 42,
    conviction: "-", category: "Liquidity",
    thesis: "Large cash position reflects positions not yet entered (no BNO, GDX, UVXY). Provides flexibility to add on dips or deploy into new opportunities as blockade situation evolves.",
    catalyst: "-", risk: "Opportunity cost.", target: "3.29% APR", maxLoss: "0%", timeframe: "-",
    sc_prolonged: 3.29, sc_escalation: 3.29, sc_resolution: 3.29
  },
];
