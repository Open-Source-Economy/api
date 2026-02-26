import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type Project, ProjectSchema } from "src/models/project/project.model";

// ============================================
// GET /projects/owners/:owner
// ============================================

export interface GetProjectParams {
  owner: string;
  repo?: string;
}

export interface GetProjectQuery {}

export interface GetProjectResponse {
  project: Project;
}

const GetProjectParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1).optional(),
}) satisfies z.ZodType<GetProjectParams>;

const GetProjectQuerySchema = z.object({}) satisfies z.ZodType<GetProjectQuery>;

const GetProjectResponseSchema = z.object({
  project: ProjectSchema,
}) satisfies z.ZodType<GetProjectResponse>;

export const getProjectEndpoint = {
  method: "GET",
  path: "/projects/owners/:owner",
  pathParams: GetProjectParamsSchema,
  query: GetProjectQuerySchema,
  responses: { 200: GetProjectResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get a project by owner (or owner/repo)",
} as const satisfies GetEndpointDefinition;
