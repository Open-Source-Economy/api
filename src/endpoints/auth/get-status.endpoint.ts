import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import type { User } from "src/models/user/user.model";
import { UserSchema } from "src/models/user/user.model";
import type { Company } from "src/models/company/company.model";
import { CompanySchema } from "src/models/company/company.model";
import type { CompanyUserRole } from "src/models/shared/company-user-role.type";
import { companyUserRoleSchema } from "src/models/shared/company-user-role.type";
import type { RepositoryUserRole } from "src/models/shared/repository-user-role.type";
import { repositoryUserRoleSchema } from "src/models/shared/repository-user-role.type";
import type { RepositoryId } from "src/models/github/repository-id.type";
import { repositoryIdSchema } from "src/models/github/repository-id.type";

// ============================================
// GET /auth/status
// ============================================

export interface RepositoryInfo {
  role: RepositoryUserRole;
  rate: string | null;
  currency: string | null;
}

export interface AuthenticatedUser {
  user: User;
  company: Company | null;
  companyRole: CompanyUserRole | null;
  /**
   * @deprecated Repository membership should now be fetched via the dedicated developer profile service.
   *             This field will be removed once all consumers migrate.
   */
  repositories: [RepositoryId, RepositoryInfo][];
  serviceTokens: number;
}

export interface GetStatusParams {}
export interface GetStatusQuery {}
export interface GetStatusResponse {
  authenticatedUser: AuthenticatedUser | null;
}

export const RepositoryInfoSchema = z.object({
  role: repositoryUserRoleSchema,
  rate: z.string().nullable(),
  currency: z.string().nullable(),
}) satisfies z.ZodType<RepositoryInfo>;

export const AuthenticatedUserSchema = z.object({
  user: UserSchema,
  company: CompanySchema.nullable(),
  companyRole: companyUserRoleSchema.nullable(),
  repositories: z.array(z.tuple([repositoryIdSchema, RepositoryInfoSchema])),
  serviceTokens: z.number(),
}) satisfies z.ZodType<AuthenticatedUser>;

const GetStatusParamsSchema = z.object({}) satisfies z.ZodType<GetStatusParams>;
const GetStatusQuerySchema = z.object({}) satisfies z.ZodType<GetStatusQuery>;
const GetStatusResponseSchema = z.object({
  authenticatedUser: AuthenticatedUserSchema.nullable(),
}) satisfies z.ZodType<GetStatusResponse>;

export const getStatusEndpoint = {
  method: "GET",
  path: "/auth/status",
  pathParams: GetStatusParamsSchema,
  query: GetStatusQuerySchema,
  responses: {
    200: GetStatusResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Get authentication status",
} as const satisfies GetEndpointDefinition;
