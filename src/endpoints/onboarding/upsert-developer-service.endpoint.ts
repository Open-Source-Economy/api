import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PutEndpointDefinition } from "src/types/endpoint.types";
import {
  type DeveloperProjectItemId,
  DeveloperProjectItemIdSchema,
  type ServiceId,
  ServiceIdSchema,
} from "src/types/uuid";
import { type ResponseTimeType, responseTimeTypeSchema } from "src/models/shared/response-time-type.type";
import { type DeveloperService, DeveloperServiceSchema } from "src/models/onboarding/developer-service.model";

// ============================================
// PUT /onboarding/services
// ============================================

export interface UpsertDeveloperServiceParams {}

export interface UpsertDeveloperServiceQuery {}

export interface UpsertDeveloperServiceBody {
  developerProjectItemIds: DeveloperProjectItemId[];
  serviceId: ServiceId;
  hourlyRate?: number;
  responseTimeHours?: ResponseTimeType | null;
  comment?: string | null;
}

export interface UpsertDeveloperServiceResponse {
  developerService: DeveloperService;
}

const UpsertDeveloperServiceParamsSchema = z.object({}) satisfies z.ZodType<UpsertDeveloperServiceParams>;

const UpsertDeveloperServiceQuerySchema = z.object({}) satisfies z.ZodType<UpsertDeveloperServiceQuery>;

const UpsertDeveloperServiceBodySchema = z.object({
  developerProjectItemIds: z.array(DeveloperProjectItemIdSchema).min(1),
  serviceId: ServiceIdSchema,
  hourlyRate: z.number().min(0).optional(),
  responseTimeHours: responseTimeTypeSchema.nullable().optional(),
  comment: z.string().max(1000).nullable().optional(),
}) satisfies z.ZodType<UpsertDeveloperServiceBody>;

const UpsertDeveloperServiceResponseSchema = z.object({
  developerService: DeveloperServiceSchema,
}) satisfies z.ZodType<UpsertDeveloperServiceResponse>;

export const upsertDeveloperServiceEndpoint = {
  method: "PUT",
  path: "/onboarding/services",
  pathParams: UpsertDeveloperServiceParamsSchema,
  query: UpsertDeveloperServiceQuerySchema,
  body: UpsertDeveloperServiceBodySchema,
  responses: {
    200: UpsertDeveloperServiceResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Upsert a single developer service offering during onboarding",
} as const satisfies PutEndpointDefinition;
