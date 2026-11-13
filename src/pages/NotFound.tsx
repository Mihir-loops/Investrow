import { Link } from "react-router-dom";
import { Icon } from "../components/Icon";
import { ButtonLink } from "../components/UI";
import { TextReveal } from "../components/TextReveal";
import { usePageMeta } from "../hooks/useReveal";

export default function NotFound() {
  usePageMeta(
    "Page not found | Investrow Financial Services",
    "The page you were looking for could not be found. Explore Investrow's services, goals, calculators or contact the team.",
  );

  return (
    <section className="not-found">
      <div className="container not-found__inner">
        <p className="eyebrow">
          <span aria-hidden="true" />
          404 · Page not found
        </p>
        <span className="not-found__code" aria-hidden="true">404</span>
        <TextReveal as="h1" mode="words">
          This page is not part of the <em>plan.</em>
        </TextReveal>
        <p>
          The address may have changed, or the link may be incomplete. Start
          again from the homepage or use one of the routes below.
        </p>
        <div className="not-found__actions">
          <ButtonLink to="/">Back to home</ButtonLink>
          <ButtonLink to="/contact" variant="secondary">
            Contact the team
          </ButtonLink>
        </div>
        <nav className="not-found__links" aria-label="Helpful links">
          <Link to="/services"><Icon name="arrowRight" size={15} /> Services</Link>
          <Link to="/goals"><Icon name="arrowRight" size={15} /> Goals</Link>
          <Link to="/calculators"><Icon name="arrowRight" size={15} /> Calculators</Link>
          <Link to="/resources"><Icon name="arrowRight" size={15} /> Resources</Link>
        </nav>
      </div>
    </section>
  );
}
