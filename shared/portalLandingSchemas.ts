import { z } from "zod";

export const PolicyLink = z.object({ label: z.string(), href: z.string() });

export const SecurityItem = z.object({
  title: z.string(),
  detail: z.string()
});

export const PortalLandingContent = z.object({
  header: z.object({
    logoText: z.string(),
    links: z.array(PolicyLink)
  }),
  welcome: z.object({
    title: z.string(),
    summary: z.string(),
    nextSteps: z.array(z.string())
  }),
  security: z.array(SecurityItem),
  dataUse: z.object({
    collected: z.array(z.string()),
    purposes: z.array(z.string()),
    retention: z.string(),
    deletion: z.string()
  }),
  accessRequirements: z.array(z.string()),
  compliance: z.object({
    privacyPolicy: PolicyLink,
    terms: PolicyLink,
    dpa: PolicyLink.optional(),
    subprocessors: PolicyLink.optional()
  }),
  consentGate: z.object({
    statements: z.array(z.string()),
    proceedCta: z.string()
  }),
  support: z.object({
    email: z.string().email(),
    hours: z.string()
  }),
  footer: z.object({
    notice: z.string()
  })
});
export type TPortalLandingContent = z.infer<typeof PortalLandingContent>;
