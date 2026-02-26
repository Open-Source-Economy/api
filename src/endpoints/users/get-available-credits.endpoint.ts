import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type CompanyId, CompanyIdSchema } from "src/types/uuid";

export interface GetAvailableCreditsParams {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetAvailableCreditsQuery {
  companyId?: CompanyId;
}

export interface GetAvailableCreditsResponse {
  creditAmount: number;
}

const GetAvailableCreditsParamsSchema = z.object({}) satisfies z.ZodType<GetAvailableCreditsParams>;

const GetAvailableCreditsQuerySchema = z.object({
  companyId: CompanyIdSchema.optional(),
}) satisfies z.ZodType<GetAvailableCreditsQuery>;

const GetAvailableCreditsResponseSchema = z.object({
  creditAmount: z.number().int(),
}) satisfies z.ZodType<GetAvailableCreditsResponse>;

export const getAvailableCreditsEndpoint = {
  method: "GET",
  path: "/user/available-credit",
  pathParams: GetAvailableCreditsParamsSchema,
  query: GetAvailableCreditsQuerySchema,
  responses: { 200: GetAvailableCreditsResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get available credits for the authenticated user or company",
} as const satisfies GetEndpointDefinition;
