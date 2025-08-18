import { ProjectItemId, ServiceId } from "../../../../model";

export interface AddOrModifyDeveloperServiceParams {}
export interface AddOrModifyDeveloperServiceBody {
  serviceId: ServiceId;
  projectItemIds: ProjectItemId[];
  hourlyRate?: number;
  responseTimeHours?: number;
}
export interface AddOrModifyDeveloperServiceQuery {}
export interface AddOrModifyDeveloperServiceResponse {}
