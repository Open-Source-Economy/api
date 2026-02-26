import { z } from "zod";

/**
 * RFC 7807 Problem Details response format
 * https://datatracker.ietf.org/doc/html/rfc7807
 */
export interface ProblemDetails {
  /** URI reference identifying the problem type */
  type: string;
  /** Short, human-readable summary of the problem */
  title: string;
  /** HTTP status code */
  status: number;
  /** Human-readable explanation specific to this occurrence */
  detail: string;
  /** URI reference identifying the specific occurrence */
  instance?: string;
  /** Additional validation errors */
  errors?: Record<string, string[]>;
}

export const ProblemDetailsSchema = z.object({
  type: z.string().url(),
  title: z.string(),
  status: z.number().int().min(400).max(599),
  detail: z.string(),
  instance: z.string().optional(),
  errors: z.record(z.string(), z.array(z.string())).optional(),
}) satisfies z.ZodType<ProblemDetails>;
