import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { CTASection, PageHero, SectionHead } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { investorServices } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

const steps = [
  {
    title: "Identify the request",
    text: "Is this a KYC update, a SIP change, a nomination, a statement or a claim? Being precise helps the team route it correctly.",
  },
  {
    title: "Use the official channel",
    text: "Formal transactions should go through the relevant AMC, insurer, registrar, broker or depository. Confirm the destination before sharing documents.",
  },
  {
    title: "Prepare the records",
    text: "Keep a copy of the form, acknowledgement and any correspondence. Do not send passwords, OTPs or unnecessary sensitive information by email.",
  },
  {
    title: "Follow up and close the loop",
    text: "Track the request, confirm completion and update your own records. If something is unclear, ask before resubmitting.",
  },
];

export default function InvestorServices() {
  usePageMeta(
    "Investor Services | Investrow Financial Services",
    "Guidance on KYC readiness, SIP changes, portfolio statements, nominations, claims and grievances — and when to use the official channel.",
  );

  return (
    <>
      <PageHero
        eyebrow="Investor services"
        title={
          <>
            Support that continues after the <em>first investment.</em>
          </>
        }
        description={
          <>
            <p>
              Financial relationships involve paperwork, changes and occasional
              problems. The team can help you understand the process and prepare
              the right information.
            </p>
            <p>
              Formal transactions must go through the official AMC, insurer,
              registrar or intermediary channel. Nothing on this page replaces
              those requirements.
            </p>
          </>
        }
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Investor services" },
        ]}
      >
        <div className="hero-reg-card">
          <span className="hero-reg-card__label">A safe rule</span>
          <dl>
            <div><dt>We never ask for</dt><dd>Passwords or OTPs</dd></div>
            <div><dt>Use</dt><dd>Official channels</dd></div>
            <div><dt>Keep</dt><dd>Form acknowledgements</dd></div>
          </dl>
        </div>
      </PageHero>

      <section className="section investor-service-list">
        <div className="container">
          <SectionHead
            eyebrow="How we can help"
            title={
              <>
                The practical side of a <em>financial relationship.</em>
              </>
            }
            description="These are service areas, not promises of a specific turnaround time. Requirements vary by product and institution."
          />
          <RevealGroup className="service-info-grid service-info-grid--two">
            {investorServices.map((item, index) => (
              <article className="info-card info-card--wide" key={item.title}>
                <span className="info-card__icon">
                  <Icon name={item.icon} size={22} strokeWidth={1.5} />
                </span>
                <div>
                  <span className="info-card__index">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section investor-steps">
        <div className="container investor-steps__grid">
          <Reveal className="investor-steps__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              A safe sequence
            </p>
            <TextReveal as="h2" mode="words">
              Slow down before you <em>send.</em>
            </TextReveal>
            <p>
              Most servicing problems come from an unclear request, an outdated
              form or a document sent to the wrong place. A few minutes of care
              can prevent a longer delay.
            </p>
            <div className="security-callout">
              <Icon name="lock" size={19} />
              <p>
                Investrow should never ask for your password, OTP or full bank
                credentials. If you receive such a request, verify it through an
                official phone number before responding.
              </p>
            </div>
          </Reveal>
          <div className="investor-steps__list">
            {steps.map((step, index) => (
              <Reveal className="investor-step" delay={index * 60} key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which channel to use?"
        description="Tell us what you are trying to complete. We will help you identify the right form or official destination — without asking for sensitive credentials."
      />
    </>
  );
}
