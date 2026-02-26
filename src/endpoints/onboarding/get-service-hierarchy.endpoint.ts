import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type ServiceHierarchyItem, ServiceHierarchyItemSchema } from "src/models/project/service-hierarchy-item.model";

// ============================================
// GET /onboarding/services/hierarchy
// ============================================

export interface GetServiceHierarchyParams {}

export interface GetServiceHierarchyQuery {}

export interface GetServiceHierarchyResponse {
  items: ServiceHierarchyItem[];
}

const GetServiceHierarchyParamsSchema = z.object({}) satisfies z.ZodType<GetServiceHierarchyParams>;

const GetServiceHierarchyQuerySchema = z.object({}) satisfies z.ZodType<GetServiceHierarchyQuery>;

const GetServiceHierarchyResponseSchema = z.object({
  items: z.array(ServiceHierarchyItemSchema),
}) satisfies z.ZodType<GetServiceHierarchyResponse>;

export const getServiceHierarchyEndpoint = {
  method: "GET",
  path: "/onboarding/services/hierarchy",
  pathParams: GetServiceHierarchyParamsSchema,
  query: GetServiceHierarchyQuerySchema,
  responses: {
    200: GetServiceHierarchyResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Get the service hierarchy with categories and their services",
} as const satisfies GetEndpointDefinition;
