import { DeveloperServiceId } from "../../../../model";

export interface UpdateDeveloperServiceParams {}
export interface UpdateDeveloperServiceBody {
  id: DeveloperServiceId;
  hourlyRate?: number;
  responseTimeHours?: number;
}
export interface UpdateDeveloperServiceQuery {}
export interface UpdateDeveloperServiceResponse {}
