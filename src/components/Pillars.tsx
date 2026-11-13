import { useState } from "react";
import { pillars } from "../data/site";
import { Icon } from "./Icon";
import { playClick, playHover } from "../lib/audio";

const PILLAR_ICONS: Record<string, string> = {
  I: "shieldCheck",
  N: "sprout",
  V: "target",
  E: "landmark",
  S: "lineChart",
  T: "lockKeyhole",
  R: "shield",
  O: "trendingUp",
  W: "gem",
};

export function PillarsGrid() {
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const handleSelect = (letter: string) => {
    setActiveLetter((prev) => (prev === letter ? null : letter));
    playClick();
  };

  return (
    <div className="pillars-matrix-wrap">
      {/* Interactive INVESTROW Letter Ribbon */}
      <div className="acronym-ribbon" role="tablist" aria-label="Investrow Principles Acronym">
        <div className="acronym-ribbon__label">
          <span>Acronym</span>
          <strong>INVESTROW</strong>
        </div>
        <div className="acronym-ribbon__keys">
          {pillars.map((pillar) => {
            const isActive = activeLetter === pillar.letter;
            return (
              <button
                key={pillar.letter}
                type="button"
                className={`acronym-key ${isActive ? "is-active" : ""}`}
                onClick={() => handleSelect(pillar.letter)}
                onMouseEnter={() => playHover()}
                role="tab"
                aria-selected={isActive}
                title={`${pillar.letter} — ${pillar.title}`}
              >
                <span className="acronym-key__char">{pillar.letter}</span>
                <span className="acronym-key__word">{pillar.title}</span>
                <span className="acronym-key__glow" aria-hidden="true" />
              </button>
            );
          })}
        </div>
      </div>

      {/* 3x3 Luxury Bento Matrix of All 9 Principles */}
      <div className="pillars-bento-grid">
        {pillars.map((pillar, index) => {
          const isHighlighted = activeLetter === pillar.letter;
          const isDimmed = Boolean(activeLetter && activeLetter !== pillar.letter);
          const iconName = PILLAR_ICONS[pillar.letter] ?? "check";

          return (
            <article
              key={pillar.letter}
              id={`pillar-${pillar.letter}`}
              className={`pillar-bento-card ${isHighlighted ? "is-highlighted" : ""} ${isDimmed ? "is-dimmed" : ""}`}
              onMouseEnter={() => playHover()}
              onClick={() => handleSelect(pillar.letter)}
            >
              {/* Giant background monogram watermark */}
              <span className="pillar-bento-card__watermark" aria-hidden="true">
                {pillar.letter}
              </span>

              <div className="pillar-bento-card__top">
                <span className="pillar-bento-card__index">
                  0{index + 1} <span className="pillar-bento-card__slash">/</span> 0{pillars.length}
                </span>
                <div className="pillar-bento-card__top-right">
                  <span className="pillar-bento-card__icon-badge">
                    <Icon name={iconName} size={15} />
                  </span>
                  <span className="pillar-bento-card__letter-badge">
                    <span className="pillar-bento-card__letter-mono">{pillar.letter}</span>
                  </span>
                </div>
              </div>

              <div className="pillar-bento-card__body">
                <h3 className="pillar-bento-card__title">
                  {pillar.title}
                </h3>
                <p className="pillar-bento-card__text">
                  {pillar.text}
                </p>
              </div>

              <div className="pillar-bento-card__foot">
                <span className="pillar-bento-card__cue">Standard in practice</span>
                <span className="pillar-bento-card__arrow" aria-hidden="true">
                  <Icon name="arrowRight" size={14} />
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
