import { DeveloperProjectItem, DeveloperRoleType, MergeRightsType, OwnerId, ProjectItem, ProjectItemType, RepositoryId } from "../../../model";

export interface UpsertDeveloperProjectItemParams {}

export interface UpsertDeveloperProjectItemBody {
  projectItemType: ProjectItemType;
  sourceIdentifier: OwnerId | RepositoryId | string; // string being an url
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  comments?: string;
}

export interface UpsertDeveloperProjectItemQuery {}

export interface UpsertDeveloperProjectItemResponse {
  projectItem: ProjectItem;
  developerProjectItem: DeveloperProjectItem;
}
