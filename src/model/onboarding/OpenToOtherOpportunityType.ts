import Joi from "joi";

export enum OpenToOtherOpportunityType {
  YES = "yes",
  MAYBE = "maybe",
  NO = "no",
}

export namespace OpenToOtherOpportunityTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(OpenToOtherOpportunityType))
    .messages({
      "any.only": "{{#label}} must be a valid opportunity type (e.g., yes, maybe, no)",
      "string.empty": "Opportunity type cannot be empty",
      "string.trim": "Opportunity type cannot consist only of spaces",
      "any.required": "Opportunity type is required",
    });
}
