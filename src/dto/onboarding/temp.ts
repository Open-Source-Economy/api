// src/api/dto/onboarding.ts

import { Currency, DeveloperRights, DeveloperService, DeveloperSettings, IncomeStreamType, OpenToOtherOpportunityType } from "../../model";

// export interface ResponseBody<T> {
//     success?: T;
//     error?: string;
// }
//
// export interface CreateDeveloperProfileDto {
//     name?: string;
//     email?: string;
//     onboardingCompleted?: boolean;
// }
//
// export interface UpdateDeveloperProfileDto {
//     name?: string;
//     email?: string;
//     onboardingCompleted?: boolean;
// }
//
// export interface SetDeveloperSettingsDto {
//     incomeStreams: IncomeStreamType[];
//     hourlyWeeklyCommitment: number;
//     openToOtherOpportunity: OpenToOtherOpportunityType;
//     hourlyRate: number;
//     currency: Currency;
// }
//
// export interface SetIncomeStreamsDto {
//     incomeStreams: IncomeStreamType[];
// }
//
// export interface AddRepositoryDto {
//     githubOwnerLogin: string;
//     githubOwnerId: number;
//     githubRepositoryName: string;
//     githubRepositoryId: number;
//     roles: string[];
//     mergeRights: string[];
//     services: {
//         serviceId: number;
//         hourlyRate: number;
//         currency: string;
//         responseTimeHours: number;
//     }[];
// }
//
// export interface UpdateDeveloperRightsDto {
//     roles?: string[];
//     mergeRights?: string[];
// }
//
export interface CreateCustomServiceDto {
  name: string;
  hasResponseTime?: boolean;
}
//
export interface AddDeveloperServiceDto {
  projectItemId: string;
  serviceId: string;
  hourlyRate: number;
  currency: Currency;
  responseTimeHours: number;
}

export interface UpdateDeveloperServiceDto {
  hourlyRate: number;
  currency: Currency;
  responseTimeHours?: number;
}

// --- Response DTOs ---

export interface CreateDeveloperProfileResponse {
  id: string;
  onboardingCompleted: boolean;
}

export interface UpdateDeveloperProfileResponse {
  id: string;
  onboardingCompleted: boolean;
}

export interface GetDeveloperProfileResponse {}

export interface AddRepositoryResponse {
  projectItemId: string;
  repository: string;
}

export interface RemoveRepositoryResponse {}

export interface GetRepositoriesResponse {
  projectItemId: string;
  repository: string | null;
  roles: string[];
  mergeRights: string[];
  services: DeveloperService[];
}

class GitHubOrganization {}

export interface GetGithubOrganizationsResponse {
  data: GitHubOrganization[];
}

class GitHubRepository {}

export interface GetGithubRepositoriesResponse {
  data: GitHubRepository[];
}

export interface UpdateDeveloperRightsResponse extends DeveloperRights {}

export interface GetServicesResponse {
  data: any; // You would replace 'any' with the specific service hierarchy DTO
}

export interface CreateCustomServiceResponse {}

export interface AddDeveloperServiceResponse extends DeveloperService {}

export interface UpdateDeveloperServiceResponse extends DeveloperService {}

export interface DeleteDeveloperServiceResponse {}

export interface CompleteOnboardingResponse {}

export interface SetIncomeStreamsResponse {
  incomeStreams: IncomeStreamType[];
}

export interface DeveloperRightsIdParams {
  id: string; // TODO: lauriane create a class for safety - I dont understand which id this is
}

export interface ProjectItemIdParams {
  projectItemId: string;
}

export interface DeveloperServiceIdParams {
  id: string; // TODO: lauriane create a class for safety - I dont understand which id this is
}

export interface GitHubOrgParams {
  org: string; // TODO: lauriane create a class for safety - I dont understand which id this is
}
