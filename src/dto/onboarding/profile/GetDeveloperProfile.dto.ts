import { DeveloperProfile, DeveloperService } from "../../../model";
import { DeveloperProject } from "../../../model/onboarding/old/DeveloperProject";
import { DeveloperIncomePreference } from "../../../model/onboarding/old/DeveloperIncomePreference";
import { DeveloperAvailability } from "../../../model/onboarding/old/DeveloperAvailability";
import { ServiceCategory } from "../../../model/onboarding/old/ServiceCategory";

export interface GetDeveloperProfileParams {}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: DeveloperProfile;
  projects: DeveloperProject[];
  incomePreference: DeveloperIncomePreference | null;
  availability: DeveloperAvailability | null;
  services: DeveloperServiceWithCategory[];
}

// TODO: lolo delet

export interface GetDeveloperProfileDto {
  profile: DeveloperProfile;
  projects: DeveloperProject[];
  incomePreference: DeveloperIncomePreference | null;
  availability: DeveloperAvailability | null;
  services: DeveloperServiceWithCategory[];
}

export interface DeveloperServiceWithCategory extends DeveloperService {
  serviceCategory: ServiceCategory;
  projects: DeveloperProject[];
}

export interface ServiceCategoryDto {
  id: string;
  name: string;
  parentCategory: string | null;
  hasResponseTime: boolean;
}
