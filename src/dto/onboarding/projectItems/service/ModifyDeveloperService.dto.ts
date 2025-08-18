import { DeveloperServiceId, ProjectItemId, ServiceId } from "../../../../model";

export interface ModifyDeveloperServiceParams {}
export interface ModifyDeveloperServiceBody {
  id: DeveloperServiceId;
  projectItemIds: ProjectItemId[];
  hourlyRate?: number;
  responseTimeHours?: number;
}
export interface ModifyDeveloperServiceQuery {}
export interface ModifyDeveloperServiceResponse {}
