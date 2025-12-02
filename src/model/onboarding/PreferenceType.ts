import Joi from "joi";

export enum PreferenceType {
  YES = "yes",
  MAYBE_LATER = "maybe_later",
  NOT_INTERESTED = "not_interested",
}

export namespace PreferenceTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(PreferenceType))
    .messages({
      "any.only": "{{#label}} must be a valid preference type (yes, maybe_later, not_interested)",
      "string.empty": "Preference type cannot be empty",
      "string.trim": "Preference type cannot consist only of spaces",
      "any.required": "Preference type is required",
    });
}
