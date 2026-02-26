import { z } from "zod";
import { type StripeCustomerId, StripeCustomerIdSchema } from "src/types/uuid";
import { type Currency, currencySchema } from "src/models/shared/currency.type";

export interface StripeCustomer {
  stripeId: StripeCustomerId;
  currency?: Currency;
  email?: string;
  name?: string;
}

export const StripeCustomerSchema = z.object({
  stripeId: StripeCustomerIdSchema,
  currency: currencySchema.optional(),
  email: z.string().optional(),
  name: z.string().optional(),
}) satisfies z.ZodType<StripeCustomer>;
