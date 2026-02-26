import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /admin/organizations/:projectItemId/sync-repositories
// ============================================

export interface SyncOrganizationRepositoriesParams {
  projectItemId: string;
}

export interface SyncOrganizationRepositoriesQuery {
  offset?: number;
  batchSize?: number;
  fetchDetails?: boolean;
}

export interface SyncOrganizationRepositoriesBody {}

export interface SyncOrganizationRepositoriesResponse {
  message: string;
  organizationLogin: string;
  offset: number;
  hasMore?: boolean;
  nextOffset?: number;
  totalRepositories?: number;
}

const SyncOrganizationRepositoriesParamsSchema = z.object({
  projectItemId: z.string().uuid(),
}) satisfies z.ZodType<SyncOrganizationRepositoriesParams>;

const SyncOrganizationRepositoriesQuerySchema = z.object({
  offset: z.coerce.number().int().min(0).optional(),
  batchSize: z.coerce.number().int().min(1).optional(),
  fetchDetails: z.coerce.boolean().optional(),
}) satisfies z.ZodType<SyncOrganizationRepositoriesQuery>;

const SyncOrganizationRepositoriesBodySchema = z.object({}) satisfies z.ZodType<SyncOrganizationRepositoriesBody>;

const SyncOrganizationRepositoriesResponseSchema = z.object({
  message: z.string(),
  organizationLogin: z.string(),
  offset: z.number(),
  hasMore: z.boolean().optional(),
  nextOffset: z.number().optional(),
  totalRepositories: z.number().optional(),
}) satisfies z.ZodType<SyncOrganizationRepositoriesResponse>;

export const syncOrganizationRepositoriesEndpoint = {
  method: "POST",
  path: "/admin/organizations/:projectItemId/sync-repositories",
  pathParams: SyncOrganizationRepositoriesParamsSchema,
  query: SyncOrganizationRepositoriesQuerySchema,
  body: SyncOrganizationRepositoriesBodySchema,
  responses: {
    201: SyncOrganizationRepositoriesResponseSchema,
    400: ProblemDetailsSchema,
    401: ProblemDetailsSchema,
    403: ProblemDetailsSchema,
    404: ProblemDetailsSchema,
  },
  summary: "Sync organization repositories (admin)",
} as const satisfies PostEndpointDefinition;
