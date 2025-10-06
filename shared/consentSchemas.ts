import { z } from "zod";

export const ConsentRecord = z.object({
  accountEmail: z.string().email(),
  acceptedStatements: z.array(z.string()),
  acceptedAt: z.coerce.date(),
  ipHash: z.string(),
  version: z.string()
});
export type TConsentRecord = z.infer<typeof ConsentRecord>;
