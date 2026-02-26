import { z } from "zod";
import {
  type StripeInvoiceId,
  StripeInvoiceIdSchema,
  type StripeCustomerId,
  StripeCustomerIdSchema,
} from "src/types/uuid";
import { type Currency, currencySchema } from "src/models/shared/currency.type";

export interface StripeInvoice {
  stripeId: StripeInvoiceId;
  customerId: StripeCustomerId;
  paid: boolean;
  accountCountry: string;
  currency: Currency;
  total: number;
  totalExclTax: number;
  subtotal: number;
  subtotalExclTax: number;
  hostedInvoiceUrl: string;
  invoicePdf: string;
  number: string | null;
}

export const StripeInvoiceSchema = z.object({
  stripeId: StripeInvoiceIdSchema,
  customerId: StripeCustomerIdSchema,
  paid: z.boolean(),
  accountCountry: z.string(),
  currency: currencySchema,
  total: z.number(),
  totalExclTax: z.number(),
  subtotal: z.number(),
  subtotalExclTax: z.number(),
  hostedInvoiceUrl: z.string(),
  invoicePdf: z.string(),
  number: z.string().nullable(),
}) satisfies z.ZodType<StripeInvoice>;
