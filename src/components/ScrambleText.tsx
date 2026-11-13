import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "../hooks/useReveal";
import { playScramble } from "../lib/audio";

const GLYPHS = "01_#/*[]+=<>X-";

interface ScrambleTextProps {
  text: string;
  className?: string;
  trigger?: "in-view" | "mount" | "hover";
  speed?: number; // ms per step
  delay?: number;
}

export function ScrambleText({
  text,
  className = "",
  trigger = "in-view",
  speed = 28,
  delay = 0,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  const startScramble = () => {
    if (prefersReducedMotion()) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length;

    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    let lastTime = performance.now();

    const step = (time: number) => {
      if (time - lastTime >= speed) {
        lastTime = time;

        const scrambled = text
          .split("")
          .map((char, index) => {
            if (char === " " || char === "\n") return char;
            if (index < iteration) {
              return text[index];
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");

        setDisplayText(scrambled);
        playScramble();

        iteration += 1 / 2; // smooth resolution rate
      }

      if (iteration <= maxIterations) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplayText(text);
      }
    };

    if (delay > 0) {
      setTimeout(() => {
        frameRef.current = requestAnimationFrame(step);
      }, delay);
    } else {
      frameRef.current = requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    if (trigger === "mount") {
      startScramble();
      return () => {
        if (frameRef.current) cancelAnimationFrame(frameRef.current);
      };
    }

    if (trigger === "in-view" && elementRef.current) {
      if (typeof IntersectionObserver === "undefined") {
        setDisplayText(text);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            startScramble();
          }
        },
        { threshold: 0.2 },
      );

      observer.observe(elementRef.current);
      return () => observer.disconnect();
    }
  }, [text, trigger]);

  const handleMouseEnter = () => {
    if (trigger === "hover") {
      startScramble();
    }
  };

  return (
    <span
      ref={elementRef as unknown as React.RefObject<HTMLSpanElement>}
      className={`scramble-text ${className}`}
      onMouseEnter={handleMouseEnter}
      data-value={text}
    >
      {displayText}
    </span>
  );
}
