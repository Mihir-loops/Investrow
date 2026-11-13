import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { ButtonLink, CTASection, PageHero, SectionHead, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { company, services } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

const steps = [
  {
    title: "Understand the context",
    text: "Goals, cash flow, existing investments, protection and time horizon. We start with the whole picture, not one product.",
  },
  {
    title: "Explain the options",
    text: "What each option does, what it costs, what can go wrong and how it fits — or does not fit — the plan.",
  },
  {
    title: "Put the plan in motion",
    text: "Complete the documentation, set a contribution rhythm and keep records clear.",
  },
  {
    title: "Review at sensible intervals",
    text: "Revisit the plan when life changes or at planned reviews. Avoid reacting to every market headline.",
  },
];

export default function Services() {
  usePageMeta(
    "Services | Investrow Financial Services",
    "Explore Investrow's services across mutual funds, life and health insurance, tax planning, general insurance, FDs and bonds, stock market and demat, and NPS.",
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={
          <>
            One relationship. A <em>wider</em> view of your money.
          </>
        }
        description={
          <>
            <p>
              Investments, protection and tax do not live in separate boxes.
              Our service lines are designed to be considered together, so a
              decision in one area does not quietly undermine another.
            </p>
            <p>
              We are an AMFI-registered mutual fund distributor ({company.arn}).
              Product availability and permissions vary by service and should be
              confirmed with the team.
            </p>
          </>
        }
        breadcrumbs={[{ label: "Services" }]}
      >
        <div className="hero-reg-card">
          <span className="hero-reg-card__label">At a glance</span>
          <dl>
            <div><dt>Service lines</dt><dd>8</dd></div>
            <div><dt>Registered</dt><dd>AMFI {company.arn}</dd></div>
            <div><dt>Approach</dt><dd>Plan first</dd></div>
          </dl>
        </div>
      </PageHero>

      <section className="section services-overview">
        <div className="container">
          <SectionHead
            eyebrow="What we help with"
            title={
              <>
                Choose the area that feels <em>closest</em> to your question.
              </>
            }
            description="Each service page explains the basics, the process, the common options and the questions that deserve a closer look."
          />
          <RevealGroup className="services-grid">
            {services.map((service) => (
              <SpotlightCard
                as="a"
                href={`/services/${service.slug}`}
                className="service-card"
                key={service.slug}
              >
                <div className="service-card__top">
                  <span className="service-card__icon">
                    <Icon name={service.icon} size={24} strokeWidth={1.5} />
                  </span>
                  <span className="service-card__index">{service.index}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.teaser}</p>
                <span className="service-card__link">
                  Explore service
                  <Icon name="arrowUpRight" size={16} />
                </span>
              </SpotlightCard>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="process-section__head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                How an engagement works
              </p>
              <TextReveal as="h2" mode="words">
                A sequence that keeps the <em>goal</em> in view.
              </TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <p>
                The process is deliberately simple. It is designed to make the
                reasoning visible, so you can make an informed decision rather
                than delegate one.
              </p>
              <TextLink to="/about#principles">See the principles behind it</TextLink>
            </Reveal>
          </div>
          <RevealGroup className="process-grid">
            {steps.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span className="process-step__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </RevealGroup>
          <Reveal className="scope-note">
            <Icon name="info" size={18} />
            <p>
              <strong>Scope of services.</strong> The research pack flags that
              some original service pages had limited or mismatched copy for
              FDs and bonds, stock market and demat, and NPS. This rebuild keeps
              those pages general and explicitly asks you to confirm product
              availability, permissions and current rules with the team. Nothing
              here should be read as brokerage, execution, advisory or tax
              authorisation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section services-links">
        <div className="container services-links__grid">
          <Reveal className="services-links__card">
            <p className="eyebrow eyebrow--lime">
              <span aria-hidden="true" />
              Not sure where to start?
            </p>
            <TextReveal as="h2" mode="words">
              Begin with the <em>goal.</em>
            </TextReveal>
            <p>
              If you are planning a home, education, retirement or a long-term
              corpus, start there. We will connect the goal to the relevant
              services and tools.
            </p>
            <ButtonLink to="/goals" variant="light">
              Explore financial goals
            </ButtonLink>
          </Reveal>
          <Reveal className="services-links__card services-links__card--alt" delay={100}>
            <p className="eyebrow">
              <span aria-hidden="true" />
              Prefer a number first?
            </p>
            <TextReveal as="h2" mode="words">
              Run a <em>projection.</em>
            </TextReveal>
            <p>
              Use the calculators to explore the relationship between
              contributions, time and an assumed return. Then bring the questions
              to a conversation.
            </p>
            <ButtonLink to="/calculators" variant="secondary">
              Open the calculators
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Tell us what you are trying to solve."
        description="We will help you identify the relevant service, the questions to ask and the next practical step — without pressure to choose a product on the first call."
      />
    </>
  );
}
