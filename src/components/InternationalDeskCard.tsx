import { useState } from "react";
import { Icon } from "./Icon";
import { playHover, playClick } from "../lib/audio";

interface AllocationSegment {
  name: string;
  pct: number;
  color: string;
  detail: string;
}

const ALLOCATIONS: AllocationSegment[] = [
  { name: "Equities & Index Alpha", pct: 60, color: "#38bdf8", detail: "Multi-Cap, Flexi-Cap & Bluechip Growth" },
  { name: "Sovereign Debt & Fixed", pct: 25, color: "#1d8a64", detail: "Target Maturity Bonds & Government Securities" },
  { name: "Hedging & Sovereign Gold", pct: 10, color: "#d7f36a", detail: "SGBs, Gold ETFs & Inflation Shield" },
  { name: "High-Yield Liquid Reserves", pct: 5, color: "#e2e8f0", detail: "Emergency Corpus & Cash Management" },
];

export function InternationalDeskCard() {
  const [activeSegment, setActiveSegment] = useState<AllocationSegment>(ALLOCATIONS[0]);

  return (
    <div className="intl-desk-card" role="region" aria-label="International Wealth Architecture">
      {/* Top Protocol Header */}
      <div className="intl-desk-card__top">
        <div className="intl-desk-card__status">
          <span className="intl-desk-card__beacon" aria-hidden="true" />
          <span className="intl-desk-card__label">GLOBAL WEALTH DESK · ACTIVE</span>
        </div>
        <div className="intl-desk-card__routing">
          <span className="routing-tag">AMFI REGULATED</span>
          <span className="routing-sep">/</span>
          <span className="routing-tag">BSE STAR MF ROUTED</span>
        </div>
      </div>

      {/* World Market Clocks */}
      <div className="intl-desk-card__clocks">
        <div className="clock-item">
          <span className="clock-city">MUMBAI</span>
          <span className="clock-time">IST · 15:30</span>
          <span className="clock-badge">NSE / BSE</span>
        </div>
        <div className="clock-item">
          <span className="clock-city">LONDON</span>
          <span className="clock-time">BST · 10:00</span>
          <span className="clock-badge is-live">LSE OPEN</span>
        </div>
        <div className="clock-item">
          <span className="clock-city">NEW YORK</span>
          <span className="clock-time">EDT · 05:00</span>
          <span className="clock-badge">PRE-MARKET</span>
        </div>
      </div>

      {/* Interactive Asset Allocation Framework */}
      <div className="intl-desk-card__monitor">
        <div className="monitor-head">
          <div>
            <span className="monitor-title">Institutional Wealth Distribution</span>
            <span className="monitor-sub">Balanced growth matrix & risk hedge</span>
          </div>
          <span className="monitor-pct" style={{ color: activeSegment.color }}>
            {activeSegment.pct}%
          </span>
        </div>

        {/* Visual Segment Bar */}
        <div className="monitor-bar" role="progressbar" aria-valuenow={activeSegment.pct} aria-valuemin={0} aria-valuemax={100}>
          {ALLOCATIONS.map((seg) => (
            <div
              key={seg.name}
              className={`monitor-bar__seg ${activeSegment.name === seg.name ? "is-active" : ""}`}
              style={{
                width: `${seg.pct}%`,
                backgroundColor: seg.color,
              }}
              onMouseEnter={() => {
                setActiveSegment(seg);
                playHover();
              }}
              onClick={() => {
                setActiveSegment(seg);
                playClick();
              }}
              title={`${seg.name}: ${seg.pct}%`}
            />
          ))}
        </div>

        {/* Active Segment Detail Card */}
        <div className="monitor-active-detail">
          <div className="active-dot" style={{ backgroundColor: activeSegment.color }} />
          <div>
            <strong>{activeSegment.name}</strong>
            <p>{activeSegment.detail}</p>
          </div>
        </div>

        {/* Interactive Segment Buttons */}
        <div className="monitor-chips">
          {ALLOCATIONS.map((seg) => (
            <button
              key={seg.name}
              type="button"
              className={`monitor-chip ${activeSegment.name === seg.name ? "is-selected" : ""}`}
              onClick={() => {
                setActiveSegment(seg);
                playClick();
              }}
              onMouseEnter={() => playHover()}
            >
              <span className="chip-indicator" style={{ backgroundColor: seg.color }} />
              <span className="chip-label">{seg.name.split(" ")[0]}</span>
              <span className="chip-val">{seg.pct}%</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Verified Custody Strip */}
      <div className="intl-desk-card__footer">
        <div className="compliance-item">
          <Icon name="shield" size={15} />
          <span>Fiduciary Investor First Protocol</span>
        </div>
        <div className="compliance-item">
          <Icon name="lock" size={15} />
          <span>256-Bit Bank-Grade Clearing</span>
        </div>
        <div className="compliance-badge">
          <span>ARN-194720</span>
        </div>
      </div>
    </div>
  );
}
