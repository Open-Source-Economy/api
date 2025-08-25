import Joi from "joi";

export enum IncomeStreamType {
  ROYALTIES = "royalties",
  SERVICES = "services",
  DONATIONS = "donations",
}

export namespace IncomeStreamTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(IncomeStreamType))
    .messages({
      "any.only": "{{#label}} must be a valid income stream type (e.g., royalties, services, donations)",
      "string.empty": "Income stream type cannot be empty",
      "string.trim": "Income stream type cannot consist only of spaces",
      "any.required": "Income stream type is required", // Added for clarity if used with .required()
    });
}
