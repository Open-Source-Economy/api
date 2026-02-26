import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type FinancialIssue, FinancialIssueSchema } from "src/models/funding/financial-issue.model";

// ============================================
// GET /projects/repos/:owner/:repo/issues/:number
// ============================================

export interface GetIssueParams {
  owner: string;
  repo: string;
  number: number;
}

export interface GetIssueQuery {}

export interface GetIssueResponse {
  issue: FinancialIssue;
}

const GetIssueParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  number: z.number().int().positive(),
}) satisfies z.ZodType<GetIssueParams>;

const GetIssueQuerySchema = z.object({}) satisfies z.ZodType<GetIssueQuery>;

const GetIssueResponseSchema = z.object({
  issue: FinancialIssueSchema,
}) satisfies z.ZodType<GetIssueResponse>;

export const getIssueEndpoint = {
  method: "GET",
  path: "/projects/repos/:owner/:repo/issues/:number",
  pathParams: GetIssueParamsSchema,
  query: GetIssueQuerySchema,
  responses: { 200: GetIssueResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get a specific issue with financial details",
} as const satisfies GetEndpointDefinition;
