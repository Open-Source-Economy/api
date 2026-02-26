import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// GET /auth/company-user-invite-info
// ============================================

export interface GetCompanyUserInviteInfoParams {}
export interface GetCompanyUserInviteInfoQuery {
  token: string;
}
export interface GetCompanyUserInviteInfoResponse {
  userName?: string | null;
  userEmail?: string;
}

const GetCompanyUserInviteInfoParamsSchema = z.object({}) satisfies z.ZodType<GetCompanyUserInviteInfoParams>;
const GetCompanyUserInviteInfoQuerySchema = z.object({
  token: z.string(),
}) satisfies z.ZodType<GetCompanyUserInviteInfoQuery>;
const GetCompanyUserInviteInfoResponseSchema = z.object({
  userName: z.string().nullable().optional(),
  userEmail: z.string().email().optional(),
}) satisfies z.ZodType<GetCompanyUserInviteInfoResponse>;

export const getCompanyUserInviteInfoEndpoint = {
  method: "GET",
  path: "/auth/company-user-invite-info",
  pathParams: GetCompanyUserInviteInfoParamsSchema,
  query: GetCompanyUserInviteInfoQuerySchema,
  responses: {
    200: GetCompanyUserInviteInfoResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Get company user invite information",
} as const satisfies GetEndpointDefinition;
