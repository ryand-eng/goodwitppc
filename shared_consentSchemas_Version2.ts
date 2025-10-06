import { z } from "zod";

export const ConsentRecord = z.object({
  accountEmail: z.string().email(),
  acceptedStatements: z.array(z.string()).min(1),
  acceptedAt: z.coerce.date(),
  ipHash: z.string().min(10),
  version: z.string().min(1) // policy version
});

export type TConsentRecord = z.infer<typeof ConsentRecord>;