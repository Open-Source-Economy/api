import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// GET /onboarding/projects/potential
// ============================================

export interface GetPotentialProjectItemsParams {}

export interface GetPotentialProjectItemsQuery {}

export interface GetPotentialProjectItemsResponse {}

const GetPotentialProjectItemsParamsSchema = z.object({}) satisfies z.ZodType<GetPotentialProjectItemsParams>;

const GetPotentialProjectItemsQuerySchema = z.object({}) satisfies z.ZodType<GetPotentialProjectItemsQuery>;

const GetPotentialProjectItemsResponseSchema = z.object({}) satisfies z.ZodType<GetPotentialProjectItemsResponse>;

export const getPotentialProjectItemsEndpoint = {
  method: "GET",
  path: "/onboarding/projects/potential",
  pathParams: GetPotentialProjectItemsParamsSchema,
  query: GetPotentialProjectItemsQuerySchema,
  responses: {
    200: GetPotentialProjectItemsResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Get potential project items for the developer to select during onboarding",
} as const satisfies GetEndpointDefinition;
