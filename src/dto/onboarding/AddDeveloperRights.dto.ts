import { DeveloperRoleType, MergeRightsType } from "../../model";

export interface UpdateDeveloperRightsDto {
  mergeRights?: MergeRightsType[];
  roles?: DeveloperRoleType[];
}
