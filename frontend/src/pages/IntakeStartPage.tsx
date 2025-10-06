import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HeaderNav } from "../components/HeaderNav";
import { OnboardingForm } from "../components/OnboardingForm";
import { useConsent } from "../context/ConsentContext";
import "../components/HeaderNav.css";
import "./IntakePages.css";

export const IntakeStartPage = () => {
  const { record } = useConsent();
  const navigate = useNavigate();

  useEffect(() => {
    if (!record) {
      navigate({ to: "/" });
    }
  }, [record, navigate]);

  return (
    <div className="intake">
      <HeaderNav />
      <main className="intake__main">
        <header>
          <p className="intake__eyebrow">Step 1 of 3</p>
          <h1>Submit onboarding details</h1>
          <p>Provide Amazon Ads identifiers, goals, and legal approvals to initiate access provisioning.</p>
        </header>
        <OnboardingForm />
      </main>
    </div>
  );
};
