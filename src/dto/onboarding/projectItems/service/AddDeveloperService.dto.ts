import { ProjectItemId, ServiceId } from "../../../../model";

export interface UpsertDeveloperServiceParams {}
export interface UpsertDeveloperServiceBody {
  serviceId: ServiceId;
  projectItemIds: ProjectItemId[];
  hourlyRate?: number;
  responseTimeHours?: number;
}
export interface UpsertDeveloperServiceQuery {}
export interface UpsertDeveloperServiceResponse {}
