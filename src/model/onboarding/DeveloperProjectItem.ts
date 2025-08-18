import { ValidationError, Validator } from "../error";
import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ProjectItemId } from "../project";

export class DeveloperProjectItemId extends UUID {}

export enum ProjectType {
  GITHUB = "github",
  MANUAL = "manual",
}

export enum DeveloperRoleType {
  CREATOR_FOUNDER = "creator_founder",
  PROJECT_LEAD = "project_lead",
  CORE_DEVELOPER = "core_developer",
  MAINTAINER = "maintainer",
}

export enum MergeRightsType {
  FULL_RIGHTS = "full_rights",
  SPECIFIC_AREAS = "specific_areas",
  NO_RIGHTS = "no_rights",
  FORMAL_PROCESS = "formal_process",
}

export interface DeveloperProjectItem {
  id: DeveloperProjectItemId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperProjectCompanion {
  export function fromBackend(row: any): DeveloperProjectItem | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const projectItemId = validator.requiredString("project_item_id");
    const roles = validator.requiredArrayOfEnums("role", Object.values(DeveloperRoleType) as DeveloperRoleType[]);
    const mergeRights = validator.requiredArrayOfEnums("merge_rights", Object.values(MergeRightsType) as MergeRightsType[]);
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperProjectItemId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      projectItemId: new ProjectItemId(projectItemId),
      roles,
      mergeRights,
      createdAt,
      updatedAt,
    };
  }
}
