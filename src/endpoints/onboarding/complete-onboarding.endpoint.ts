import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /onboarding/complete
// ============================================

export interface CompleteOnboardingParams {}

export interface CompleteOnboardingQuery {}

export interface CompleteOnboardingBody {}

export interface CompleteOnboardingResponse {}

const CompleteOnboardingParamsSchema = z.object({}) satisfies z.ZodType<CompleteOnboardingParams>;

const CompleteOnboardingQuerySchema = z.object({}) satisfies z.ZodType<CompleteOnboardingQuery>;

const CompleteOnboardingBodySchema = z.object({}) satisfies z.ZodType<CompleteOnboardingBody>;

const CompleteOnboardingResponseSchema = z.object({}) satisfies z.ZodType<CompleteOnboardingResponse>;

export const completeOnboardingEndpoint = {
  method: "POST",
  path: "/onboarding/complete",
  pathParams: CompleteOnboardingParamsSchema,
  query: CompleteOnboardingQuerySchema,
  body: CompleteOnboardingBodySchema,
  responses: {
    201: CompleteOnboardingResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Mark the developer onboarding as completed",
} as const satisfies PostEndpointDefinition;
