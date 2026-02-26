import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type ServiceType, serviceTypeSchema } from "src/models/shared/service-type.type";

// ============================================
// GET /projects/owners/:owner/services
// ============================================

export interface GetProjectServicesParams {
  owner: string;
  repo?: string;
}

export interface GetProjectServicesQuery {}

export interface GetProjectServicesResponse {
  services: ServiceType[];
  comingSoonServices: ServiceType[];
}

const GetProjectServicesParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1).optional(),
}) satisfies z.ZodType<GetProjectServicesParams>;

const GetProjectServicesQuerySchema = z.object({}) satisfies z.ZodType<GetProjectServicesQuery>;

const GetProjectServicesResponseSchema = z.object({
  services: z.array(serviceTypeSchema),
  comingSoonServices: z.array(serviceTypeSchema),
}) satisfies z.ZodType<GetProjectServicesResponse>;

export const getProjectServicesEndpoint = {
  method: "GET",
  path: "/projects/owners/:owner/services",
  pathParams: GetProjectServicesParamsSchema,
  query: GetProjectServicesQuerySchema,
  responses: { 200: GetProjectServicesResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get available and coming soon services for a project",
} as const satisfies GetEndpointDefinition;
