import { z } from "zod";

export const Contact = z.object({
  company: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  timezone: z.string().min(3),
  spendRange: z.enum(["lt_10k", "10to50k", "gt_50k"])
});

export const Access = z.object({
  sellerId: z.string().min(8),
  adsProfileId: z.string().min(5),
  region: z.enum([
    "US","CA","UK","DE","FR","IT","ES","MX","JP","AU","AE","SG","PH"
  ]),
  brandRegistry: z.boolean(),
  accessGranted: z.literal(true)
});

export const KPIs = z.object({
  targetAcos: z.number().min(0),
  tacosGuard: z.number().min(0),
  cvrTarget: z.number().min(0),
  avgPrice: z.number().min(1),
  primaryFocus: z.enum(["ACOS","TACOS","ROI","RANK"]),
  notes: z.string().optional()
});

export const ProductItem = z.object({
  brand: z.string().min(1),
  asin: z.string().length(10),
  sku: z.string().optional(),
  title: z.string().optional(),
  category: z.string().optional(),
  isHero: z.boolean().optional()
});

export const Assets = z.object({
  logoUrl: z.string().url(),
  imageUrls: z.array(z.string().url()).max(20).optional(),
  aPlusPdfUrl: z.string().url().optional(),
  videoUrl: z.string().url().optional(),
  driveFolderUrl: z.string().url().optional(),
  ownershipConfirm: z.literal(true).optional()
});

export const Legal = z.object({
  acceptsPrivacy: z.literal(true),
  acceptsTerms: z.literal(true),
  acceptsDPA: z.boolean().default(false),
  dataDeletionContact: z.string().email(),
  policyVersion: z.string().min(1)
});

export const OnboardingPayload = z.object({
  contact: Contact,
  access: Access,
  kpis: KPIs,
  products: z.array(ProductItem).min(1),
  assets: Assets,
  legal: Legal
});

export type TOnboardingPayload = z.infer<typeof OnboardingPayload>;