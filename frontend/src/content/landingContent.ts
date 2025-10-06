import { PortalLandingContent } from "../../../shared/portalLandingSchemas";

export const landingContent = PortalLandingContent.parse({
  header: {
    logoText: "Goodwit PPC Portal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Security", href: "/security" },
      { label: "Login", href: "/login" }
    ]
  },
  welcome: {
    title: "Amazon Advertising Intake Portal",
    summary:
      "This portal collects the access, consent, and operational context we need to begin managing your Amazon PPC program with confidence.",
    nextSteps: [
      "Review how we secure and use your data.",
      "Grant legal consent to store and process onboarding information.",
      "Complete the intake form with current performance goals."
    ]
  },
  security: [
    {
      title: "Encrypted Storage",
      detail: "All submissions are stored in AES-256 encrypted volumes inside an isolated VPC."
    },
    {
      title: "Transport Security",
      detail: "TLS 1.3 enforced for every client connection with automatic certificate rotation."
    },
    {
      title: "Access Control",
      detail: "Role-based access with hardware security keys required for administrators."
    },
    {
      title: "Audit Logging",
      detail: "Immutable append-only audit logs retained for 18 months and reviewed quarterly."
    }
  ],
  dataUse: {
    collected: [
      "Amazon Ads profile identifiers",
      "Brand and product level KPIs",
      "Creative asset URLs and access contacts"
    ],
    purposes: [
      "Provisioning analyst and tooling access",
      "Configuring Amazon Ads entities and budgets",
      "Generating AI-assisted audit recommendations"
    ],
    retention: "Operational data is retained for 24 months or until an offboarding request is processed.",
    deletion: "Deletion requests are processed within 10 business days through the data protection contact you provide."
  },
  accessRequirements: [
    "Amazon Ads profile ID with Sponsored Products/Brands enabled",
    "Seller Central merchant token (Seller ID)",
    "Brand Registry administrator access for each brand submitted"
  ],
  compliance: {
    privacyPolicy: { label: "Privacy Policy", href: "/legal/privacy" },
    terms: { label: "Terms of Service", href: "/legal/terms" },
    dpa: { label: "Data Processing Addendum", href: "/legal/privacy#dpa" },
    subprocessors: { label: "Subprocessor List", href: "/security#subprocessors" }
  },
  consentGate: {
    statements: [
      "I am authorized to provide the requested Amazon Ads access details.",
      "I consent to the processing and encrypted storage of the submitted onboarding data.",
      "I acknowledge responsibility to notify Goodwit PPC of data deletion requests."
    ],
    proceedCta: "Start onboarding"
  },
  support: {
    email: "security@goodwitppc.example",
    hours: "Support available Monday–Friday, 09:00–18:00 ET"
  },
  footer: {
    notice: "Goodwit PPC Ltd • SOC 2 Type II in progress • Last updated March 2025"
  }
});
