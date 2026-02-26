import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /auth/logout
// ============================================

export interface LogoutParams {}
export interface LogoutQuery {}
export interface LogoutBody {}
export interface LogoutResponse {}

const LogoutParamsSchema = z.object({}) satisfies z.ZodType<LogoutParams>;
const LogoutQuerySchema = z.object({}) satisfies z.ZodType<LogoutQuery>;
const LogoutBodySchema = z.object({}) satisfies z.ZodType<LogoutBody>;
const LogoutResponseSchema = z.object({}) satisfies z.ZodType<LogoutResponse>;

export const logoutEndpoint = {
  method: "POST",
  path: "/auth/logout",
  pathParams: LogoutParamsSchema,
  query: LogoutQuerySchema,
  body: LogoutBodySchema,
  responses: {
    201: LogoutResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Log out the current user",
} as const satisfies PostEndpointDefinition;
