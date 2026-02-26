import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { DeleteEndpointDefinition } from "src/types/endpoint.types";
import { type DeveloperProjectItemId, DeveloperProjectItemIdSchema } from "src/types/uuid";

// ============================================
// DELETE /onboarding/projects
// ============================================

export interface RemoveDeveloperProjectItemParams {
  developerProjectItemId: DeveloperProjectItemId;
}

export interface RemoveDeveloperProjectItemQuery {}

const RemoveDeveloperProjectItemParamsSchema = z.object({
  developerProjectItemId: DeveloperProjectItemIdSchema,
}) satisfies z.ZodType<RemoveDeveloperProjectItemParams>;

const RemoveDeveloperProjectItemQuerySchema = z.object({}) satisfies z.ZodType<RemoveDeveloperProjectItemQuery>;

export const removeDeveloperProjectItemEndpoint = {
  method: "DELETE",
  path: "/onboarding/projects/:developerProjectItemId",
  pathParams: RemoveDeveloperProjectItemParamsSchema,
  query: RemoveDeveloperProjectItemQuerySchema,
  body: null,
  responses: {
    204: null,
    400: ProblemDetailsSchema,
  },
  summary: "Remove a developer project item during onboarding",
} as const satisfies DeleteEndpointDefinition;
