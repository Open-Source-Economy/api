import {
  DeveloperProjectItem,
  DeveloperRoleType,
  DeveloperRoleTypeCompanion,
  MergeRightsType,
  MergeRightsTypeCompanion,
  OwnerIdCompanion,
  ProjectCategory,
  ProjectCategoryCompanion,
  ProjectItem,
  ProjectItemType,
  ProjectItemTypeCompanion,
  RepositoryIdCompanion,
  SourceIdentifier,
} from "../../../model";
import Joi from "joi";

export interface UpsertDeveloperProjectItemParams {}

/**
 * Single project item data structure
 */
export interface ProjectItemData {
  projectItemType: ProjectItemType;
  sourceIdentifier: SourceIdentifier;
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  comments?: string;
  customCategories?: string[];
  predefinedCategories?: ProjectCategory[];
}

/**
 * Request body - accepts an array of project items
 * Single item = array of 1, bulk = array of multiple
 */
export interface UpsertDeveloperProjectItemBody {
  projectItems: ProjectItemData[];
}

export interface UpsertDeveloperProjectItemQuery {}

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

export namespace UpsertDeveloperProjectItemCompanion {
  export const paramsSchema: Joi.ObjectSchema<UpsertDeveloperProjectItemParams> = Joi.object({});

  /**
   * Schema for a single project item
   */
  export const projectItemDataSchema: Joi.ObjectSchema<ProjectItemData> = Joi.object({
    projectItemType: ProjectItemTypeCompanion.schema.label("Project Item Type").required(),
    sourceIdentifier: Joi.when("projectItemType", {
      switch: [
        {
          is: ProjectItemType.GITHUB_OWNER,
          then: OwnerIdCompanion.schema.messages({
            "any.required": "Source identifier (OwnerId object) is required for GITHUB_OWNER",
            "object.base": "Source identifier must be an Owner ID object for GITHUB_OWNER type",
          }),
        },
        {
          is: ProjectItemType.GITHUB_REPOSITORY,
          then: RepositoryIdCompanion.schema.messages({
            "any.required": "Source identifier (RepositoryId object) is required for GITHUB_REPOSITORY",
            "object.base": "Source identifier must be a Repository ID object for GITHUB_REPOSITORY type",
          }),
        },
        {
          is: ProjectItemType.URL,
          then: Joi.string().trim().uri().min(1).messages({
            // Validate as a URL string
            "string.empty": "Source identifier (URL) cannot be empty",
            "string.min": "Source identifier (URL) must contain at least one character",
            "string.trim": "Source identifier (URL) cannot consist only of spaces",
            "string.uri": "Source identifier must be a valid URL",
            "any.required": "Source identifier (URL) is required for URL type",
          }),
        },
      ],
      // Default case if projectItemType doesn't match, or if it's not provided/invalid (handled by projectItemType schema)
      // This 'otherwise' might not be strictly necessary if projectItemType is always valid due to its own schema,
      // but it provides a fallback if the switch somehow doesn't catch.
      otherwise: Joi.string().trim().min(1).messages({
        "string.empty": "Source identifier cannot be empty",
        "string.min": "Source identifier must contain at least one character",
        "string.trim": "Source identifier cannot consist only of spaces",
        "any.required": "Source identifier is required",
      }),
    })
      .required()
      .messages({
        "any.required": "Source identifier is required",
        "object.base": "Source identifier must be an object for GITHUB_OWNER or GITHUB_REPOSITORY, or a string for URL",
      }),
    mergeRights: Joi.array().items(MergeRightsTypeCompanion.schema.label("Merge Rights Type")).required().messages({
      "array.base": "Merge rights must be an array",
      "array.empty": "Merge rights cannot be empty",
      "any.required": "Merge rights are required",
    }),
    roles: Joi.array().items(DeveloperRoleTypeCompanion.schema.label("Developer Role Type")).required().messages({
      "array.base": "Roles must be an array",
      "array.empty": "Roles cannot be empty",
      "any.required": "Roles are required",
    }),
    comments: Joi.string().trim().allow("").optional().messages({
      "string.trim": "Comments cannot consist only of spaces",
    }),
    customCategories: Joi.array().items(Joi.string().trim()).optional().messages({
      "array.base": "Custom categories must be an array",
      "string.trim": "Each custom category must be a non-empty string",
    }),
    predefinedCategories: Joi.array().items(ProjectCategoryCompanion.schema.label("Project Category")).optional().messages({
      "array.base": "Predefined categories must be an array",
    }),
  });

  /**
   * Schema for the request body - array of project items
   */
  export const bodySchema: Joi.ObjectSchema<UpsertDeveloperProjectItemBody> = Joi.object({
    projectItems: Joi.array().items(projectItemDataSchema).min(1).required().messages({
      "array.base": "Project items must be an array",
      "array.min": "At least one project item is required",
      "array.empty": "Project items array cannot be empty",
      "any.required": "Project items are required",
    }),
  })
    .required()
    .unknown(false)
    .prefs({ abortEarly: false, convert: true });

  export const querySchema: Joi.ObjectSchema<UpsertDeveloperProjectItemQuery> = Joi.object({});
}
