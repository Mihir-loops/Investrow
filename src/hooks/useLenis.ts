/**
 * useLenis — buttery-smooth inertia scrolling via Lenis.
 *
 * Rules:
 * - Disabled when `prefers-reduced-motion: reduce` is active.
 * - Touch devices use native scrolling (smoothTouch/syncTouch: false).
 * - Fires native `scroll` events, so window.scrollY, IntersectionObserver,
 *   and scroll-linked CSS custom properties all keep working without changes.
 * - Suppressed during preloader so scroll events don't accumulate or bleed into the page.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useLenis() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      prevent: (node) => {
        return (
          document.documentElement.classList.contains("preloader-active") ||
          (node instanceof Element && node.closest(".cinematic-preloader") !== null)
        );
      },
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
}
