'use client';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { TRADES, CAPITAL, CASH_APR } from '@/lib/trades';

const C = {
  bg: "#080c14", bg2: "#0f1520", bg3: "#161e2e", border: "#1c2740", borderLt: "#283552",
  text: "#e4e8f0", dim: "#8590a6", muted: "#5a6478",
  green: "#10b981", red: "#ef4444", amber: "#f59e0b", cyan: "#06b6d4", purple: "#a78bfa",
  gold: "#fbbf24", silver: "#94a3b8", blue: "#3b82f6",
};

const catC = { "Core Macro": C.cyan, "2nd Order": C.purple, "Direct Energy": C.green, "Leveraged Precious": C.gold, "2nd Order Short": C.red, "Tail Hedge": C.amber, "Liquidity": C.muted };

const Pill = ({ children, color }) => (
  <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, fontFamily: "'JetBrains Mono'", background: color + "20", color, border: `1px solid ${color}40`, letterSpacing: 0.5 }}>{children}</span>
);

const Pct = ({ v, bold }) => {
  if (typeof v !== 'number') return <span style={{ color: C.dim }}>{v}</span>;
  const c = v > 0 ? C.green : v < 0 ? C.red : C.dim;
  return <span style={{ color: c, fontWeight: bold ? 700 : 500, fontFamily: "'JetBrains Mono'" }}>{v > 0 ? "+" : ""}{v}%</span>;
};

const fmt = (n) => "$" + Math.round(n).toLocaleString();

