import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks/useReveal";

export function CustomCursor() {
  const [isInteractive, setIsInteractive] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  // Detect coarse pointers / touch screens
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window;
    setIsTouchDevice(isTouch);
  }, []);

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion()) return;

    // Fast GPU coordinate render loop without any CSS transition conflicts
    const updatePosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      rafId.current = requestAnimationFrame(updatePosition);
    };

    rafId.current = requestAnimationFrame(updatePosition);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        setIsVisible(true);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Fast delegation for interactive hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Text input detection
      if (target.closest("input, textarea, select")) {
        setIsText(true);
        setIsInteractive(false);
        return;
      }
      setIsText(false);

      // Interactive clickable elements
      if (
        target.closest(
          "button, a, [role='button'], [role='link'], .btn, .header-cta, .nav-link, .text-link, .card, .spotlight-card, .published-card, .milestone-box, .clickable"
        )
      ) {
        setIsInteractive(true);
        return;
      }

      setIsInteractive(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [isTouchDevice, isVisible]);

  if (isTouchDevice || prefersReducedMotion()) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isVisible ? "is-visible" : ""} ${
        isInteractive ? "is-interactive" : ""
      } ${isClicking ? "is-clicking" : ""} ${isText ? "is-text" : ""}`}
      aria-hidden="true"
    >
      <div className="custom-cursor__dot" />
    </div>
  );
}
