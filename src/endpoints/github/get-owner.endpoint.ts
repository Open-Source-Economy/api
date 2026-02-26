import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";

export interface GetOwnerParams {
  owner: string;
}

export interface GetOwnerQuery {}

export interface GetOwnerResponse {
  owner: Owner;
}

const GetOwnerParamsSchema = z.object({
  owner: z.string().min(1),
}) satisfies z.ZodType<GetOwnerParams>;

const GetOwnerQuerySchema = z.object({}) satisfies z.ZodType<GetOwnerQuery>;

const GetOwnerResponseSchema = z.object({
  owner: OwnerSchema,
}) satisfies z.ZodType<GetOwnerResponse>;

export const getOwnerEndpoint = {
  method: "GET",
  path: "/github/owners/:owner",
  pathParams: GetOwnerParamsSchema,
  query: GetOwnerQuerySchema,
  responses: { 200: GetOwnerResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get a GitHub owner by login",
} as const satisfies GetEndpointDefinition;
