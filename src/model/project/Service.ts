import { UUID } from "../UUID";
import { ServiceType } from "./ServiceType";

export class ServiceId extends UUID {}

export interface Service {
  id: ServiceId;
  serviceType: ServiceType;
  name: string;
  description?: string;
  isCustom: boolean;
  hasResponseTime: boolean;
  createdAt: Date;
  updatedAt: Date;
}
