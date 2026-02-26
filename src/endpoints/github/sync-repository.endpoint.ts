import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type Repository, RepositorySchema } from "src/models/github/repository.model";

export interface SyncRepositoryParams {
  owner: string;
  repo: string;
}

export interface SyncRepositoryQuery {}

export interface SyncRepositoryBody {}

export interface SyncRepositoryResponse {
  owner: Owner;
  repository: Repository;
}

const SyncRepositoryParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
}) satisfies z.ZodType<SyncRepositoryParams>;

const SyncRepositoryQuerySchema = z.object({}) satisfies z.ZodType<SyncRepositoryQuery>;

const SyncRepositoryBodySchema = z.object({}) satisfies z.ZodType<SyncRepositoryBody>;

const SyncRepositoryResponseSchema = z.object({
  owner: OwnerSchema,
  repository: RepositorySchema,
}) satisfies z.ZodType<SyncRepositoryResponse>;

export const syncRepositoryEndpoint = {
  method: "POST",
  path: "/github/repos/:owner/:repo/sync",
  pathParams: SyncRepositoryParamsSchema,
  query: SyncRepositoryQuerySchema,
  body: SyncRepositoryBodySchema,
  responses: { 201: SyncRepositoryResponseSchema, 400: ProblemDetailsSchema },
  summary: "Sync a GitHub repository by owner and repo name",
} as const satisfies PostEndpointDefinition;
