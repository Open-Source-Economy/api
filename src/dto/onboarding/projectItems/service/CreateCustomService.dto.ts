import Joi from "joi";

export interface CreateCustomServiceParams {}
export interface CreateCustomServiceBody {
  name: string;
  description: string;
  hasResponseTime?: boolean;
}
export interface CreateCustomServiceQuery {}
export interface CreateCustomServiceResponse {}

export namespace CreateCustomServiceCompanion {
  export const paramsSchema: Joi.ObjectSchema<CreateCustomServiceParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<CreateCustomServiceBody> = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
      "string.empty": "Service name cannot be empty",
      "string.min": "Service name must contain at least one character",
      "string.trim": "Service name cannot consist only of spaces",
      "any.required": "Service name is required",
    }),
    description: Joi.string().trim().min(1).required().messages({
      "string.empty": "Service description cannot be empty",
      "string.min": "Service description must contain at least one character",
      "string.trim": "Service description cannot consist only of spaces",
      "any.required": "Service description is required",
    }),
    hasResponseTime: Joi.boolean().optional().messages({
      "boolean.base": "Has response time must be a boolean",
    }),
  });

  export const querySchema: Joi.ObjectSchema<CreateCustomServiceQuery> = Joi.object({});
}
