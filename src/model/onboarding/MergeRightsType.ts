import Joi from "joi";

export enum MergeRightsType {
  FULL_RIGHTS = "full_rights",
  SPECIFIC_AREAS = "specific_areas",
  NO_RIGHTS = "no_rights",
  FORMAL_PROCESS = "formal_process",
}

export namespace MergeRightsTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(MergeRightsType))
    .messages({
      "any.only": "{{#label}} must be a valid merge rights type",
      "string.empty": "Merge rights type cannot be empty",
      "string.trim": "Merge rights type cannot consist only of spaces",
      "any.required": "Merge rights type is required",
    });
}
