import { Icon } from "../components/Icon";
import { PillarsGrid } from "../components/Pillars";
import { Reveal, RevealGroup } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { ButtonLink, CTASection, PageHero, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { AnimatedCounter } from "../components/AnimatedCounter";
import { InternationalDeskCard } from "../components/InternationalDeskCard";
import { company, publishedFigures, team } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

const certificates = [
  {
    src: "/assets/about/certificates/1.png",
    issuer: "YSAMCO Mutual Fund",
    alt: "Certificate featuring YSAMCO Mutual Fund recognition",
  },
  {
    src: "/assets/about/certificates/2.png",
    issuer: "Mahindra Manulife",
    alt: "Mahindra Manulife certificate of appreciation",
  },
  {
    src: "/assets/about/certificates/3.png",
    issuer: "ITI Mutual Fund",
    alt: "ITI Mutual Fund SIP Champion or Star MFD certificate",
  },
  {
    src: "/assets/about/certificates/4.png",
    issuer: "ITI Mutual Fund",
    alt: "ITI Mutual Fund certificate of appreciation",
  },
  {
    src: "/assets/about/certificates/5.png",
    issuer: "Tata Mutual Fund",
    alt: "Tata Mutual Fund SIP milestone achiever certificate",
  },
  {
    src: "/assets/about/certificates/6.png",
    issuer: "Sundaram Mutual Fund",
    alt: "Sundaram Mutual Fund certificate of appreciation",
  },
  {
    src: "/assets/about/certificates/7.png",
    issuer: "Bajaj Finserv",
    alt: "Bajaj Finserv certificate of excellence",
  },
  {
    src: "/assets/about/certificates/8.png",
    issuer: "Recognition certificate",
    alt: "Certificate displayed in Investrow's public award gallery",
  },
];

export default function About() {
  usePageMeta(
    "About Investrow Financial Services | Dhanbad, Jharkhand",
    "Learn about Investrow Financial Services Pvt. Ltd., an AMFI-registered mutual fund distributor founded in 2021, with mission, vision, values, leadership and published milestones.",
  );

  return (
    <>
      <PageHero
        eyebrow="About the company"
        title={
          <>
            A financial partner built on <em>clarity,</em> not noise.
          </>
        }
        description={
          <>
            <p>
              Investrow Financial Services Pvt. Ltd. is an AMFI-registered mutual
              fund distribution company, started in 2021 with the aim of helping
              people grow their money in a simple and disciplined way.
            </p>
            <p>
              We believe financial planning should be easy to understand,
              practical and accessible — and that trust is earned through
              transparent advice, not promises about markets.
            </p>
          </>
        }
        breadcrumbs={[{ label: "About" }]}
      >
        <div className="hero-reg-card">
          <span className="hero-reg-card__label">Registered identity</span>
          <dl>
            <div><dt>AMFI ARN</dt><dd>{company.arn}</dd></div>
            <div><dt>CIN</dt><dd>{company.cin}</dd></div>
            <div><dt>Based in</dt><dd>Dhanbad, Jharkhand</dd></div>
          </dl>
        </div>
      </PageHero>

      <section className="section about-story">
        <div className="container about-story__grid">
          <Reveal className="about-story__media" variant="fade-up">
            <InternationalDeskCard />
          </Reveal>
          <Reveal className="about-story__copy" delay={120}>
            <p className="eyebrow">
              <span aria-hidden="true" className="eyebrow__line" />
              Our story
            </p>
            <TextReveal as="h2" mode="words">
              Built to make investing <em>understandable.</em>
            </TextReveal>
            <p>
              Investrow began in 2021 with a straightforward observation: many
              people are told what to buy, but not helped to understand why it
              belongs in their plan. The company set out to change that by
              combining product knowledge with patient explanation.
            </p>
            <p>
              Our leadership team brings practical financial-services
              experience, with a focus on client relationships, mutual fund
              distribution, compliance and the day-to-day discipline that keeps
              a plan moving. We aim to guide clients through market ups and
              downs, not just the first investment.
            </p>
            <p>
              That means trust before sales, investor education before product
              recommendations and a willingness to say when something is not
              suitable.
            </p>
            <div className="story-signoff">
              <span>Investrow Financial Services Pvt. Ltd.</span>
              <small>Dhanbad, Jharkhand · Since 2021</small>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mission-section">
        <div className="container">
          <div className="mission-grid">
            <Reveal className="mission-card">
              <SmartImage
                src="/assets/about/mission.png"
                alt=""
                width={64}
                height={64}
                className="mission-card__icon"
              />
              <span className="mission-card__label">Mission</span>
              <TextReveal as="h2" mode="words">
                Make investing simple, transparent and <em>accessible.</em>
              </TextReveal>
              <p>
                Our mission is to make investing simple, transparent, and
                accessible for everyone. We aim to help individuals achieve their
                financial goals through disciplined investing and the right
                guidance.
              </p>
            </Reveal>
            <Reveal className="mission-card" delay={80}>
              <SmartImage
                src="/assets/about/vision.png"
                alt=""
                width={64}
                height={64}
                className="mission-card__icon"
              />
              <span className="mission-card__label">Vision</span>
              <TextReveal as="h2" mode="words">
                A trusted partner for the <em>long term.</em>
              </TextReveal>
              <p>
                Our vision is to become a trusted financial partner for our
                clients by building long-term relationships and supporting them
                in their wealth creation journey.
              </p>
            </Reveal>
            <Reveal className="mission-card" delay={160}>
              <SmartImage
                src="/assets/about/values.png"
                alt=""
                width={64}
                height={64}
                className="mission-card__icon"
              />
              <span className="mission-card__label">Values</span>
              <TextReveal as="h2" mode="words">
                Trust, transparency and a <em>client-first</em> approach.
              </TextReveal>
              <p>
                Our company is driven by values like trust, transparency, and a
                client-first approach. We believe in giving honest advice,
                maintaining long-term relationships, and continuously supporting
                our clients in every stage of their financial journey.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section promise-section">
        <div className="container promise-grid">
          <Reveal className="promise-grid__copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Brand promise
            </p>
            <TextReveal as="h2" mode="words">
              Empowering your <em>financial future.</em>
            </TextReveal>
            <p>
              We help you build a secure and confident financial journey with
              smart strategies tailored to your goals. The work is not a single
              transaction; it is a relationship that evolves as your life does.
            </p>
            <ButtonLink to="/team" variant="secondary">
              Meet the people behind it
            </ButtonLink>
          </Reveal>
          <Reveal className="promise-grid__panel" delay={100}>
            <div className="promise-panel">
              <span className="promise-panel__label">How we try to work</span>
              <ul>
                <li><span>01</span>Listen before recommending.</li>
                <li><span>02</span>Explain the trade-offs, including the downside.</li>
                <li><span>03</span>Keep compliance and documentation in order.</li>
                <li><span>04</span>Stay involved after the investment.</li>
              </ul>
              <span className="promise-panel__foot">
                ARN-194720 · CIN U67190JH2021PTC016813
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section milestones-section">
        <div className="container">
          <div className="milestones-head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Company-published milestones
              </p>
              <TextReveal as="h2" mode="words">
                The numbers, with <em>context.</em>
              </TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <p>
                These figures appear on Investrow&apos;s public website. The
                research pack flags them for verification, so they are shown as
                published rather than as independently confirmed current facts.
              </p>
            </Reveal>
          </div>
          <RevealGroup className="published-grid">
            {publishedFigures.map((figure) => (
              <article className="published-card" key={figure.label}>
                <strong className="published-card__value">
                  <AnimatedCounter value={figure.value} duration={1900} />
                </strong>
                <h3>{figure.label}</h3>
                <p>{figure.note}</p>
              </article>
            ))}
          </RevealGroup>
          <Reveal className="verification-note">
            <Icon name="info" size={18} />
            <p>
              <strong>Verification note.</strong> The source site says the
              company began in 2021 while also listing &ldquo;23+ years of
              experience.&rdquo; It may refer to the team&apos;s combined
              experience. AUM, client-count and award figures need a reporting
              date and supporting records before they are used as current
              claims. Regulatory identifiers should be checked on official
              registries.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section awards-section">
        <div className="container">
          <div className="awards-head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Recognition
              </p>
              <TextReveal as="h2" mode="words">
                Certificates from the <em>public gallery.</em>
              </TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Eight certificate images are displayed on Investrow&apos;s public
                website. Issuer labels below come from a visual review; exact
                titles, dates and validity should be confirmed from the originals
                before being presented as verified awards.
              </p>
            </Reveal>
          </div>
          <RevealGroup className="certificate-grid">
            {certificates.map((certificate, index) => (
              <a
                key={certificate.src}
                className="certificate"
                href={certificate.src}
                target="_blank"
                rel="noreferrer"
              >
                <span className="certificate__image">
                  <SmartImage
                    src={certificate.src}
                    alt={certificate.alt}
                    width={420}
                    height={300}
                  />
                </span>
                <span className="certificate__meta">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{certificate.issuer}</strong>
                  <Icon name="arrowUpRight" size={15} />
                </span>
              </a>
            ))}
          </RevealGroup>
          <Reveal className="certificate-note">
            <p>
              The research pack identifies recognition associated with YSAMCO,
              Mahindra Manulife, ITI Mutual Fund, Tata Mutual Fund, Sundaram
              Mutual Fund and Bajaj Finserv. These are not presented as current
              awards or endorsements.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section principles-section" id="principles">
        <div className="container">
          <div className="principles-editorial-head">
            <p className="principles-editorial-head__eyebrow">
              The INVESTROW Principles — Nine Letters · One Standard
            </p>
            <h2 className="principles-editorial-head__title">
              What the name <em>stands for.</em>
            </h2>
            <p className="principles-editorial-head__desc">
              The acronym INVESTROW sets out the standard we aim to hold:
              integrity, nurturing wealth, visionary planning, expertise,
              smart investing, trust, risk management, opportunity and wealth
              creation.
            </p>
          </div>
          <PillarsGrid />
        </div>
      </section>

      <section className="section leadership-preview">
        <div className="container">
          <div className="leadership-preview__head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Leadership
              </p>
              <h2>
                A small team, close to the <em>work.</em>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p>
                Leadership is involved in client relationships, business
                development and compliance — the three areas that determine
                whether a financial relationship is useful and durable.
              </p>
              <TextLink to="/team">Meet the full team</TextLink>
            </Reveal>
          </div>
          <RevealGroup className="team-preview-grid">
            {team.map((member) => (
              <article className="team-preview" key={member.name}>
                <SmartImage
                  src={member.image}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  width={420}
                  height={500}
                />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section regulatory-section">
        <div className="container regulatory-grid">
          <Reveal>
            <p className="eyebrow">
              <span aria-hidden="true" />
              Regulatory identity
            </p>
            <h2>
              The details that should be <em>checkable.</em>
            </h2>
            <p>
              These identifiers are published on Investrow&apos;s website. They
              should be verified on the relevant official registries and kept
              current before publication or use in client communication.
            </p>
          </Reveal>
          <Reveal className="regulatory-card" delay={100}>
            <dl>
              <div>
                <dt>Legal name</dt>
                <dd>{company.name}</dd>
              </div>
              <div>
                <dt>Corporate Identity Number</dt>
                <dd>{company.cin}</dd>
              </div>
              <div>
                <dt>AMFI Registered Mutual Fund Distributor</dt>
                <dd>{company.arn}</dd>
              </div>
              <div>
                <dt>BSE Member Code</dt>
                <dd>{company.bse}</dd>
              </div>
              <div>
                <dt>Head office</dt>
                <dd>{company.headOffice}</dd>
              </div>
            </dl>
            <p className="regulatory-card__note">
              Status and permissions not independently verified in this build.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Let's build a plan that can change with your life."
        description="Start with a conversation about what you are working toward. We will help you understand the options and the next practical step."
      />
    </>
  );
}
