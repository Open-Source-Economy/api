import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type ProjectItemType, projectItemTypeSchema } from "src/models/shared/project-item-type.type";
import { type DeveloperRoleType, developerRoleTypeSchema } from "src/models/shared/developer-role-type.type";
import { type MergeRightsType, mergeRightsTypeSchema } from "src/models/shared/merge-rights-type.type";
import { type ProjectCategory, projectCategorySchema } from "src/models/shared/project-category.type";
import { type ProjectItem, ProjectItemSchema } from "src/models/project/project-item.model";
import {
  type DeveloperProjectItem,
  DeveloperProjectItemSchema,
} from "src/models/onboarding/developer-project-item.model";

// ============================================
// POST /onboarding/projects
// ============================================

/**
 * Single project item data structure
 */
export interface ProjectItemData {
  projectItemType: ProjectItemType;
  sourceIdentifier: string;
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  comments?: string;
  customCategories?: string[];
  predefinedCategories?: ProjectCategory[];
}

const ProjectItemDataSchema = z.object({
  projectItemType: projectItemTypeSchema,
  sourceIdentifier: z.string().min(1),
  mergeRights: z.array(mergeRightsTypeSchema),
  roles: z.array(developerRoleTypeSchema),
  comments: z.string().optional(),
  customCategories: z.array(z.string()).optional(),
  predefinedCategories: z.array(projectCategorySchema).optional(),
}) satisfies z.ZodType<ProjectItemData>;

export interface UpsertDeveloperProjectItemParams {}

export interface UpsertDeveloperProjectItemQuery {}

/**
 * Request body - accepts an array of project items
 */
export interface UpsertDeveloperProjectItemBody {
  projectItems: ProjectItemData[];
}

/**
 * Result for a single project item upsert operation
 */
export interface ProjectItemUpsertResult {
  projectItem: ProjectItem;
  developerProjectItem: DeveloperProjectItem;
}

/**
 * Response - returns an array of results, one per project item
 */
export interface UpsertDeveloperProjectItemResponse {
  results: ProjectItemUpsertResult[];
}

const UpsertDeveloperProjectItemParamsSchema = z.object({}) satisfies z.ZodType<UpsertDeveloperProjectItemParams>;

const UpsertDeveloperProjectItemQuerySchema = z.object({}) satisfies z.ZodType<UpsertDeveloperProjectItemQuery>;

const UpsertDeveloperProjectItemBodySchema = z.object({
  projectItems: z.array(ProjectItemDataSchema).min(1),
}) satisfies z.ZodType<UpsertDeveloperProjectItemBody>;

const ProjectItemUpsertResultSchema = z.object({
  projectItem: ProjectItemSchema,
  developerProjectItem: DeveloperProjectItemSchema,
}) satisfies z.ZodType<ProjectItemUpsertResult>;

const UpsertDeveloperProjectItemResponseSchema = z.object({
  results: z.array(ProjectItemUpsertResultSchema),
}) satisfies z.ZodType<UpsertDeveloperProjectItemResponse>;

export const upsertDeveloperProjectItemEndpoint = {
  method: "POST",
  path: "/onboarding/projects",
  pathParams: UpsertDeveloperProjectItemParamsSchema,
  query: UpsertDeveloperProjectItemQuerySchema,
  body: UpsertDeveloperProjectItemBodySchema,
  responses: {
    201: UpsertDeveloperProjectItemResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Upsert one or more developer project items during onboarding",
} as const satisfies PostEndpointDefinition;
