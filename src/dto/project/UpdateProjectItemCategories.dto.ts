import Joi from "joi";
import { ProjectCategory, ProjectCategoryCompanion, ProjectItemId } from "../../model";

/**
 * DTO for admin-only endpoint to update predefined categories for a project item
 */

export interface UpdateProjectItemCategoriesParams {
  projectItemId: string;
}

export interface UpdateProjectItemCategoriesBody {
  categories: ProjectCategory[];
}

export interface UpdateProjectItemCategoriesQuery {}

export interface UpdateProjectItemCategoriesResponse {
  projectItemId: ProjectItemId;
  categories: ProjectCategory[];
}

export namespace UpdateProjectItemCategoriesCompanion {
  export const paramsSchema: Joi.ObjectSchema<UpdateProjectItemCategoriesParams> = Joi.object({
    projectItemId: Joi.string().uuid().required().messages({
      "string.guid": "projectItemId must be a valid UUID",
      "any.required": "projectItemId is required",
    }),
  });

  export const bodySchema: Joi.ObjectSchema<UpdateProjectItemCategoriesBody> = Joi.object({
    categories: Joi.array().items(ProjectCategoryCompanion.schema).required().messages({
      "any.required": "categories is required",
      "array.base": "categories must be an array",
    }),
  });

  export const querySchema: Joi.ObjectSchema<UpdateProjectItemCategoriesQuery> = Joi.object({});
}
