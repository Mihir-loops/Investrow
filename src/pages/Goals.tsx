import { CSSProperties, useState } from "react";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { ButtonLink, CTASection, PageHero } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { goals } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";
import { playClick, playHover } from "../lib/audio";

const GOAL_METRICS: Record<
  string,
  {
    accent: string;
    horizonCategory: "all" | "near" | "medium" | "long";
    horizonLabel: string;
    typicalCorpus: string;
    realityRule: string;
    sipEstimate: string;
  }
> = {
  "dream-home": {
    accent: "#f59e0b",
    horizonCategory: "near",
    horizonLabel: "3–10 Years · Capital Accumulation",
    typicalCorpus: "₹35L – ₹1.2 Cr",
    realityRule: "20% Down payment + Stamp duty + 12-month post-buy buffer",
    sipEstimate: "₹28,500/mo over 7 yrs @ 12%",
  },
  "wealth-creation": {
    accent: "#2563eb",
    horizonCategory: "long",
    horizonLabel: "7+ Years · Compounding Engine",
    typicalCorpus: "Financial Autonomy",
    realityRule: "Step-up SIP by 10% annually to outpace lifestyle inflation",
    sipEstimate: "₹25,000/mo over 15 yrs = ₹1.26 Cr",
  },
  "retirement": {
    accent: "#ea580c",
    horizonCategory: "long",
    horizonLabel: "10–35 Years · Sovereign Freedom",
    typicalCorpus: "₹2.5 Cr – ₹6 Cr+",
    realityRule: "Account for 30 years post-work healthcare & living inflation",
    sipEstimate: "₹35,000/mo over 20 yrs = ₹3.5 Cr",
  },
  "child-education": {
    accent: "#10b981",
    horizonCategory: "medium",
    horizonLabel: "5–18 Years · Non-Negotiable Milestone",
    typicalCorpus: "₹40L – ₹1 Cr",
    realityRule: "Education inflation runs at 10–12%/yr; early equity is vital",
    sipEstimate: "₹18,000/mo over 12 yrs = ₹58 Lakhs",
  },
  "child-wedding": {
    accent: "#ec4899",
    horizonCategory: "medium",
    horizonLabel: "10–20 Years · Event Specific",
    typicalCorpus: "₹25L – ₹75L",
    realityRule: "De-risk capital 2 years prior into debt to lock in accumulated gains",
    sipEstimate: "₹14,000/mo over 14 yrs = ₹55 Lakhs",
  },
};

const planningSteps = [
  {
    step: "01",
    title: "Name the Life Purpose",
    text: "A house, university abroad, or retirement freedom. Defining the purpose keeps the discipline steady through volatile market seasons.",
  },
  {
    step: "02",
    title: "Fix the Target Calendar Date",
    text: "The exact time horizon dictates asset allocation. Near-term plans demand debt stability; multi-year plans unlock equity alpha.",
  },
  {
    step: "03",
    title: "Stress-Test for True Inflation",
    text: "Today's ₹25 Lakhs degree will cost ₹60+ Lakhs in 12 years. We stress-test goals against realistic 7–10% inflation indexes.",
  },
  {
    step: "04",
    title: "Calibrate the Monthly Fuel (SIP)",
    text: "We work backwards from the future corpus to determine a realistic, automated monthly contribution you can sustain effortlessly.",
  },
  {
    step: "05",
    title: "Ring-Fence with Capital Defense",
    text: "Emergency liquidity, comprehensive health cover, and pure term assurance ensure an unexpected life shock never derails your milestone.",
  },
];

