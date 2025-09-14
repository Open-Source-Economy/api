import { DeveloperProjectItemId, DeveloperService, ResponseTimeType, ResponseTimeTypeCompanion, ServiceId, UUIDCompanion } from "../../../../model";
import Joi from "joi";

export interface UpsertDeveloperServiceParams {}

export interface UpsertDeveloperServiceBody {
  developerProjectItemIds: DeveloperProjectItemId[];
  serviceId: ServiceId;
  hourlyRate?: number;
  responseTimeHours?: ResponseTimeType | null;
  comment?: string | null;
}

export interface UpsertDeveloperServiceQuery {}

export interface UpsertDeveloperServiceResponse {
  developerService: DeveloperService;
}

export namespace UpsertDeveloperServiceCompanion {
  export const paramsSchema: Joi.ObjectSchema<UpsertDeveloperServiceParams> = Joi.object({}).unknown(false);

  export const bodySchema: Joi.ObjectSchema<UpsertDeveloperServiceBody> = Joi.object({
    developerProjectItemIds: Joi.array()
      .items(
        Joi.object({
          uuid: UUIDCompanion.schema.label("Project Item ID"),
        }).required(),
      )
      .min(1)
      .unique()
      .required()
      .messages({
        "array.base": "Project item IDs must be an array of objects.",
        "array.min": "Please provide at least one project item ID.",
        "array.unique": "Project item IDs must be unique.",
        "any.required": "Project item IDs are required.",
      }),

    serviceId: Joi.object({
      // Change from UUIDCompanion.schema to a Joi.object validation
      uuid: UUIDCompanion.schema.label("Service ID"),
    }).required(),

    hourlyRate: Joi.number().min(0).precision(2).optional().messages({
      "number.base": "Hourly rate must be a number.",
      "number.min": "Hourly rate cannot be less than {{#limit}}.",
    }),

    responseTimeHours: ResponseTimeTypeCompanion.schema.optional().allow(null).messages({
      "any.only": "Response time must be a valid value.",
    }),

    comment: Joi.string().trim().max(1000).optional().allow("", null).messages({
      "string.base": "Comment must be text.",
      "string.max": "Comment cannot exceed {#limit} characters.",
    }),
  })
    .required()
    .unknown(false)
    .prefs({ abortEarly: false, convert: true });

  export const querySchema: Joi.ObjectSchema<UpsertDeveloperServiceQuery> = Joi.object({}).unknown(false);
}
