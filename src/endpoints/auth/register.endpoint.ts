import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import type { AuthenticatedUser } from "./get-status.endpoint";
import { AuthenticatedUserSchema } from "./get-status.endpoint";

// ============================================
// POST /auth/register
// ============================================

export interface RegisterParams {}
export interface RegisterQuery {
  companyToken?: string;
  repositoryToken?: string;
}
export interface RegisterBody {
  name: string | null;
  email: string;
  password: string;
}
export interface RegisterResponse {
  authenticatedUser: AuthenticatedUser | null;
}

const RegisterParamsSchema = z.object({}) satisfies z.ZodType<RegisterParams>;
const RegisterQuerySchema = z.object({
  companyToken: z.string().optional(),
  repositoryToken: z.string().optional(),
}) satisfies z.ZodType<RegisterQuery>;
const RegisterBodySchema = z.object({
  name: z.string().nullable(),
  email: z.string().email(),
  password: z.string(),
}) satisfies z.ZodType<RegisterBody>;
const RegisterResponseSchema = z.object({
  authenticatedUser: AuthenticatedUserSchema.nullable(),
}) satisfies z.ZodType<RegisterResponse>;

export const registerEndpoint = {
  method: "POST",
  path: "/auth/register",
  pathParams: RegisterParamsSchema,
  query: RegisterQuerySchema,
  body: RegisterBodySchema,
  responses: {
    201: RegisterResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Register a new user",
} as const satisfies PostEndpointDefinition;
