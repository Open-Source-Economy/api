import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /onboarding/profile
// ============================================

export interface CreateProfileParams {}

export interface CreateProfileQuery {}

export interface CreateProfileBody {
  name: string;
  email: string;
  agreedToTerms: boolean;
}

export interface CreateProfileResponse {}

const CreateProfileParamsSchema = z.object({}) satisfies z.ZodType<CreateProfileParams>;

const CreateProfileQuerySchema = z.object({}) satisfies z.ZodType<CreateProfileQuery>;

const CreateProfileBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  agreedToTerms: z.literal(true),
}) satisfies z.ZodType<CreateProfileBody>;

const CreateProfileResponseSchema = z.object({}) satisfies z.ZodType<CreateProfileResponse>;

export const createProfileEndpoint = {
  method: "POST",
  path: "/onboarding/profile",
  pathParams: CreateProfileParamsSchema,
  query: CreateProfileQuerySchema,
  body: CreateProfileBodySchema,
  responses: {
    201: CreateProfileResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Create a new developer profile during onboarding",
} as const satisfies PostEndpointDefinition;
