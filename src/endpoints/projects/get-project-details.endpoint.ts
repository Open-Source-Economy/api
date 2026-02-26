import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type ProjectItemDetails, ProjectItemDetailsSchema } from "src/models/project/project-item-details.model";
import { type Service, ServiceSchema } from "src/models/project/service.model";
import {
  type DeveloperProfileEntry,
  DeveloperProfileEntrySchema,
  type DeveloperProjectItemEntry,
  DeveloperProjectItemEntrySchema,
} from "src/models/onboarding/full-developer-profile.model";
import { type DeveloperSettings, DeveloperSettingsSchema } from "src/models/onboarding/developer-settings.model";
import { type DeveloperService, DeveloperServiceSchema } from "src/models/onboarding/developer-service.model";
import { type ResponseTimeType, responseTimeTypeSchema } from "src/models/shared/response-time-type.type";
import { type DeveloperProfileId, DeveloperProfileIdSchema } from "src/types/uuid";

// ============================================
// GET /projects/owners/:owner/details
// ============================================

export interface GetProjectDetailsParams {
  owner: string;
  repo?: string;
}

export interface ProjectDeveloperProfile {
  profileEntry: DeveloperProfileEntry | null;
  settings: DeveloperSettings | null;
  project: DeveloperProjectItemEntry;
  /**
   * Keyed by ServiceId UUID to allow direct lookup of a developer's configuration for a given service.
   */
  services: Record<string, DeveloperService>;
}

export interface ProjectServiceOffering {
  responseTimeHours?: [ResponseTimeType, DeveloperProfileId][];
}

export interface GetProjectDetailsQuery {}

export interface GetProjectDetailsResponse {
  project: ProjectItemDetails;

  /**
   * Developers associated with the project and their services.
   * Keyed by DeveloperProfileId UUID (falls back to the developer profile UUID when no public profile entry exists).
   */
  developers: Record<string, ProjectDeveloperProfile>;

  /**
   * Aggregated view of services provided across all maintainers for this project.
   * Grouped by Service, while retaining per-developer variants (response time, pricing, etc.).
   */
  service: Service[];
  /**
   * Map keyed by ServiceId UUID. Every service present in `service` has a matching entry here whose array
   * enumerates the developer-specific variants for that service.
   */
  serviceOfferings: Record<string, ProjectServiceOffering[]>;
}

const ProjectDeveloperProfileSchema = z.object({
  profileEntry: DeveloperProfileEntrySchema.nullable(),
  settings: DeveloperSettingsSchema.nullable(),
  project: DeveloperProjectItemEntrySchema,
  services: z.record(z.string(), DeveloperServiceSchema),
}) satisfies z.ZodType<ProjectDeveloperProfile>;

const ProjectServiceOfferingSchema = z.object({
  responseTimeHours: z.array(z.tuple([responseTimeTypeSchema, DeveloperProfileIdSchema])).optional(),
}) satisfies z.ZodType<ProjectServiceOffering>;

const GetProjectDetailsParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1).optional(),
}) satisfies z.ZodType<GetProjectDetailsParams>;

const GetProjectDetailsQuerySchema = z.object({}) satisfies z.ZodType<GetProjectDetailsQuery>;

const GetProjectDetailsResponseSchema = z.object({
  project: ProjectItemDetailsSchema,
  developers: z.record(z.string(), ProjectDeveloperProfileSchema),
  service: z.array(ServiceSchema),
  serviceOfferings: z.record(z.string(), z.array(ProjectServiceOfferingSchema)),
}) satisfies z.ZodType<GetProjectDetailsResponse>;

export const getProjectDetailsEndpoint = {
  method: "GET",
  path: "/projects/owners/:owner/details",
  pathParams: GetProjectDetailsParamsSchema,
  query: GetProjectDetailsQuerySchema,
  responses: { 200: GetProjectDetailsResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get detailed project information with developers and service offerings",
} as const satisfies GetEndpointDefinition;
