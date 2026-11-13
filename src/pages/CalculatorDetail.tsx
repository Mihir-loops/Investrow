import { useParams } from "react-router-dom";
import { Icon } from "../components/Icon";
import { Reveal, RevealGroup } from "../components/Reveal";
import { calculatorPanels } from "../components/calculators/Panels";
import { CTASection, PageHero, TextLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { calculators } from "../data/site";
import { usePageMeta } from "../hooks/useReveal";
import NotFound from "./NotFound";

export default function CalculatorDetail() {
  const { slug } = useParams();
  const calculator = calculators.find((item) => item.slug === slug);
  const Panel = slug ? calculatorPanels[slug] : undefined;

  usePageMeta(
    calculator?.metaTitle ?? "Calculator not found | Investrow",
    calculator?.metaDescription ?? "The requested calculator could not be found.",
  );

  if (!calculator || !Panel) return <NotFound />;

  const related = calculators
    .filter((item) => item.slug !== calculator.slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow="Calculator"
        title={calculator.title}
        description={
          <>
            <p>{calculator.description}</p>
            <p>
              Results update as you change the inputs. Assumptions and
              limitations are shown alongside the output.
            </p>
          </>
        }
        breadcrumbs={[
          { label: "Calculators", to: "/calculators" },
          { label: calculator.shortTitle },
        ]}
      >
        <div className="calc-hero-meta">
          <span><Icon name="circleCheck" size={15} /> Instant results</span>
          <span><Icon name="file" size={15} /> Formula disclosed</span>
          <span><Icon name="lock" size={15} /> Nothing stored</span>
        </div>
      </PageHero>

      <section className="section calculator-page">
        <div className="container">
          <Reveal className="calculator-wrap">
            <Panel />
          </Reveal>
          <Reveal className="calculator-caveat">
            <Icon name="info" size={18} />
            <p>
              <strong>Important.</strong> This calculator is an educational tool.
              It does not account for tax, product charges, exit loads, advice
              fees or changes in your contribution. Returns are not guaranteed
              and the projection is not a recommendation to invest. Read all
              scheme-related documents and consider your own circumstances before
              acting.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section calculator-related">
        <div className="container">
          <div className="related-head">
            <Reveal>
              <p className="eyebrow">
                <span aria-hidden="true" />
                Keep exploring
              </p>
              <TextReveal as="h2" mode="words">Related calculators</TextReveal>
            </Reveal>
            <Reveal delay={80}>
              <TextLink to="/calculators">All calculators</TextLink>
            </Reveal>
          </div>
          <RevealGroup className="calculator-grid calculator-grid--three">
            {related.map((item) => (
              <SpotlightCard
                as="a"
                href={`/calculators/${item.slug}`}
                className="calculator-card"
                key={item.slug}
              >
                <div className="calculator-card__top">
                  <span className="calculator-card__icon">
                    <Icon name={item.icon} size={23} strokeWidth={1.5} />
                  </span>
                  <Icon name="arrowUpRight" size={18} className="calculator-card__arrow" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
                <span className="calculator-card__meta">Open calculator</span>
              </SpotlightCard>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTASection
        title="Want a human read on the plan?"
        description="Calculators show arithmetic. A conversation can test the assumptions, suitability and practical next steps with your full situation in view."
      />
    </>
  );
}
