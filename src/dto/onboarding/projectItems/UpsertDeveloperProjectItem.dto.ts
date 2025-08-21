import { DeveloperProjectItem, DeveloperRoleType, MergeRightsType, OwnerId, ProjectItem, ProjectItemType, RepositoryId } from "../../../model";

export interface UpsertDeveloperProjectItemParams {}

export interface UpsertDeveloperProjectItemBody {
  projectItemType: ProjectItemType;
  sourceIdentifier: OwnerId | RepositoryId | string; // string being an url
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
}

export interface UpsertDeveloperProjectItemQuery {
  projectItem: ProjectItem;
  developerProjectItem: DeveloperProjectItem;
}

export interface UpsertDeveloperProjectItemResponse {}
