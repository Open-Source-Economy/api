import { z } from "zod";
import {
  type StripeInvoiceLineId,
  StripeInvoiceLineIdSchema,
  type StripeInvoiceId,
  StripeInvoiceIdSchema,
  type StripeCustomerId,
  StripeCustomerIdSchema,
  type StripeProductId,
  StripeProductIdSchema,
  type StripePriceId,
  StripePriceIdSchema,
} from "src/types/uuid";

export interface StripeInvoiceLine {
  stripeId: StripeInvoiceLineId;
  invoiceId: StripeInvoiceId;
  customerId: StripeCustomerId;
  productId: StripeProductId;
  priceId: StripePriceId;
  quantity: number;
}

export const StripeInvoiceLineSchema = z.object({
  stripeId: StripeInvoiceLineIdSchema,
  invoiceId: StripeInvoiceIdSchema,
  customerId: StripeCustomerIdSchema,
  productId: StripeProductIdSchema,
  priceId: StripePriceIdSchema,
  quantity: z.number(),
}) satisfies z.ZodType<StripeInvoiceLine>;
