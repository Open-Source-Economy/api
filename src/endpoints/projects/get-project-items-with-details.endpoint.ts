import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type ProjectItemDetails, ProjectItemDetailsSchema } from "src/models/project/project-item-details.model";
import { type DeveloperProfile, DeveloperProfileSchema } from "src/models/onboarding/developer-profile.model";
import {
  type DeveloperProjectItem,
  DeveloperProjectItemSchema,
} from "src/models/onboarding/developer-project-item.model";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";

// ============================================
// GET /projects/items/details
// ============================================

export interface ProjectItemWithDetails extends ProjectItemDetails {
  developers: Array<{
    developerProfile: DeveloperProfile;
    developerProjectItem: DeveloperProjectItem;
    developerOwner: Owner;
  }>;
}

export enum ProjectItemSortField {
  STARS = "stars",
  FORKS = "forks",
  STARGAZERS = "stargazers",
  FOLLOWERS = "followers",
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface GetProjectItemsWithDetailsParams {}

export interface ProjectItemsStats {
  totalProjects: number;
  totalMaintainers: number;
  totalStars: number;
  totalForks: number;
  totalFollowers: number;
}

export interface ProjectItemQueryParams {
  sortBy?: ProjectItemSortField;
  sortOrder?: SortOrder;
  limit?: number;
}

export interface GetProjectItemsWithDetailsQuery {
  repositories?: ProjectItemQueryParams;
  owners?: ProjectItemQueryParams;
  urls?: ProjectItemQueryParams;
}

export interface GetProjectItemsWithDetailsResponse {
  repositories: ProjectItemWithDetails[];
  owners: ProjectItemWithDetails[];
  urls: ProjectItemWithDetails[];
  stats: ProjectItemsStats;
}

const ProjectItemWithDetailsSchema: z.ZodType<ProjectItemWithDetails> = ProjectItemDetailsSchema.extend({
  developers: z.array(
    z.object({
      developerProfile: DeveloperProfileSchema,
      developerProjectItem: DeveloperProjectItemSchema,
      developerOwner: OwnerSchema,
    })
  ),
});

const ProjectItemsStatsSchema = z.object({
  totalProjects: z.number().int(),
  totalMaintainers: z.number().int(),
  totalStars: z.number().int(),
  totalForks: z.number().int(),
  totalFollowers: z.number().int(),
}) satisfies z.ZodType<ProjectItemsStats>;

const projectItemSortFieldSchema = z.nativeEnum(ProjectItemSortField);
const sortOrderSchema = z.nativeEnum(SortOrder);

const ProjectItemQueryParamsSchema = z.object({
  sortBy: projectItemSortFieldSchema.optional(),
  sortOrder: sortOrderSchema.optional(),
  limit: z.number().int().min(1).max(100).optional(),
}) satisfies z.ZodType<ProjectItemQueryParams>;

const GetProjectItemsWithDetailsParamsSchema = z.object({}) satisfies z.ZodType<GetProjectItemsWithDetailsParams>;

const GetProjectItemsWithDetailsQuerySchema = z.object({
  repositories: ProjectItemQueryParamsSchema.optional(),
  owners: ProjectItemQueryParamsSchema.optional(),
  urls: ProjectItemQueryParamsSchema.optional(),
}) satisfies z.ZodType<GetProjectItemsWithDetailsQuery>;

const GetProjectItemsWithDetailsResponseSchema = z.object({
  repositories: z.array(ProjectItemWithDetailsSchema),
  owners: z.array(ProjectItemWithDetailsSchema),
  urls: z.array(ProjectItemWithDetailsSchema),
  stats: ProjectItemsStatsSchema,
}) satisfies z.ZodType<GetProjectItemsWithDetailsResponse>;

export const getProjectItemsWithDetailsEndpoint = {
  method: "GET",
  path: "/projects/items/details",
  pathParams: GetProjectItemsWithDetailsParamsSchema,
  query: GetProjectItemsWithDetailsQuerySchema,
  responses: { 200: GetProjectItemsWithDetailsResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get all project items with details, developers, and stats",
} as const satisfies GetEndpointDefinition;
