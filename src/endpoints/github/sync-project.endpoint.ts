import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type Repository, RepositorySchema } from "src/models/github/repository.model";

export interface SyncProjectParams {
  owner: string;
}

export interface SyncProjectQuery {}

export interface SyncProjectBody {}

export interface SyncProjectResponse {
  owner: Owner;
  repository: Repository | null;
}

const SyncProjectParamsSchema = z.object({
  owner: z.string().min(1),
}) satisfies z.ZodType<SyncProjectParams>;

const SyncProjectQuerySchema = z.object({}) satisfies z.ZodType<SyncProjectQuery>;

const SyncProjectBodySchema = z.object({}) satisfies z.ZodType<SyncProjectBody>;

const SyncProjectResponseSchema = z.object({
  owner: OwnerSchema,
  repository: RepositorySchema.nullable(),
}) satisfies z.ZodType<SyncProjectResponse>;

export const syncProjectEndpoint = {
  method: "POST",
  path: "/github/projects/:owner/sync",
  pathParams: SyncProjectParamsSchema,
  query: SyncProjectQuerySchema,
  body: SyncProjectBodySchema,
  responses: { 201: SyncProjectResponseSchema, 400: ProblemDetailsSchema },
  summary:
    "Sync a GitHub project by owner. Can also be used at /github/projects/:owner/:repo/sync to sync a specific repository",
} as const satisfies PostEndpointDefinition;
