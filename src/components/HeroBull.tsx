/**
 * HeroBull — lazy-loaded wrapper for the 3D bull scene.
 * - Code-splits three.js/@react-three/fiber out of the main bundle.
 * - Suspense fallback: a hand-drawn low-poly SVG bull so the hero is never
 *   empty while the 3D chunk loads.
 * - Error boundary: if WebGL is unavailable (or the context dies), the same
 *   SVG bull takes over permanently — the visual never breaks.
 */

import { Suspense, lazy, Component, useState, useEffect, type ReactNode } from "react";

const BullCanvas = lazy(() => import("./herobull/BullCanvas"));

export function StaticBull({ className = "" }: { className?: string }) {
  const [gaze, setGaze] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.7) * 2;
      const y = (e.clientY / window.innerHeight - 0.3) * 2;
      setGaze({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <svg
      className={`hero-bull-fallback ${className}`.trim()}
      viewBox="0 0 220 220"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="bull-head-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#020704" />
          <stop offset="35%" stopColor="#041a0d" />
          <stop offset="70%" stopColor="#065f46" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="bull-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ca8a04" />
          <stop offset="50%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#a16207" />
        </linearGradient>
      </defs>

      {/* horns — full solid black, no gradient */}
      <path
        d="M74 78 Q34 66 26 30 Q34 40 52 51 Q68 59 82 60 Z"
        fill="#050706"
      />
      <path
        d="M146 78 Q186 66 194 30 Q186 40 168 51 Q152 59 138 60 Z"
        fill="#050706"
      />
      {/* ears */}
      <path d="M46 92 L26 104 L50 112 Z" fill="#030d07" />
      <path d="M174 92 L194 104 L170 112 Z" fill="#030d07" />
      {/* head with black-to-bullish-green gradient */}
      <path
        d="M58 74 Q110 52 162 74 Q176 128 110 172 Q44 128 58 74 Z"
        fill="url(#bull-head-grad)"
      />
      {/* crown shard */}
      <path d="M84 62 Q110 48 136 62 L110 78 Z" fill="#020704" />

      {/* realistic anatomical bovine muzzle & nostrils */}
      <path
        d="M78 136 C78 126 142 126 142 136 C144 148 136 162 110 162 C84 162 76 148 78 136 Z"
        fill="#041208"
        stroke="#064e3b"
        strokeWidth="1"
      />
      {/* Nasal pad rhinarium center groove */}
      <path d="M110 134 L110 152" stroke="#064e3b" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Realistic flared crescent nostril cavities with shadowed interior */}
      <path
        d="M91 144 C88 141 93 138 98 141 C100 143 99 149 95 149 C91 149 88 146 91 144 Z"
        fill="#010402"
        stroke="#064e3b"
        strokeWidth="0.8"
      />
      <path
        d="M129 144 C132 141 127 138 122 141 C120 143 121 149 125 149 C129 149 132 146 129 144 Z"
        fill="#010402"
        stroke="#064e3b"
        strokeWidth="0.8"
      />
      {/* Flared nostril wing creases */}
      <path d="M87 142 C85 146 87 151 92 152" stroke="#059669" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M133 142 C135 146 133 151 128 152" stroke="#059669" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7" />
      {/* Golden septum ring — sits flush against nasal pad, piercing through septum */}
      <ellipse cx="110" cy="148" rx="7.5" ry="7.5" fill="none" stroke="url(#bull-ring-grad)" strokeWidth="2.5" />
      <circle cx="110" cy="141" r="1.4" fill="#fef08a" />

      {/* eyes — dark socket frame, luminous white eyeball, cursor-tracking black pupil */}
      <circle cx="80" cy="100" r="9" fill="#030d07" />
      <circle cx="80" cy="100" r="7.5" fill="#ffffff" />
      <circle cx={80 + gaze.x * 2.5} cy={100 + gaze.y * 2.2} r="5" fill="#ffffff" />
      <circle cx={80 + gaze.x * 3.2} cy={100 + gaze.y * 2.8} r="2.2" fill="#000000" />
      <circle cx={81 + gaze.x * 3.2} cy={99 + gaze.y * 2.8} r="0.7" fill="#ffffff" />

      <circle cx="140" cy="100" r="9" fill="#030d07" />
      <circle cx="140" cy="100" r="7.5" fill="#ffffff" />
      <circle cx={140 + gaze.x * 2.5} cy={100 + gaze.y * 2.2} r="5" fill="#ffffff" />
      <circle cx={140 + gaze.x * 3.2} cy={100 + gaze.y * 2.8} r="2.2" fill="#000000" />
      <circle cx={141 + gaze.x * 3.2} cy={99 + gaze.y * 2.8} r="0.7" fill="#ffffff" />
      {/* pedestal hint */}
      <rect
        x="68"
        y="192"
        width="84"
        height="14"
        rx="7"
        fill="#030d07"
        stroke="#064e3b"
      />
      <rect x="92" y="186" width="36" height="3" rx="1.5" fill="#10b981" />
    </svg>
  );
}

type BoundaryState = { failed: boolean };

class BullBoundary extends Component<{ children: ReactNode }, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return <StaticBull />;
    return this.props.children;
  }
}

export function HeroBull() {
  return (
    <div className="hero-bull-wrap" aria-hidden="true">
      <BullBoundary>
        <Suspense fallback={<StaticBull />}>
          <BullCanvas />
        </Suspense>
      </BullBoundary>
    </div>
  );
}
