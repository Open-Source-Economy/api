import { DeveloperProfile, DeveloperProjectItem, DeveloperService, DeveloperSettings, ProjectItem, ProjectItemId, Service, ServiceId } from "../../../model";

export interface GetDeveloperProfileParams {}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: FullDeveloperProfile | null;
}

export interface FullDeveloperProfile {
  name: string | null; // TODO: should not be here
  email: string | null; // TODO: should not be here
  agreedToTerms: boolean | null; // TODO: should not be here
  profile: DeveloperProfile | null;
  settings: DeveloperSettings | null;
  projects: [ProjectItem, DeveloperProjectItem][];
  services: [ServiceId, DeveloperServiceTODOChangeName][];
}

export interface DeveloperServiceTODOChangeName {
  serviceId: ServiceId;
  projectItemIds: ProjectItemId[];
  hourlyRate?: number;
  responseTimeHours?: number;
}
