import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /onboarding/services/custom
// ============================================

export interface CreateCustomServiceParams {}

export interface CreateCustomServiceQuery {}

export interface CreateCustomServiceBody {
  name: string;
  description: string;
  hasResponseTime?: boolean;
}

export interface CreateCustomServiceResponse {}

const CreateCustomServiceParamsSchema = z.object({}) satisfies z.ZodType<CreateCustomServiceParams>;

const CreateCustomServiceQuerySchema = z.object({}) satisfies z.ZodType<CreateCustomServiceQuery>;

const CreateCustomServiceBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  hasResponseTime: z.boolean().optional(),
}) satisfies z.ZodType<CreateCustomServiceBody>;

const CreateCustomServiceResponseSchema = z.object({}) satisfies z.ZodType<CreateCustomServiceResponse>;

export const createCustomServiceEndpoint = {
  method: "POST",
  path: "/onboarding/services/custom",
  pathParams: CreateCustomServiceParamsSchema,
  query: CreateCustomServiceQuerySchema,
  body: CreateCustomServiceBodySchema,
  responses: {
    201: CreateCustomServiceResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Create a custom service definition during onboarding",
} as const satisfies PostEndpointDefinition;
