import type { ReactNode } from "react";
import { PageHero } from "../components/UI";
import { usePageMeta } from "../hooks/useReveal";

type Section = { title: string; body: string[]; list?: string[] };

function LegalContent({
  eyebrow,
  title,
  intro,
  notice,
  sections,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  notice: string;
  sections: Section[];
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={<p>{intro}</p>}
        breadcrumbs={[{ label: eyebrow }]}
      >
        <div className="legal-notice">
          <strong>Review before launch</strong>
          <p>{notice}</p>
        </div>
      </PageHero>
      <section className="section legal-section">
        <div className="container legal-layout">
          <aside className="legal-nav" aria-label="On this page">
            <span>On this page</span>
            <ol>
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a href={`#legal-${index + 1}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </aside>
          <div className="legal-copy">
            {sections.map((section, index) => (
              <section key={section.title} id={`legal-${index + 1}`}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function PrivacyPolicy() {
  usePageMeta(
    "Privacy Policy | Investrow Financial Services",
    "How this Investrow website rebuild handles information, including the email-based contact form, maps and the absence of server-side form storage.",
  );

  return (
    <LegalContent
      eyebrow="Privacy policy"
      title={
        <>
          Your information, handled with <em>care.</em>
        </>
      }
      intro="This policy describes the limited data behaviour of this demonstration rebuild. It is not a substitute for a policy reviewed against the company's actual systems, vendors and legal obligations."
      notice="This is a demonstration website, not the live Investrow production system. Before publication, replace this text with a policy reviewed by the company's legal and compliance advisers, covering hosting logs, analytics, CRM, email, retention, consent and data-subject rights."
      sections={[
        {
          title: "Information you choose to provide",
          body: [
            "The contact form on this site does not send data to a server and does not store submissions. When you press “Compose email”, the site creates a mailto link and asks your device to open its email application. The message is sent only if you choose to send it.",
            "The information you type into the form — name, email, phone, subject and message — stays in your browser until you send it through your email provider. Investrow receives it only as an email.",
          ],
        },
        {
          title: "Sensitive information",
          body: [
            "Please do not send passwords, one-time passwords (OTPs), full bank credentials, PAN, Aadhaar or account numbers through the website form or ordinary email. If a formal process requires a document, confirm the official destination and secure method first.",
          ],
        },
        {
          title: "Automated data and cookies",
          body: [
            "This build does not include analytics, advertising pixels, marketing cookies or a CRM integration. Fonts are bundled with the site rather than loaded from a third-party font service.",
            "If the site is deployed by a hosting provider, that provider may process standard server logs such as IP address, browser type, requested page and timestamp for security and reliability. The production deployment should disclose this explicitly.",
          ],
        },
        {
          title: "Third-party services",
          body: [
            "The contact page optionally loads a Google Maps embed. When it loads, Google may receive information such as your IP address and device details under its own privacy terms. If you prefer not to load the map, use the “Open in Google Maps” link instead.",
          ],
        },
        {
          title: "How information is used",
          body: [
            "If you choose to send an email, the information is used to understand and respond to your enquiry, arrange a conversation and keep an appropriate record of the communication. This rebuild does not sell personal information or use it for advertising.",
          ],
        },
        {
          title: "Retention and security",
          body: [
            "Email correspondence may be retained for as long as needed to respond and meet applicable record-keeping obligations. No method of transmission over the internet is completely secure; ordinary email is not appropriate for highly sensitive information.",
          ],
        },
        {
          title: "Your choices and questions",
          body: [
            "You can choose not to use the form and contact the team by phone instead. For questions about this demonstration or a request relating to information you have sent by email, contact the team using the details below.",
          ],
          list: [
            "Email: info@investrow.in",
            "Phone: +91 9102050555 / +91 9102070777",
            "Head office: Jealgora No. 7, PO Jealgora, Sindri Road, Dhanbad, Jharkhand — 828110",
          ],
        },
      ]}
    />
  );
}

export function Terms() {
  usePageMeta(
    "Terms & Conditions | Investrow Financial Services",
    "Terms for using this Investrow website rebuild, including the educational nature of calculators, the absence of investment advice and third-party links.",
  );

  return (
    <LegalContent
      eyebrow="Terms & conditions"
      title={
        <>
          Clear terms for a <em>clear</em> website.
        </>
      }
      intro="These terms describe how this demonstration website may be used. They are a starting point for legal review, not a substitute for the company's final terms."
      notice="This rebuild is not the live Investrow service and these terms have not been legally reviewed. Before launch, align them with the company's actual products, registrations, disclaimers, grievance process and applicable law."
      sections={[
        {
          title: "About this website",
          body: [
            "This website is a demonstration reconstruction built from a research pack containing publicly available information about Investrow Financial Services Pvt. Ltd. It is intended to show a possible information architecture, design and interaction model.",
            "Nothing on this site creates a client, advisory, brokerage, distribution or fiduciary relationship. A relationship would arise only through a separate, authorised process with the relevant entity.",
          ],
        },
        {
          title: "Educational information, not advice",
          body: [
            "The content explains financial concepts and service categories in general terms. It does not consider your income, liabilities, existing portfolio, tax position, risk tolerance or specific goals, and it is not a personal recommendation.",
            "Tax references are general or historical and may be out of date. Obtain current advice from a qualified chartered accountant, tax professional or lawyer before acting.",
          ],
        },
        {
          title: "Calculators and projections",
          body: [
            "All calculator results are illustrations produced from the inputs you enter and the assumptions shown. They are not forecasts, quotations, guarantees or offers. Investment returns can be negative, and actual outcomes will differ.",
            "The calculators do not include tax, fund expenses, exit loads, advisory fees, insurance premiums or changes in contributions unless explicitly stated.",
          ],
        },
        {
          title: "Regulatory and product information",
          body: [
            "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Investrow is identified in the source material as an AMFI-registered mutual fund distributor (ARN-194720), with CIN U67190JH2021PTC016813 and BSE member code 55533.",
            "These identifiers, the scope of permissions and all product availability must be independently verified and kept current. This rebuild does not imply brokerage, execution, advisory, tax or legal authorisation beyond what is confirmed by the company and its regulators.",
          ],
        },
        {
          title: "Third-party links and content",
          body: [
            "Links to external websites, maps and official resources are provided for convenience. Their content, availability and privacy practices are controlled by their operators, not by this website. Review the relevant terms before using them.",
          ],
        },
        {
          title: "Intellectual property and brand assets",
          body: [
            "Company names, logos, photographs, certificates and service illustrations remain the property of their respective owners. They are used here on the basis of the supplied research pack; publication requires authorisation from the rights holder. No licence is granted by this demonstration.",
          ],
        },
        {
          title: "Limitation and changes",
          body: [
            "To the extent permitted by applicable law, this demonstration is provided without warranties of accuracy, completeness or fitness for a particular purpose. The content and these terms may change without notice. If any provision is found unenforceable, the remaining provisions continue to apply.",
          ],
        },
        {
          title: "Contact",
          body: [
            "Questions about this website or the underlying information can be sent to info@investrow.in or raised by phone on +91 9102050555.",
          ],
        },
      ]}
    />
  );
}
