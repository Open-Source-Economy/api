import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type Repository, RepositorySchema } from "src/models/github/repository.model";

export interface GetRepositoryParams {
  owner: string;
  repo: string;
}

export interface GetRepositoryQuery {}

export interface GetRepositoryResponse {
  owner: Owner;
  repository: Repository;
}

const GetRepositoryParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1),
}) satisfies z.ZodType<GetRepositoryParams>;

const GetRepositoryQuerySchema = z.object({}) satisfies z.ZodType<GetRepositoryQuery>;

const GetRepositoryResponseSchema = z.object({
  owner: OwnerSchema,
  repository: RepositorySchema,
}) satisfies z.ZodType<GetRepositoryResponse>;

export const getRepositoryEndpoint = {
  method: "GET",
  path: "/github/repos/:owner/:repo",
  pathParams: GetRepositoryParamsSchema,
  query: GetRepositoryQuerySchema,
  responses: { 200: GetRepositoryResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get a GitHub repository by owner and repo name",
} as const satisfies GetEndpointDefinition;
