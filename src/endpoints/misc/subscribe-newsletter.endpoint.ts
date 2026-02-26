import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /newsletter
// ============================================

export interface SubscribeNewsletterParams {}

export interface SubscribeNewsletterQuery {}

export interface SubscribeNewsletterBody {
  email: string;
}

export interface SubscribeNewsletterResponse {}

const SubscribeNewsletterParamsSchema = z.object({}) satisfies z.ZodType<SubscribeNewsletterParams>;

const SubscribeNewsletterQuerySchema = z.object({}) satisfies z.ZodType<SubscribeNewsletterQuery>;

const SubscribeNewsletterBodySchema = z.object({
  email: z.string().email(),
}) satisfies z.ZodType<SubscribeNewsletterBody>;

const SubscribeNewsletterResponseSchema = z.object({}) satisfies z.ZodType<SubscribeNewsletterResponse>;

export const subscribeNewsletterEndpoint = {
  method: "POST",
  path: "/newsletter",
  pathParams: SubscribeNewsletterParamsSchema,
  query: SubscribeNewsletterQuerySchema,
  body: SubscribeNewsletterBodySchema,
  responses: {
    201: SubscribeNewsletterResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Subscribe to newsletter",
} as const satisfies PostEndpointDefinition;
