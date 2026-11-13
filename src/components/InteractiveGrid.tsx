import { useEffect, useRef } from "react";

interface Point {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  intensity: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  strength: number;
}

/**
 * InteractiveGrid - High-performance canvas-based interactive background grid.
 * Reacts to cursor proximity with elastic magnetic displacement, constellation hairlines,
 * luminous dot excitation, and click shockwave ripples.
 * Strictly complies with the Zero Gradients constraint (pure solid / rgba colors).
 */
export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let animationFrameId: number;
    let points: Point[] = [];
    const shockwaves: Shockwave[] = [];

    const STEP = 26; // Distance between grid dots (smaller grid boxes)
    const REACTION_RADIUS = 150; // Cursor interaction field
    const MAX_DISPLACEMENT = 16; // Elastic push away from cursor

    let targetMouseX = -9999;
    let targetMouseY = -9999;
    let mouseX = -9999;
    let mouseY = -9999;
    let hasMouse = false;
    let isVisible = true;

    // Track user cursor activity
    let lastActivityTime = 0;

    // 3D Bull Area Exclusion Tracking
    let bullElement: HTMLElement | null = null;
    let cachedBullRect: DOMRect | null = null;
    let lastBullCheckTime = 0;

    function getBullRect(now: number): DOMRect | null {
      if (now - lastBullCheckTime > 100 || !cachedBullRect) {
        lastBullCheckTime = now;
        if (!bullElement || !bullElement.isConnected) {
          bullElement =
            document.querySelector<HTMLElement>(".home-hero__visual") ||
            document.querySelector<HTMLElement>(".hero-bull-wrap");
        }
        if (bullElement) {
          const r = bullElement.getBoundingClientRect();
          if (r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth) {
            cachedBullRect = r;
          } else {
            cachedBullRect = null;
          }
        } else {
          cachedBullRect = null;
        }
      }
      return cachedBullRect;
    }

    function isInBullArea(px: number, py: number, rect: DOMRect | null, margin: number = 0): boolean {
      if (!rect) return false;
      return (
        px >= rect.left - margin &&
        px <= rect.right + margin &&
        py >= rect.top - margin &&
        py <= rect.bottom + margin
      );
    }



    function initGrid() {
      canvas!.width = window.innerWidth * dpr;
      canvas!.height = window.innerHeight * dpr;
      ctx!.scale(dpr, dpr);

      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      const cols = Math.ceil(displayWidth / STEP) + 2;
      const rows = Math.ceil(displayHeight / STEP) + 4;
      const offsetX = (displayWidth - (cols - 1) * STEP) / 2;
      const offsetY = -STEP;

      points = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = offsetX + c * STEP;
          const by = offsetY + r * STEP;
          points.push({
            baseX: bx,
            baseY: by,
            x: bx,
            y: by,
            vx: 0,
            vy: 0,
            intensity: 0,
          });
        }
      }
    }

    initGrid();

    function handleResize() {
      initGrid();
    }

    function handlePointerMove(e: PointerEvent) {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
      hasMouse = true;
      lastActivityTime = performance.now();
      if (mouseX === -9999) {
        mouseX = targetMouseX;
        mouseY = targetMouseY;
      }
    }

    function handlePointerLeave() {
      hasMouse = false;
      lastActivityTime = 0; // Immediately drop activity fade on leave
    }

    function handlePointerDown(e: PointerEvent) {
      const bRect = getBullRect(performance.now());
      if (isInBullArea(e.clientX, e.clientY, bRect, 0)) {
        return; // Disable background dots / shockwaves when clicking in the 3D bull area
      }
      lastActivityTime = performance.now();
      // Spawn tactical shockwave ripple on click
      shockwaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: Math.min(window.innerWidth, window.innerHeight) * 0.45,
        strength: 1.0,
      });
    }

    function handleVisibilityChange() {
      isVisible = !document.hidden;
    }

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // If reduced motion is preferred, keep canvas blank (no idle grid)
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      return () => {
        window.removeEventListener("resize", handleResize);
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerleave", handlePointerLeave);
        window.removeEventListener("pointerdown", handlePointerDown);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };
    }

    let lastTime = performance.now();

    function render(currentTime: number) {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      ctx!.clearRect(0, 0, displayWidth, displayHeight);

      // Smooth cursor lerp
      if (hasMouse) {
        mouseX += (targetMouseX - mouseX) * 0.16;
        mouseY += (targetMouseY - mouseY) * 0.16;
      } else {
        mouseX += (-9999 - mouseX) * 0.08;
        mouseY += (-9999 - mouseY) * 0.08;
      }

      // Update shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 540 * delta;
        sw.strength = Math.max(0, 1 - sw.radius / sw.maxRadius);
        if (sw.radius >= sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      // 3D Bull exclusion boundary
      const bRect = getBullRect(currentTime);
      const isCursorInBull = isInBullArea(targetMouseX, targetMouseY, bRect, 6);

      // Fast user idle timeout: starts fading after 250ms of stillness, completely gone by 650ms
      const timeSinceActivity = currentTime - lastActivityTime;
      let cursorActivityFade = 0;
      if (hasMouse && !isCursorInBull) {
        if (timeSinceActivity < 250) {
          cursorActivityFade = 1;
        } else if (timeSinceActivity < 650) {
          cursorActivityFade = 1 - (timeSinceActivity - 250) / 400;
        }
      }

      // If there is zero cursor activity and no active shockwaves, don't draw anything!
      if (cursorActivityFade <= 0.001 && shockwaves.length === 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const cols = Math.ceil(displayWidth / STEP) + 2;

      // Update points physics
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Disable all motion and excitation in the 3D bull area
        if (isInBullArea(p.baseX, p.baseY, bRect, 6)) {
          p.intensity = 0;
          p.vx = 0;
          p.vy = 0;
          p.x = p.baseX;
          p.y = p.baseY;
          continue;
        }

        let targetX = p.baseX;
        let targetY = p.baseY;
        let excitation = 0;

        // Cursor magnetic interaction (disabled when cursor is over the 3D bull)
        if (hasMouse && !isCursorInBull) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);

          if (dist < REACTION_RADIUS) {
            const factor = 1 - dist / REACTION_RADIUS;
            const push = Math.pow(factor, 1.6) * MAX_DISPLACEMENT;
            const angle = Math.atan2(dy, dx);
            targetX += Math.cos(angle) * push;
            targetY += Math.sin(angle) * push;
            excitation = Math.max(excitation, factor);
          }
        }

        // Shockwave ripple influence
        for (let s = 0; s < shockwaves.length; s++) {
          const sw = shockwaves[s];
          const wdx = p.baseX - sw.x;
          const wdy = p.baseY - sw.y;
          const wdist = Math.hypot(wdx, wdy);
          const diff = Math.abs(wdist - sw.radius);

          if (diff < 42) {
            const waveFactor = (1 - diff / 42) * sw.strength;
            const angle = Math.atan2(wdy, wdx);
            targetX += Math.cos(angle) * (waveFactor * 16);
            targetY += Math.sin(angle) * (waveFactor * 16);
            excitation = Math.max(excitation, waveFactor);
          }
        }

        // Gentle ambient idle wave
        const idleWave = Math.sin(p.baseX * 0.012 + currentTime * 0.0012) * Math.cos(p.baseY * 0.012 + currentTime * 0.001) * 1.5;
        targetY += idleWave;

        // Spring dampening
        const ax = (targetX - p.x) * 0.14;
        const ay = (targetY - p.y) * 0.14;
        p.vx = (p.vx + ax) * 0.72;
        p.vy = (p.vy + ay) * 0.72;
        p.x += p.vx;
        p.y += p.vy;

        p.intensity = p.intensity * 0.86 + excitation * 0.14;
      }

      // Check theme for matching contrast
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const dotRgb = isLight ? "0, 0, 0" : "255, 255, 255";
      const SPOTLIGHT_RADIUS = 180;

      // 1. Draw Constellation Network Hairlines (only near active cursor)
      if (hasMouse && cursorActivityFade > 0.05) {
        ctx!.lineWidth = 0.65;
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          if (p.intensity <= 0.08 || isInBullArea(p.x, p.y, bRect, 6)) continue;

          // Check right neighbor
          const rightIdx = i + 1;
          if (rightIdx < points.length && (i % cols) < cols - 1) {
            const pRight = points[rightIdx];
            if (!isInBullArea(pRight.x, pRight.y, bRect, 6)) {
              const linkIntensity = Math.min(p.intensity, pRight.intensity);
              if (linkIntensity > 0.05) {
                const alpha = (linkIntensity * 0.35 * cursorActivityFade).toFixed(3);
                ctx!.strokeStyle = `rgba(${dotRgb}, ${alpha})`;
                ctx!.beginPath();
                ctx!.moveTo(p.x, p.y);
                ctx!.lineTo(pRight.x, pRight.y);
                ctx!.stroke();
              }
            }
          }

          // Check bottom neighbor
          const bottomIdx = i + cols;
          if (bottomIdx < points.length) {
            const pBottom = points[bottomIdx];
            if (!isInBullArea(pBottom.x, pBottom.y, bRect, 6)) {
              const linkIntensity = Math.min(p.intensity, pBottom.intensity);
              if (linkIntensity > 0.05) {
                const alpha = (linkIntensity * 0.35 * cursorActivityFade).toFixed(3);
                ctx!.strokeStyle = `rgba(${dotRgb}, ${alpha})`;
                ctx!.beginPath();
                ctx!.moveTo(p.x, p.y);
                ctx!.lineTo(pBottom.x, pBottom.y);
                ctx!.stroke();
              }
            }
          }
        }
      }

      // 2. Draw Grid Dots - ONLY visible when moving cursor or scrolling!
      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Never draw background dots in the 3D bull area
        if (isInBullArea(p.x, p.y, bRect, 6)) {
          continue;
        }

        // A. Cursor spotlight (only while cursor is active)
        let cursorProximity = 0;
        if (hasMouse && cursorActivityFade > 0.01) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);
          if (dist < SPOTLIGHT_RADIUS) {
            const norm = 1 - dist / SPOTLIGHT_RADIUS;
            cursorProximity = norm * norm * cursorActivityFade;
          }
        }

        // B. Click shockwave excitation
        const shockwaveProximity = p.intensity;

        const totalIntensity = Math.max(cursorProximity, shockwaveProximity);

        // Hide completely when user is idle or outside interactive zone
        if (totalIntensity <= 0.015) {
          continue;
        }

        // Refined smaller dot radius (0.65px - 1.4px)
        const radius = 0.65 + totalIntensity * 0.75;
        const alpha = Math.min(0.85, totalIntensity * 0.75).toFixed(3);
        ctx!.fillStyle = `rgba(${dotRgb}, ${alpha})`;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="interactive-grid-canvas" aria-hidden="true" />;
}
