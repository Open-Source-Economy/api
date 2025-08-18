import { DeveloperRoleType, MergeRightsType, Owner, OwnerId, ProjectItemType, Repository, RepositoryId } from "../../../model";

export interface UpsertDeveloperProjectItemParams {}

export interface UpsertDeveloperProjectItemBody {
  projectItemType: ProjectItemType;
  sourceIdentifier: OwnerId | RepositoryId | string; // string being an url
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
}

export interface UpsertDeveloperProjectItemQuery {}

export interface UpsertDeveloperProjectItemResponse {}
