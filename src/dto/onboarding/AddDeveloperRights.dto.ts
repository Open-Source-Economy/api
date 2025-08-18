import { DeveloperRoleType, MergeRightsType } from "../../model";

export interface UpdateDeveloperRightsParams {}

export interface UpdateDeveloperRightsBody {
  mergeRights?: MergeRightsType[];
  roles?: DeveloperRoleType[];
}

export interface UpdateDeveloperRightsQuery {}

export interface UpdateDeveloperRightsResponse {}
