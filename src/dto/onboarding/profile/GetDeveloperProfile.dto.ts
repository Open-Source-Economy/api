import { DeveloperProfile, DeveloperProjectItem, DeveloperService, DeveloperSettings, ProjectItem, Service } from "../../../model";

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

// export interface FullDeveloperProfile {
//   // name: string | null; // TODOshould no be here
//   // email: string | null;
//   profile: DeveloperProfile;
//   settings: DeveloperSettings
//   projects: [ProjectItem, DeveloperProjectItem][];
//   incomePreference: DeveloperIncomePreference | null;
//   availability: DeveloperRights | null;
//   services: DeveloperServiceWithCategory[];
// }

export interface DeveloperServiceWithCategory extends DeveloperService {
  service: Service;
  projectItems: ProjectItem[];
}
