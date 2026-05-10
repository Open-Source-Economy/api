import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /stripe/portal
// ============================================

export interface CreatePortalSessionParams {}

export interface CreatePortalSessionQuery {}

export interface CreatePortalSessionBody {
  returnUrl: string;
}

export interface CreatePortalSessionResponse {
  url: string;
}

const CreatePortalSessionParamsSchema = z.object({}) satisfies z.ZodType<CreatePortalSessionParams>;

const CreatePortalSessionQuerySchema = z.object({}) satisfies z.ZodType<CreatePortalSessionQuery>;

const CreatePortalSessionBodySchema = z.object({
  returnUrl: z.string().url(),
}) satisfies z.ZodType<CreatePortalSessionBody>;

const CreatePortalSessionResponseSchema = z.object({
  url: z.string(),
}) satisfies z.ZodType<CreatePortalSessionResponse>;

export const createPortalSessionEndpoint = {
  method: "POST",
  path: "/stripe/portal",
  pathParams: CreatePortalSessionParamsSchema,
  query: CreatePortalSessionQuerySchema,
  body: CreatePortalSessionBodySchema,
  responses: {
    201: CreatePortalSessionResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Create a Stripe billing portal session for the authenticated user",
} as const satisfies PostEndpointDefinition;
