import { CSSProperties, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { HeroBull } from "../components/HeroBull";
import { PillarsGrid } from "../components/Pillars";
import { Reveal } from "../components/Reveal";
import { SipPanel } from "../components/calculators/Panels";
import { SmartImage } from "../components/SmartImage";
import { Stat } from "../components/Stat";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { Testimonials } from "../components/Testimonials";
import { ButtonLink, SectionHead, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { InternationalDeskCard } from "../components/InternationalDeskCard";
import { FinancialJourney } from "../components/FinancialJourney";
import { company, goals, services, testimonials } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";
import { playClick, playHover } from "../lib/audio";

const SERVICE_META: Record<
  string,
  {
    tag: string;
    accent: string;
    metric: string;
    metricLabel: string;
    img: string;
    highlight: string;
  }
> = {
  "mutual-funds": {
    tag: "Equity & Alpha",
    accent: "#2563eb",
    metric: "14.2% CAGR",
    metricLabel: "Historical Long-Term Index Reference",
    img: "/assets/services/mutual-funds.jpg",
    highlight: "Rupee-Cost Averaging & Compounding",
  },
  "life-insurance": {
    tag: "Family Protection",
    accent: "#3b82f6",
    metric: "100×",
    metricLabel: "Annual Income Term Cover Ratio",
    img: "/assets/services/life-insurance.png",
    highlight: "Pure Term Cover with Zero Surrender Traps",
  },
  "health-insurance": {
    tag: "Health Defense",
    accent: "#10b981",
    metric: "14,000+",
    metricLabel: "Cashless Network Hospitals",
    img: "/assets/services/health-insurance.png",
    highlight: "Zero Room-Rent Capping & Inflation Shield",
  },
  "tax-planning": {
    tag: "Sec 80C & 80D",
    accent: "#2563eb",
    metric: "₹46,800+",
    metricLabel: "Average Annual Legitimate Tax Saved",
    img: "/assets/services/tax-planning.png",
    highlight: "Integrated ELSS, Health & NPS Structuring",
  },
  "general-insurance": {
    tag: "Asset Security",
    accent: "#ea580c",
    metric: "360°",
    metricLabel: "Motor, Property & Commercial Risk Defense",
    img: "/assets/services/general-insurance.png",
    highlight: "Cashless Survey & Swift Claim Advocacy",
  },
  "fd-bonds": {
    tag: "Fixed Yields",
    accent: "#ea580c",
    metric: "Up to 8.5%",
    metricLabel: "AAA & Sovereign Rated Instruments",
    img: "/assets/services/fd-bonds.png",
    highlight: "Capital Protection & Predictable Cash Flows",
  },
  "stock-market-demat": {
    tag: "Demat & Trading",
    accent: "#f59e0b",
    metric: "0 Friction",
    metricLabel: "Direct BSE StAR MF Platform Routing",
    img: "/assets/services/stock-market-demat.png",
    highlight: "Direct Equity Holdings & Clean Ownership",
  },
  "nps": {
    tag: "Retirement Pension",
    accent: "#ea580c",
    metric: "₹50,000",
    metricLabel: "Exclusive Sec 80CCD(1B) Tax Deduction",
    img: "/assets/services/nps.png",
    highlight: "Lowest Cost Sovereign Retirement Pension",
  },
};

export default function Home() {
  usePageMeta(
    "Investrow Financial Services | Clarity for your money",
    "Investrow is an AMFI-registered mutual fund distributor in Dhanbad, Jharkhand. Plan mutual funds, insurance, tax and retirement with clear, disciplined guidance.",
  );

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--scroll-y", `${window.scrollY}px`);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__copy">
            <div className="hero-institutional-badge hero-enter hero-delay-1">
              <span className="live-pulse-dot" />
              <span className="hero-institutional-badge__status">AMFI REGULATED · ARN-{company.arn}</span>
              <span className="hero-institutional-badge__divider" />
              <span className="hero-institutional-badge__text">Since {company.founded} · Dhanbad, Jharkhand</span>
            </div>
            <TextReveal as="h1" className="home-hero__title" mode="words" delay={120} immediate>
              Clarity for your money.
              <br />
              <em>Confidence</em> for your future.
            </TextReveal>
            <p className="home-hero__copy-text hero-enter hero-delay-3">
              Investrow helps people grow their money in a simple, disciplined
              way. We start with your goals, explain the trade-offs and build a
              plan you can actually keep.
            </p>
            <div className="home-hero__actions hero-enter hero-delay-4">
              <ButtonLink to="/contact">Start a conversation</ButtonLink>
              <TextLink to="/calculators">Explore the calculators</TextLink>
            </div>
            <ul className="home-hero__facts hero-enter hero-delay-5">
              <li>
                <span>Registered</span>
                <strong>AMFI · {company.arn}</strong>
              </li>
              <li>
                <span>Based in</span>
                <strong>Dhanbad, Jharkhand</strong>
              </li>
              <li>
                <span>Approach</span>
                <strong>Goals before products</strong>
              </li>
            </ul>
          </div>

          <div className="home-hero__visual hero-enter hero-delay-3">
            <HeroBull />
          </div>
        </div>
        <div className="container home-hero__foot">
          <a href="#introduction" className="scroll-cue">
            <span className="scroll-cue__line" aria-hidden="true" />
            Scroll to explore
          </a>
          <p className="home-hero__disclosure">
            Mutual fund investments are subject to market risks. Read all
            scheme-related documents carefully.
          </p>
        </div>
      </section>

      <section className="section intro-section" id="introduction">
        <div className="container">
          <div className="intro-grid">
            <Reveal className="intro-grid__lead">
              <p className="eyebrow">
                <span aria-hidden="true" />
                A simpler starting point
              </p>
              <TextReveal as="h2" mode="blur-fade">
                A quieter, clearer way to <em>build wealth.</em>
              </TextReveal>
              <p className="intro-grid__copy">
                Investrow Financial Services Pvt. Ltd. is an AMFI-registered
                mutual fund distribution company, started in 2021. We believe
                financial planning should be understandable, practical and
                grounded in the life you are actually living.
              </p>
              <TextLink to="/about">Read our story</TextLink>
            </Reveal>
            <Reveal className="intro-grid__aside" delay={120}>
              <div className="fact-grid">
                <Stat value={2021} label="Company founded" animate={false} />
                <Stat value={8} label="Service lines" />
                <Stat value={3} label="Leadership profiles" />
                <Stat value={2} label="Dhanbad offices" />
              </div>
              <p className="source-note">
                The company&apos;s public site also lists 250 Cr+ AUM, 3,000+
                clients and 10+ awards. Those figures await current verification
                and are presented with context on the{" "}
                <Link to="/about">About page</Link>.
              </p>
            </Reveal>
          </div>

          <Reveal className="intro-milestones" delay={160}>
            <div className="milestones-row">
              <div className="milestone-box">
                <span className="milestone-box__val">
                  <AnimatedCounter value="₹250 cr+" duration={2000} />
                </span>
                <span className="milestone-box__label">Total AUM Managed</span>
                <span className="milestone-box__sub">Published company portfolio</span>
              </div>
              <div className="milestone-box">
                <span className="milestone-box__val">
                  <AnimatedCounter value="3,000+" duration={2000} />
                </span>
                <span className="milestone-box__label">Client Relationships</span>
                <span className="milestone-box__sub">Published investor accounts</span>
              </div>
              <div className="milestone-box">
                <span className="milestone-box__val">
                  <AnimatedCounter value="23+" duration={2000} />
                </span>
                <span className="milestone-box__label">Years Experience</span>
                <span className="milestone-box__sub">Combined advisory journey</span>
              </div>
              <div className="milestone-box">
                <span className="milestone-box__val">
                  <AnimatedCounter value="10+" duration={2000} />
                </span>
                <span className="milestone-box__label">AMC Recognitions</span>
                <span className="milestone-box__sub">Industry certificates</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section about-preview">
        <div className="container about-preview__grid">
          <Reveal className="about-preview__media" variant="fade-up">
            <InternationalDeskCard />
          </Reveal>
          <Reveal className="about-preview__copy" delay={100}>
            <p className="eyebrow">
              <span aria-hidden="true" className="eyebrow__line" />
              The company
            </p>
            <TextReveal as="h2" mode="words">
              Built in Dhanbad.
              <br />
              Built around <em>people.</em>
            </TextReveal>
            <p>
              Our work begins with a conversation, not a product. We look at
              what you are saving for, when you need the money and how much
              uncertainty you can live with — then discuss the options that fit.
            </p>
            <p>
              That approach is backed by an institutional operating standard: an
              AMFI-registered mutual fund distributor, corporate governance, and
              a team that stays actively involved across your compounding journey.
            </p>
            <ul className="check-list">
              <li>
                <Icon name="check" size={17} />
                AMFI Registered Mutual Fund Distributor — {company.arn}
              </li>
              <li>
                <Icon name="check" size={17} />
                CIN {company.cin}
              </li>
              <li>
                <Icon name="check" size={17} />
                Head office and branch in Dhanbad, Jharkhand
              </li>
            </ul>
            <ButtonLink to="/about" variant="secondary">
              More about Investrow
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Horizontal Scrollytelling — Financial Planning Journey */}
      <FinancialJourney />

      <section className="section section--services" id="services">
        <div className="container">
          <div className="services-editorial-head">
            <p className="services-editorial-head__eyebrow">
              What We Help With — Eight Dedicated Practices
            </p>
            <h2 className="services-editorial-head__title">
              Advice for every stage of the <em>journey.</em>
            </h2>
            <p className="services-editorial-head__desc">
              From a first disciplined SIP to multi-generational estate governance, each practice begins with the same fundamental question: what are you trying to make possible?
            </p>
            <div className="services-editorial-head__action">
              <TextLink to="/services">Explore all eight services</TextLink>
            </div>
          </div>

          <div className="services-deck">
            {services.map((service, index) => {
              const meta = SERVICE_META[service.slug] ?? { tag: "Advisory" };
              return (
                <div
                  key={service.slug}
                  className="deck-card deck-card--service"
                  style={
                    {
                      "--deck-index": index,
                      "--deck-total": services.length,
                    } as CSSProperties
                  }
                >
                  <Link
                    to={`/services/${service.slug}`}
                    className="service-editorial-slide"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                  >
                    <div className="service-editorial-slide__top">
                      <span className="service-editorial-slide__num">{service.index}</span>
                      <span className="service-editorial-slide__category">{meta.tag}</span>
                    </div>

                    <div className="service-editorial-slide__body">
                      <h3 className="service-editorial-slide__title">
                        {service.title}
                      </h3>
                      <p className="service-editorial-slide__teaser">
                        {service.teaser}
                      </p>
                    </div>

                    <div className="service-editorial-slide__foot">
                      <span>Explore practice</span>
                      <span className="service-editorial-slide__arrow" aria-hidden="true">
                        <Icon name="arrowRight" size={16} />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section principles-section" id="principles">
        <div className="container">
          <div className="principles-editorial-head">
            <p className="principles-editorial-head__eyebrow">
              The Investrow Principles — Nine Words · One Standard
            </p>
            <h2 className="principles-editorial-head__title">
              Nine words.
              <br />
              One <em>standard.</em>
            </h2>
            <p className="principles-editorial-head__desc">
              Our name spells out the principles we try to work by. They are
              not a promise of perfect outcomes — they are the questions we
              ask before recommending anything.
            </p>
            <div className="principles-editorial-head__action">
              <TextLink to="/about#principles">Read more about our approach</TextLink>
            </div>
          </div>
          <PillarsGrid />
        </div>
      </section>

      <section className="section section--calculator" id="calculator">
        <div className="container">
          <SectionHead
            eyebrow="Financial planning tools"
            title={
              <>
                A first number, before the <em>first meeting.</em>
              </>
            }
            description="Change the assumptions and watch the illustration respond. These tools are educational, not forecasts — and they never replace a conversation about suitability."
            action={<TextLink to="/calculators">All nine calculators</TextLink>}
          />
          <Reveal className="calculator-wrap">
            <SipPanel />
          </Reveal>
        </div>
      </section>

      <section className="section trust-section">
        <div className="container trust-grid">
          <Reveal className="trust-grid__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Why Investrow
            </p>
            <TextReveal as="h2" mode="words">
              Trust is built in the <em>details.</em>
            </TextReveal>
            <p>
              Financial advice involves real money and real uncertainty. We try
              to earn trust through clear explanations, honest limitations and
              consistent follow-through — not through promises about markets.
            </p>
            <ButtonLink to="/contact" variant="secondary">
              Talk to the team
            </ButtonLink>
          </Reveal>
          <div className="trust-deck">
            {[
              {
                num: "01",
                icon: "target" as const,
                title: "Goals before products",
                text: "The first conversation is about what the money is for, not which scheme has performed best recently.",
              },
              {
                num: "02",
                icon: "shield" as const,
                title: "Registered distribution",
                text: "Investrow is an AMFI-registered mutual fund distributor with ARN-194720 and CIN U67190JH2021PTC016813, as published.",
              },
              {
                num: "03",
                icon: "candlestick" as const,
                title: "Risk comes first",
                text: "Liquidity, protection and suitability are discussed before return assumptions. Market-linked returns are never guaranteed.",
              },
              {
                num: "04",
                icon: "repeat" as const,
                title: "A relationship, not a sale",
                text: "Reviews continue after the investment, so the plan can change when your life or the market does.",
              },
            ].map((card, index) => (
              <div
                key={card.num}
                className="deck-card deck-card--trust"
                style={
                  {
                    "--deck-index": index,
                    "--deck-total": 4,
                  } as CSSProperties
                }
              >
                <SpotlightCard className="trust-deck-card">
                  <div className="trust-card__head">
                    <div className="trust-card__icon-badge" aria-hidden="true">
                      <Icon name={card.icon} size={20} />
                    </div>
                    <span className="trust-card__num">{card.num}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
        </div>
        <div className="container">
          <Reveal className="security-note">
            <span className="security-note__label">A note on source claims</span>
            <p>
              Investrow&apos;s original website lists security features such as
              password encryption and bank-level security. Those are company
              claims, not independently verified technical guarantees, so this
              rebuild does not repeat them as promises. Confirm current controls
              and regulatory registrations directly with the company.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <SectionHead
            eyebrow="Client voices"
            title={
              <>
                What people say about <em>working with us.</em>
              </>
            }
            description="Real words from clients, reproduced from the company's public website. No ratings are shown because they could not be verified from the source capture."
          />
          <Testimonials items={testimonials.slice(0, 6)} />
        </div>
      </section>

      <section className="section goals-section">
        <div className="container">
          <SectionHead
            eyebrow="Goals"
            title={
              <>
                What are you working <em>toward?</em>
              </>
            }
            description="A good plan starts with a date and a purpose. Explore the goals we help people think through."
            action={<TextLink to="/goals">Explore all goals</TextLink>}
          />
          <div className="home-goals-showcase">
            {goals.map((goal) => {
              const accents: Record<string, string> = {
                "dream-home": "#f59e0b",
                "wealth-creation": "#2563eb",
                "retirement": "#ea580c",
                "child-education": "#10b981",
                "child-wedding": "#ec4899",
              };
              const accent = accents[goal.slug] ?? "#2563eb";

              return (
                <Link
                  key={goal.slug}
                  to={`/goals/${goal.slug}`}
                  className="home-goal-tile"
                  style={{ "--goal-accent": accent } as CSSProperties}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                >
                  <div className="home-goal-tile__top">
                    <span className="home-goal-tile__icon">
                      <Icon name={goal.icon} size={22} strokeWidth={1.75} />
                    </span>
                    <span className="home-goal-tile__index">0{goal.index}</span>
                  </div>

                  <div className="home-goal-tile__horizon">
                    <span className="home-goal-tile__dot" style={{ background: accent }} />
                    <span>{goal.horizon}</span>
                  </div>

                  <div className="home-goal-tile__body">
                    <h3 className="home-goal-tile__title">{goal.title}</h3>
                    <p className="home-goal-tile__teaser">{goal.teaser}</p>
                  </div>

                  <div className="home-goal-tile__foot">
                    <span className="home-goal-tile__cta">Plan Milestone</span>
                    <span className="home-goal-tile__arrow" aria-hidden="true">
                      <Icon name="arrowRight" size={15} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section app-section">
        <div className="container app-grid">
          <Reveal className="app-grid__copy">
            <p className="eyebrow eyebrow--lime">
              <span aria-hidden="true" />
              The Investrow app
            </p>
            <TextReveal as="h2" mode="words">
              Your plan, closer at <em>hand.</em>
            </TextReveal>
            <p>
              The financial world is moving at a fast pace, and technology has
              brought financial services to your fingertips. Investrow&apos;s app
              is presented as a way to stay closer to your investments while
              keeping the human conversation available when it matters.
            </p>
            <p className="app-grid__small">
              App screenshots from the company&apos;s public website. Store
              availability and current features should be confirmed with the
              team.
            </p>
            <ButtonLink to="/contact" variant="light">
              Ask about the app
            </ButtonLink>
          </Reveal>
          <Reveal className="app-grid__media" delay={120} variant="scale-in">
            <div className="app-phone">
              <SmartImage
                src="/assets/home/mobileappcreen.png"
                alt="Investrow mobile app screens showing goals, calculators and secure login"
                width={795}
                height={852}
              />
            </div>
            <div className="app-phone__badge">
              <Icon name="lock" size={18} />
              <span>Secure access</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section amc-section">
        <div className="container">
          <Reveal className="amc-head">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Fund partners
            </p>
            <TextReveal as="h2" mode="words">
              Some of the AMCs referenced by Investrow.
            </TextReveal>
            <p>
              The original website displays a collage of asset management
              companies. It is reproduced here as a visual reference; confirm
              current empanelment and product availability with the team.
            </p>
          </Reveal>
          <Reveal className="amc-strip" delay={100} variant="fade-in">
            <SmartImage
              src="/assets/home/client-logos.png"
              alt="Collage of asset management company logos displayed by Investrow, including Aditya Birla Sun Life, Axis, HDFC, SBI, Tata and others"
              width={1400}
              height={300}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
