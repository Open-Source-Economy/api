// src/api/dto/onboarding.ts

import {
  Currency,
  DeveloperRights,
  DeveloperRoleType,
  DeveloperService,
  DeveloperSettings,
  IncomeStreamType,
  MergeRightsType,
  OpenToOtherOpportunityType,
} from "../../model";
import { DeveloperProfileTODO } from "./profile";

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

// ---

// DTOs for UpdateDeveloperContactInfos
export interface UpdateDeveloperContactInfosParams {}
export interface UpdateDeveloperContactInfosBody {
  name: string;
  email: string;
}
export interface UpdateDeveloperContactInfosQuery {}
export interface UpdateDeveloperContactInfosResponse {}

// DTOs for GetDeveloperProfile
export interface GetDeveloperProfileParams {}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: DeveloperProfileTODO | null;
}

// DTOs for RemoveRepository
export interface RemoveRepositoryParams {
  projectItemId: string; // Used in req.params.projectItemId
}
export interface RemoveRepositoryBody {}
export interface RemoveRepositoryQuery {}
export interface RemoveRepositoryResponse {}

// DTOs for GetRepositories
export interface GetRepositoriesParams {}
export interface GetRepositoriesBody {}
export interface GetRepositoriesQuery {}
export interface GetRepositoriesResponse {
  data: Array<{
    projectItemId: string;
    repository: string | null;
    roles: DeveloperRoleType[];
    mergeRights: MergeRightsType[];
    services: any[]; // Assuming services array structure from implementation
  }>;
}

export interface GetGithubOrganizationsParams {}
export interface GetGithubOrganizationsBody {}
export interface GetGithubOrganizationsQuery {}
export interface GetGithubOrganizationsResponse {
  // data: Array<{ id: number; login: string; url: string; avatar_url: string }>; // Inferred common GitHub organization properties
}

// DTOs for GetGithubRepositories
export interface GetGithubRepositoriesParams {
  org: string; // Used in req.params.org
}
export interface GetGithubRepositoriesBody {}
export interface GetGithubRepositoriesQuery {}
export interface GetGithubRepositoriesResponse {
  data: Array<{ id: number; name: string; full_name: string; html_url: string }>; // Inferred common GitHub repository properties
}

// DTOs for GetUserGithubRepositories
export interface GetUserGithubRepositoriesParams {}
export interface GetUserGithubRepositoriesBody {}
export interface GetUserGithubRepositoriesQuery {}
export interface GetUserGithubRepositoriesResponse {
  data: Array<{ id: number; name: string; full_name: string; html_url: string }>; // Inferred common GitHub repository properties
}

// DTOs for GetServices
export interface GetServicesParams {}
export interface GetServicesBody {}
export interface GetServicesQuery {}
export interface GetServicesResponse {
  data: any; // Assuming getHierarchy returns a generic data structure
}

// DTOs for CreateCustomService
export interface CreateCustomServiceParams {}
export interface CreateCustomServiceBody {
  name: string;
  hasResponseTime?: boolean;
}
export interface CreateCustomServiceQuery {}
export interface CreateCustomServiceResponse {}

// DTOs for AddDeveloperService
export interface AddDeveloperServiceParams {}
export interface AddDeveloperServiceBody {
  projectItemId: string;
  serviceId: string;
  hourlyRate: number;
  currency: string;
  responseTimeHours?: number | null;
}
export interface AddDeveloperServiceQuery {}
export interface AddDeveloperServiceResponse {} // Response type not explicitly defined in implementation, assuming empty

// DTOs for UpdateDeveloperService
export interface UpdateDeveloperServiceParams {
  id: string; // Used in req.params.id
}
export interface UpdateDeveloperServiceBody {
  hourlyRate?: number;
  currency?: string;
  responseTimeHours?: number | null;
}
export interface UpdateDeveloperServiceQuery {}
export interface UpdateDeveloperServiceResponse {} // Response type not explicitly defined in implementation, assuming empty

// DTOs for DeleteDeveloperService
export interface DeleteDeveloperServiceParams {
  id: string; // Used in req.params.id
}
export interface DeleteDeveloperServiceBody {}
export interface DeleteDeveloperServiceQuery {}
export interface DeleteDeveloperServiceResponse {}

// DTOs for CompleteOnboarding
export interface CompleteOnboardingParams {}
export interface CompleteOnboardingBody {}
export interface CompleteOnboardingQuery {}
export interface CompleteOnboardingResponse {}
