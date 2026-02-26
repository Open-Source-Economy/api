import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type Project, ProjectSchema } from "src/models/project/project.model";

// ============================================
// GET /projects/
// ============================================

export interface GetProjectsParams {}

export interface GetProjectsQuery {}

export interface GetProjectsResponse {
  projects: Project[];
}

const GetProjectsParamsSchema = z.object({}) satisfies z.ZodType<GetProjectsParams>;

const GetProjectsQuerySchema = z.object({}) satisfies z.ZodType<GetProjectsQuery>;

const GetProjectsResponseSchema = z.object({
  projects: z.array(ProjectSchema),
}) satisfies z.ZodType<GetProjectsResponse>;

export const getProjectsEndpoint = {
  method: "GET",
  path: "/projects/",
  pathParams: GetProjectsParamsSchema,
  query: GetProjectsQuerySchema,
  responses: { 200: GetProjectsResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get all projects",
} as const satisfies GetEndpointDefinition;
