import { useRef, useEffect, useState, useCallback } from "react";
import { playClick, playHover } from "../lib/audio";

interface JourneyStage {
  index: string;
  phase: string;
  title: string;
  italicWord: string;
  sentence: string;
  specs: string[];
}

const STAGES: JourneyStage[] = [
  {
    index: "01",
    phase: "Current Reality",
    title: "Where You",
    italicWord: "Are.",
    sentence:
      "Capital scattered across unlinked folios and ad-hoc schemes, quietly eroded by inflation with zero overarching direction.",
    specs: ["6+ Unlinked Accounts", "Silent Inflation Drag", "Unhedged Life Liabilities"],
  },
  {
    index: "02",
    phase: "Target Horizon",
    title: "Where You Want",
    italicWord: "To Be.",
    sentence:
      "Clear milestone dates, inflation-shielded family protection, and the autonomy to live life entirely on your own terms.",
    specs: ["Debt-Light Milestones", "Global Education Pool", "Retirement Autonomy"],
  },
  {
    index: "03",
    phase: "The Blueprint",
    title: "How We Help You",
    italicWord: "Reach.",
    sentence:
      "Risk-calibrated asset allocation, systematic rebalancing, and quiet AMFI-registered fiduciary guidance across cycles.",
    specs: ["Core-Satellite Allocation", "Disciplined Rebalancing", "AMFI · ARN-194720"],
  },
  {
    index: "04",
    phase: "The Destination",
    title: "Where We Make You",
    italicWord: "Arrive.",
    sentence:
      "An automated wealth architecture compounding quietly in the background — absolute peace of mind through every market cycle.",
    specs: ["Unbroken Compounding", "Zero Market Panic", "Generational Family Legacy"],
  },
];

export function FinancialJourney() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const updateScroll = useCallback(() => {
    if (!wrapperRef.current || !trackRef.current) return;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;

    const rect = wrapper.getBoundingClientRect();
    const totalScrollable = wrapper.offsetHeight - window.innerHeight;
    if (totalScrollable <= 0) return;

    // Direct progression: as soon as the section top reaches 0, begin horizontal motion immediately
    const progress = Math.min(1, Math.max(0, -rect.top / totalScrollable));

    // Determine which stage is currently prominent
    const stageIndex = Math.min(
      STAGES.length - 1,
      Math.floor(progress * STAGES.length * 0.999)
    );
    setActiveStage(stageIndex);

    // Smooth horizontal translation across the full width of the slides
    const maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
    const translateX = -progress * maxTranslate;
    track.style.transform = `translate3d(${translateX}px, 0, 0)`;
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    // Connect with Lenis smooth scroll
    const globalWindow = window as unknown as {
      lenis?: {
        on: (event: string, cb: () => void) => void;
        off: (event: string, cb: () => void) => void;
      };
    };
    if (globalWindow.lenis && typeof globalWindow.lenis.on === "function") {
      globalWindow.lenis.on("scroll", handleScroll);
    }

    updateScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (globalWindow.lenis && typeof globalWindow.lenis.off === "function") {
        globalWindow.lenis.off("scroll", handleScroll);
      }
    };
  }, [updateScroll]);

  // Jump directly to any stage by clicking its label
  const scrollToStage = (index: number) => {
    if (!wrapperRef.current) return;
    const wrapper = wrapperRef.current;
    const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = wrapper.offsetHeight - window.innerHeight;
    const targetFraction = index / (STAGES.length - 1);
    const targetY = wrapperTop + targetFraction * totalScrollable;

    playClick();

    const globalWindow = window as unknown as {
      lenis?: {
        scrollTo: (y: number, opts?: { duration?: number }) => void;
      };
    };

    if (globalWindow.lenis && typeof globalWindow.lenis.scrollTo === "function") {
      globalWindow.lenis.scrollTo(targetY, { duration: 1.0 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  return (
    <section className="journey-section" id="journey" ref={wrapperRef}>
      <div className="journey-sticky">
        {/* Top Minimalist Header */}
        <header className="journey-header">
          <p className="journey-header__eyebrow">
            The Financial Roadmap — Horizontal Progression
          </p>

          <nav className="journey-nav-list" aria-label="Stages">
            {STAGES.map((stg, i) => (
              <button
                key={stg.index}
                type="button"
                className={`journey-nav-btn ${
                  activeStage === i ? "journey-nav-btn--active" : ""
                }`}
                onClick={() => scrollToStage(i)}
                onMouseEnter={() => playHover()}
              >
                0{i + 1} {stg.title} {stg.italicWord}
              </button>
            ))}
          </nav>
        </header>

        {/* Horizontal Track Viewport */}
        <div className="journey-viewport">
          <div className="journey-track" ref={trackRef}>
            {STAGES.map((stage) => (
              <div key={stage.index} className="journey-slide">
                <div className="journey-slide__top">
                  <span className="journey-slide__num">{stage.index}</span>
                  <span className="journey-slide__phase">{stage.phase}</span>
                </div>

                <h2 className="journey-slide__title">
                  {stage.title} <em>{stage.italicWord}</em>
                </h2>

                <p className="journey-slide__sentence">{stage.sentence}</p>

                <div className="journey-slide__specs">
                  {stage.specs.map((spec, sIdx) => (
                    <span key={spec}>
                      {spec}
                      {sIdx < stage.specs.length - 1 && (
                        <span className="journey-slide__spec-sep"> · </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimalist Bottom Telemetry */}
        <footer className="journey-footer">
          <span className="journey-footer__cue">
            Scroll to glide horizontally <span className="journey-footer__arrow">→</span>
          </span>
          <span>
            0{activeStage + 1} / 0{STAGES.length}
          </span>
        </footer>
      </div>
    </section>
  );
}
