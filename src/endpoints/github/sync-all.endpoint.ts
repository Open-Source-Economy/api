import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

export interface SyncAllParams {}

export interface SyncAllQuery {}

export interface SyncAllBody {}

export interface SyncAllResponse {
  message: string;
}

const SyncAllParamsSchema = z.object({}) satisfies z.ZodType<SyncAllParams>;

const SyncAllQuerySchema = z.object({}) satisfies z.ZodType<SyncAllQuery>;

const SyncAllBodySchema = z.object({}) satisfies z.ZodType<SyncAllBody>;

const SyncAllResponseSchema = z.object({
  message: z.string(),
}) satisfies z.ZodType<SyncAllResponse>;

export const syncAllEndpoint = {
  method: "POST",
  path: "/github/sync/all",
  pathParams: SyncAllParamsSchema,
  query: SyncAllQuerySchema,
  body: SyncAllBodySchema,
  responses: { 201: SyncAllResponseSchema, 400: ProblemDetailsSchema },
  summary: "Sync all GitHub owners and repositories",
} as const satisfies PostEndpointDefinition;
