import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import type { RepositoryId } from "src/models/github/repository-id.type";
import { repositoryIdSchema } from "src/models/github/repository-id.type";

// ============================================
// GET /auth/repository-user-invite-info
// ============================================

export interface GetRepositoryUserInviteInfoParams {}
export interface GetRepositoryUserInviteInfoQuery {
  token: string;
}
export interface GetRepositoryUserInviteInfoResponse {
  userName?: string | null;
  userGithubOwnerLogin?: string;
  repositoryId?: RepositoryId;
}

const GetRepositoryUserInviteInfoParamsSchema = z.object({}) satisfies z.ZodType<GetRepositoryUserInviteInfoParams>;
const GetRepositoryUserInviteInfoQuerySchema = z.object({
  token: z.string(),
}) satisfies z.ZodType<GetRepositoryUserInviteInfoQuery>;
const GetRepositoryUserInviteInfoResponseSchema = z.object({
  userName: z.string().nullable().optional(),
  userGithubOwnerLogin: z.string().optional(),
  repositoryId: repositoryIdSchema.optional(),
}) satisfies z.ZodType<GetRepositoryUserInviteInfoResponse>;

export const getRepositoryUserInviteInfoEndpoint = {
  method: "GET",
  path: "/auth/repository-user-invite-info",
  pathParams: GetRepositoryUserInviteInfoParamsSchema,
  query: GetRepositoryUserInviteInfoQuerySchema,
  responses: {
    200: GetRepositoryUserInviteInfoResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Get repository user invite information",
} as const satisfies GetEndpointDefinition;
