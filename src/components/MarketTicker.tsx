import { useEffect, useState } from "react";
import { isAudioEnabled, playClick, playHover, playTick, subscribeAudio, toggleAudio } from "../lib/audio";
import { prefersReducedMotion } from "../hooks/useReveal";

interface TickerItem {
  id: string;
  symbol: string;
  value: string;
  change: string;
  positive: boolean;
  unit?: string;
  isRate?: boolean;
}

const INITIAL_DATA: TickerItem[] = [
  { id: "nifty", symbol: "NIFTY 50", value: "24,852.15", change: "+0.42%", positive: true },
  { id: "sensex", symbol: "SENSEX", value: "81,324.60", change: "+0.38%", positive: true },
  { id: "gsec", symbol: "10Y G-SEC", value: "6.81%", change: "-0.02%", positive: false, isRate: true },
  { id: "gold", symbol: "GOLD 24K", value: "₹78,450", change: "+0.65%", positive: true, unit: "/10g" },
  { id: "silver", symbol: "SILVER 1KG", value: "₹93,200", change: "+0.80%", positive: true },
  { id: "usdinr", symbol: "USD / INR", value: "₹84.08", change: "-0.02%", positive: false },
  { id: "liquid", symbol: "LIQUID FUND 7D", value: "6.75%", change: "stable", positive: true, isRate: true },
  { id: "bse", symbol: "BSE STAR MF", value: "CONNECTED", change: "55533", positive: true },
];

export function MarketTicker() {
  const [data, setData] = useState<TickerItem[]>(INITIAL_DATA);
  const [flashingId, setFlashingId] = useState<string | null>(null);
  const [audioActive, setAudioActive] = useState(false);

  useEffect(() => {
    setAudioActive(isAudioEnabled());
    return subscribeAudio((muted) => {
      setAudioActive(!muted);
    });
  }, []);

  // Periodic realistic market pulse simulation (zero gradients, solid background flashes)
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const interval = setInterval(() => {
      // Pick a random index to update slightly
      const targetIdx = Math.floor(Math.random() * (data.length - 2)); // skip stable ones
      const item = data[targetIdx];
      if (!item) return;

      const delta = (Math.random() * 0.06 - 0.028).toFixed(2);
      const isPositive = parseFloat(delta) >= 0;

      setData((current) =>
        current.map((t, idx) => {
          if (idx !== targetIdx) return t;
          return {
            ...t,
            change: `${isPositive ? "+" : ""}${delta}%`,
            positive: isPositive,
          };
        }),
      );

      setFlashingId(item.id);
      playTick();

      const timer = setTimeout(() => {
        setFlashingId(null);
      }, 500);

      return () => clearTimeout(timer);
    }, 4200);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <aside className="market-ticker" aria-label="Market pulse and live benchmarks">
      <div className="market-ticker__prefix">
        <span className="ticker-dot" aria-hidden="true" />
        <span className="ticker-label">MARKET DESK</span>
      </div>

      <div className="market-ticker__marquee">
        <div className="market-ticker__track">
          {/* Repeat items twice for continuous loop */}
          {[...data, ...data].map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className={`ticker-item ${flashingId === item.id ? "is-flashing" : ""}`}
              onMouseEnter={() => playHover()}
              tabIndex={0}
            >
              <span className="ticker-symbol">{item.symbol}</span>
              <span className="ticker-val">
                {item.value}
                {item.unit && <span className="ticker-unit">{item.unit}</span>}
              </span>
              <span
                className={`ticker-badge ${item.positive ? "is-up" : "is-down"}`}
              >
                {item.positive ? "▲ " : "▼ "}
                {item.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="market-ticker__audio">
        <button
          type="button"
          onClick={() => {
            const next = toggleAudio();
            setAudioActive(next);
            playClick();
          }}
          className={`audio-toggle-btn ${audioActive ? "is-active" : ""}`}
          aria-label={audioActive ? "Disable tactile audio feedback" : "Enable tactile audio feedback"}
          title={audioActive ? "Tactile Audio: Active" : "Tactile Audio: Muted"}
        >
          <span className="audio-toggle-icon" aria-hidden="true">
            {audioActive ? "🔊" : "🔈"}
          </span>
          <span className="audio-toggle-text">
            {audioActive ? "AUDIO ON" : "AUDIO OFF"}
          </span>
          <span className={`audio-dot ${audioActive ? "is-on" : ""}`} aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
