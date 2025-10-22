import Joi from "joi";

export interface GetPotentialDeveloperProjectItemsParams {}

export interface GetPotentialDeveloperProjectItemsBody {}

export interface GetPotentialDeveloperProjectItemsQuery {}

export interface GetPotentialDeveloperProjectItemsResponse {}

export namespace GetPotentialDeveloperProjectItemsCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetPotentialDeveloperProjectItemsParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<GetPotentialDeveloperProjectItemsBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetPotentialDeveloperProjectItemsQuery> = Joi.object({});
}
