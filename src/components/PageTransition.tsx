import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Location, useLocation } from "react-router-dom";
import { prefersReducedMotion } from "../hooks/useReveal";

type TransitionStage = "idle" | "exiting" | "entering";

interface PageTransitionContextValue {
  stage: TransitionStage;
}

const PageTransitionContext = createContext<PageTransitionContextValue>({
  stage: "idle",
});

export function usePageTransition() {
  return useContext(PageTransitionContext);
}

interface PageTransitionProviderProps {
  children: (displayLocation: Location) => React.ReactNode;
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState<Location>(location);
  const [stage, setStage] = useState<TransitionStage>("idle");

  const prevPathRef = useRef(location.pathname);
  const enterTimerRef = useRef<number | null>(null);

  useEffect(() => {
    // If the path hasn't changed (e.g., just hash change or query update)
    if (location.pathname === prevPathRef.current) {
      setDisplayLocation(location);
      return;
    }

    prevPathRef.current = location.pathname;
    setDisplayLocation(location);

    // Pin scroll to top immediately
    window.scrollTo(0, 0);
    const lenis = (
      window as unknown as {
        lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void };
      }
    ).lenis;
    lenis?.scrollTo(0, { immediate: true });

    if (prefersReducedMotion()) {
      setStage("idle");
      return;
    }

    if (enterTimerRef.current) clearTimeout(enterTimerRef.current);

    // Silky entrance animation for the new page without any blocking popup
    setStage("entering");
    enterTimerRef.current = window.setTimeout(() => {
      setStage("idle");
    }, 280);

    return () => {
      if (enterTimerRef.current) clearTimeout(enterTimerRef.current);
    };
  }, [location]);

  return (
    <PageTransitionContext.Provider value={{ stage }}>
      {children(displayLocation)}
    </PageTransitionContext.Provider>
  );
}
