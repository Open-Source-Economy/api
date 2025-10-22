import Joi from "joi";

export enum MergeRightsType {
  // No merge rights or permissions
  NONE = "none",

  // Can review and approve pull requests but cannot merge them
  REVIEWER = "reviewer",

  // Can merge into specific, non-critical branches (e.g., docs, feature branches)
  LIMITED = "limited",

  // // Can merge into a specific, well-defined module or part of the codebase
  // MAINTAINER = "maintainer",

  // Has full merge rights to the entire project's repository
  FULL_COMMITTER = "full_committer",

  // // A specialized maintainer responsible for a specific component or subsystem
  // SUBSYSTEM_MAINTAINER = "subsystem_maintainer",
  //
  // // A committer with rights delegated for a specific task or limited scope
  // DELEGATED_COMMITTER = "delegated_committer",
  //
  // Can propose a merge but it requires a majority vote from other committers
  VOTE_BASED_COMMITTER = "vote_based_committer",

  // A senior committer with temporary rights to manage a final release
  RELEASE_MANAGER = "release_manager",

  // Former committer who no longer has active merge rights
  EMERITUS = "emeritus",
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
