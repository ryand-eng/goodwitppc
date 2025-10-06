import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HeaderNav } from "../components/HeaderNav";
import { useIntake } from "../context/IntakeContext";
import { useConsent } from "../context/ConsentContext";
import "../components/HeaderNav.css";
import "./IntakePages.css";

export const IntakeReviewPage = () => {
  const { payload, clear } = useIntake();
  const { record } = useConsent();
  const navigate = useNavigate();

  useEffect(() => {
    if (!record) {
      navigate({ to: "/" });
    } else if (!payload) {
      navigate({ to: "/intake/start" });
    }
  }, [record, payload, navigate]);

  if (!payload) {
    return null;
  }

  const confirmSubmission = () => {
    // placeholder for API call
    console.info("Submitting onboarding payload", payload);
    clear();
    navigate({ to: "/intake/success" });
  };

  return (
    <div className="intake">
      <HeaderNav />
      <main className="intake__main">
        <header>
          <p className="intake__eyebrow">Step 2 of 3</p>
          <h1>Review and confirm</h1>
          <p>Verify the collected consent and onboarding data before we encrypt and transmit it to the intake queue.</p>
        </header>

        <section className="intake__summary">
          <h2>Contact</h2>
          <p>
            <strong>{payload.contact.contactName}</strong> · {payload.contact.company}
          </p>
          <p>{payload.contact.email}</p>
          <p>Timezone: {payload.contact.timezone}</p>
          <p>Spend range: {payload.contact.spendRange}</p>
        </section>

        <section className="intake__summary">
          <h2>Access</h2>
          <p>Seller ID: {payload.access.sellerId}</p>
          <p>Ads profile ID: {payload.access.adsProfileId}</p>
          <p>Region: {payload.access.region}</p>
          <p>Brand Registry: {payload.access.brandRegistry ? "Confirmed" : "Pending"}</p>
        </section>

        <section className="intake__summary">
          <h2>KPIs</h2>
          <p>Target ACOS: {payload.kpis.targetAcos}%</p>
          <p>TACOS guard: {payload.kpis.tacosGuard}%</p>
          <p>CVR target: {payload.kpis.cvrTarget}%</p>
          <p>Average price: ${payload.kpis.avgPrice}</p>
          <p>Primary focus: {payload.kpis.primaryFocus}</p>
        </section>

        <section className="intake__summary">
          <h2>Products</h2>
          <ul>
            {payload.products.map((product) => (
              <li key={product.asin}>
                {product.brand} · {product.asin}
                {product.sku ? ` · SKU ${product.sku}` : ""}
                {product.isHero ? " · Hero" : ""}
              </li>
            ))}
          </ul>
        </section>

        <section className="intake__summary">
          <h2>Assets</h2>
          <p>Logo: {payload.assets.logoUrl}</p>
          {payload.assets.imageUrls && payload.assets.imageUrls.length > 0 && (
            <div>
              <p>Images</p>
              <ul>
                {payload.assets.imageUrls.map((url) => (
                  <li key={url}>{url}</li>
                ))}
              </ul>
            </div>
          )}
          {payload.assets.aPlusPdfUrl && <p>A+ Content: {payload.assets.aPlusPdfUrl}</p>}
        </section>

        <section className="intake__summary">
          <h2>Legal</h2>
          <p>Privacy: {payload.legal.acceptsPrivacy ? "Accepted" : "Missing"}</p>
          <p>Terms: {payload.legal.acceptsTerms ? "Accepted" : "Missing"}</p>
          <p>DPA: {payload.legal.acceptsDPA ? "Accepted" : "Not required"}</p>
          <p>Deletion contact: {payload.legal.dataDeletionContact}</p>
          <p>Policy version: {payload.legal.policyVersion}</p>
        </section>

        <div className="intake__actions">
          <button className="secondary" type="button" onClick={() => navigate({ to: "/intake/start" })}>
            Back to edit
          </button>
          <button type="button" onClick={confirmSubmission}>
            Submit securely
          </button>
        </div>
      </main>
    </div>
  );
};
