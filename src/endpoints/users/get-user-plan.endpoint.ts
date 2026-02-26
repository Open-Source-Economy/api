import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type CompanyId, CompanyIdSchema } from "src/types/uuid";
import { type PlanProductType, planProductTypeSchema } from "src/models/shared/product-type.type";
import { type PlanPriceType, planPriceTypeSchema } from "src/models/shared/price-type.type";

export interface GetUserPlanParams {}

/**
 * @param companyId If provided, the funds will from the company's account. Otherwise, the funds will be taken from the auth user's account.
 */
export interface GetUserPlanQuery {
  companyId?: CompanyId;
}

export interface GetUserPlanResponse {
  productType: PlanProductType | null;
  priceType: PlanPriceType | null;
}

const GetUserPlanParamsSchema = z.object({}) satisfies z.ZodType<GetUserPlanParams>;

const GetUserPlanQuerySchema = z.object({
  companyId: CompanyIdSchema.optional(),
}) satisfies z.ZodType<GetUserPlanQuery>;

const GetUserPlanResponseSchema = z.object({
  productType: planProductTypeSchema.nullable(),
  priceType: planPriceTypeSchema.nullable(),
}) satisfies z.ZodType<GetUserPlanResponse>;

export const getUserPlanEndpoint = {
  method: "GET",
  path: "/user/plan",
  pathParams: GetUserPlanParamsSchema,
  query: GetUserPlanQuerySchema,
  responses: { 200: GetUserPlanResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get the plan for the authenticated user or company",
} as const satisfies GetEndpointDefinition;
