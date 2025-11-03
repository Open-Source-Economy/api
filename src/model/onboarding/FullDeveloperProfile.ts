import { DeveloperProfile } from "./DeveloperProfile";
import { DeveloperProjectItem } from "./DeveloperProjectItem";
import { DeveloperService } from "./DeveloperService";
import { DeveloperSettings } from "./DeveloperSettings";
import { VerificationRecord } from "./VerificationRecord";
import { ProjectItem, Service } from "../project";

/**
 * Developer profile entry combining the profile with its verification history
 */
export interface DeveloperProfileEntry {
  profile: DeveloperProfile;

  /**
   * Verification records for this profile.
   * Provides current status and full history.
   * Most recent record represents current status.
   */
  verificationRecords: VerificationRecord[];
}

/**
 * Complete developer profile with all related data.
 * Used for onboarding, admin views, and profile displays.
 *
 * All verification information is contained within each entry (profile and projects).
 */
export interface FullDeveloperProfile {
  name: string | null;
  contactEmail: string | null;
  agreedToTerms: boolean | null;
  profileEntry: DeveloperProfileEntry | null;
  settings: DeveloperSettings | null;
  projects: DeveloperProjectItemEntry[];
  services: DeveloperServiceEntry[];
}

/**
 * Developer project item entry combining the project and developer's relationship to it
 */
export interface DeveloperProjectItemEntry {
  projectItem: ProjectItem;
  developerProjectItem: DeveloperProjectItem;

  /**
   * Verification records for this specific project item.
   * Provides current status and full history for this project.
   */
  verificationRecords?: VerificationRecord[];
}

/**
 * Developer service entry combining the service definition and developer's offering
 */
export interface DeveloperServiceEntry {
  service: Service;
  developerService: DeveloperService | null;
}
