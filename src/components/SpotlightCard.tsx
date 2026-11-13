import { useRef, useEffect, type ReactNode, type HTMLAttributes } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section" | "a" | "button";
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
} & Omit<HTMLAttributes<HTMLElement>, "children" | "as">;

export function SpotlightCard({
  children,
  className = "",
  as: Tag = "div",
  href,
  onClick,
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };

    const handleLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  const props = {
    ref,
    className: `spotlight-card ${className}`.trim(),
    ...rest,
  } as Record<string, unknown>;

  if (href) {
    return <Tag {...props} href={href} onClick={onClick}>{children}</Tag>;
  }

  return <Tag {...props} onClick={onClick}>{children}</Tag>;
}