import { Link } from "@tanstack/react-router";
import { HeaderNav } from "../components/HeaderNav";
import "../components/HeaderNav.css";
import "./IntakePages.css";
import "./SuccessPage.css";

export const IntakeSuccessPage = () => {
  return (
    <div className="intake">
      <HeaderNav />
      <main className="intake__main">
        <header>
          <p className="intake__eyebrow">Step 3 of 3</p>
          <h1>Submission received</h1>
          <p>Your onboarding package is encrypted and queued for analyst review. Expect a confirmation within one business day.</p>
        </header>
        <section className="intake__summary">
          <h2>Next steps</h2>
          <ul>
            <li>Check your email for the consent receipt and secure document upload link.</li>
            <li>Respond to any analyst follow-up within 24 hours to avoid onboarding delays.</li>
            <li>
              Review our <Link to="/security">security controls</Link> for a deeper audit trail.
            </li>
          </ul>
        </section>
        <div className="success__actions">
          <Link to="/" className="success__link secondary">
            Return home
          </Link>
          <Link to="/login" className="success__link">
            Go to login
          </Link>
        </div>
      </main>
    </div>
  );
};
