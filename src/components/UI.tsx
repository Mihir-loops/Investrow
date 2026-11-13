import type { ReactNode } from "react";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import { playClick } from "../lib/audio";
import { ScrambleText } from "./ScrambleText";
import { TextReveal } from "./TextReveal";
import { useMagnetic } from "../hooks/useMagnetic";

type ButtonVariant = "primary" | "secondary" | "light" | "ghost";

const classes: Record<ButtonVariant, string> = {
  primary: "btn btn--primary btn--magnetic",
  secondary: "btn btn--secondary",
  light: "btn btn--light",
  ghost: "btn btn--ghost",
};

export function ButtonLink({
  to,
  href,
  children,
  variant = "primary",
  arrow = true,
  className = "",
  onClick,
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useMagnetic<HTMLAnchorElement>();

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
  }, [ref]);

  const content = (
    <>
      <span className="btn-magnetic-roll">
        <span className="btn-magnetic-text btn-magnetic-text--original">{children}</span>
        <span className="btn-magnetic-text btn-magnetic-text--duplicate" aria-hidden="true">
          {children}
        </span>
      </span>
      {arrow && <Icon name="arrowUpRight" size={17} strokeWidth={1.8} />}
    </>
  );
  const cls = `${classes[variant]} ${className}`.trim();

  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={cls}
        onClick={() => {
          playClick();
          onClick?.();
        }}
      >
        {content}
      </Link>
    );
  }
  return (
    <a
      ref={ref}
      href={href}
      className={cls}
      onClick={() => {
        playClick();
        onClick?.();
      }}
    >
      {content}
    </a>
  );
}

export function TextLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

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

  return (
    <Link
      ref={ref}
      to={to}
      className={`text-link text-link--magnetic ${className}`.trim()}
      onClick={() => playClick()}
    >
      <span>{children}</span>
      <Icon name="arrowRight" size={16} strokeWidth={1.7} />
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
}) {
  return (
    <Reveal className={`section-head section-head--${align} ${className}`.trim()}>
      <div className="section-head__main">
        {eyebrow && (
          <p className="eyebrow">
            <span aria-hidden="true" className="eyebrow__line" />
            <ScrambleText text={eyebrow} trigger="in-view" />
          </p>
        )}
        <TextReveal as="h2" className="section-head__title" mode="words">
          {title}
        </TextReveal>
      </div>
      {(description || action) && (
        <div className="section-head__aside">
          {description && <div className="section-head__desc">{description}</div>}
          {action && <div className="section-head__action">{action}</div>}
        </div>
      )}
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  breadcrumbs,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  children?: ReactNode;
  breadcrumbs?: { label: string; to?: string }[];
}) {
  return (
    <header className="page-hero">
      <div className="container page-hero__inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          {breadcrumbs?.map((crumb) => (
            <span key={crumb.label} className="breadcrumbs__item">
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : crumb.label}
              <span aria-hidden="true">/</span>
            </span>
          ))}
        </nav>
        <div className="page-hero__grid">
          <Reveal className="page-hero__lead">
            <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
            <TextReveal as="h1" className="page-hero__title" mode="words">
              {title}
            </TextReveal>
          </Reveal>
          <Reveal className="page-hero__aside" delay={120}>
            <div className="page-hero__description">{description}</div>
            {children}
          </Reveal>
        </div>
      </div>
      <div className="page-hero__rule" aria-hidden="true" />
    </header>
  );
}

export function CTASection({
  title = "Let's make the next decision a clear one.",
  description = "Tell us what you are working toward. We will help you understand the options, the trade-offs and the next practical step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="cta-section">
      <div className="container">
        <Reveal className="cta-section__panel">
          <div className="cta-section__copy">
            <p className="eyebrow eyebrow--lime"><span aria-hidden="true" />Start a conversation</p>
            <TextReveal as="h2" mode="words">
              {title}
            </TextReveal>
            <p>{description}</p>
          </div>
          <div className="cta-section__actions">
            <ButtonLink to="/contact" variant="light">
              Book a conversation
            </ButtonLink>
            <ButtonLink href="tel:+919102050555" variant="ghost" arrow={false}>
              <Icon name="phone" size={16} /> +91 9102050555
            </ButtonLink>
          </div>
          <div className="cta-section__mark" aria-hidden="true">
            <span>I</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
