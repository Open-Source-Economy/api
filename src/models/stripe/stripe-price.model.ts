import { z } from "zod";
import { type StripePriceId, StripePriceIdSchema, type StripeProductId, StripeProductIdSchema } from "src/types/uuid";
import { type Currency, currencySchema } from "src/models/shared/currency.type";
import { type PriceType, priceTypeSchema } from "src/models/shared/price-type.type";

export interface StripePrice {
  stripeId: StripePriceId;
  productId: StripeProductId;
  unitAmount: number;
  currency: Currency;
  active: boolean;
  type: PriceType;
}

export const StripePriceSchema = z.object({
  stripeId: StripePriceIdSchema,
  productId: StripeProductIdSchema,
  unitAmount: z.number(),
  currency: currencySchema,
  active: z.boolean(),
  type: priceTypeSchema,
}) satisfies z.ZodType<StripePrice>;
