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
  CREATED_AT = "created_at",
  UPDATED_AT = "updated_at",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export interface GetProjectItemsWithDetailsParams {}

export interface GetProjectItemsWithDetailsResponse {
  projectItems: ProjectItemWithDetails[];
  total: number; // Total count before limit
}

export interface GetProjectItemsWithDetailsBody {}

export interface GetProjectItemsWithDetailsQuery {
  sortBy?: ProjectItemSortField;
  sortOrder?: SortOrder;
  limit?: number;
}

export namespace GetProjectItemsWithDetailsCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetProjectItemsWithDetailsParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<GetProjectItemsWithDetailsBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetProjectItemsWithDetailsQuery> = Joi.object({
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
}
