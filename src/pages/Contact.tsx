import { ContactForm } from "../components/ContactForm";
import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { PageHero } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { company, offices } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

export default function Contact() {
  usePageMeta(
    "Contact Investrow Financial Services | Dhanbad, Jharkhand",
    "Contact Investrow Financial Services for mutual funds, insurance, tax and retirement planning. Phone, email, head office and branch details in Dhanbad, Jharkhand.",
  );

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s start with a <em>conversation.</em>
          </>
        }
        description={
          <>
            <p>
              Get in touch with us for more information. If you need help or have
              a question, we&apos;re here for you.
            </p>
            <p>
              Tell us what you are planning, what you already have in place and
              what is unclear. You do not need to have everything figured out
              before you call.
            </p>
          </>
        }
        breadcrumbs={[{ label: "Contact" }]}
      >
        <div className="contact-quick">
          <a href="tel:+919102050555">
            <Icon name="phone" size={18} />
            <span><small>Call support</small>{company.phones[0]}</span>
          </a>
          <a href={`mailto:${company.email}`}>
            <Icon name="mail" size={18} />
            <span><small>Email</small>{company.email}</span>
          </a>
        </div>
      </PageHero>

      <section className="section contact-main">
        <div className="container contact-grid">
          <Reveal className="contact-details">
            <p className="eyebrow">
              <span aria-hidden="true" />
              Reach us
            </p>
            <TextReveal as="h2" mode="words">
              Two numbers. Two offices. One <em>team.</em>
            </TextReveal>
            <p className="contact-details__intro">
              Call, email or use the form. We will respond through the channel you
              choose. Please do not send passwords, OTPs, PAN or full account
              numbers in the first message.
            </p>

            <div className="contact-block">
              <h3>Phone</h3>
              {company.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`} className="contact-line">
                  <Icon name="phone" size={17} />
                  {phone}
                </a>
              ))}
            </div>

            <div className="contact-block">
              <h3>Email</h3>
              <a href={`mailto:${company.email}`} className="contact-line">
                <Icon name="mail" size={17} />
                {company.email}
              </a>
            </div>

            <div className="contact-block">
              <h3>Offices</h3>
              {offices.map((office) => (
                <div className="office" key={office.label}>
                  <span className="office__label">
                    <Icon name="mapPin" size={15} /> {office.label}
                  </span>
                  <address>{office.address}</address>
                </div>
              ))}
            </div>

            <div className="contact-block contact-block--note">
              <Icon name="info" size={17} />
              <p>
                Addresses and phone numbers are reproduced from Investrow&apos;s
                public contact page and should be confirmed as current before
                visiting or sending documents.
              </p>
            </div>
          </Reveal>

          <Reveal className="contact-form-wrap" delay={100}>
            <div className="contact-form-head">
              <p className="eyebrow">
                <span aria-hidden="true" />
                Send a request
              </p>
              <h2>What would you like to discuss?</h2>
              <p>
                The form validates your details and then opens your email app.
                Nothing is submitted to a server.
              </p>
            </div>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="section contact-map">
        <div className="container">
          <div className="contact-map__head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Find us
              </p>
              <h2>
                Dhanbad, <em>Jharkhand.</em>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p>
                The embedded map identifies Investrow Financial Services Pvt Ltd
                and resolves to the Dhanbad area. Confirm which office you need
                before travelling.
              </p>
              <a
                className="text-link"
                href="https://www.google.com/maps/search/?api=1&query=Investrow+Financial+Services+Pvt+Ltd+Dhanbad"
                target="_blank"
                rel="noreferrer"
              >
                <span>Open in Google Maps</span>
                <Icon name="arrowUpRight" size={16} />
              </a>
            </Reveal>
          </div>
          <Reveal className="map-frame" variant="fade-in">
            <iframe
              title="Map showing Investrow Financial Services in Dhanbad, Jharkhand"
              src={company.mapUrl}
              width="1200"
              height="460"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
