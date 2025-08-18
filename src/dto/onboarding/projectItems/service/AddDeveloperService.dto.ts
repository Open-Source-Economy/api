import { ProjectItemId, ServiceId } from "../../../../model";

export interface AddDeveloperServiceParams {}
export interface AddDeveloperServiceBody {
  serviceId: ServiceId;
  projectItemIds: ProjectItemId[];
  hourlyRate?: number;
  responseTimeHours?: number;
}
export interface AddDeveloperServiceQuery {}
export interface AddDeveloperServiceResponse {}
