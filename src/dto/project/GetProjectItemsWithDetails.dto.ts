import { Owner, Repository, ProjectItem, DeveloperProfile, DeveloperProjectItem } from "../../model";

export interface ProjectItemWithDetails {
  projectItem: ProjectItem;
  owner: Owner | null;
  repository: Repository | null;
  developers: Array<{
    developerProfile: DeveloperProfile;
    developerProjectItem: DeveloperProjectItem;
    developerOwner: Owner;
  }>;
}

export interface GetProjectItemsWithDetailsParams {}

export interface GetProjectItemsWithDetailsResponse {
  projectItems: ProjectItemWithDetails[];
}

export interface GetProjectItemsWithDetailsBody {}

export interface GetProjectItemsWithDetailsQuery {}
