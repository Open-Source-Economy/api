import Joi from "joi";

export enum DeveloperRoleType {
  CREATOR_FOUNDER = "creator_founder",
  PROJECT_LEAD = "project_lead",
  CORE_DEVELOPER = "core_developer",
  MAINTAINER = "maintainer",
}

export namespace DeveloperRoleTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(DeveloperRoleType))
    .messages({
      "any.only": "{{#label}} must be a valid developer role type",
      "string.empty": "Developer role type cannot be empty",
      "string.trim": "Developer role type cannot consist only of spaces",
      "any.required": "Developer role type is required",
    });
}
