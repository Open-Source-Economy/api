import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /auth/reset-password
// ============================================

export interface ResetPasswordParams {}
export interface ResetPasswordQuery {
  token: string;
}
export interface ResetPasswordBody {
  password: string;
}
export interface ResetPasswordResponse {}

const ResetPasswordParamsSchema = z.object({}) satisfies z.ZodType<ResetPasswordParams>;
const ResetPasswordQuerySchema = z.object({
  token: z.string(),
}) satisfies z.ZodType<ResetPasswordQuery>;
const ResetPasswordBodySchema = z.object({
  password: z.string(),
}) satisfies z.ZodType<ResetPasswordBody>;
const ResetPasswordResponseSchema = z.object({}) satisfies z.ZodType<ResetPasswordResponse>;

export const resetPasswordEndpoint = {
  method: "POST",
  path: "/auth/reset-password",
  pathParams: ResetPasswordParamsSchema,
  query: ResetPasswordQuerySchema,
  body: ResetPasswordBodySchema,
  responses: {
    201: ResetPasswordResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Reset password using a token",
} as const satisfies PostEndpointDefinition;
