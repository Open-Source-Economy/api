import { DeveloperRoleType, MergeRightsType } from "../../model";

export interface AddRepositoryParams {}

export interface AddRepositoryBody {
  githubOwnerId: number; // TODO: We need to pick between id an name
  githubOwnerLogin: string; // TODO: We need to pick between id an name
  githubRepositoryId: number; // TODO: We need to pick between id an name
  githubRepositoryName: string; // TODO: We need to pick between id an name
  mergeRights: MergeRightsType[];
  roles: DeveloperRoleType[];
  services?: AddRepositoryServiceDto[];
}

export interface AddRepositoryQuery {}
/// --- TODO: lolo
export interface AddRepositoryServiceDto {
  serviceId: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number | null;
}

export interface AddRepositoryResponse {}

export interface AddRepositoryServiceParams {}

export interface AddRepositoryServiceBody {
  serviceId: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number | null;
}

export interface AddRepositoryServiceQuery {}

export interface AddRepositoryServiceResponse {}
