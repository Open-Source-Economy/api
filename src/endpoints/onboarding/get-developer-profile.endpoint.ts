import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import {
  type FullDeveloperProfile,
  FullDeveloperProfileSchema,
} from "src/models/onboarding/full-developer-profile.model";

// ============================================
// GET /onboarding/profile
// ============================================

export interface GetDeveloperProfileParams {
  githubUsername?: string;
}

export interface GetDeveloperProfileQuery {}

export interface GetDeveloperProfileResponse {
  profile: FullDeveloperProfile | null;
}

const GetDeveloperProfileParamsSchema = z.object({
  githubUsername: z.string().optional(),
}) satisfies z.ZodType<GetDeveloperProfileParams>;

const GetDeveloperProfileQuerySchema = z.object({}) satisfies z.ZodType<GetDeveloperProfileQuery>;

const GetDeveloperProfileResponseSchema = z.object({
  profile: FullDeveloperProfileSchema.nullable(),
}) satisfies z.ZodType<GetDeveloperProfileResponse>;

export const getDeveloperProfileEndpoint = {
  method: "GET",
  path: "/onboarding/profile",
  pathParams: GetDeveloperProfileParamsSchema,
  query: GetDeveloperProfileQuerySchema,
  responses: {
    200: GetDeveloperProfileResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Get the developer profile for the authenticated user or by GitHub username",
} as const satisfies GetEndpointDefinition;
