import { ProjectItemId, UUIDCompanion } from "../../../model";
import Joi from "joi";

export interface RemoveDeveloperProjectItemParams {}

export interface RemoveDeveloperProjectItemBody {
  projectItemId: ProjectItemId;
}

export interface RemoveDeveloperProjectItemQuery {}

export interface RemoveDeveloperProjectItemResponse {}

export namespace RemoveDeveloperProjectItemCompanion {
  export const paramsSchema: Joi.ObjectSchema<RemoveDeveloperProjectItemParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<RemoveDeveloperProjectItemBody> = Joi.object({
    projectItemId: UUIDCompanion.schema.label("Project Item ID"),
  });

  export const querySchema: Joi.ObjectSchema<RemoveDeveloperProjectItemQuery> = Joi.object({});
}
