import { DeveloperProfile, DeveloperProjectItem, DeveloperSettings, ProjectItem, ProjectItemId, ResponseTimeType, Service, ServiceId } from "../../../model";
import Joi from "joi";

export interface GetDeveloperProfileParams {}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: FullDeveloperProfile | null;
}

export interface FullDeveloperProfile {
  name: string | null; // TODO: should not be here
  contactEmail: string | null;
  agreedToTerms: boolean | null;
  profile: DeveloperProfile | null;
  settings: DeveloperSettings | null;
  projects: [ProjectItem, DeveloperProjectItem][];
  services: [Service, DeveloperServiceTODOChangeName | null][];
}

export interface DeveloperServiceTODOChangeName {
  serviceId: ServiceId;
  projectItemIds: ProjectItemId[];
  hourlyRate?: number;
  responseTimeHours?: ResponseTimeType;
  comments?: string;
}

export namespace GetDeveloperProfileCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetDeveloperProfileParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<GetDeveloperProfileBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetDeveloperProfileQuery> = Joi.object({});
}
