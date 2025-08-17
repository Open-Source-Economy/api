import { UUID } from "../UUID";
import { ValidationError, Validator } from "../error";
import { DeveloperProfileId, DeveloperProjectId, DeveloperProjectItem, MergeRights, ProjectRole, ProjectType } from "../onboarding";

export enum ProjectItemType {
  GITHUB_REPOSITORY = "GITHUB_REPOSITORY",
  GITHUB_OWNER = "GITHUB_OWNER",
  URL = "URL",
}

export class ProjectItemId extends UUID {}

export interface ProjectItem {
  id: ProjectItemId;
  projectId: string | null;
  projectItemType: ProjectItemType;
  githubOwnerId?: number | null; // TODO: improve type
  githubOwnerLogin?: string | null;
  githubRepositoryId?: number | null;
  githubRepositoryName?: string | null;
  url?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export namespace ProjectItemCompanion {
  // export function fromBackend(row: any): DeveloperProjectItem | ValidationError {
  //     const validator = new Validator(row);
  //     const id = validator.requiredString("id");
  //     const developerProfileId = validator.requiredString("developer_profile_id");
  //     const projectItemId = validator.requiredString("TODO");
  //     const projectType = validator.requiredEnum("project_type", Object.values(ProjectType) as ProjectType[]);
  //     const role = validator.requiredEnum("role", Object.values(ProjectRole) as ProjectRole[]);
  //     const mergeRights = validator.requiredEnum("merge_rights", Object.values(MergeRights) as MergeRights[]);
  //     const createdAt = validator.requiredDate("created_at");
  //     const updatedAt = validator.requiredDate("updated_at");
  //
  //     const error = validator.getFirstError();
  //     if (error) {
  //         return error;
  //     }
  //
  //     return {
  //         id: new DeveloperProjectId(id),
  //         developerProfileId: new DeveloperProfileId(developerProfileId),
  //         projectItemId: new ProjectItemId(projectItemId)
  //         role,
  //         mergeRights,
  //         createdAt,
  //         updatedAt,
  //     };
  // }
}
