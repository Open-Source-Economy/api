import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type StripePrice, StripePriceSchema } from "src/models/stripe/stripe-price.model";

// ============================================
// GET /plans
// ============================================

export interface GetPlansParams {}

export interface GetPlansQuery {}

export interface GetPlansResponse {
  plans: Record<string, Record<string, Record<string, StripePrice>>>;
}

const GetPlansParamsSchema = z.object({}) satisfies z.ZodType<GetPlansParams>;

const GetPlansQuerySchema = z.object({}) satisfies z.ZodType<GetPlansQuery>;

const GetPlansResponseSchema = z.object({
  plans: z.record(z.string(), z.record(z.string(), z.record(z.string(), StripePriceSchema))),
}) satisfies z.ZodType<GetPlansResponse>;

export const getPlansEndpoint = {
  method: "GET",
  path: "/plans",
  pathParams: GetPlansParamsSchema,
  query: GetPlansQuerySchema,
  responses: {
    200: GetPlansResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Get available plans with pricing",
} as const satisfies GetEndpointDefinition;
