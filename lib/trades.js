// FORCE-RANKED TRADES — $200K capital base
// Update this file to modify positions, allocations, or theses

export const CAPITAL = 200000;
export const CASH_APR = 3.29;

export const TRADES = [
  {
    rank: 1, dir: "BUY", inst: "DOW / LYB (US Petrochemicals)", ticker: "DOW, LYB",
    priceKeys: ["DOW", "LYB"], alloc: 15,
    conviction: "Highest", category: "2nd Order",
    thesis: "THE NON-OBVIOUS WINNER. US ethane-based producers buy feedstock at Henry Hub ($2.80) while Asian competitors pay naphtha up 74%. 193 active Middle East petrochemical complexes are offline or constrained. 31 force majeure declarations globally. Polymer prices up 41-42% in 4 weeks. US producers are the ONLY cost-advantaged swing supplier left. Margin explosion is STRUCTURAL as long as Strait is closed.",
    catalyst: "Q1 earnings (late Apr) will show margin expansion. Every week Hormuz stays closed widens the advantage.",
    risk: "Sudden ceasefire reopens global supply. But even then, restocking takes months.",
    target: "+25-40%", maxLoss: "-12%", timeframe: "4-12 weeks",
    sc_prolonged: 35, sc_escalation: 50, sc_resolution: -8
  },
  {
    rank: 2, dir: "BUY", inst: "GLD (Gold)", ticker: "GLD",
    priceKeys: ["GLD", "XAU"], alloc: 15,
    conviction: "Highest", category: "Core Macro",
    thesis: "Gold at $4,677 — rallied $238 from $4,439 low. Goldman maintains $5,400 year-end target throughout the correction. Structural CB buying intact (China 15th consecutive month). The 'paradox' is resolving: gold is starting to trade as inflation hedge again (up with oil, down with equities). March CPI on Apr 10 is THE catalyst.",
    catalyst: "March CPI release ~Apr 10. Stagflation confirmation = narrative flip.",
    risk: "Fed emergency hike rhetoric. Gold < $4,200 with real yields > 2.5%.",
    target: "+15-30% ($5,400-6,000)", maxLoss: "-10%", timeframe: "4-16 weeks",
    sc_prolonged: 22, sc_escalation: 40, sc_resolution: -5
  },
  {
    rank: 3, dir: "SHORT", inst: "TLT (Long Bonds)", ticker: "TLT puts",
    priceKeys: ["TLT"], alloc: 12,
    conviction: "High", category: "Core Macro",
    thesis: "10Y at 4.35%, hit 4.40% (8-mo high). 'The Great Hawkish Pivot' — market moved from 3 cuts to 0 cuts to pricing hikes. 2Y auction tailed 1.8bps (worst since 2022). War spending expanding deficit. THIS IS THE GOLD HEDGE: if rates rise and gold falls, TLT puts profit.",
    catalyst: "Hot CPI prints, continued war spending, Treasury supply pressure.",
    risk: "Sudden flight to safety if war escalates dramatically could briefly lift bonds.",
    target: "+15-25%", maxLoss: "-8%", timeframe: "4-8 weeks",
    sc_prolonged: 20, sc_escalation: 30, sc_resolution: -5
  },
  {
    rank: 4, dir: "BUY", inst: "CF Industries (Fertilizer)", ticker: "CF",
    priceKeys: ["CF"], alloc: 10,
    conviction: "High", category: "2nd Order",
    thesis: "Urea from $475→$700/MT (+47%). CF is largest US nitrogen producer — DOMESTIC sourcing insulated from Hormuz. 30% of global urea trade blocked. No strategic fertilizer reserves anywhere. USDA forecasts smallest US wheat crop since 1919.",
    catalyst: "USDA planting report, continued Hormuz closure through planting season.",
    risk: "Ceasefire reopens fertilizer flows. But even then, planting window damage is done.",
    target: "+20-35%", maxLoss: "-10%", timeframe: "4-12 weeks",
    sc_prolonged: 28, sc_escalation: 40, sc_resolution: -8
  },
  {
    rank: 5, dir: "BUY", inst: "MOS (Mosaic — Phosphate)", ticker: "MOS",
    priceKeys: ["MOS"], alloc: 7,
    conviction: "High", category: "2nd Order",
    thesis: "THE SULFUR ANGLE. Gulf produces 44% of global seaborne sulfur. Sulfur is essential for processing phosphate rock into fertilizer. Mosaic has DOMESTIC sulfur sourcing from US oil refineries. Same margin explosion as DOW/LYB but in fertilizer.",
    catalyst: "Phosphate fertilizer price spikes as global sulfur shortage bites. DAP/MAP already above $700/MT.",
    risk: "Lower conviction than CF because phosphate market is smaller and less liquid.",
    target: "+20-30%", maxLoss: "-12%", timeframe: "4-12 weeks",
    sc_prolonged: 25, sc_escalation: 35, sc_resolution: -10
  },
  {
    rank: 6, dir: "BUY", inst: "BNO (Brent Oil)", ticker: "BNO shares + OTM calls",
    priceKeys: ["BNO", "WTI"], alloc: 11,
    conviction: "Medium-High", category: "Direct Energy",
    thesis: "8% shares + 3% May OTM calls. WTI INVERTED above Brent — unprecedented. Goldman/Macquarie: $150-200 if blockade persists through June. OTM calls are a lottery ticket on escalation — small premium, 3-5x payout if Brent rips to $130-140.",
    catalyst: "Full Strait closure by Apr 10. WTI-Brent inversion widening. Saudi/UAE entering conflict.",
    risk: "Oil already +55%. Ceasefire drops $20-30 fast. OTM calls go to zero = defined risk.",
    target: "Shares: +15-25%. Calls: +200-400%", maxLoss: "-20% / -100%", timeframe: "2-8 weeks",
    sc_prolonged: 20, sc_escalation: 50, sc_resolution: -22
  },
  {
    rank: 7, dir: "BUY", inst: "GDX (Gold Miners)", ticker: "GDX",
    priceKeys: ["GDX"], alloc: 8,
    conviction: "Medium-High", category: "Leveraged Precious",
    thesis: "2-3x leveraged gold exposure. Miners crushed in gold's correction — deep value entry. If gold moves to $5,400 (Goldman target), GDX moves 30-50%.",
    catalyst: "Gold breaking above $4,800 triggers institutional re-entry into miners.",
    risk: "If gold continues correcting, miners fall 2-3x as fast.",
    target: "+25-50%", maxLoss: "-20%", timeframe: "4-16 weeks",
    sc_prolonged: 32, sc_escalation: 55, sc_resolution: -12
  },
  {
    rank: 8, dir: "BUY", inst: "SLV (Silver)", ticker: "SLV",
    priceKeys: ["SLV", "XAG"], alloc: 5,
    conviction: "Medium", category: "Leveraged Precious",
    thesis: "Gold/silver ratio at 64:1 — historically precedes silver outperformance. Dual demand: monetary (follows gold) + industrial (AI/solar). Petrochemical disruption could increase silver demand as substitute conductor.",
    catalyst: "Gold breakout above $4,800 pulls silver. Industrial demand data.",
    risk: "More volatile than gold. Rate hike fears hit silver harder.",
    target: "+20-40%", maxLoss: "-15%", timeframe: "4-16 weeks",
    sc_prolonged: 25, sc_escalation: 45, sc_resolution: -8
  },
  {
    rank: 9, dir: "SHORT", inst: "TSN (Tyson Foods)", ticker: "TSN puts",
    priceKeys: ["TSN"], alloc: 5,
    conviction: "Medium", category: "2nd Order Short",
    thesis: "PROCESSOR SQUEEZE. $600M beef segment losses with cattle at record highs. Corn going from $4.50→$6.50+ on fertilizer disruption. Feed is 60-70% of finishing costs. Squeezed from EVERY direction.",
    catalyst: "Q2 earnings guidance. Corn price spikes. Consumer protein trade-down.",
    risk: "Tyson could cut capacity. Short squeezes possible.",
    target: "+15-25%", maxLoss: "-12%", timeframe: "4-12 weeks",
    sc_prolonged: 18, sc_escalation: 28, sc_resolution: -10
  },
  {
    rank: 10, dir: "BUY", inst: "VIX Calls (UVXY)", ticker: "UVXY",
    priceKeys: ["UVXY", "VIX"], alloc: 5,
    conviction: "Medium", category: "Tail Hedge",
    thesis: "VIX at 23.87 with a shooting war in 5+ countries. Vol is CHEAP for this backdrop. Any escalation spikes VIX to 35-40+.",
    catalyst: "Ground ops announcement. Major infrastructure hit. Gulf states entering war.",
    risk: "VIX mean-reverts fast. Time decay on UVXY is brutal.",
    target: "+50-100%", maxLoss: "-60%", timeframe: "2-4 weeks",
    sc_prolonged: 30, sc_escalation: 100, sc_resolution: -55
  },
  {
    rank: "-", dir: "CASH", inst: "Cash Reserve (3.29% APR)", ticker: "Money Market",
    priceKeys: [], alloc: 7,
    conviction: "-", category: "Liquidity",
    thesis: "7% cash earning 3.29% APR. Minimal allocation reflects high conviction in prolonged disruption.",
    catalyst: "-", risk: "Opportunity cost.", target: "3.29% APR", maxLoss: "0%", timeframe: "-",
    sc_prolonged: 3.29, sc_escalation: 3.29, sc_resolution: 3.29
  },
];
