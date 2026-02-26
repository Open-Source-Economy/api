import { z } from "zod";
import { type SponsorId, SponsorIdSchema, type StripeCustomerId, StripeCustomerIdSchema } from "src/types/uuid";
import { type OwnerId, ownerIdSchema } from "src/models/github/owner-id.type";

export interface Sponsor {
  id: SponsorId;
  stripeCustomerId: StripeCustomerId;
  ownerId: OwnerId;
  isPublic: boolean;
}

export const SponsorSchema = z.object({
  id: SponsorIdSchema,
  stripeCustomerId: StripeCustomerIdSchema,
  ownerId: ownerIdSchema,
  isPublic: z.boolean(),
}) satisfies z.ZodType<Sponsor>;
