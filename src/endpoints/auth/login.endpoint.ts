import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import type { AuthenticatedUser } from "./get-status.endpoint";
import { AuthenticatedUserSchema } from "./get-status.endpoint";

// ============================================
// POST /auth/login
// ============================================

export interface LoginParams {}
export interface LoginQuery {}
export interface LoginBody {
  email: string;
  password: string;
}
export interface LoginResponse {
  authenticatedUser: AuthenticatedUser | null;
}

const LoginParamsSchema = z.object({}) satisfies z.ZodType<LoginParams>;
const LoginQuerySchema = z.object({}) satisfies z.ZodType<LoginQuery>;
const LoginBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
}) satisfies z.ZodType<LoginBody>;
const LoginResponseSchema = z.object({
  authenticatedUser: AuthenticatedUserSchema.nullable(),
}) satisfies z.ZodType<LoginResponse>;

export const loginEndpoint = {
  method: "POST",
  path: "/auth/login",
  pathParams: LoginParamsSchema,
  query: LoginQuerySchema,
  body: LoginBodySchema,
  responses: {
    201: LoginResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Log in with email and password",
} as const satisfies PostEndpointDefinition;
