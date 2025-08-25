import Joi from "joi";

export interface UpdateDeveloperContactInfosParams {}

export interface UpdateDeveloperContactInfosBody {
  name: string;
  email: string;
}

export interface UpdateDeveloperContactInfosQuery {}

export interface UpdateDeveloperContactInfosResponse {}

export namespace UpdateDeveloperContactInfosCompanion {
  export const paramsSchema: Joi.ObjectSchema<UpdateDeveloperContactInfosParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<UpdateDeveloperContactInfosBody> = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name must contain at least one character",
      "string.trim": "Name cannot consist only of spaces",
      "any.required": "Name is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email address",
      "string.trim": "Email cannot consist only of spaces",
      "any.required": "Email is required",
    }),
  });

  export const querySchema: Joi.ObjectSchema<UpdateDeveloperContactInfosQuery> = Joi.object({});
}
