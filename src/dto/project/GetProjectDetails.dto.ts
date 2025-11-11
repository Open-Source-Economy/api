import Joi from "joi";
import {
  DeveloperProfileEntry,
  DeveloperProfileId,
  DeveloperProjectItemEntry,
  DeveloperService,
  DeveloperSettings,
  ProjectItemDetails,
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
  services: Record<string, DeveloperService>;
}

export interface ProjectServiceOffering {
  /**
   * Developer offering this variant of the service.
   */
  developer: DeveloperProfileId;
  /**
   * Developer-specific settings for this service (rate, response time, comment, linked project items).
   */
  developerService: DeveloperService | null;
}

export interface GetProjectDetailsResponse {
  project: ProjectItemDetails;

  /**
   * Developers associated with the project and their services.
   */
  developers: Record<string, ProjectDeveloperProfile>;

  /**
   * Aggregated view of services provided across all maintainers for this project.
   * Grouped by Service, while retaining per-developer variants (response time, pricing, etc.).
   */
  service: Service[];

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
