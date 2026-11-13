import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "./Icon";
import { playClick } from "../lib/audio";

interface SectionMarker {
  id: string;
  label: string;
}

const HOME_SECTIONS: SectionMarker[] = [
  { id: "hero", label: "01 Hero" },
  { id: "introduction", label: "02 Overview" },
  { id: "journey", label: "03 Journey" },
  { id: "services", label: "04 Services" },
  { id: "principles", label: "05 Principles" },
  { id: "calculator", label: "06 Planning" },
  { id: "trust", label: "07 Trust" },
  { id: "testimonials", label: "08 Voices" },
  { id: "goals", label: "09 Goals" },
  { id: "app", label: "10 App" },
];

/**
 * ScrollHUD - Sleek, floating scrollytelling telemetry indicator.
 * Displays:
 *  - Real-time scroll percentage (0% - 100%)
 *  - Dynamic active section tracker (highlights which part of the site you are in)
 *  - Circular SVG progress meter with active lime beam
 *  - Quick glide button to advance through sections or return to top
 *  - Shimmer pulse that responds to scroll velocity
 */
export function ScrollHUD() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState("01 Hero");
  const [isScrolling, setIsScrolling] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, Math.round((scrollY / docHeight) * 100))) : 0;
      setScrollPercent(progress);

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => setIsScrolling(false), 800);

      if (isHome) {
        // Detect active section on the homepage
        const sections = [
          { el: document.querySelector(".home-hero"), label: "01 Hero" },
          { el: document.getElementById("introduction"), label: "02 Overview" },
          { el: document.getElementById("journey"), label: "03 Journey" },
          { el: document.getElementById("services"), label: "04 Services" },
          { el: document.getElementById("principles"), label: "05 Principles" },
          { el: document.getElementById("calculator"), label: "06 Planning" },
          { el: document.querySelector(".trust-section"), label: "07 Trust" },
          { el: document.querySelector(".testimonials-section"), label: "08 Voices" },
          { el: document.querySelector(".goals-section"), label: "09 Goals" },
          { el: document.querySelector(".app-section"), label: "10 App" },
        ];

        const scrollPosition = scrollY + window.innerHeight * 0.35;
        for (let i = sections.length - 1; i >= 0; i--) {
          const item = sections[i];
          if (item.el) {
            const top = (item.el as HTMLElement).offsetTop;
            if (scrollPosition >= top) {
              setActiveSection(item.label);
              break;
            }
          }
        }
      } else {
        const pageTitle = document.querySelector(".page-hero__title");
        if (pageTitle) {
          setActiveSection(pageTitle.textContent?.slice(0, 16) ?? "Investrow");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isHome, location.pathname]);

  const handleNextSection = () => {
    playClick();
    if (scrollPercent >= 96) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (isHome) {
      const currentIndex = HOME_SECTIONS.findIndex((s) => s.label === activeSection);
      const next = HOME_SECTIONS[currentIndex + 1];
      if (next) {
        const targetEl = document.getElementById(next.id) || document.querySelector(`.${next.id}-section`);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }

    // Default: smooth scroll one viewport down
    window.scrollBy({ top: window.innerHeight * 0.75, behavior: "smooth" });
  };

  // Circular progress calculations
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollPercent / 100) * circumference;

  return (
    <div
      className={`scroll-hud ${isScrolling ? "is-scrolling" : ""}`}
      aria-label="Scroll Telemetry Indicator"
    >
      <button
        type="button"
        className="scroll-hud__pill"
        onClick={handleNextSection}
        title={scrollPercent >= 96 ? "Back to top" : "Scroll to next section"}
      >
        {/* Circular Live Progress Meter */}
        <div className="scroll-hud__meter">
          <svg width="34" height="34" viewBox="0 0 34 34" className="scroll-hud__svg">
            <circle
              cx="17"
              cy="17"
              r={radius}
              className="scroll-hud__circle-track"
            />
            <circle
              cx="17"
              cy="17"
              r={radius}
              className="scroll-hud__circle-progress"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
              }}
            />
          </svg>
          <span className="scroll-hud__percent">{scrollPercent}%</span>
        </div>

        {/* Section Tracker */}
        <div className="scroll-hud__meta">
          <span className="scroll-hud__tag">INDEX</span>
          <span className="scroll-hud__section">{activeSection}</span>
        </div>

        {/* Action arrow */}
        <span className="scroll-hud__arrow" aria-hidden="true">
          <Icon name={scrollPercent >= 96 ? "arrowUp" : "arrowDown"} size={13} strokeWidth={2.2} />
        </span>
      </button>
    </div>
  );
}
