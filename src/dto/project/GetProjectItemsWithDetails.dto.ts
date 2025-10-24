import Joi from "joi";
import { Owner, Repository, ProjectItem, DeveloperProfile, DeveloperProjectItem } from "../../model";

export interface ProjectItemWithDetails {
  projectItem: ProjectItem;
  owner: Owner | null;
  repository: Repository | null;
  developers: Array<{
    developerProfile: DeveloperProfile;
    developerProjectItem: DeveloperProjectItem;
    developerOwner: Owner;
  }>;
}

export enum ProjectItemSortField {
  STARS = "stars",
  FORKS = "forks",
  MAINTAINERS = "maintainers",
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

export interface GetProjectItemsWithDetailsResponse {
  repositories: ProjectItemWithDetails[]; // GITHUB_REPOSITORY items (sorted if repositoriesSortBy is specified)
  owners: ProjectItemWithDetails[]; // GITHUB_OWNER items (sorted if ownersSortBy is specified)
  urls: ProjectItemWithDetails[]; // URL items (sorted if urlsSortBy is specified)
  stats: {
    totalProjects: number; // Total amount of ALL projects (not affected by limit filters)
    totalMaintainers: number; // Total number of unique maintainers across ALL projects (not affected by limit filters)
    totalStars: number; // Combined stargazers count from ALL repositories (not affected by limit filters)
    totalForks: number; // Combined forks count from ALL repositories (not affected by limit filters)
    totalFollowers: number; // Combined followers count from ALL owners (not affected by limit filters)
  };
}

export interface GetProjectItemsWithDetailsBody {}

export interface ProjectItemQueryParams {
  sortBy?: ProjectItemSortField;
  sortOrder?: SortOrder;
  limit?: number;
}
export interface GetProjectItemsWithDetailsQuery {
  repositories?: ProjectItemQueryParams; // Query parameters for GITHUB_REPOSITORY items
  owners?: ProjectItemQueryParams; // Query parameters for GITHUB_OWNER items
  urls?: ProjectItemQueryParams; // Query parameters for URL items
}

export namespace GetProjectItemsWithDetailsCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetProjectItemsWithDetailsParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<GetProjectItemsWithDetailsBody> = Joi.object({});

  const projectItemQueryParamsSchema = Joi.object({
    sortBy: Joi.string()
      .valid(...Object.values(ProjectItemSortField))
      .optional()
      .messages({
        "any.only": `sortBy must be one of: ${Object.values(ProjectItemSortField).join(", ")}`,
      }),
    sortOrder: Joi.string()
      .valid(...Object.values(SortOrder))
      .optional()
      .default(SortOrder.DESC)
      .messages({
        "any.only": `sortOrder must be one of: ${Object.values(SortOrder).join(", ")}`,
      }),
    limit: Joi.number().integer().min(1).max(100).optional().messages({
      "number.base": "limit must be a number",
      "number.integer": "limit must be an integer",
      "number.min": "limit must be at least 1",
      "number.max": "limit cannot exceed 100",
    }),
  });

  export const querySchema: Joi.ObjectSchema<GetProjectItemsWithDetailsQuery> = Joi.object({
    repositories: projectItemQueryParamsSchema.optional(),
    owners: projectItemQueryParamsSchema.optional(),
    urls: projectItemQueryParamsSchema.optional(),
  });
}
