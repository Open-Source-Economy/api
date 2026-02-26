import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type StripePriceId, StripePriceIdSchema } from "src/types/uuid";

// ============================================
// POST /stripe/checkout
// ============================================

export enum CheckoutMode {
  PAYMENT = "payment",
  SUBSCRIPTION = "subscription",
  SETUP = "setup",
}

export const checkoutModeSchema = z.nativeEnum(CheckoutMode);

export interface PriceItem {
  priceId: StripePriceId;
  quantity: number;
}

export const PriceItemSchema = z.object({
  priceId: StripePriceIdSchema,
  quantity: z.number().int().min(1),
}) satisfies z.ZodType<PriceItem>;

export interface CheckoutParams {}

export interface CheckoutQuery {}

export interface CheckoutBody {
  mode: CheckoutMode;
  priceItems: PriceItem[];
  countryCode: string | null;
  successUrl: string;
  cancelUrl: string;
  metadata?: Record<string, string>;
}

export interface CheckoutResponse {
  redirectUrl: string;
}

const CheckoutParamsSchema = z.object({}) satisfies z.ZodType<CheckoutParams>;

const CheckoutQuerySchema = z.object({}) satisfies z.ZodType<CheckoutQuery>;

const CheckoutBodySchema = z.object({
  mode: checkoutModeSchema,
  priceItems: z.array(PriceItemSchema).min(1),
  countryCode: z.string().nullable(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
  metadata: z.record(z.string(), z.string()).optional(),
}) satisfies z.ZodType<CheckoutBody>;

const CheckoutResponseSchema = z.object({
  redirectUrl: z.string(),
}) satisfies z.ZodType<CheckoutResponse>;

export const checkoutEndpoint = {
  method: "POST",
  path: "/stripe/checkout",
  pathParams: CheckoutParamsSchema,
  query: CheckoutQuerySchema,
  body: CheckoutBodySchema,
  responses: {
    201: CheckoutResponseSchema,
    400: ProblemDetailsSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Create a Stripe checkout session",
} as const satisfies PostEndpointDefinition;
