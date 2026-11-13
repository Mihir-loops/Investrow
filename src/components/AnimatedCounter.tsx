import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion, useInView } from "../hooks/useReveal";
import { numberIN } from "../lib/format";

export interface AnimatedCounterProps {
  value: number | string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  animate?: boolean;
  format?: boolean;
  className?: string;
}

interface ParsedNumber {
  prefix: string;
  target: number;
  suffix: string;
  decimals: number;
  useFormat: boolean;
}

/**
 * Parses numeric strings like "₹250 cr+", "3,000+", "23+", "10+", "₹50Cr+ AUM"
 */
function parseValue(val: number | string): ParsedNumber {
  if (typeof val === "number") {
    return {
      prefix: "",
      target: val,
      suffix: "",
      decimals: Number.isInteger(val) ? 0 : 2,
      useFormat: true,
    };
  }

  const str = String(val).trim();
  // Regex to extract leading non-digits, the numeric portion (with commas/decimals), and trailing text
  const match = str.match(/^([^0-9.-]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return {
      prefix: "",
      target: 0,
      suffix: str,
      decimals: 0,
      useFormat: false,
    };
  }

  const prefix = match[1];
  const numStr = match[2];
  const suffix = match[3];

  const hasDecimals = numStr.includes(".");
  const decimals = hasDecimals ? (numStr.split(".")[1]?.length ?? 0) : 0;
  const target = parseFloat(numStr.replace(/,/g, ""));
  const useFormat = numStr.includes(",") || target >= 1000;

  return {
    prefix,
    target: isNaN(target) ? 0 : target,
    suffix,
    decimals,
    useFormat,
  };
}

export function AnimatedCounter({
  value,
  prefix: propPrefix,
  suffix: propSuffix,
  decimals: propDecimals,
  duration = 1800,
  animate = true,
  format: propFormat,
  className = "",
}: AnimatedCounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({
    threshold: 0.15,
    once: true,
  });

  const parsed = parseValue(value);
  const prefix = propPrefix !== undefined ? propPrefix : parsed.prefix;
  const suffix = propSuffix !== undefined ? propSuffix : parsed.suffix;
  const decimals = propDecimals !== undefined ? propDecimals : parsed.decimals;
  const shouldFormat = propFormat !== undefined ? propFormat : parsed.useFormat;
  const target = parsed.target;

  const [currentVal, setCurrentVal] = useState(() => (animate ? 0 : target));
  const [isComplete, setIsComplete] = useState(() => !animate);
  const firedRef = useRef(false);

  useEffect(() => {
    if (!animate || prefersReducedMotion()) {
      setCurrentVal(target);
      setIsComplete(true);
      return;
    }

    if (!inView || firedRef.current) return;
    firedRef.current = true;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(1, elapsed / duration);
      // Quintic ease-out: 1 - (1 - progress)^4 for high-end deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const nextVal = target * ease;

      setCurrentVal(nextVal);

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCurrentVal(target);
        setIsComplete(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [animate, inView, duration, target]);

  const displayVal = shouldFormat
    ? numberIN(currentVal, decimals)
    : currentVal.toFixed(decimals);

  return (
    <span
      ref={ref}
      className={`animated-counter ${isComplete ? "is-complete" : "is-counting"} ${className}`}
    >
      {prefix && <span className="counter-prefix">{prefix}</span>}
      <span className="counter-number">{displayVal}</span>
      {suffix && <span className="counter-suffix">{suffix}</span>}
    </span>
  );
}
