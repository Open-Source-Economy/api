import Joi from "joi";

export enum ProjectItemType {
  GITHUB_REPOSITORY = "GITHUB_REPOSITORY",
  GITHUB_OWNER = "GITHUB_OWNER",
  URL = "URL",
}

export namespace ProjectItemTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(ProjectItemType))
    .messages({
      "any.only": "{{#label}} must be a valid project item type (e.g., GITHUB_REPOSITORY, GITHUB_OWNER, URL)",
      "string.empty": "Project item type cannot be empty",
      "string.trim": "Project item type cannot consist only of spaces",
      "any.required": "Project item type is required",
    });
}
