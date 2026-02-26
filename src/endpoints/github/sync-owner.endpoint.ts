import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";

export interface SyncOwnerParams {
  owner: string;
}

export interface SyncOwnerQuery {}

export interface SyncOwnerBody {}

export interface SyncOwnerResponse {
  owner: Owner;
}

const SyncOwnerParamsSchema = z.object({
  owner: z.string().min(1),
}) satisfies z.ZodType<SyncOwnerParams>;

const SyncOwnerQuerySchema = z.object({}) satisfies z.ZodType<SyncOwnerQuery>;

const SyncOwnerBodySchema = z.object({}) satisfies z.ZodType<SyncOwnerBody>;

const SyncOwnerResponseSchema = z.object({
  owner: OwnerSchema,
}) satisfies z.ZodType<SyncOwnerResponse>;

export const syncOwnerEndpoint = {
  method: "POST",
  path: "/github/owners/:owner/sync",
  pathParams: SyncOwnerParamsSchema,
  query: SyncOwnerQuerySchema,
  body: SyncOwnerBodySchema,
  responses: { 201: SyncOwnerResponseSchema, 400: ProblemDetailsSchema },
  summary: "Sync a GitHub owner by login",
} as const satisfies PostEndpointDefinition;
