import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /projects/repos/:owner/:repo/issues/:number/funding/requests
// ============================================

export interface RequestIssueFundingParams {
  owner: string;
  repo: string;
  number: number;
}

export interface RequestIssueFundingQuery {}

export interface RequestIssueFundingBody {
  creditAmount: number | null;
}

export interface RequestIssueFundingResponse {}

const RequestIssueFundingParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  number: z.number().int().positive(),
}) satisfies z.ZodType<RequestIssueFundingParams>;

const RequestIssueFundingQuerySchema = z.object({}) satisfies z.ZodType<RequestIssueFundingQuery>;

const RequestIssueFundingBodySchema = z.object({
  creditAmount: z.number().nullable(),
}) satisfies z.ZodType<RequestIssueFundingBody>;

const RequestIssueFundingResponseSchema = z.object({}) satisfies z.ZodType<RequestIssueFundingResponse>;

export const requestIssueFundingEndpoint = {
  method: "POST",
  path: "/projects/repos/:owner/:repo/issues/:number/funding/requests",
  pathParams: RequestIssueFundingParamsSchema,
  query: RequestIssueFundingQuerySchema,
  body: RequestIssueFundingBodySchema,
  responses: {
    201: RequestIssueFundingResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Request funding for an issue",
} as const satisfies PostEndpointDefinition;
