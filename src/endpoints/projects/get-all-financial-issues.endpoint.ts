import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type FinancialIssue, FinancialIssueSchema } from "src/models/funding/financial-issue.model";

// ============================================
// GET /projects/all-financial-issues
// ============================================

export interface GetAllFinancialIssuesParams {}

export interface GetAllFinancialIssuesQuery {}

export interface GetAllFinancialIssuesResponse {
  issues: FinancialIssue[];
}

const GetAllFinancialIssuesParamsSchema = z.object({}) satisfies z.ZodType<GetAllFinancialIssuesParams>;

const GetAllFinancialIssuesQuerySchema = z.object({}) satisfies z.ZodType<GetAllFinancialIssuesQuery>;

const GetAllFinancialIssuesResponseSchema = z.object({
  issues: z.array(FinancialIssueSchema),
}) satisfies z.ZodType<GetAllFinancialIssuesResponse>;

export const getAllFinancialIssuesEndpoint = {
  method: "GET",
  path: "/projects/all-financial-issues",
  pathParams: GetAllFinancialIssuesParamsSchema,
  query: GetAllFinancialIssuesQuerySchema,
  responses: { 200: GetAllFinancialIssuesResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get all financial issues across all projects",
} as const satisfies GetEndpointDefinition;
