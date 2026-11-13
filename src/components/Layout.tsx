import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { InteractiveGrid } from "./InteractiveGrid";
import { CinematicPreloader } from "./CinematicPreloader";
import { CustomCursor } from "./CustomCursor";
import { useLenis } from "../hooks/useLenis";
import { usePageTransition } from "./PageTransition";
import { useTheme } from "../hooks/useTheme";

function ScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number | HTMLElement, opts?: { immediate?: boolean; offset?: number }) => void } }).lenis;

    if (location.hash) {
      const id = location.hash.slice(1);
      const frame = requestAnimationFrame(() => {
        const element = document.getElementById(id);
        if (element) {
          if (lenis) {
            lenis.scrollTo(element, { offset: -80, immediate: true });
          } else {
            element.scrollIntoView({ behavior: "auto", block: "start" });
          }
        }
      });
      return () => cancelAnimationFrame(frame);
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, location.hash]);

  return null;
}

export function Layout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const { stage } = usePageTransition();

  useLenis();
  useTheme(); // Initialize and sync theme from localStorage

  useLayoutEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <>
      <CustomCursor />
      <CinematicPreloader />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <InteractiveGrid />
      <ScrollManager />
      <Header />
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className={`site-main ${stage !== "idle" ? `page-${stage}` : "page-enter"}`}
        key={`${location.pathname}${location.hash}`}
      >
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
