import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /auth/forgot-password
// ============================================

export interface ForgotPasswordParams {}
export interface ForgotPasswordQuery {}
export interface ForgotPasswordBody {
  email: string;
}
export interface ForgotPasswordResponse {}

const ForgotPasswordParamsSchema = z.object({}) satisfies z.ZodType<ForgotPasswordParams>;
const ForgotPasswordQuerySchema = z.object({}) satisfies z.ZodType<ForgotPasswordQuery>;
const ForgotPasswordBodySchema = z.object({
  email: z.string().email(),
}) satisfies z.ZodType<ForgotPasswordBody>;
const ForgotPasswordResponseSchema = z.object({}) satisfies z.ZodType<ForgotPasswordResponse>;

export const forgotPasswordEndpoint = {
  method: "POST",
  path: "/auth/forgot-password",
  pathParams: ForgotPasswordParamsSchema,
  query: ForgotPasswordQuerySchema,
  body: ForgotPasswordBodySchema,
  responses: {
    201: ForgotPasswordResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Request a password reset email",
} as const satisfies PostEndpointDefinition;
