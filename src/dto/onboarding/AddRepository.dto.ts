import { DeveloperRoleType, MergeRightsType } from "../../model";

export interface AddRepositoryDto {
  githubOwnerId: number; // TODO: We need to pick between id an name
  githubOwnerLogin: string; // TODO: We need to pick between id an name
  githubRepositoryId: number; // TODO: We need to pick between id an name
  githubRepositoryName: string; // TODO: We need to pick between id an name
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  services?: AddRepositoryServiceDto[];
}

export interface AddRepositoryServiceDto {
  serviceId: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number | null;
}
