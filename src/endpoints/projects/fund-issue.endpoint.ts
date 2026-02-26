import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type CompanyId, CompanyIdSchema } from "src/types/uuid";

// ============================================
// POST /projects/repos/:owner/:repo/issues/:number/funding
// ============================================

export interface FundIssueParams {
  owner: string;
  repo: string;
  number: number;
}

export interface FundIssueQuery {}

/**
 * @param companyId If provided, the funds will be taken from the company's account. Otherwise, the funds will be taken from the auth user's account.
 * @param creditAmount The amount to be funded
 */
export interface FundIssueBody {
  companyId?: CompanyId;
  creditAmount: number;
}

export interface FundIssueResponse {}

const FundIssueParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
  number: z.number().int().positive(),
}) satisfies z.ZodType<FundIssueParams>;

const FundIssueQuerySchema = z.object({}) satisfies z.ZodType<FundIssueQuery>;

const FundIssueBodySchema = z.object({
  companyId: CompanyIdSchema.optional(),
  creditAmount: z.number(),
}) satisfies z.ZodType<FundIssueBody>;

const FundIssueResponseSchema = z.object({}) satisfies z.ZodType<FundIssueResponse>;

export const fundIssueEndpoint = {
  method: "POST",
  path: "/projects/repos/:owner/:repo/issues/:number/funding",
  pathParams: FundIssueParamsSchema,
  query: FundIssueQuerySchema,
  body: FundIssueBodySchema,
  responses: {
    201: FundIssueResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Fund an issue with credits",
} as const satisfies PostEndpointDefinition;
