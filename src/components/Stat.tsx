import { useInView } from "../hooks/useReveal";
import { AnimatedCounter } from "./AnimatedCounter";

export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
  decimals,
  animate = true,
  note,
  duration = 1800,
}: {
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
  decimals?: number;
  animate?: boolean;
  note?: string;
  duration?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.25,
    once: true,
  });

  return (
    <div className={`stat ${inView ? "is-in-view" : ""}`} ref={ref}>
      <div className="stat__value">
        <AnimatedCounter
          value={value}
          prefix={prefix || undefined}
          suffix={suffix || undefined}
          decimals={decimals}
          animate={animate}
          duration={duration}
        />
      </div>
      <div className="stat__bar" aria-hidden="true">
        <div className="stat__bar-fill" />
      </div>
      <div className="stat__label">{label}</div>
      {note && <p className="stat__note">{note}</p>}
    </div>
  );
}
