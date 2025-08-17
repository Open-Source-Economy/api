import { DeveloperProfile, DeveloperService, Project, ProjectItem, ProjectItemId, Service } from "../../../model";
import { DeveloperProjectItem } from "../../../model/onboarding/DeveloperProjectItem";
import { DeveloperIncomePreference } from "../../../model/onboarding/old/DeveloperIncomePreference";
import { DeveloperAvailability } from "../../../model/onboarding/old/DeveloperAvailability";
import { ServiceCategory } from "../../../model/onboarding/old/ServiceCategory";

export interface GetDeveloperProfileParams {}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: DeveloperProfileTODO | null;
}

export interface DeveloperProfileTODO {
  profile: DeveloperProfile;
  projects: [ProjectItem, DeveloperProjectItem][];
  incomePreference: DeveloperIncomePreference | null;
  availability: DeveloperAvailability | null;
  services: DeveloperServiceWithCategory[];
}

export interface DeveloperServiceWithCategory extends DeveloperService {
  service: Service;
  projectItems: ProjectItem[];
}

export interface ServiceCategoryDto {
  id: string;
  name: string;
  parentCategory: string | null;
  hasResponseTime: boolean;
}
