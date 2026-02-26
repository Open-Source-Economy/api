import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PutEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// PUT /onboarding/profile/contact-infos
// ============================================

export interface UpdateContactInfosParams {}

export interface UpdateContactInfosQuery {}

export interface UpdateContactInfosBody {
  name: string;
  email: string;
}

export interface UpdateContactInfosResponse {}

const UpdateContactInfosParamsSchema = z.object({}) satisfies z.ZodType<UpdateContactInfosParams>;

const UpdateContactInfosQuerySchema = z.object({}) satisfies z.ZodType<UpdateContactInfosQuery>;

const UpdateContactInfosBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
}) satisfies z.ZodType<UpdateContactInfosBody>;

const UpdateContactInfosResponseSchema = z.object({}) satisfies z.ZodType<UpdateContactInfosResponse>;

export const updateContactInfosEndpoint = {
  method: "PUT",
  path: "/onboarding/profile/contact-infos",
  pathParams: UpdateContactInfosParamsSchema,
  query: UpdateContactInfosQuerySchema,
  body: UpdateContactInfosBodySchema,
  responses: {
    200: UpdateContactInfosResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Update developer contact information during onboarding",
} as const satisfies PutEndpointDefinition;