export default function Goals() {
  usePageMeta(
    "Financial Goals | Investrow Financial Services",
    "Plan for a dream home, wealth creation, retirement, a child's education or a child's wedding with clear goal-based planning and calculators.",
  );

  const [filter, setFilter] = useState<"all" | "near" | "medium" | "long">("all");

  const filteredGoals = goals.filter((g) => {
    if (filter === "all") return true;
    const meta = GOAL_METRICS[g.slug];
    return meta?.horizonCategory === filter;
  });

  return (
    <>
      <PageHero
        eyebrow="Financial Goals Architecture"
        title={
          <>
            A goal without a date is just a <em>wish.</em>
          </>
        }
        description={
          <>
            <p>
              The useful questions are simple: what is the money for, when will
              you need it, and what can you set aside consistently between now
              and then?
            </p>
            <p>
              Start with the goal that matters most. The right plan is the one
              that survives ordinary life, not the one that looks perfect on a
              spreadsheet.
            </p>
          </>
        }
        breadcrumbs={[{ label: "Goals" }]}
      >
        <div className="goals-timeline-pillbox">
          <div className="goals-timeline-pillbox__header">
            <span className="live-pulse-dot" />
            <span>Compounding Rule of 72</span>
          </div>
          <p className="goals-timeline-pillbox__quote">
            At 12% equity CAGR, your money doubles approximately every 6 years.
            Time in the market is your greatest unfair advantage.
          </p>
          <div className="goals-timeline-pillbox__horizons">
            <div className="horizon-chip">
              <strong>3–7 Yrs</strong>
              <span>Home Capital</span>
            </div>
            <div className="horizon-chip">
              <strong>7–15 Yrs</strong>
              <span>Child Future</span>
            </div>
            <div className="horizon-chip">
              <strong>15+ Yrs</strong>
              <span>Total Freedom</span>
            </div>
          </div>
        </div>
      </PageHero>

      <section className="section goals-overview">
        <div className="container">
          <div className="goals-filter-bar">
            <div className="goals-filter-bar__lead">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Select A Life Milestone
              </p>
              <h2 className="goals-filter-bar__title">
                What are you <em>planning for?</em>
              </h2>
            </div>

            {/* Interactive Horizon Filter Tabs */}
            <div className="goals-filter-tabs" role="tablist">
              <button
                type="button"
                className={`goals-filter-tab ${filter === "all" ? "is-active" : ""}`}
                onClick={() => {
                  setFilter("all");
                  playClick();
                }}
                onMouseEnter={() => playHover()}
              >
                All Milestones (5)
              </button>
              <button
                type="button"
                className={`goals-filter-tab ${filter === "near" ? "is-active" : ""}`}
                onClick={() => {
                  setFilter("near");
                  playClick();
                }}
                onMouseEnter={() => playHover()}
              >
                Near-Term (3–10 yrs)
              </button>
              <button
                type="button"
                className={`goals-filter-tab ${filter === "medium" ? "is-active" : ""}`}
                onClick={() => {
                  setFilter("medium");
                  playClick();
                }}
                onMouseEnter={() => playHover()}
              >
                Medium-Term (7–18 yrs)
              </button>
              <button
                type="button"
                className={`goals-filter-tab ${filter === "long" ? "is-active" : ""}`}
                onClick={() => {
                  setFilter("long");
                  playClick();
                }}
                onMouseEnter={() => playHover()}
              >
                Generational (15+ yrs)
              </button>
            </div>
          </div>

          <div className="creative-goals-grid">
            {filteredGoals.map((goal) => {
              const meta = GOAL_METRICS[goal.slug] ?? {
                accent: "#2563eb",
                horizonCategory: "all",
                horizonLabel: goal.horizon,
                typicalCorpus: "Custom Goal",
                realityRule: "Defined asset allocation",
                sipEstimate: "Calculated via SIP engine",
              };

              return (
                <SpotlightCard
                  as="a"
                  href={`/goals/${goal.slug}`}
                  className="creative-goal-card"
                  key={goal.slug}
                  style={{ "--goal-accent": meta.accent } as CSSProperties}
                  onMouseEnter={() => playHover()}
                  onClick={() => playClick()}
                >
                  {/* Architectural Monogram Watermark */}
                  <span className="creative-goal-card__watermark" aria-hidden="true">
                    {goal.index}
                  </span>

                  <div className="creative-goal-card__top">
                    <div className="creative-goal-card__icon-wrap">
                      <span className="creative-goal-card__icon">
                        <Icon name={goal.icon} size={22} strokeWidth={1.75} />
                      </span>
                      <span className="creative-goal-card__index-pill">
                        Milestone {goal.index}
                      </span>
                    </div>

                    <div className="creative-goal-card__horizon-badge">
                      <span
                        className="creative-goal-card__horizon-dot"
                        style={{ background: meta.accent }}
                      />
                      <span>{meta.horizonLabel}</span>
                    </div>
                  </div>

                  <div className="creative-goal-card__body">
                    <h3 className="creative-goal-card__title">{goal.title}</h3>
                    <p className="creative-goal-card__teaser">{goal.teaser}</p>

                    {/* Financial Reality Check Chip */}
                    <div className="creative-goal-card__reality">
                      <span className="creative-goal-card__reality-label">Planning Principle</span>
                      <p className="creative-goal-card__reality-text">{meta.realityRule}</p>
                    </div>

                    {/* Corpus & SIP Projection Tag */}
                    <div className="creative-goal-card__telemetry">
                      <div className="telemetry-item">
                        <span className="telemetry-label">Target Corpus</span>
                        <strong className="telemetry-val" style={{ color: meta.accent }}>
                          {meta.typicalCorpus}
                        </strong>
                      </div>
                      <div className="telemetry-item">
                        <span className="telemetry-label">Indicative Fuel</span>
                        <strong className="telemetry-val">{meta.sipEstimate}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="creative-goal-card__foot">
                    <span className="creative-goal-card__cta">Engineer This Goal</span>
                    <span className="creative-goal-card__arrow" aria-hidden="true">
                      <Icon name="arrowRight" size={16} />
                    </span>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 5-Step Goal Engineering Blueprint */}
      <section className="section goal-method">
        <div className="container goal-method__grid">
          <Reveal className="goal-method__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              The Advisory Method
            </p>
            <TextReveal as="h2" mode="words">
              Five steps that make a goal <em>real.</em>
            </TextReveal>
            <p>
              The answers do not need to be perfect. They need to be explicit,
              so the plan can be tested, stress-tested against inflation, and
              consistently funded.
            </p>
            <ButtonLink to="/calculators/goal-setting" variant="secondary">
              Launch the goal calculator
            </ButtonLink>
          </Reveal>

          <div className="goal-blueprint-steps">
            {planningSteps.map((step, index) => (
              <Reveal
                className="goal-blueprint-card"
                delay={index * 60}
                key={step.title}
              >
                <div className="goal-blueprint-card__indicator">
                  <span className="goal-blueprint-card__num">{step.step}</span>
                  {index < planningSteps.length - 1 && (
                    <span className="goal-blueprint-card__line" aria-hidden="true" />
                  )}
                </div>
                <div className="goal-blueprint-card__content">
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section goals-cta-strip">
        <div className="container">
          <Reveal className="goals-cta-strip__inner">
            <div>
              <p className="eyebrow eyebrow--lime">
                <span aria-hidden="true" />
                Need a second perspective?
              </p>
              <h2>Bring the goal. We&apos;ll bring the financial questions.</h2>
            </div>
            <ButtonLink to="/contact" variant="light">
              Talk to the team
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="A plan can start small. It just needs to start."
        description="If you are not sure which goal to prioritise, begin with a conversation. We will help you sequence the plan and identify the first useful step."
      />
    </>
  );
}
