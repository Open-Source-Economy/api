import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { DeveloperProjectItemIdSchema, ServiceIdSchema } from "src/types/uuid";
import { responseTimeTypeSchema } from "src/models/shared/response-time-type.type";
import { type DeveloperService, DeveloperServiceSchema } from "src/models/onboarding/developer-service.model";
import type { UpsertDeveloperServiceBody } from "./upsert-developer-service.endpoint";

// ============================================
// POST /onboarding/services/batch
// ============================================

export interface UpsertDeveloperServicesParams {}

export interface UpsertDeveloperServicesQuery {}

export interface UpsertDeveloperServicesBody {
  upsertDeveloperServices: UpsertDeveloperServiceBody[];
}

export interface UpsertDeveloperServicesResponse {
  developerServices: DeveloperService[];
}

const UpsertDeveloperServicesParamsSchema = z.object({}) satisfies z.ZodType<UpsertDeveloperServicesParams>;

const UpsertDeveloperServicesQuerySchema = z.object({}) satisfies z.ZodType<UpsertDeveloperServicesQuery>;

const UpsertDeveloperServiceItemSchema = z.object({
  developerProjectItemIds: z.array(DeveloperProjectItemIdSchema).min(1),
  serviceId: ServiceIdSchema,
  hourlyRate: z.number().min(0).optional(),
  responseTimeHours: responseTimeTypeSchema.nullable().optional(),
  comment: z.string().max(1000).nullable().optional(),
}) satisfies z.ZodType<UpsertDeveloperServiceBody>;

const UpsertDeveloperServicesBodySchema = z.object({
  upsertDeveloperServices: z.array(UpsertDeveloperServiceItemSchema).min(1),
}) satisfies z.ZodType<UpsertDeveloperServicesBody>;

const UpsertDeveloperServicesResponseSchema = z.object({
  developerServices: z.array(DeveloperServiceSchema),
}) satisfies z.ZodType<UpsertDeveloperServicesResponse>;

export const upsertDeveloperServicesEndpoint = {
  method: "POST",
  path: "/onboarding/services/batch",
  pathParams: UpsertDeveloperServicesParamsSchema,
  query: UpsertDeveloperServicesQuerySchema,
  body: UpsertDeveloperServicesBodySchema,
  responses: {
    201: UpsertDeveloperServicesResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Batch upsert multiple developer service offerings during onboarding",
} as const satisfies PostEndpointDefinition;
