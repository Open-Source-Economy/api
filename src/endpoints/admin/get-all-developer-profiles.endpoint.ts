import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import {
  type FullDeveloperProfile,
  FullDeveloperProfileSchema,
} from "src/models/onboarding/full-developer-profile.model";
import { type VerificationStatus, verificationStatusSchema } from "src/models/shared/verification-status.type";

// ============================================
// GET /admin/profiles
// ============================================

export interface GetAllDeveloperProfilesParams {}

export interface GetAllDeveloperProfilesQuery {
  verificationStatus?: VerificationStatus;
  searchTerm?: string;
}

export interface GetAllDeveloperProfilesResponse {
  profiles: FullDeveloperProfile[];
}

const GetAllDeveloperProfilesParamsSchema = z.object({}) satisfies z.ZodType<GetAllDeveloperProfilesParams>;

const GetAllDeveloperProfilesQuerySchema = z.object({
  verificationStatus: verificationStatusSchema.optional(),
  searchTerm: z.string().optional(),
}) satisfies z.ZodType<GetAllDeveloperProfilesQuery>;

const GetAllDeveloperProfilesResponseSchema = z.object({
  profiles: z.array(FullDeveloperProfileSchema),
}) satisfies z.ZodType<GetAllDeveloperProfilesResponse>;

export const getAllDeveloperProfilesEndpoint = {
  method: "GET",
  path: "/admin/profiles",
  pathParams: GetAllDeveloperProfilesParamsSchema,
  query: GetAllDeveloperProfilesQuerySchema,
  responses: {
    200: GetAllDeveloperProfilesResponseSchema,
    401: ProblemDetailsSchema,
    403: ProblemDetailsSchema,
  },
  summary: "Get all developer profiles (admin)",
} as const satisfies GetEndpointDefinition;
