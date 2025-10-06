import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { OnboardingForm } from "./OnboardingForm";

const setPayload = vi.fn();
const navigate = vi.fn();

vi.mock("../context/ConsentContext", () => ({
  useConsent: () => ({
    record: {
      accountEmail: "client@example.com",
      acceptedStatements: [],
      acceptedAt: new Date("2025-01-01T00:00:00Z"),
      ipHash: "hash",
      version: "2025-03"
    },
    recordConsent: vi.fn(),
    revokeConsent: vi.fn()
  })
}));

vi.mock("../context/IntakeContext", () => ({
  useIntake: () => ({
    payload: null,
    setPayload,
    clear: vi.fn()
  })
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigate
}));

describe("OnboardingForm", () => {
  it("requires required approvals before progressing", async () => {
    const user = userEvent.setup();
    render(<OnboardingForm />);

    await user.type(screen.getByLabelText(/Company/i), "Acme Brands");
    await user.type(screen.getByLabelText(/Contact name/i), "Ada Analyst");
    await user.type(screen.getByLabelText(/^Email/i), "ada@goodwit.example");
    await user.type(screen.getByLabelText(/Timezone/i), "America/New_York");
    await user.selectOptions(screen.getByLabelText(/Monthly spend range/i), "10to50k");

    await user.type(screen.getByLabelText(/Seller ID/i), "SELLER1234");
    await user.type(screen.getByLabelText(/Amazon Ads profile ID/i), "12345");
    await user.selectOptions(screen.getByLabelText(/^Region/i), "US");
    await user.click(screen.getByLabelText(/Brand Registry administrator confirmed/i));
    await user.click(screen.getByLabelText(/Access invitation to security/i));

    await user.clear(screen.getByLabelText(/Target ACOS/i));
    await user.type(screen.getByLabelText(/Target ACOS/i), "25");
    await user.clear(screen.getByLabelText(/TACOS guard/i));
    await user.type(screen.getByLabelText(/TACOS guard/i), "30");
    await user.clear(screen.getByLabelText(/CVR target/i));
    await user.type(screen.getByLabelText(/CVR target/i), "15");
    await user.clear(screen.getByLabelText(/Average unit price/i));
    await user.type(screen.getByLabelText(/Average unit price/i), "29.99");
    await user.selectOptions(screen.getByLabelText(/Primary focus/i), "ROI");

    await user.type(screen.getByLabelText(/^Brand$/i), "Acme");
    await user.type(screen.getByLabelText(/ASIN/i), "B00TEST123");

    await user.type(screen.getByLabelText(/Logo URL/i), "https://cdn.example.com/logo.png");
    await user.type(screen.getByLabelText(/Image URLs/i), "https://cdn.example.com/img1.png");
    await user.type(screen.getByLabelText(/A\+ Content/i), "https://cdn.example.com/aplus.pdf");

    await user.type(screen.getByLabelText(/Data deletion contact email/i), "privacy@goodwit.example");
    await user.clear(screen.getByLabelText(/Policy version/i));
    await user.type(screen.getByLabelText(/Policy version/i), "2025-03");

    await user.click(screen.getByRole("button", { name: /Review submission/i }));

    expect(setPayload).not.toHaveBeenCalled();
    expect(navigate).not.toHaveBeenCalled();

    await user.click(screen.getByLabelText(/Privacy policy accepted/i));
    await user.click(screen.getByLabelText(/Terms of service accepted/i));

    await user.click(screen.getByRole("button", { name: /Review submission/i }));

    expect(setPayload).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith({ to: "/intake/review" });
  });
});
