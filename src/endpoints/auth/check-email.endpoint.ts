import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import type { Provider } from "src/models/shared/provider.type";
import { providerSchema } from "src/models/shared/provider.type";

// ============================================
// GET /auth/check-email
// ============================================

export interface CheckEmailParams {}
export interface CheckEmailQuery {
  email: string;
}
export interface CheckEmailResponse {
  exists: boolean;
  /**
   * The authentication provider for the user.
   * If not defined, the user is locally registered.
   */
  provider?: Provider;
}

const CheckEmailParamsSchema = z.object({}) satisfies z.ZodType<CheckEmailParams>;
const CheckEmailQuerySchema = z.object({
  email: z.string().email(),
}) satisfies z.ZodType<CheckEmailQuery>;
const CheckEmailResponseSchema = z.object({
  exists: z.boolean(),
  provider: providerSchema.optional(),
}) satisfies z.ZodType<CheckEmailResponse>;

export const checkEmailEndpoint = {
  method: "GET",
  path: "/auth/check-email",
  pathParams: CheckEmailParamsSchema,
  query: CheckEmailQuerySchema,
  responses: {
    200: CheckEmailResponseSchema,
    401: ProblemDetailsSchema,
  },
  summary: "Check if an email is already registered",
} as const satisfies GetEndpointDefinition;
