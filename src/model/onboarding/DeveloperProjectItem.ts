import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ProjectCategory, ProjectItemId } from "../project";
import { DeveloperRoleType } from "./DeveloperRoleType";
import { MergeRightsType } from "./MergeRightsType";

export class DeveloperProjectItemId extends UUID {}

/**
 * Represents a developer's relationship with a specific project item (repository or organization).
 * Contains information about their role, permissions, and contribution details.
 *
 * Verification information is now stored separately in VerificationRecord table.
 */
export interface DeveloperProjectItem {
  id: DeveloperProjectItemId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
  comment?: string;
  customCategories?: string[];
  predefinedCategories?: ProjectCategory[];
  createdAt: Date;
  updatedAt: Date;
}
