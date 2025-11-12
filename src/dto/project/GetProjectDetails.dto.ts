import Joi from "joi";
import {
  DeveloperProfileEntry,
  DeveloperProfileId,
  DeveloperProjectItemEntry,
  DeveloperService,
  DeveloperSettings,
  ProjectItemDetails,
  ResponseTimeType,
  Service,
} from "../../model";

export interface GetProjectDetailsParams {
  owner: string;
  repo?: string;
}

export interface ProjectDeveloperProfile {
  profileEntry: DeveloperProfileEntry | null;
  settings: DeveloperSettings | null;
  projects: DeveloperProjectItemEntry[];
  /**
   * Keyed by ServiceId UUID to allow direct lookup of a developer’s configuration for a given service.
   */
  services: Record<string, DeveloperService>;
}

export interface ProjectServiceOffering {
  responseTimeHours?: [ResponseTimeType, DeveloperProfileId][];
}

export interface GetProjectDetailsResponse {
  project: ProjectItemDetails;

  /**
   * Developers associated with the project and their services.
   */
  /**
   * Keyed by DeveloperProfileId UUID (falls back to the developer profile UUID when no public profile entry exists).
   */
  developers: Record<string, ProjectDeveloperProfile>;

  /**
   * Aggregated view of services provided across all maintainers for this project.
   * Grouped by Service, while retaining per-developer variants (response time, pricing, etc.).
   */
  service: Service[];
  /**
   * Map keyed by ServiceId UUID. Every service present in `service` has a matching entry here whose array
   * enumerates the developer-specific variants for that service.
   */
  serviceOfferings: Record<string, ProjectServiceOffering[]>;
}

export interface GetProjectDetailsBody {}

export interface GetProjectDetailsQuery {}

export namespace GetProjectDetailsCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetProjectDetailsParams> = Joi.object({
    owner: Joi.string().required().messages({
      "string.base": "Owner must be a string",
      "any.required": "Owner parameter is required",
      "string.empty": "Owner parameter cannot be empty",
    }),
    repo: Joi.string().optional().messages({
      "string.base": "Repository name must be a string",
      "string.empty": "Repository name parameter cannot be empty",
    }),
  });

  export const bodySchema: Joi.ObjectSchema<GetProjectDetailsBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetProjectDetailsQuery> = Joi.object({});
}
