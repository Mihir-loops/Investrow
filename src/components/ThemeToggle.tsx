import { useTheme } from "../hooks/useTheme";

/**
 * Fires a cinematic sweep that expands from the toggle button click-point.
 * → Dark mode: black ink circle expands from click origin to cover the page.
 * → Light mode: white daylight circle expands from click origin to reveal brightness.
 * Both directions animate the NEW snapshot expanding (circle 0 → full radius),
 * so the experience is symmetrically cinematic in either direction.
 *
 * View Transition API (Chrome 111+, Edge 111+) → native snapshot approach.
 * Fallback → CSS clip-path ripple overlay for all other browsers.
 */
function triggerThemeTransition(
  event: React.MouseEvent<HTMLButtonElement>,
  nextTheme: "dark" | "light",
  applyTheme: () => void,
) {
  const x = event.clientX;
  const y = event.clientY;

  // Furthest corner distance — ensures circle covers the entire viewport
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── View Transition API path (Chrome 111+, Edge 111+) ──────────────────────
  if (typeof document.startViewTransition === "function" && !reducedMotion) {
    const transition = document.startViewTransition(applyTheme);

    transition.ready.then(() => {
      // Always animate the NEW snapshot expanding as a circle from the click point.
      // This gives an identical "sweep in" feel for both dark → light and light → dark.
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 680,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });

    return;
  }

  // ── Reduced-motion: instant swap, no animation ───────────────────────────────
  if (reducedMotion) {
    applyTheme();
    return;
  }

  // ── CSS Ripple Overlay fallback (Firefox, Safari, older Chrome) ─────────────
  // A full-screen fixed div clips in from the click point.
  // Black circle for dark, white circle for light — same expansion for both.
  const overlay = document.createElement("div");
  overlay.className = "theme-wipe-overlay";

  const color = nextTheme === "dark" ? "#000000" : "#ffffff";

  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    zIndex: "999998",
    pointerEvents: "none",
    background: color,
    clipPath: `circle(0px at ${x}px ${y}px)`,
    willChange: "clip-path",
    transition: "clip-path 0.65s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  document.body.appendChild(overlay);

  // Trigger reflow so the starting clip-path is registered before we animate
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  overlay.offsetWidth;

  // Expand to full coverage
  overlay.style.clipPath = `circle(${endRadius + 32}px at ${x}px ${y}px)`;

  // Apply theme at the halfway point so it feels like a reveal, not a cover
  setTimeout(applyTheme, 300);

  // Self-clean after animation
  overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });
}

export function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const isDark = theme === "dark";
  const nextTheme = isDark ? "light" : "dark";

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerThemeTransition(e, nextTheme, toggle);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      onClick={handleClick}
    >
      <span className="theme-toggle__track" aria-hidden="true">
        <span className="theme-toggle__icon theme-toggle__icon--sun">
          {/* Sun */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </span>
        <span className="theme-toggle__icon theme-toggle__icon--moon">
          {/* Moon */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </span>
        <span className="theme-toggle__thumb" aria-hidden="true" />
      </span>
    </button>
  );
}
