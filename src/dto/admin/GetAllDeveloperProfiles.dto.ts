import Joi from "joi";
import { FullDeveloperProfile, VerificationStatus } from "../../model";

export interface GetAllDeveloperProfilesParams {}

/**
 * Query parameters for filtering and searching developer profiles
 */
export interface GetAllDeveloperProfilesQuery {
  /**
   * Filter profiles by verification status
   * If provided, returns profiles where either:
   * - The profile has this verification status, OR
   * - Any of the developer's project items have this verification status
   *
   * Common use cases:
   * - PENDING_REVIEW: Find new profiles awaiting initial review
   * - INFORMATION_REQUESTED: Find profiles where admin needs developer response
   * - CHANGES_REQUESTED: Find profiles that need corrections
   * - APPROVED: Find fully verified profiles
   *
   * If not provided, returns all profiles regardless of status
   */
  verificationStatus?: VerificationStatus;

  /**
   * Search term to filter profiles
   * Searches across:
   * - Developer name (case-insensitive)
   * - Developer contact email (case-insensitive)
   * - Developer GitHub login/username (case-insensitive)
   * - Project names/URLs (case-insensitive)
   *
   * @example "john" - finds developers named John or projects containing "john"
   * @example "@gmail.com" - finds all developers with Gmail addresses
   * @example "octocat" - finds developer with GitHub login "octocat"
   * @example "react" - finds developers working on React-related projects
   */
  searchTerm?: string;
}

export interface GetAllDeveloperProfilesResponse {
  profiles: FullDeveloperProfile[];
}

export namespace GetAllDeveloperProfilesCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetAllDeveloperProfilesParams> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetAllDeveloperProfilesQuery> = Joi.object({
    verificationStatus: Joi.string()
      .valid(...Object.values(VerificationStatus))
      .optional(),
    searchTerm: Joi.string().optional(),
  });
}
