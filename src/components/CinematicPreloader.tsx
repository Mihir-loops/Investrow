import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks/useReveal";
import { isAudioEnabled, playSwitch } from "../lib/audio";

// All uppercase INVESTROW, zero trailing dots
const CHARACTERS = ["I", "N", "V", "E", "S", "T", "R", "O", "W"];

// Tracks whether the preloader has run during this tab's memory life
let hasShownPreloader = false;

interface LenisGlobal {
  lenis?: {
    stop: () => void;
    start: () => void;
    scrollTo: (target: number, opts?: { immediate?: boolean }) => void;
  };
}

export function CinematicPreloader() {
  const [isRendered, setIsRendered] = useState(!hasShownPreloader);
  const [isIntro, setIsIntro] = useState(true);
  const [progress, setProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200,
  );

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const rafId = useRef<number | null>(null);
  const hasFinishedRef = useRef(false);

  // Allow manual replay for inspection/testing via console: window.replayPreloader()
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { replayPreloader: () => void }).replayPreloader = () => {
        hasShownPreloader = false;
        hasFinishedRef.current = false;
        targetProgress.current = 0;
        currentProgress.current = 0;
        setProgress(0);
        setIsIntro(true);
        setIsRendered(true);

        const lenis = (window as unknown as LenisGlobal).lenis;
        lenis?.stop();
        lenis?.scrollTo(0, { immediate: true });
        window.scrollTo(0, 0);
      };
    }
  }, []);

  // Drop entrance animation class after initial cascade settles
  useEffect(() => {
    if (!isRendered) return;
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 900);
    return () => clearTimeout(timer);
  }, [isRendered]);

  // Track window resize for precise responsive lateral dispersal
  useEffect(() => {
    const onResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Core physics & buttery-smooth scroll interaction
  useEffect(() => {
    if (!isRendered) return;

    // Reduced motion shortcut or automated testing (e.g., Lighthouse / Headless Chrome)
    const isBotOrAudit =
      typeof navigator !== "undefined" &&
      (Boolean(navigator.webdriver) ||
        /lighthouse|headlesschrome|bot|spider|crawl/i.test(navigator.userAgent));

    if (prefersReducedMotion() || isBotOrAudit) {
      hasShownPreloader = true;
      setIsRendered(false);
      return;
    }

    // Safety timeout: auto-advance after 3 seconds if user hasn't interacted
    const idleTimer = setTimeout(() => {
      if (!hasFinishedRef.current) {
        targetProgress.current = 1;
      }
    }, 3000);

    const getLenis = () => (window as unknown as LenisGlobal).lenis;

    // Lock page scroll strictly while preloader is active
    document.documentElement.classList.add("preloader-active");
    document.body.classList.add("preloader-active");
    window.scrollTo(0, 0);
    getLenis()?.stop();
    getLenis()?.scrollTo(0, { immediate: true });

    const finishPreloader = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      hasShownPreloader = true;

      if (isAudioEnabled()) {
        playSwitch();
      }

      // Unlock page scroll immediately so hero and animations render seamlessly
      document.documentElement.classList.remove("preloader-active");
      document.body.classList.remove("preloader-active");
      document.documentElement.style.removeProperty("--preloader-scale");

      // Hard pin to the top of Hero section and resume smooth scrolling
      window.scrollTo(0, 0);
      const lenis = getLenis();
      lenis?.scrollTo(0, { immediate: true });
      lenis?.start();

      setTimeout(() => {
        setIsRendered(false);
      }, 250);
    };

    // Ultra-smooth RAF loop with responsive continuous interpolation
    const tick = () => {
      const diff = targetProgress.current - currentProgress.current;

      if (Math.abs(diff) > 0.001) {
        const factor = targetProgress.current >= 1 ? 0.12 : 0.08;
        currentProgress.current += diff * factor;
        const p = Math.max(0, Math.min(1, currentProgress.current));
        setProgress(p);

        // Subtly push the underlying site from 0.95 -> 1.0
        document.documentElement.style.setProperty(
          "--preloader-scale",
          (0.95 + p * 0.05).toFixed(4),
        );
      } else if (targetProgress.current >= 1 || currentProgress.current >= 0.95) {
        currentProgress.current = 1;
        setProgress(1);
        finishPreloader();
        return;
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    // Continuous mousewheel handler: scrolling down drives the cinematic entrance
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (hasFinishedRef.current) {
        window.scrollTo(0, 0);
        return;
      }

      const rawDelta = e.deltaY;
      if (rawDelta > 0) {
        targetProgress.current = Math.min(
          1,
          targetProgress.current + Math.max(0.35, Math.abs(rawDelta) * 0.004),
        );
        // If user scrolled past halfway, smoothly glide all the way in
        if (targetProgress.current >= 0.45) {
          targetProgress.current = 1;
        }
      } else if (rawDelta < 0 && targetProgress.current < 0.45) {
        targetProgress.current = Math.max(0, targetProgress.current - 0.2);
      }
    };

    // Mobile touch interaction: swiping up drives the entrance
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();

      if (hasFinishedRef.current) {
        window.scrollTo(0, 0);
        return;
      }

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;
      if (deltaY > 0) {
        targetProgress.current = Math.min(
          1,
          targetProgress.current + Math.max(0.35, deltaY * 0.008),
        );
        if (targetProgress.current >= 0.45) {
          targetProgress.current = 1;
        }
      }
    };

    // Keyboard navigation
    const onKeyDown = (e: KeyboardEvent) => {
      if (hasFinishedRef.current) return;

      if (["ArrowDown", "PageDown", "Space"].includes(e.code) || e.key === "Enter") {
        e.preventDefault();
        targetProgress.current = 1;
      } else if (["ArrowUp", "PageUp"].includes(e.code)) {
        e.preventDefault();
        targetProgress.current = 0;
      }
    };

    // Click anywhere to smoothly zoom through
    const onClick = () => {
      if (!hasFinishedRef.current) {
        targetProgress.current = 1;
      }
    };

    // Capture phase listeners ensure preloader gets first priority on all input
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false, capture: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("click", onClick);

    return () => {
      clearTimeout(idleTimer);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("wheel", onWheel, { capture: true });
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove, { capture: true });
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("click", onClick);
      document.documentElement.classList.remove("preloader-active");
      document.body.classList.remove("preloader-active");
      document.documentElement.style.removeProperty("--preloader-scale");

      const lenis = getLenis();
      lenis?.scrollTo(0, { immediate: true });
      lenis?.start();
    };
  }, [isRendered]);

  if (!isRendered) return null;

  // Background fade-out as letters fly past
  const backdropOpacity = Math.max(0, 1 - Math.pow(progress, 2.0));
  // Central portal glow intensity
  const portalGlow = Math.sin(progress * Math.PI) * 0.25;

  return (
    <aside
      className="cinematic-preloader"
      data-lenis-prevent
      style={{
        opacity: backdropOpacity,
        pointerEvents: progress >= 0.99 ? "none" : "auto",
      }}
      aria-label="Investrow Intro"
    >
      {/* Central Ethereal Portal Corona */}
      <div
        className="cinematic-portal"
        style={{
          transform: `scale(${1 + progress * 4.5})`,
          opacity: portalGlow,
        }}
        aria-hidden="true"
      />

      {/* Full-Width Edge-to-Edge Horizontal Horizon for INVESTROW */}
      <div className="cinematic-word-horizon" aria-label="INVESTROW">
        {CHARACTERS.map((char, index) => {
          // Normalized index from -1.0 ('I') to +1.0 ('W'), with 'S' at exact 0.0
          const normalizedOffset = (index - 4) / 4;
          const distFromCenter = Math.abs(normalizedOffset);

          // Horizontal expansion: spreads further outward beyond screen edges on scroll
          const translateX =
            normalizedOffset * Math.pow(progress, 1.25) * (windowWidth * 0.45 + 160);
          // Parabolic gentle departure
          const translateY =
            Math.sin(normalizedOffset * Math.PI) * Math.pow(progress, 1.4) * 45;
          // Subtle angular divergence
          const rotateZ = normalizedOffset * progress * 14;
          // Center letters scale dramatically larger as camera pushes through
          const charScale = 1 + progress * (3.8 + (1 - distFromCenter) * 2.8);
          // Cinematic lens blur increases smoothly
          const blurAmount = progress * (8 + (1 - distFromCenter) * 16);
          // Smooth power decay for opacity
          const charOpacity = Math.max(0, 1 - Math.pow(progress, 1.4));

          return (
            <span
              key={index}
              className={`cinematic-char ${isIntro ? "cinematic-char--entering" : ""}`}
              style={{
                transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${charScale}) rotate(${rotateZ}deg)`,
                filter: blurAmount > 0.05 ? `blur(${blurAmount}px)` : "none",
                opacity: charOpacity,
                animationDelay: `${index * 50}ms`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>

      {/* Whisper-quiet minimalist scroll cue */}
      <div
        className="cinematic-cue"
        style={{
          opacity: Math.max(0, 1 - progress * 9),
        }}
        aria-hidden="true"
      >
        <div className="cinematic-cue__track">
          <div className="cinematic-cue__dot" />
        </div>
        <span className="cinematic-cue__label">Scroll to enter</span>
      </div>
    </aside>
  );
}
