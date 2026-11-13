import { Link } from "react-router-dom";
import { company, navGroups } from "../data/site";
import { Icon } from "./Icon";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SmartImage } from "./SmartImage";
import { ButtonLink } from "./UI";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <Reveal className="footer-top">
          <div className="footer-top__copy">
            <p className="eyebrow eyebrow--lime"><span aria-hidden="true" />Investrow Financial Services</p>
            <h2>Good financial decisions begin with a clear conversation.</h2>
          </div>
          <div className="footer-top__aside">
            <p>
              Whether you are starting a first SIP, reviewing insurance or
              planning retirement, we will help you understand the options
              before you decide.
            </p>
            <ButtonLink to="/contact" variant="light">
              Start a conversation
            </ButtonLink>
          </div>
        </Reveal>

        <div className="footer-grid">
          <Reveal className="footer-brand">
            <Logo light />
            <p className="footer-brand__summary">
              An AMFI-registered mutual fund distribution company, started in
              2021 with the aim of helping people grow their money in a simple
              and disciplined way.
            </p>
            <div className="footer-brand__reg">
              <span>AMFI Registered</span>
              <strong>{company.arn}</strong>
            </div>
          </Reveal>

          <Reveal className="footer-col" delay={60}>
            <h3>Services</h3>
            <ul>
              {navGroups
                .find((group) => group.label === "Services")
                ?.children.slice(1, 7)
                .map((item) => (
                  <li key={item.href}>
                    <Link to={item.href}>{item.label}</Link>
                  </li>
                ))}
              <li>
                <Link to="/services">All services</Link>
              </li>
            </ul>
          </Reveal>

          <Reveal className="footer-col" delay={120}>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/team">Our team</Link></li>
              <li><Link to="/goals">Financial goals</Link></li>
              <li><Link to="/calculators">Calculators</Link></li>
              <li><Link to="/resources">Resources &amp; FAQs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </Reveal>

          <Reveal className="footer-col footer-col--contact" delay={180}>
            <h3>Talk to us</h3>
            <ul className="footer-contact">
              <li>
                <Icon name="phone" size={16} />
                <span>
                  <a href="tel:+919102050555">{company.phones[0]}</a>
                  <a href="tel:+919102070777">{company.phones[1]}</a>
                </span>
              </li>
              <li>
                <Icon name="mail" size={16} />
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
              <li>
                <Icon name="mapPin" size={16} />
                <address>
                  <strong>Head office</strong>
                  {company.headOffice}
                </address>
              </li>
            </ul>
          </Reveal>
        </div>

        <div className="footer-regulatory">
          <div className="footer-regulatory__item">
            <SmartImage
              src="/assets/footer/ftr-icon2.png"
              alt=""
              width={30}
              height={30}
            />
            <div>
              <span>AMFI Registered Mutual Fund Distributor</span>
              <strong>{company.arn}</strong>
            </div>
          </div>
          <div className="footer-regulatory__item">
            <SmartImage
              src="/assets/footer/ftr-icon3.png"
              alt=""
              width={30}
              height={30}
            />
            <div>
              <span>BSE Member Code</span>
              <strong>{company.bse}</strong>
            </div>
          </div>
          <div className="footer-regulatory__item">
            <SmartImage
              src="/assets/footer/ftr-icon4.png"
              alt=""
              width={30}
              height={30}
            />
            <div>
              <span>Corporate Identity Number</span>
              <strong>{company.cin}</strong>
            </div>
          </div>
        </div>

        <div className="footer-disclaimer">
          <p>
            <strong>Risk disclosure.</strong> {company.disclaimer}
          </p>
          <p className="footer-disclaimer__small">
            The calculators and illustrations on this website use assumed
            rates and are for education only. They are not forecasts, offers or
            guarantees. Tax references are historical or general and must be
            verified against current law with a qualified professional.
            Regulatory identifiers, company figures and security claims should
            be independently confirmed before publication.
          </p>
        </div>

        <div className="footer-bottom">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <div className="footer-bottom__links">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/terms-and-conditions">Terms &amp; conditions</Link>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </div>
      <img
        src="/assets/brand/footer-logo.png"
        alt=""
        aria-hidden="true"
        className="footer-watermark"
        loading="lazy"
        width={700}
        height={160}
      />
    </footer>
  );
}
