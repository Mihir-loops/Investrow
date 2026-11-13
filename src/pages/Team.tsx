import { Icon } from "../components/Icon";
import { Reveal } from "../components/Reveal";
import { SmartImage } from "../components/SmartImage";
import { ButtonLink, CTASection, PageHero, SectionHead } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { team } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

const workingPrinciples = [
  {
    icon: "users",
    title: "Understand the person",
    text: "Goals, family, income, worries and time horizon come before a product conversation.",
  },
  {
    icon: "shieldPlain",
    title: "Explain the downside",
    text: "Every option has a trade-off. We try to make the risk and the exit conditions as visible as the potential.",
  },
  {
    icon: "file",
    title: "Keep the paperwork clean",
    text: "KYC, disclosures, nominations and documentation are part of the service, not an afterthought.",
  },
  {
    icon: "repeat",
    title: "Stay for the review",
    text: "A plan needs revisiting when income, family, markets or goals change. The relationship continues after the first investment.",
  },
];

export default function Team() {
  usePageMeta(
    "Our Team | Investrow Financial Services",
    "Meet Surendra Prasad, Dipankar Moi and Birendra Kumar, the leadership team behind Investrow Financial Services in Dhanbad, Jharkhand.",
  );

  return (
    <>
      <PageHero
        eyebrow="Our team"
        title={
          <>
            Close enough to <em>listen.</em> Experienced enough to guide.
          </>
        }
        description={
          <>
            <p>
              Investrow&apos;s leadership team brings together client
              relationships, business development and compliance. The common
              thread is a belief that financial advice should be clear,
              practical and honest about what it cannot promise.
            </p>
            <p>
              Profiles below are adapted from the company&apos;s public team
              page.
            </p>
          </>
        }
        breadcrumbs={[{ label: "About", to: "/about" }, { label: "Team" }]}
      >
        <div className="hero-reg-card">
          <span className="hero-reg-card__label">The team</span>
          <dl>
            <div><dt>Leadership</dt><dd>3 profiles</dd></div>
            <div><dt>Base</dt><dd>Dhanbad, Jharkhand</dd></div>
            <div><dt>Focus</dt><dd>Long-term relationships</dd></div>
          </dl>
        </div>
      </PageHero>

      <section className="section team-section">
        <div className="container">
          <SectionHead
            eyebrow="Leadership"
            title={
              <>
                The people you will <em>actually meet.</em>
              </>
            }
            description="A compact team means the person in the first conversation is likely to remain involved in the relationship."
          />
          <div className="team-profiles">
            {team.map((member, index) => (
              <article
                className={`team-profile ${index % 2 === 1 ? "team-profile--reverse" : ""}`}
                key={member.name}
              >
                <Reveal
                  className="team-profile__media"
                  variant={index % 2 === 1 ? "slide-left" : "slide-right"}
                >
                  <div className="portrait-frame">
                    <SmartImage
                      src={member.image}
                      alt={`Portrait of ${member.name}, ${member.role}`}
                      width={420}
                      height={500}
                    />
                    <span className="portrait-frame__index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </Reveal>
                <Reveal className="team-profile__copy" delay={100}>
                  <span className="team-profile__role">{member.role}</span>
                  <h2>{member.name}</h2>
                  <p>{member.bio}</p>
                  <ul className="team-profile__focus">
                    {member.focus.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={14} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </article>
            ))}
          </div>
          <Reveal className="source-note source-note--bordered">
            <p>
              These biography summaries are adapted from Investrow&apos;s public
              team page and edited for length and clarity. They should be
              reviewed by each individual before publication.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section team-principles">
        <div className="container">
          <div className="team-principles__head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                How we work
              </p>
              <TextReveal as="h2" mode="words">
                The conversation is the <em>service.</em>
              </TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <p>
                A financial product is only one part of a plan. The work around
                it — understanding the need, documenting the choice and reviewing
                it over time — is where a relationship earns its place.
              </p>
            </Reveal>
          </div>
          <div className="team-principles__grid">
            {workingPrinciples.map((principle, index) => (
              <Reveal className="principle-card" delay={index * 70} key={principle.title}>
                <span className="principle-card__icon">
                  <Icon name={principle.icon} size={22} strokeWidth={1.6} />
                </span>
                <span className="principle-card__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="team-principles__cta">
            <p>Want to speak with someone directly?</p>
            <ButtonLink to="/contact">Book a conversation</ButtonLink>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="A good relationship starts with a straightforward conversation."
        description="Tell us what you are planning for. We will tell you what we can help with and what should be handled by another professional."
      />
    </>
  );
}
