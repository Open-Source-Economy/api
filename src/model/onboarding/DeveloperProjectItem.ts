import { ValidationError, Validator } from "../error";
import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ProjectItemId } from "../project";

export class DeveloperProjectId extends UUID {}

export enum ProjectType {
  GITHUB = "github",
  MANUAL = "manual",
}

export enum ProjectRole {
  CREATOR_FOUNDER = "creator_founder",
  PROJECT_LEAD = "project_lead",
  CORE_DEVELOPER = "core_developer",
  MAINTAINER = "maintainer",
}

export enum MergeRights {
  FULL_RIGHTS = "full_rights",
  SPECIFIC_AREAS = "specific_areas",
  NO_RIGHTS = "no_rights",
  FORMAL_PROCESS = "formal_process",
}

export interface DeveloperProjectItem {
  id: DeveloperProjectId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  role: ProjectRole;
  mergeRights: MergeRights;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperProjectCompanion {
  export function fromBackend(row: any): DeveloperProjectItem | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const projectItemId = validator.requiredString("TODO");
    const role = validator.requiredEnum("role", Object.values(ProjectRole) as ProjectRole[]);
    const mergeRights = validator.requiredEnum("merge_rights", Object.values(MergeRights) as MergeRights[]);
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperProjectId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      projectItemId: new ProjectItemId(projectItemId),
      role,
      mergeRights,
      createdAt,
      updatedAt,
    };
  }
}
