import { DeveloperProfile, DeveloperService, Project, ProjectItem, ProjectItemId, Service } from "../../../model";
import { DeveloperProjectItem } from "../../../model";

export interface GetDeveloperProfileParams {}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: FullDeveloperProfile | null;
}

export interface FullDeveloperProfile {
  profile: DeveloperProfile;
  projects: [ProjectItem, DeveloperProjectItem][];
  // incomePreference: DeveloperIncomePreference | null;
  // availability: DeveloperAvailability | null;
  services: DeveloperServiceWithCategory[];
}

export interface DeveloperServiceWithCategory extends DeveloperService {
  service: Service;
  projectItems: ProjectItem[];
}
