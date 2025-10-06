import { Link } from "@tanstack/react-router";
import { HeaderNav } from "../components/HeaderNav";
import { ConsentGate } from "../components/ConsentGate";
import { landingContent } from "../content/landingContent";
import "../components/HeaderNav.css";
import "./LandingPage.css";

export const LandingPage = () => {
  const { welcome, security, dataUse, accessRequirements, compliance, support, footer } =
    landingContent;

  return (
    <div className="landing">
      <HeaderNav />
      <main className="landing__main">
        <section className="landing__hero">
          <div className="landing__hero-text">
            <p className="landing__tag">Secure Onboarding</p>
            <h1>{welcome.title}</h1>
            <p className="landing__summary">{welcome.summary}</p>
            <ol>
              {welcome.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <ConsentGate />
        </section>

        <section className="landing__grid">
          <article>
            <h2>Security overview</h2>
            <ul>
              {security.map((item) => (
                <li key={item.title}>
                  <strong>{item.title}</strong>
                  <p>{item.detail}</p>
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Data use summary</h2>
            <div className="landing__pill">
              <h3>Data collected</h3>
              <ul>
                {dataUse.collected.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="landing__pill">
              <h3>How we use it</h3>
              <ul>
                {dataUse.purposes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p><strong>Retention:</strong> {dataUse.retention}</p>
            <p><strong>Deletion:</strong> {dataUse.deletion}</p>
          </article>

          <article>
            <h2>Access requirements</h2>
            <ul>
              {accessRequirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article>
            <h2>Compliance</h2>
            <ul>
              <li>
                <Link to={compliance.privacyPolicy.href}>{compliance.privacyPolicy.label}</Link>
              </li>
              <li>
                <Link to={compliance.terms.href}>{compliance.terms.label}</Link>
              </li>
              {compliance.dpa && (
                <li>
                  <Link to={compliance.dpa.href}>{compliance.dpa.label}</Link>
                </li>
              )}
              {compliance.subprocessors && (
                <li>
                  <Link to={compliance.subprocessors.href}>{compliance.subprocessors.label}</Link>
                </li>
              )}
            </ul>
          </article>
        </section>
      </main>

      <footer className="landing__footer">
        <div>
          <p>Support</p>
          <a href={`mailto:${support.email}`}>{support.email}</a>
          <p>{support.hours}</p>
        </div>
        <p>{footer.notice}</p>
      </footer>
    </div>
  );
};
