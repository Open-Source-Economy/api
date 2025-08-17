import { ValidationError, Validator } from "../../error";
import { DeveloperProfileId } from "../DeveloperProfile";
import { UUID } from "../../UUID";

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

export interface DeveloperProject {
  id: DeveloperProjectId;
  developerProfileId: DeveloperProfileId;
  projectType: ProjectType;
  githubOrg: string | null; // TODO: lolo use the Id type
  githubRepo: string | null;
  projectName: string | null;
  projectUrl: string | null;
  role: ProjectRole;
  mergeRights: MergeRights;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperProjectCompanion {
  export function fromBackend(row: any): DeveloperProject | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const projectType = validator.requiredEnum("project_type", Object.values(ProjectType) as ProjectType[]);
    const githubOrg = validator.optionalString("github_org");
    const githubRepo = validator.optionalString("github_repo");
    const projectName = validator.optionalString("project_name");
    const projectUrl = validator.optionalString("project_url");
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
      projectType,
      githubOrg: githubOrg ?? null,
      githubRepo: githubRepo ?? null,
      projectName: projectName ?? null,
      projectUrl: projectUrl ?? null,
      role,
      mergeRights,
      createdAt,
      updatedAt,
    };
  }
}
