import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./useReveal";

interface MagneticOptions {
  radius?: number;
  maxDisplacement?: number;
}

/**
 * useMagnetic - Adds a luxurious magnetic pull effect to buttons & CTAs.
 * When the cursor approaches within the proximity radius, the element subtly
 * shifts toward the cursor. On leave, it smoothly springs back to its origin.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(
  options?: MagneticOptions
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const maxDisplacement = options?.maxDisplacement ?? 12;
    let isMagnetized = false;
    let animFrame: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!el.isConnected) return;
      const rect = el.getBoundingClientRect();

      // Proximity threshold around the button (proportional to element size)
      const radius = options?.radius ?? Math.max(rect.width, rect.height) * 0.85 + 40;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < radius) {
        if (!isMagnetized) {
          isMagnetized = true;
          el.classList.add("is-magnetized");
        }

        // Magnetic attraction: pull increases as distance diminishes
        const factor = Math.pow(1 - distance / radius, 1.25);
        const shiftX = (dx / (rect.width * 0.5)) * maxDisplacement * factor;
        const shiftY = (dy / (rect.height * 0.5)) * maxDisplacement * factor;

        cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, 0)`;
        });
      } else if (isMagnetized) {
        isMagnetized = false;
        el.classList.remove("is-magnetized");
        cancelAnimationFrame(animFrame);
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };

    const onMouseLeaveDoc = () => {
      if (isMagnetized) {
        isMagnetized = false;
        el.classList.remove("is-magnetized");
        cancelAnimationFrame(animFrame);
        el.style.transform = "translate3d(0, 0, 0)";
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveDoc);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      cancelAnimationFrame(animFrame);
      if (el) {
        el.style.transform = "";
        el.classList.remove("is-magnetized");
      }
    };
  }, [options?.maxDisplacement, options?.radius]);

  return ref;
}
