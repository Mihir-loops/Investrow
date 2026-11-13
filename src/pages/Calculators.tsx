import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { SipPanel } from "../components/calculators/Panels";
import { ButtonLink, CTASection, PageHero, SectionHead } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { calculators } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";

export default function Calculators() {
  usePageMeta(
    "Financial Calculators | Investrow Financial Services",
    "Explore SIP, step-up SIP, retirement, goal setting, child education, EMI, PPF, EPF and asset allocation calculators with transparent assumptions.",
  );

  return (
    <>
      <PageHero
        eyebrow="Calculators"
        title={
          <>
            Better questions begin with a <em>number.</em>
          </>
        }
        description={
          <>
            <p>
              A calculator cannot predict a market, but it can make an assumption
              visible. Change the inputs, watch the relationship between time,
              contribution and return, and bring the questions to a conversation.
            </p>
            <p>
              Every tool uses a stated formula, INR formatting and a clear
              assumption. Nothing is stored or sent.
            </p>
          </>
        }
        breadcrumbs={[{ label: "Calculators" }]}
      >
        <div className="hero-reg-card">
          <span className="hero-reg-card__label">The toolkit</span>
          <dl>
            <div><dt>Calculators</dt><dd>9</dd></div>
            <div><dt>Results</dt><dd>Instant</dd></div>
            <div><dt>Data stored</dt><dd>None</dd></div>
          </dl>
        </div>
      </PageHero>

      <section className="section featured-calculator">
        <div className="container">
          <SectionHead
            eyebrow="Start here"
            title={
              <>
                The SIP <em>projection.</em>
              </>
            }
            description="The most direct way to see how a monthly habit, a time horizon and an assumed return interact. The default 15% follows Investrow's source page — it is an assumption, not a forecast."
          />
          <Reveal className="calculator-wrap">
            <SipPanel />
          </Reveal>
        </div>
      </section>

      <section className="section calculator-index">
        <div className="container">
          <SectionHead
            eyebrow="All calculators"
            title={
              <>
                Choose the question you need to <em>answer.</em>
              </>
            }
            description="Each calculator focuses on one decision. Read the assumptions below the results before using a number in a real plan."
          />
          <RevealGroup className="calculator-grid">
            {calculators.map((calculator) => (
              <SpotlightCard
                as="a"
                href={`/calculators/${calculator.slug}`}
                className="calculator-card"
                key={calculator.slug}
              >
                <div className="calculator-card__top">
                  <span className="calculator-card__icon">
                    <Icon name={calculator.icon} size={23} strokeWidth={1.5} />
                  </span>
                  <Icon name="arrowUpRight" size={18} className="calculator-card__arrow" />
                </div>
                <h3>{calculator.title}</h3>
                <p>{calculator.teaser}</p>
                <span className="calculator-card__meta">Open calculator</span>
              </SpotlightCard>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section calc-method">
        <div className="container">
          <div className="calc-method__grid">
            <Reveal className="calc-method__lead">
              <p className="eyebrow">
                <span aria-hidden="true" />
                How to read the results
              </p>
              <TextReveal as="h2" mode="words">
                A projection is a <em>conversation starter,</em> not a promise.
              </TextReveal>
              <p>
                All outputs are illustrations based on the values you enter. They
                do not include tax, fund expenses, exit loads, advice fees or the
                effect of changing contributions.
              </p>
              <ButtonLink to="/resources" variant="secondary">
                Read the FAQs
              </ButtonLink>
            </Reveal>
            <div className="calc-method__items">
              <Reveal className="calc-method__item" delay={0}>
                <span>01</span>
                <h3>Start with a realistic assumption</h3>
                <p>
                  A higher return assumption flatters every projection. Use a
                  range, not a single best case, and test a lower number.
                </p>
              </Reveal>
              <Reveal className="calc-method__item" delay={80}>
                <span>02</span>
                <h3>Look at the amount invested</h3>
                <p>
                  The gap between contributions and future value is the
                  illustrative growth. It is the part that depends most on time
                  and return.
                </p>
              </Reveal>
              <Reveal className="calc-method__item" delay={160}>
                <span>03</span>
                <h3>Test the plan against real life</h3>
                <p>
                  Can you sustain the contribution through a difficult month?
                  Have you funded your emergency reserve and protection first?
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Bring the number to a conversation."
        description="We can help you interpret the output, test a more conservative assumption and decide whether the plan is suitable for your situation."
      />
    </>
  );
}
