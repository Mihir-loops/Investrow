import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { CTASection, PageHero } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { company } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

const requests = [
  {
    title: "Mutual fund KYC / account opening",
    text: "Ask for the current checklist and the correct application route for your situation.",
    subject: "Request: mutual fund KYC / account opening checklist",
  },
  {
    title: "SIP start, change or stop",
    text: "Request the current form or confirm whether the change can be completed online.",
    subject: "Request: SIP change guidance",
  },
  {
    title: "Nomination update",
    text: "Ask which form and records are required, and confirm the official destination.",
    subject: "Request: nomination update guidance",
  },
  {
    title: "Portfolio statement",
    text: "The latest statement from the AMC or registrar is usually the authoritative record.",
    subject: "Request: portfolio statement guidance",
  },
  {
    title: "Insurance policy servicing",
    text: "For address, nominee, premium or claim requests, the insurer's official channel is primary.",
    subject: "Request: insurance servicing guidance",
  },
  {
    title: "Grievance / escalation",
    text: "Ask for the right escalation route. Keep your acknowledgement and correspondence.",
    subject: "Request: grievance escalation guidance",
  },
];

export default function FormsDownloads() {
  usePageMeta(
    "Forms & Downloads | Investrow Financial Services",
    "Request the current mutual fund, insurance and servicing forms from Investrow. Official documents and verified download destinations are not hosted in this rebuild.",
  );

  return (
    <>
      <PageHero
        eyebrow="Forms & downloads"
        title={
          <>
            The right form starts with the right <em>question.</em>
          </>
        }
        description={
          <>
            <p>
              Official form files and download destinations were not captured or
              verified for this rebuild. Rather than host outdated documents, we
              ask you to request the current version from the team.
            </p>
            <p>
              For formal transactions, always confirm that the form and the
              destination are official before sharing documents or signatures.
            </p>
          </>
        }
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Forms & downloads" },
        ]}
      >
        <div className="hero-reg-card">
          <span className="hero-reg-card__label">Important</span>
          <dl>
            <div><dt>Hosted forms</dt><dd>None in this demo</dd></div>
            <div><dt>Official channel</dt><dd>Required for transactions</dd></div>
            <div><dt>Never share</dt><dd>Passwords / OTPs</dd></div>
          </dl>
        </div>
      </PageHero>

      <section className="section forms-section">
        <div className="container">
          <Reveal className="forms-disclosure">
            <Icon name="info" size={20} />
            <div>
              <TextReveal as="h2" mode="words">Why there are no download buttons here</TextReveal>
              <p>
                The research pack identifies forms and downloads as a resource
                area but does not confirm the current files, formats, dates or
                official destinations. Hosting a guessed or outdated form could
                cause a failed transaction or a privacy risk. This page therefore
                offers a documented request route instead.
              </p>
            </div>
          </Reveal>

          <RevealGroup className="request-grid">
            {requests.map((request, index) => (
              <article className="request-card" key={request.title}>
                <span className="request-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{request.title}</h3>
                <p>{request.text}</p>
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent(request.subject)}`}
                  className="request-card__link"
                >
                  Request by email <Icon name="arrowUpRight" size={15} />
                </a>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section request-process">
        <div className="container request-process__grid">
          <Reveal className="request-process__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Before you submit
            </p>
            <TextReveal as="h2" mode="words">
              A short checklist for a <em>clean</em> request.
            </TextReveal>
            <p>
              Requirements differ by institution and product. Confirm the current
              list with the official source rather than relying on an old form.
            </p>
          </Reveal>
          <Reveal className="request-checklist" delay={100}>
            <ul>
              <li><Icon name="check" size={16} /> Confirm the form is the current version.</li>
              <li><Icon name="check" size={16} /> Confirm the official recipient or portal.</li>
              <li><Icon name="check" size={16} /> Complete every mandatory field; do not leave signatures blank.</li>
              <li><Icon name="check" size={16} /> Attach only the documents requested.</li>
              <li><Icon name="check" size={16} /> Keep a copy and the acknowledgement.</li>
              <li><Icon name="check" size={16} /> Never send passwords, OTPs or full bank credentials.</li>
            </ul>
            <a href={`mailto:${company.email}`} className="request-checklist__mail">
              <Icon name="mail" size={17} /> {company.email}
            </a>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Need a form or a clear next step?"
        description="Tell us what you are trying to complete. We will help you identify the current requirement and the official channel."
      />
    </>
  );
}
