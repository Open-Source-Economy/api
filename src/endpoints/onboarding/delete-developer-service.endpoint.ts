import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { DeleteEndpointDefinition } from "src/types/endpoint.types";
import { type DeveloperServiceId, DeveloperServiceIdSchema } from "src/types/uuid";

// ============================================
// DELETE /onboarding/services
// ============================================

export interface DeleteDeveloperServiceParams {
  developerServiceId: DeveloperServiceId;
}

export interface DeleteDeveloperServiceQuery {}

const DeleteDeveloperServiceParamsSchema = z.object({
  developerServiceId: DeveloperServiceIdSchema,
}) satisfies z.ZodType<DeleteDeveloperServiceParams>;

const DeleteDeveloperServiceQuerySchema = z.object({}) satisfies z.ZodType<DeleteDeveloperServiceQuery>;

export const deleteDeveloperServiceEndpoint = {
  method: "DELETE",
  path: "/onboarding/services/:developerServiceId",
  pathParams: DeleteDeveloperServiceParamsSchema,
  query: DeleteDeveloperServiceQuerySchema,
  body: null,
  responses: {
    204: null,
    400: ProblemDetailsSchema,
  },
  summary: "Delete a developer service offering during onboarding",
} as const satisfies DeleteEndpointDefinition;
