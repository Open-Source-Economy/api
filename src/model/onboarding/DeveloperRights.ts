import { ValidationError, Validator } from "../error";
import { UUID } from "../UUID";
import { MergeRights } from "./DeveloperProjectItem";
import { DeveloperProfileId } from "./DeveloperProfile";
import { ProjectItemId } from "../project";

export class DeveloperRightsId extends UUID {}

export enum DeveloperRoleType {
  CREATOR_FOUNDER = "creator_founder",
  PROJECT_LEAD = "project_lead",
  CORE_DEVELOPER = "core_developer",
  MAINTAINER = "maintainer",
}

export enum MergeRightsType {
  FULL_RIGHTS = "full_rights",
  NO_RIGHTS = "no_rights",
  FORMAL_PROCESS = "formal_process",
}
export interface DeveloperRights {
  id: DeveloperRightsId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperRightsCompanion {
  export function fromBackend(row: any): DeveloperRights | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const projectItemId = validator.requiredString("project_item_id");
    const mergeRights = validator.requiredArrayOfEnums("merge_rights", Object.values(MergeRightsType) as MergeRightsType[]);
    const roles = validator.requiredArrayOfEnums("roles", Object.values(DeveloperRoleType) as DeveloperRoleType[]);
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperRightsId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      projectItemId: new ProjectItemId(projectItemId),
      mergeRights,
      roles,
      createdAt,
      updatedAt,
    };
  }
}
