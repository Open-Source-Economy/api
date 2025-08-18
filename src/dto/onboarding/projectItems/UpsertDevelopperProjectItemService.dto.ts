import { ProjectItemId } from "../../../model";

export interface UpsertDeveloperProjectItemServiceParams {}

// Only defined parameters will be updated (TODO: for now mergeRights and has to be defined together)
export interface UpsertDeveloperProjectItemServiceBody {
  projectItemIds: ProjectItemId[];
  services?: UpsertDeveloperProjectItemServiceServiceDto[];
}

export interface UpsertDeveloperProjectItemServiceQuery {}

export interface UpsertDeveloperProjectItemServiceResponse {}

/// --- TODO: lolo
export interface UpsertDeveloperProjectItemServiceServiceDto {
  serviceId: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number | null;
}