// Live price display for ticker bar
function TickerItem({ label, priceKey, prices, suffix, color }) {
  const val = prices?.[priceKey];
  return (
    <div style={{ padding: "4px 10px", background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4, minWidth: 100 }}>
      <div style={{ fontSize: 9, color: C.muted, fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "'JetBrains Mono'" }}>
        {val != null ? `${suffix || '$'}${val.toLocaleString(undefined, { maximumFractionDigits: 2 })}` : '—'}
      </div>
      <div style={{ fontSize: 9, fontFamily: "'JetBrains Mono'", color: color || C.dim }}>
        {val != null ? 'LIVE' : 'loading...'}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [prices, setPrices] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [expandedRank, setExpandedRank] = useState(null);
  const [view, setView] = useState("trades");

  // Fetch prices on mount and every 5 minutes
  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch('/api/prices');
      const data = await res.json();
      if (data.prices) {
        setPrices(data.prices);
        setLastUpdate(data.updated || new Date().toISOString());
      }
    } catch (e) {
      console.error('Price fetch failed:', e);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const portfolioReturn = useMemo(() => {
    let prol = 0, esc = 0, res = 0;
    TRADES.forEach(t => {
      prol += (t.alloc / 100) * t.sc_prolonged;
      esc += (t.alloc / 100) * t.sc_escalation;
      res += (t.alloc / 100) * t.sc_resolution;
    });
    return { prolonged: prol, escalation: esc, resolution: res, blended: prol * 0.55 + esc * 0.30 + res * 0.15 };
  }, []);

  const views = [
    { id: "trades", label: "Force-Ranked Trades" },
    { id: "matrix", label: "P&L Scenarios" },
    { id: "cascade", label: "Supply Chain Cascade" },
  ];

  const dayOfWar = Math.floor((Date.now() - new Date('2026-02-28').getTime()) / 86400000);

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh" }}>
      {/* HEADER */}
      <div style={{ background: C.bg2, borderBottom: `1px solid ${C.border}`, padding: "14px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11, fontWeight: 700, fontFamily: "'JetBrains Mono'", color: C.red, padding: "2px 8px", background: C.red + "18", border: `1px solid ${C.red}33`, borderRadius: 4, letterSpacing: 1.5 }}>● DAY {dayOfWar}</span>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: -0.5 }}>Prolonged Disruption Model</span>
          <span style={{ fontSize: 12, color: C.dim, fontFamily: "'JetBrains Mono'" }}>{fmt(CAPITAL)} Capital &middot; Force-Ranked</span>
          {lastUpdate && (
            <span style={{ fontSize: 10, color: C.muted, fontFamily: "'JetBrains Mono'", marginLeft: "auto" }}>
              Last update: {new Date(lastUpdate).toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* LIVE TICKER */}
        <div style={{ display: "flex", gap: 8, marginTop: 10, overflowX: "auto", paddingBottom: 2 }}>
          <TickerItem label="WTI" priceKey="WTI" prices={prices} color={C.green} />
          <TickerItem label="GOLD SPOT" priceKey="XAU" prices={prices} color={C.gold} />
          <TickerItem label="SILVER SPOT" priceKey="XAG" prices={prices} color={C.silver} />
          <TickerItem label="GLD" priceKey="GLD" prices={prices} color={C.gold} />
          <TickerItem label="BNO" priceKey="BNO" prices={prices} color={C.green} />
          <TickerItem label="TLT" priceKey="TLT" prices={prices} color={C.red} />
          <TickerItem label="DOW" priceKey="DOW" prices={prices} color={C.purple} />
          <TickerItem label="LYB" priceKey="LYB" prices={prices} color={C.purple} />
          <TickerItem label="CF" priceKey="CF" prices={prices} color={C.amber} />
          <TickerItem label="MOS" priceKey="MOS" prices={prices} color={C.amber} />
          <TickerItem label="TSN" priceKey="TSN" prices={prices} color={C.red} />
          <TickerItem label="VIX" priceKey="VIX" prices={prices} suffix="" color={C.amber} />
        </div>
      </div>

      {/* PORTFOLIO SUMMARY */}
      <div style={{ padding: "10px 20px", display: "flex", gap: 10, overflowX: "auto", borderBottom: `1px solid ${C.border}`, background: C.bg2 + "80" }}>
        {[
          { l: "Prolonged (55%)", v: `+${portfolioReturn.prolonged.toFixed(1)}%`, s: fmt(portfolioReturn.prolonged / 100 * CAPITAL), c: C.amber },
          { l: "Escalation (30%)", v: `+${portfolioReturn.escalation.toFixed(1)}%`, s: fmt(portfolioReturn.escalation / 100 * CAPITAL), c: C.red },
          { l: "Resolution (15%)", v: `${portfolioReturn.resolution.toFixed(1)}%`, s: fmt(portfolioReturn.resolution / 100 * CAPITAL), c: C.green },
          { l: "Weighted Expected", v: `+${portfolioReturn.blended.toFixed(1)}%`, s: fmt(portfolioReturn.blended / 100 * CAPITAL), c: C.cyan },
          { l: "Capital", v: fmt(CAPITAL), s: `Cash: ${fmt(CAPITAL * 0.07)} @ ${CASH_APR}%`, c: C.text },
        ].map((m, i) => (
          <div key={i} style={{ padding: "8px 14px", background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 6, minWidth: 110 }}>
            <div style={{ fontSize: 9, color: C.muted, fontFamily: "'JetBrains Mono'", letterSpacing: 1, textTransform: "uppercase" }}>{m.l}</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: m.c, fontFamily: "'JetBrains Mono'" }}>{m.v}</div>
            <div style={{ fontSize: 10, color: C.dim }}>{m.s}</div>
          </div>
        ))}
      </div>

      {/* VIEW TABS */}
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        {views.map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            padding: "10px 20px", background: view === v.id ? C.bg3 : "transparent",
            border: "none", borderBottom: view === v.id ? `2px solid ${C.cyan}` : "2px solid transparent",
            color: view === v.id ? C.text : C.muted, cursor: "pointer",
            fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 500, letterSpacing: 0.5
          }}>{v.label}</button>
        ))}
      </div>

      <div style={{ padding: "14px 20px" }}>
        {/* FORCE-RANKED TRADES */}
        {view === "trades" && TRADES.map((t, i) => {
          const expanded = expandedRank === i;
          const cc = catC[t.category] || C.dim;
          // Get live price for first priceKey
          const livePrice = t.priceKeys?.[0] && prices?.[t.priceKeys[0]];
          return (
            <div key={i} onClick={() => setExpandedRank(expanded ? null : i)} style={{
              marginBottom: 6, background: C.bg2, border: `1px solid ${C.border}`,
              borderLeft: `3px solid ${t.dir === "BUY" ? C.green : t.dir === "SHORT" ? C.red : C.muted}`,
              borderRadius: 6, cursor: "pointer"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", flexWrap: "wrap" }}>
                <div style={{ width: 30, fontSize: 18, fontWeight: 800, fontFamily: "'JetBrains Mono'", color: t.rank === "-" ? C.muted : C.cyan }}>
                  {t.rank === "-" ? "—" : `#${t.rank}`}
                </div>
                <Pill color={t.dir === "BUY" ? C.green : t.dir === "SHORT" ? C.red : C.muted}>{t.dir}</Pill>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{t.inst}</div>
                  <div style={{ fontSize: 10, color: C.dim, fontFamily: "'JetBrains Mono'" }}>
                    {t.ticker}
                    {livePrice != null && <span style={{ color: C.cyan, marginLeft: 8 }}>${livePrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>}
                  </div>
                </div>
                <Pill color={cc}>{t.category}</Pill>
                <div style={{ textAlign: "center", minWidth: 55 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono'", color: C.cyan }}>{t.alloc}%</div>
                  <div style={{ fontSize: 9, color: C.muted }}>{fmt(t.alloc / 100 * CAPITAL)}</div>
                </div>
                <Pill color={t.conviction === "Highest" ? C.green : t.conviction === "High" ? C.amber : t.conviction.startsWith("Medium") ? C.gold : C.muted}>{t.conviction}</Pill>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono'", color: C.green, minWidth: 70, textAlign: "right" }}>{t.target}</div>
                <div style={{ fontSize: 10, color: C.dim, transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</div>
              </div>
              {expanded && (
                <div style={{ padding: "0 14px 14px 54px", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.cyan, marginBottom: 4, fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>THESIS</div>
                      <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6 }}>{t.thesis}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginBottom: 4, fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>CATALYST</div>
                      <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6, marginBottom: 8 }}>{t.catalyst}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: C.red, marginBottom: 4, fontFamily: "'JetBrains Mono'", letterSpacing: 1 }}>KEY RISK</div>
                      <div style={{ fontSize: 11, color: C.dim, lineHeight: 1.6 }}>{t.risk}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap" }}>
                    {[
                      { l: "Target", v: t.target, c: C.green },
                      { l: "Max Loss", v: t.maxLoss, c: C.red },
                      { l: "Timeframe", v: t.timeframe, c: C.dim },
                      { l: "Prolonged", v: `+${t.sc_prolonged}%`, c: C.amber },
                      { l: "Escalation", v: `+${t.sc_escalation}%`, c: C.red },
                      { l: "Resolution", v: `${t.sc_resolution}%`, c: C.green },
                    ].map((m, j) => (
                      <div key={j} style={{ padding: "4px 10px", background: C.bg3, borderRadius: 4, border: `1px solid ${C.border}` }}>
                        <div style={{ fontSize: 9, color: C.muted, fontFamily: "'JetBrains Mono'" }}>{m.l}</div>
                        <div style={{ fontSize: 12, fontWeight: 600, color: m.c, fontFamily: "'JetBrains Mono'" }}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* P&L MATRIX */}
        {view === "matrix" && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.borderLt}` }}>
                  {["#", "Position", "Alloc", "$", "Prolonged (55%)", "Escalation (30%)", "Resolution (15%)", "Weighted"].map(h => (
                    <th key={h} style={{ padding: "8px", textAlign: h === "#" ? "center" : "left", fontSize: 10, color: C.muted, fontFamily: "'JetBrains Mono'", letterSpacing: 1, fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TRADES.map((t, i) => {
                  const w = t.sc_prolonged * 0.55 + t.sc_escalation * 0.30 + t.sc_resolution * 0.15;
                  const dollarAlloc = t.alloc / 100 * CAPITAL;
                  return (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
                      <td style={{ padding: "8px", textAlign: "center", fontFamily: "'JetBrains Mono'", fontSize: 12, fontWeight: 700, color: C.cyan }}>{t.rank}</td>
                      <td style={{ padding: "8px", fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 600 }}>{t.inst}</td>
                      <td style={{ padding: "8px", fontFamily: "'JetBrains Mono'", fontSize: 11, color: C.cyan }}>{t.alloc}%</td>
                      <td style={{ padding: "8px", fontFamily: "'JetBrains Mono'", fontSize: 10, color: C.dim }}>{fmt(dollarAlloc)}</td>
                      <td style={{ padding: "8px", textAlign: "center" }}><Pct v={t.sc_prolonged} /><div style={{ fontSize: 9, color: C.muted }}>{fmt(dollarAlloc * t.sc_prolonged / 100)}</div></td>
                      <td style={{ padding: "8px", textAlign: "center" }}><Pct v={t.sc_escalation} /><div style={{ fontSize: 9, color: C.muted }}>{fmt(dollarAlloc * t.sc_escalation / 100)}</div></td>
                      <td style={{ padding: "8px", textAlign: "center" }}><Pct v={t.sc_resolution} /><div style={{ fontSize: 9, color: C.muted }}>{fmt(dollarAlloc * t.sc_resolution / 100)}</div></td>
                      <td style={{ padding: "8px", textAlign: "center" }}><Pct v={Math.round(w * 10) / 10} bold /><div style={{ fontSize: 9, color: C.muted }}>{fmt(dollarAlloc * w / 100)}</div></td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: `2px solid ${C.borderLt}`, background: C.bg3 }}>
                  <td colSpan={3} style={{ padding: "10px 8px", fontFamily: "'JetBrains Mono'", fontSize: 12, fontWeight: 700 }}>TOTAL PORTFOLIO</td>
                  <td style={{ padding: "10px 8px", fontFamily: "'JetBrains Mono'", fontSize: 11, fontWeight: 700, color: C.cyan }}>{fmt(CAPITAL)}</td>
                  <td style={{ padding: "10px 8px", textAlign: "center" }}><Pct v={Math.round(portfolioReturn.prolonged * 10) / 10} bold /><div style={{ fontSize: 9, color: C.dim }}>{fmt(portfolioReturn.prolonged / 100 * CAPITAL)}</div></td>
                  <td style={{ padding: "10px 8px", textAlign: "center" }}><Pct v={Math.round(portfolioReturn.escalation * 10) / 10} bold /><div style={{ fontSize: 9, color: C.dim }}>{fmt(portfolioReturn.escalation / 100 * CAPITAL)}</div></td>
                  <td style={{ padding: "10px 8px", textAlign: "center" }}><Pct v={Math.round(portfolioReturn.resolution * 10) / 10} bold /><div style={{ fontSize: 9, color: C.dim }}>{fmt(portfolioReturn.resolution / 100 * CAPITAL)}</div></td>
                  <td style={{ padding: "10px 8px", textAlign: "center" }}><Pct v={Math.round(portfolioReturn.blended * 10) / 10} bold /><div style={{ fontSize: 9, color: C.dim }}>{fmt(portfolioReturn.blended / 100 * CAPITAL)}</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* SUPPLY CHAIN CASCADE */}
        {view === "cascade" && [
          { layer: "LAYER 1", title: "Energy & Feedstock", color: C.red, items: ["20M bbl/d oil offline — WTI inverted above Brent (unprecedented)", "Naphtha up 74% — key petrochemical feedstock", "Qatar LNG offline (19% global supply) — EUR TTF surging", "Henry Hub at $2.80 = US producers' MASSIVE cost advantage"], trades: "BNO (#6)" },
          { layer: "LAYER 2", title: "Petrochemicals & Plastics", color: C.purple, items: ["$733B in petrochemical feedstocks (22% of global) flow through Gulf", "Polymer prices up 41-42%. 31 force majeure declarations globally", "85% of Middle East PE exports blocked. Asian crackers cutting 50%", "US ethane-based producers: feedstock $2.80 vs naphtha up 74%"], trades: "DOW / LYB (#1 conviction)" },
          { layer: "LAYER 3", title: "Fertilizer", color: C.amber, items: ["30% of global urea trade blocked. Urea: $475→$700/MT (+47%)", "44% of global seaborne sulfur from Gulf — phosphate disrupted", "NO strategic fertilizer reserves anywhere in the world", "1 ton urea = 126 bushels of corn (was 75 in Dec)"], trades: "CF (#4), MOS (#5)" },
          { layer: "LAYER 4", title: "Agriculture & Planting", color: C.green, items: ["Smallest US wheat crop since 1919 (USDA)", "Corn planting down 3M+ acres — farmers can't afford fertilizer", "Soybean substitution reshaping crop mix", "FAO: 3-month window before risks escalate significantly"], trades: "Corn futures, soy/corn spread" },
          { layer: "LAYER 5", title: "Protein & Consumer", color: C.gold, items: ["Cattle herd at multi-decade lows. Fed steer: $242/cwt (record)", "Retail beef $10.12/lb (+42% vs 5yr avg). Corn spike → feed +30-50%", "Tyson facing $600M beef segment losses. Processor squeeze.", "Consumer trade-down: beef → chicken → beans. USPS 8% surcharge."], trades: "Short TSN (#9)" },
        ].map((layer, i) => (
          <div key={i} style={{ marginBottom: 10, background: C.bg2, border: `1px solid ${C.border}`, borderLeft: `3px solid ${layer.color}`, borderRadius: 6, padding: "12px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, flexWrap: "wrap", gap: 4 }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 700, fontFamily: "'JetBrains Mono'", color: layer.color, letterSpacing: 1.5 }}>{layer.layer}</span>
                <span style={{ fontSize: 13, fontWeight: 700, marginLeft: 10 }}>{layer.title}</span>
              </div>
              <span style={{ fontSize: 10, color: C.cyan, fontFamily: "'JetBrains Mono'" }}>Trades: {layer.trades}</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
              {layer.items.map((item, j) => (
                <div key={j} style={{ fontSize: 11, color: C.dim, lineHeight: 1.5, padding: "2px 0" }}>• {item}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "10px 20px", borderTop: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 9, color: C.muted, fontFamily: "'JetBrains Mono'" }}>⚠ Hypothetical analysis. Not investment advice. All trades carry risk of total loss.</div>
        <div style={{ fontSize: 9, color: C.muted, fontFamily: "'JetBrains Mono'" }}>
          Prices via Twelve Data &middot; 5-min refresh &middot; v4.1 Live
        </div>
      </div>
    </div>
  );
}
