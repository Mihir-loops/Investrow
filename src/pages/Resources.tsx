import { Link } from "react-router-dom";
import { FAQAccordion } from "../components/FAQAccordion";
import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { ButtonLink, CTASection, PageHero, SectionHead, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { faqs, investorServices } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

export default function Resources() {
  usePageMeta(
    "Resources & FAQs | Investrow Financial Services",
    "Find clear answers to common mutual fund and planning questions, investor service guidance and honest information about forms and downloads.",
  );

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title={
          <>
            Clear answers, before the <em>fine print.</em>
          </>
        }
        description={
          <>
            <p>
              A collection of straight answers to the questions that come up
              most often, plus guidance on investor servicing and the documents
              you may need.
            </p>
            <p>
              If your question is specific to your account or policy, contact
              the team rather than relying on a general answer here.
            </p>
          </>
        }
        breadcrumbs={[{ label: "Resources" }]}
      >
        <nav className="resource-jump" aria-label="Resource sections">
          <a href="#faqs">FAQs <Icon name="arrowDown" size={14} /></a>
          <a href="#investor-services">Investor services <Icon name="arrowDown" size={14} /></a>
          <a href="#downloads">Forms &amp; downloads <Icon name="arrowDown" size={14} /></a>
        </nav>
      </PageHero>

      <section className="section resources-faq" id="faqs">
        <div className="container resources-faq__grid">
          <Reveal className="resources-faq__lead">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Frequently asked questions
            </p>
            <TextReveal as="h2" mode="words">
              The questions we hear <em>most.</em>
            </TextReveal>
            <p>
              Selected questions from Investrow&apos;s public FAQ and service
              pages. The original FAQ inventory was not fully captured, so this
              is not presented as a complete reproduction.
            </p>
            <div className="faq-contact-card">
              <Icon name="message" size={20} />
              <div>
                <strong>Still unsure?</strong>
                <p>Ask the team directly. We will give you a straight answer.</p>
                <TextLink to="/contact">Contact us</TextLink>
              </div>
            </div>
          </Reveal>
          <Reveal className="resources-faq__accordion" delay={100}>
            <FAQAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <section className="section investor-preview" id="investor-services">
        <div className="container">
          <SectionHead
            eyebrow="Investor services"
            title={
              <>
                Support after the <em>investment.</em>
              </>
            }
            description="Servicing is part of the relationship. Here are the areas where the team can guide you — and the places where the official channel should always be used."
            action={<TextLink to="/resources/investor-services">All investor services</TextLink>}
          />
          <RevealGroup className="service-info-grid">
            {investorServices.slice(0, 3).map((item, index) => (
              <article className="info-card" key={item.title}>
                <span className="info-card__icon">
                  <Icon name={item.icon} size={22} strokeWidth={1.5} />
                </span>
                <span className="info-card__index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section downloads-preview" id="downloads">
        <div className="container downloads-preview__grid">
          <Reveal className="downloads-preview__copy">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Forms &amp; downloads
            </p>
            <TextReveal as="h2" mode="words">
              No invented forms. Just a <em>real</em> next step.
            </TextReveal>
            <p>
              The original site&apos;s form files and download destinations were
              not captured or verified for this rebuild, so no official
              documents are hosted here. Request the current form from the team
              and use the official AMC, insurer or intermediary channel for
              formal transactions.
            </p>
            <ButtonLink to="/resources/forms-downloads" variant="secondary">
              Request a form
            </ButtonLink>
          </Reveal>
          <Reveal className="downloads-preview__panel" delay={100}>
            <div className="download-note">
              <Icon name="file" size={22} />
              <h3>Before you download anything</h3>
              <p>
                Confirm that the form is current, that the destination is
                official and that you understand what you are signing. Never
                share passwords, OTPs or full account credentials over email.
              </p>
              <Link to="/resources/forms-downloads">
                See the request guide <Icon name="arrowRight" size={15} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="A question is a good place to start."
        description="If something here needs a more specific answer, tell us what you are looking at. We will point you to the right channel or the right person."
      />
    </>
  );
}
