import { HeaderNav } from "../components/HeaderNav";
import "../components/HeaderNav.css";
import "./PolicyPages.css";

export const PrivacyPage = () => (
  <div className="policy">
    <HeaderNav />
    <main className="policy__main">
      <h1>Privacy policy</h1>
      <p>
        We collect only the data enumerated in the onboarding portal and process it for the explicit purpose of managing your Amazon PPC
        accounts. Data is encrypted at rest and in transit. You may submit deletion requests via the data protection contact listed in the
        onboarding form.
      </p>
      <section id="dpa">
        <h2>Data Processing Addendum</h2>
        <p>
          Our DPA aligns with GDPR Article 28 requirements. Execution is completed electronically and the current version is embedded
          in this portal for transparency.
        </p>
      </section>
    </main>
  </div>
);
