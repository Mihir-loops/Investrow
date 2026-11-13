import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "../hooks/useReveal";

type Variant =
  | "fade-up"
  | "fade-in"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "image-reveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  variant?: Variant;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  threshold?: number;
};

export function Reveal({
  children,
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  className = "",
  style,
  threshold = 0.12,
}: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={`${className} ${inView ? "is-visible" : ""}`.trim()}
      style={
        {
          ...style,
          "--reveal-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}

export function RevealGroup({
  children,
  className = "",
  threshold = 0.08,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  threshold?: number;
  as?: ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref}
      data-reveal-group
      className={`${className} ${inView ? "is-visible" : ""}`.trim()}
    >
      {children}
    </Tag>
  );
}
