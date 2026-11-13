import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { company, navGroups } from "../data/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { MarketTicker } from "./MarketTicker";
import { ThemeToggle } from "./ThemeToggle";
import { playClick } from "../lib/audio";
import { useMagnetic } from "../hooks/useMagnetic";

interface DesktopNavProps {
  openGroup: string | null;
  setOpenGroup: (group: string | null) => void;
}

function DesktopNav({ openGroup, setOpenGroup }: DesktopNavProps) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const location = useLocation();

  const isRouteActive = (group: (typeof navGroups)[number]) =>
    group.children.some((child) => {
      const path = child.href.split("#")[0];
      return (
        location.pathname === path ||
        (path !== "/" && location.pathname.startsWith(`${path}/`))
      );
    });

  return (
    <nav className="desktop-nav" aria-label="Primary">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `desktop-nav__link ${isActive ? "is-active" : ""}`
        }
      >
        Home
      </NavLink>
      {navGroups.map((group) => (
        <div
          key={group.label}
          className={`nav-item ${openGroup === group.label ? "is-open" : ""}`}
          onMouseEnter={() => setOpenGroup(group.label)}
          onMouseLeave={() => setOpenGroup(null)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node)) {
              setOpenGroup(null);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setOpenGroup(null);
              const trigger = event.currentTarget.querySelector("button");
              trigger?.focus();
            }
          }}
        >
          <button
            type="button"
            className={`desktop-nav__link desktop-nav__trigger ${
              activeGroup === group.label || isRouteActive(group)
                ? "is-active"
                : ""
            }`}
            aria-expanded={openGroup === group.label}
            aria-controls={`nav-${group.label.toLowerCase()}`}
            onClick={() =>
              setOpenGroup(
                openGroup === group.label ? null : group.label,
              )
            }
            onFocus={() => setActiveGroup(group.label)}
            onBlur={() => setActiveGroup(null)}
          >
            {group.label}
            <Icon name="chevronDown" size={13} strokeWidth={2} />
          </button>
          <div
            className="nav-dropdown"
            id={`nav-${group.label.toLowerCase()}`}
            role="group"
            aria-label={group.label}
          >
            <div className="nav-dropdown__inner">
              {group.children.map((child) => (
                <Link
                  key={child.href}
                  to={child.href}
                  className="nav-dropdown__link"
                  onClick={() => setOpenGroup(null)}
                >
                  <span>{child.label}</span>
                  <Icon name="arrowUpRight" size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `desktop-nav__link ${isActive ? "is-active" : ""}`
        }
      >
        Contact
      </NavLink>
    </nav>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  // Lifted up so we can render the backdrop outside <header> stacking context
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const headerCtaRef = useMagnetic<HTMLAnchorElement>();
  const location = useLocation();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(scrollTop > 12);
        setProgress(height > 0 ? Math.min(1, scrollTop / height) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileGroup(null);
    setOpenGroup(null);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const menu = menuRef.current;
      if (!menu) return;
      const focusable = Array.from(
        menu.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      <div
        className="scroll-progress"
        aria-hidden="true"
        style={{ transform: `scaleX(${progress})` }}
      />

      <header id="top" className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="utility-bar">
          <div className="container utility-bar__inner">
            <p className="utility-bar__note">
              <span className="utility-bar__dot" aria-hidden="true" />
              AMFI-registered mutual fund distributor · {company.arn}
            </p>
            <div className="utility-bar__links">
              <a href="tel:+919102050555" onClick={() => playClick()}>
                <Icon name="phone" size={13} /> {company.phones[0]}
              </a>
              <span aria-hidden="true" className="utility-bar__sep" />
              <a href={`mailto:${company.email}`} onClick={() => playClick()}>
                <Icon name="mail" size={13} /> {company.email}
              </a>
            </div>
          </div>
        </div>
        <MarketTicker />
        <div className="container header-main">
          <Logo />
          <DesktopNav openGroup={openGroup} setOpenGroup={setOpenGroup} />
          <div className="header-actions">
            <ThemeToggle />
            <Link
              ref={headerCtaRef}
              to="/contact"
              className="header-cta btn--magnetic"
              onClick={() => playClick()}
            >
              <span className="btn-magnetic-roll">
                <span className="btn-magnetic-text btn-magnetic-text--original">Let&apos;s talk</span>
                <span className="btn-magnetic-text btn-magnetic-text--duplicate" aria-hidden="true">
                  Let&apos;s talk
                </span>
              </span>
              <Icon name="arrowUpRight" size={16} />
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => {
                playClick();
                setMobileOpen((open) => !open);
              }}
            >
              {mobileOpen ? (
                <Icon name="x" size={22} />
              ) : (
                <span className="menu-toggle__lines" aria-hidden="true">
                  <span />
                  <span />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="mobile-menu"
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <div className="mobile-menu__top container">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Menu
            </p>
            <button
              ref={closeButtonRef}
              type="button"
              className="mobile-menu__close"
              onClick={() => {
                setMobileOpen(false);
                menuButtonRef.current?.focus();
              }}
            >
              <Icon name="x" size={18} /> Close
            </button>
          </div>
          <nav className="mobile-menu__nav container" aria-label="Mobile">
            <Link to="/" className="mobile-menu__home">
              Home
              <Icon name="arrowUpRight" size={20} />
            </Link>
            {navGroups.map((group) => {
              const isOpen = openMobileGroup === group.label;
              return (
                <div className="mobile-group" key={group.label}>
                  <button
                    type="button"
                    className="mobile-group__trigger"
                    aria-expanded={isOpen}
                    aria-controls={`mobile-${group.label.toLowerCase()}`}
                    onClick={() =>
                      setOpenMobileGroup((current) =>
                        current === group.label ? null : group.label,
                      )
                    }
                  >
                    <span>{group.label}</span>
                    <Icon
                      name="chevronDown"
                      size={18}
                      className={isOpen ? "is-rotated" : ""}
                    />
                  </button>
                  <div
                    className="mobile-group__panel"
                    id={`mobile-${group.label.toLowerCase()}`}
                    hidden={!isOpen}
                  >
                    {group.children.map((child) => (
                      <Link key={child.href} to={child.href}>
                        {child.label}
                        <Icon name="arrowRight" size={15} />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <Link to="/contact" className="mobile-menu__home">
              Contact
              <Icon name="arrowUpRight" size={20} />
            </Link>
          </nav>
          <div className="mobile-menu__foot container">
            <a href="tel:+919102050555" className="mobile-menu__contact">
              <Icon name="phone" size={18} />
              <span>
                <small>Call us</small>
                {company.phones[0]}
              </span>
            </a>
            <a
              href={`mailto:${company.email}`}
              className="mobile-menu__contact"
            >
              <Icon name="mail" size={18} />
              <span>
                <small>Email</small>
                {company.email}
              </span>
            </a>
            <p>
              Dhanbad, Jharkhand · Head office &amp; branch
            </p>
          </div>
        </div>
      )}
    </>
  );
}
