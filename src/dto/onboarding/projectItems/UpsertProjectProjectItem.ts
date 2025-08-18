import { DeveloperRoleType, MergeRightsType, Owner, OwnerId, ProjectItemType, Repository, RepositoryId } from "../../../model";

export interface UpsertProjectProjectItemParams {}

// Only defined parameters will be updated
export interface UpsertProjectProjectItemBody {
  projectItemType: ProjectItemType;
  projectItemId: OwnerId | RepositoryId | string; // string being an url
  mergeRights?: MergeRightsType[];
  roles?: DeveloperRoleType[];
  services?: UpsertProjectProjectItemServiceDto[];
}

export interface UpsertProjectProjectItemQuery {}

/// --- TODO: lolo
export interface UpsertProjectProjectItemServiceDto {
  serviceId: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number | null;
}
