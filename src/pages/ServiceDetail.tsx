import { useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { ButtonLink, CTASection, PageHero, SectionHead, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { company, services } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";
import NotFound from "./NotFound";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find((item) => item.slug === slug);

  usePageMeta(
    service?.metaTitle ?? "Service not found | Investrow",
    service?.metaDescription ?? "The requested service page could not be found.",
  );

  if (!service) return <NotFound />;

  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`${service.index} · ${service.eyebrow}`}
        title={service.title}
        description={
          <>
            <p>{service.summary}</p>
            <p>
              Explore what it is, how the process works, the common options and
              the questions that should be answered before you decide.
            </p>
          </>
        }
        breadcrumbs={[
          { label: "Services", to: "/services" },
          { label: service.title },
        ]}
      >
        <div className="service-contact-card">
          <span className="service-contact-card__label">Talk it through</span>
          <p>If you need help or have a question, we&apos;re here for you.</p>
          <a href="tel:+919102050555">
            <Icon name="phone" size={15} /> {company.phones[0]}
          </a>
          <a href={`mailto:${company.email}`}>
            <Icon name="mail" size={15} /> {company.email}
          </a>
          <ButtonLink to="/contact" variant="secondary" arrow={false}>
            Send a request
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section service-intro">
        <div className="container">
          <Reveal className="service-banner-reveal" variant="image-reveal">
            <div className="service-banner">
              <SmartImage
                src={service.image}
                alt={service.imageAlt}
                width={1500}
                height={640}
              />
              <div className="service-banner__overlay" aria-hidden="true" />
              <div className="service-banner__caption">
                <span>{service.index}</span>
                <p>{service.eyebrow}</p>
              </div>
              <span className="service-banner__source">
                Service image from Investrow&apos;s public website
              </span>
            </div>
          </Reveal>

          <div className="service-overview-grid">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                The basics
              </p>
              <TextReveal as="h2" mode="words">
                Understanding <em>{service.proseTitle}.</em>
              </TextReveal>
            </Reveal>
            <Reveal className="service-overview-copy" delay={100}>
              {service.what.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {service.caveat && (
                <div className="inline-caveat">
                  <Icon name="info" size={18} />
                  <p>{service.caveat}</p>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section service-process">
        <div className="container">
          <SectionHead
            eyebrow="The process"
            title={
              <>
                How to approach <em>{service.proseTitle}.</em>
              </>
            }
            description="A practical sequence to keep the decision grounded in your goal, your cash flow and your tolerance for risk."
          />
          <RevealGroup className="process-grid process-grid--steps">
            {service.how.map((step, index) => (
              <article className="process-step" key={step.title}>
                <span className="process-step__number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section service-types">
        <div className="container">
          <SectionHead
            eyebrow="Options"
            title={
              <>
                The main options within <em>{service.proseTitle}.</em>
              </>
            }
            description="These are broad categories, not recommendations. The right option depends on the goal, the time horizon and the specific terms of the product."
          />
          <RevealGroup className="types-grid">
            {service.types.map((type, index) => (
              <article className="type-card" key={type.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{type.title}</h3>
                <p>{type.text}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section tax-section">
        <div className="container tax-grid">
          <Reveal className="tax-grid__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Tax &amp; considerations
            </p>
            <TextReveal as="h2" mode="words">
              Read the <em>fine print.</em>
            </TextReveal>
            <p>
              Tax treatment and product rules change. A benefit that existed
              when a page was written may not apply today, and the outcome can
              depend on your own facts.
            </p>
            <p className="tax-grid__note">
              This page is educational and does not provide tax, legal or
              investment advice. Please confirm current rules with a qualified
              professional.
            </p>
          </Reveal>
          <Reveal className="tax-card" delay={100}>
            <h3>{service.taxTitle}</h3>
            <p>{service.taxNote}</p>
            <div className="tax-card__foot">
              <Icon name="shieldPlain" size={17} />
              <span>Illustrative information only · Verify independently</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section related-section">
        <div className="container">
          <div className="related-head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Keep exploring
              </p>
              <TextReveal as="h2" mode="words">Related services</TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <TextLink to="/services">View all services</TextLink>
            </Reveal>
          </div>
          <RevealGroup className="related-grid">
            {related.map((item) => (
              <SpotlightCard
                as="a"
                href={`/services/${item.slug}`}
                className="related-card"
                key={item.slug}
              >
                <span className="related-card__icon">
                  <Icon name={item.icon} size={22} strokeWidth={1.6} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
                <span className="related-card__link">
                  Learn more <Icon name="arrowUpRight" size={15} />
                </span>
              </SpotlightCard>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection
        title={`Have a question about ${service.proseTitle}?`}
        description="Tell us what you are considering and what you are unsure about. A short conversation can usually clarify whether this is the right next step."
      />
    </>
  );
}
