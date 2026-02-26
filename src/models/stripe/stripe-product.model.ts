import { z } from "zod";
import { type StripeProductId, StripeProductIdSchema } from "src/types/uuid";
import { type ProductType, productTypeSchema } from "src/models/shared/product-type.type";

export interface StripeProduct {
  stripeId: StripeProductId;
  projectId: string | null;
  type: ProductType;
}

export const StripeProductSchema = z.object({
  stripeId: StripeProductIdSchema,
  projectId: z.string().nullable(),
  type: productTypeSchema,
}) satisfies z.ZodType<StripeProduct>;
