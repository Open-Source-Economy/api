import { DeveloperProjectItemId, UUIDCompanion } from "../../../model";
import Joi from "joi";

export interface RemoveDeveloperProjectItemParams {}

export interface RemoveDeveloperProjectItemBody {
  developerProjectItemId: DeveloperProjectItemId;
}

export interface RemoveDeveloperProjectItemQuery {}

export interface RemoveDeveloperProjectItemResponse {}

export namespace RemoveDeveloperProjectItemCompanion {
  export const paramsSchema: Joi.ObjectSchema<RemoveDeveloperProjectItemParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<RemoveDeveloperProjectItemBody> = Joi.object({
    developerProjectItemId: Joi.object({
      uuid: UUIDCompanion.schema.label("Developer Project Item ID"),
    }).required(),
  });

  export const querySchema: Joi.ObjectSchema<RemoveDeveloperProjectItemQuery> = Joi.object({});
}
