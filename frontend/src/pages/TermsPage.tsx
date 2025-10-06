import { HeaderNav } from "../components/HeaderNav";
import "../components/HeaderNav.css";
import "./PolicyPages.css";

export const TermsPage = () => (
  <div className="policy">
    <HeaderNav />
    <main className="policy__main">
      <h1>Terms of service</h1>
      <p>
        Access to the intake portal is provided solely for onboarding evaluation. Submitted data will be used to scope and deliver
        professional Amazon PPC services. By proceeding you warrant that you have authority to bind the organization you represent
        and that all provided information is accurate to the best of your knowledge.
      </p>
      <p>
        Service-level commitments, fees, and performance guarantees are detailed in the master services agreement executed after
        onboarding acceptance.
      </p>
    </main>
  </div>
);
