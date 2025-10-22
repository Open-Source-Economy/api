import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ProjectItemId } from "../project";
import { DeveloperRoleType } from "./DeveloperRoleType";
import { MergeRightsType } from "./MergeRightsType";

export class DeveloperProjectItemId extends UUID {}

export interface DeveloperProjectItem {
  id: DeveloperProjectItemId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
