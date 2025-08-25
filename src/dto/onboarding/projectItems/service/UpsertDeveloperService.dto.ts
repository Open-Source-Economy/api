import { DeveloperServiceTODOChangeName } from "../../profile";
import { DeveloperService, ResponseTimeTypeCompanion, UUIDCompanion } from "../../../../model";
import Joi from "joi";

export interface UpsertDeveloperServiceParams {}
export interface UpsertDeveloperServiceBody {
  developerService: DeveloperServiceTODOChangeName;
}
export interface UpsertDeveloperServiceQuery {}
export interface UpsertDeveloperServiceResponse {
  developerService: DeveloperService;
}

export namespace UpsertDeveloperServiceCompanion {
  export const paramsSchema: Joi.ObjectSchema<UpsertDeveloperServiceParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<UpsertDeveloperServiceBody> = Joi.object({
    developerService: Joi.object({
      serviceId: UUIDCompanion.schema.label("Service ID"),
      projectItemIds: Joi.array().items(UUIDCompanion.schema.label("Project Item ID")).required().messages({
        "array.base": "Project item IDs must be an array",
        "array.empty": "Project item IDs cannot be empty",
        "any.required": "Project item IDs are required",
      }),
      hourlyRate: Joi.number().min(0).optional().messages({
        "number.base": "Hourly rate must be a number",
        "number.min": "Hourly rate cannot be less than {{#limit}}",
      }),
      responseTimeHours: ResponseTimeTypeCompanion.schema.optional().messages({
        "any.required": "Response time is required",
      }),
      comments: Joi.string().trim().allow("").optional().messages({
        "string.trim": "Comments cannot consist only of spaces",
      }),
    })
      .required()
      .messages({
        "object.base": "Developer service details must be an object",
        "any.required": "Developer service details are required",
      }),
  });

  export const querySchema: Joi.ObjectSchema<UpsertDeveloperServiceQuery> = Joi.object({});
}
