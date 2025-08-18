import { UUID } from "../UUID";
import { ValidationError, Validator } from "../error";
import { DeveloperProfileId, DeveloperProjectId, DeveloperProjectItem, MergeRights, ProjectRole, ProjectType } from "../onboarding";
import { OwnerId, RepositoryId } from "../github";

export enum ProjectItemType {
  GITHUB_REPOSITORY = "GITHUB_REPOSITORY",
  GITHUB_OWNER = "GITHUB_OWNER",
  URL = "URL",
}

export class ProjectItemId extends UUID {}

export interface ProjectItem {
  id: ProjectItemId;
  projectItemType: ProjectItemType;
  sourceIdentifier: OwnerId | RepositoryId | string; // string being an url
  createdAt: Date;
  updatedAt: Date;
}
