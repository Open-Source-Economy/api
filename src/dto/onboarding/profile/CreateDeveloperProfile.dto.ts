import Joi from "joi";

export interface CreateDeveloperProfileParams {}

export interface CreateDeveloperProfileBody {
  name: string;
  email: string;
  agreedToTerms: boolean;
}

export interface CreateDeveloperProfileQuery {}

export interface CreateDeveloperProfileResponse {}

export namespace CreateDeveloperProfileCompanion {
  export const paramsSchema: Joi.ObjectSchema<CreateDeveloperProfileParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<CreateDeveloperProfileBody> = Joi.object({
    name: Joi.string().trim().min(1).required().messages({
      "string.empty": "Name cannot be empty",
      "string.min": "Name must contain at least one character",
      "string.trim": "Name cannot consist only of spaces",
      "any.required": "Name is required",
    }),
    email: Joi.string()
      .trim()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email cannot be empty",
        "string.email": "Email must be a valid email address",
        "string.trim": "Email cannot consist only of spaces",
        "any.required": "Email is required",
      }),
    agreedToTerms: Joi.boolean().truthy().required().messages({
      "boolean.base": "You must agree to the terms and conditions",
      "any.truthy": "You must agree to the terms and conditions",
      "any.required": "Agreement to terms is required",
    }),
  });

  export const querySchema: Joi.ObjectSchema<CreateDeveloperProfileQuery> = Joi.object({});
}
