import { useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { ButtonLink, CTASection, PageHero, SectionHead, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { goals } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";
import NotFound from "./NotFound";

export default function GoalDetail() {
  const { slug } = useParams();
  const goal = goals.find((item) => item.slug === slug);

  usePageMeta(
    goal?.metaTitle ?? "Goal not found | Investrow",
    goal?.metaDescription ?? "The requested goal page could not be found.",
  );

  if (!goal) return <NotFound />;

  const related = goals.filter((item) => item.slug !== goal.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${goal.index} · Financial goal`}
        title={goal.title}
        description={
          <>
            <p>{goal.summary}</p>
            <p>
              Horizon: <strong>{goal.horizon}</strong>. This page sets out the
              considerations, a practical planning sequence and the tool that
              can turn the goal into a monthly number.
            </p>
          </>
        }
        breadcrumbs={[
          { label: "Goals", to: "/goals" },
          { label: goal.title },
        ]}
      >
        <div className="goal-hero-card">
          <span className="goal-hero-card__icon">
            <Icon name={goal.icon} size={30} strokeWidth={1.4} />
          </span>
          <div>
            <span>Suggested horizon</span>
            <strong>{goal.horizon}</strong>
          </div>
          <ButtonLink to={goal.calculator.href} variant="secondary">
            Open calculator
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section goal-intro">
        <div className="container goal-intro__grid">
          <Reveal className="goal-intro__statement">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Why it matters
            </p>
            <TextReveal as="h2" mode="words">
              Plan for the whole cost, not just the <em>headline.</em>
            </TextReveal>
          </Reveal>
          <Reveal className="goal-intro__copy" delay={100}>
            <p>{goal.intro}</p>
            <div className="goal-intro__badges">
              <span><Icon name="target" size={16} /> Dated goal</span>
              <span><Icon name="chart" size={16} /> Explicit assumptions</span>
              <span><Icon name="shieldPlain" size={16} /> Risk-aware</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section goal-considerations">
        <div className="container">
          <SectionHead
            eyebrow="Considerations"
            title={
              <>
                What deserves a closer <em>look.</em>
              </>
            }
            description="These are the practical questions that usually determine whether a goal plan holds up when life gets busy."
          />
          <RevealGroup className="consideration-grid">
            {goal.considerations.map((item, index) => (
              <article className="consideration-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section goal-sequence">
        <div className="container goal-sequence__grid">
          <Reveal className="goal-sequence__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              A practical sequence
            </p>
            <TextReveal as="h2" mode="words">
              From intention to a <em>dated plan.</em>
            </TextReveal>
            <p>
              You do not need to solve everything at once. Work through the
              sequence, then revisit it when your income, family or goal changes.
            </p>
            <div className="goal-calc-card">
              <span className="goal-calc-card__label">Tool</span>
              <h3>{goal.calculator.label}</h3>
              <p>
                Adjust the target, horizon and assumed return. The calculator
                will estimate the monthly investment required.
              </p>
              <TextLink to={goal.calculator.href}>Open the calculator</TextLink>
            </div>
          </Reveal>
          <Reveal className="goal-sequence__steps" delay={100}>
            <ol>
              {goal.steps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      <section className="section related-goals">
        <div className="container">
          <div className="related-head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Keep planning
              </p>
              <TextReveal as="h2" mode="words">Other goals</TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <TextLink to="/goals">All goals</TextLink>
            </Reveal>
          </div>
          <RevealGroup className="related-grid">
            {related.map((item) => (
              <SpotlightCard
                as="a"
                href={`/goals/${item.slug}`}
                className="related-card"
                key={item.slug}
              >
                <span className="related-card__icon">
                  <Icon name={item.icon} size={22} strokeWidth={1.6} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
                <span className="related-card__link">
                  Explore goal <Icon name="arrowUpRight" size={15} />
                </span>
              </SpotlightCard>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection
        title="Make the goal part of a wider plan."
        description="A single goal is a good start. A conversation can help you sequence it alongside protection, liquidity and the other things that matter."
      />
    </>
  );
}
