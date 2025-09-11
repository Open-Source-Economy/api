import { DeveloperService, DeveloperProjectItemId, ResponseTimeType, ResponseTimeTypeCompanion, ServiceId, UUIDCompanion } from "../../../../model";
import Joi from "joi";
import { UpsertDeveloperServiceBody, UpsertDeveloperServiceCompanion } from "./UpsertDeveloperService.dto";

export interface UpsertDeveloperServicesParams {}

export interface UpsertDeveloperServicesBody {
  upsertDeveloperServices: UpsertDeveloperServiceBody; // TODO: lolo not use it is the best way. Maybe we should define a type
}

export interface UpsertDeveloperServicesQuery {}

export interface UpsertDeveloperServicesResponse {
  developerServices: DeveloperService[];
}

export namespace UpsertDeveloperServicesCompanion {
  export const paramsSchema: Joi.ObjectSchema<UpsertDeveloperServicesParams> = Joi.object({}).unknown(false);

  export const bodySchema: Joi.ObjectSchema<UpsertDeveloperServicesBody> = Joi.object({
    upsertDeveloperServices: Joi.array().items(UpsertDeveloperServiceCompanion.bodySchema).min(1).required().messages({
      "array.base": "The 'upsertDeveloperServices' field must be an array.",
      "array.min": "The 'upsertDeveloperServices' array must contain at least one object.",
      "any.required": "The 'upsertDeveloperServices' field is required.",
    }),
  })
    .required()
    .unknown(false)
    .prefs({
      abortEarly: false,
      convert: true,
    });

  export const querySchema: Joi.ObjectSchema<UpsertDeveloperServicesQuery> = Joi.object({}).unknown(false);
}
