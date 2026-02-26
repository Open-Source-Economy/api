import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";

// ============================================
// POST /contact
// ============================================

export interface SubmitContactFormParams {}

export interface SubmitContactFormQuery {}

export interface SubmitContactFormBody {
  name: string;
  email: string;
  company: string;
  linkedinProfile: string;
  githubProfile?: string;
  contactReason: string;
  projects?: Array<{
    url: string;
    role?: string;
  }>;
  requestMeeting: boolean;
  meetingNotes?: string;
  subject: string;
  message: string;
}

export interface SubmitContactFormResponse {}

const SubmitContactFormParamsSchema = z.object({}) satisfies z.ZodType<SubmitContactFormParams>;

const SubmitContactFormQuerySchema = z.object({}) satisfies z.ZodType<SubmitContactFormQuery>;

const SubmitContactFormBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string(),
  linkedinProfile: z.string(),
  githubProfile: z.string().optional(),
  contactReason: z.string(),
  projects: z
    .array(
      z.object({
        url: z.string(),
        role: z.string().optional(),
      })
    )
    .optional(),
  requestMeeting: z.boolean(),
  meetingNotes: z.string().optional(),
  subject: z.string(),
  message: z.string(),
}) satisfies z.ZodType<SubmitContactFormBody>;

const SubmitContactFormResponseSchema = z.object({}) satisfies z.ZodType<SubmitContactFormResponse>;

export const submitContactFormEndpoint = {
  method: "POST",
  path: "/contact",
  pathParams: SubmitContactFormParamsSchema,
  query: SubmitContactFormQuerySchema,
  body: SubmitContactFormBodySchema,
  responses: {
    201: SubmitContactFormResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Submit contact form",
} as const satisfies PostEndpointDefinition;
