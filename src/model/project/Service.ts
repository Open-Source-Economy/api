import { UUID } from "../UUID";

export class ServiceId extends UUID {}

export interface Service {
  id: ServiceId;
  name: string;
  parentId?: ServiceId;
  isCustom: boolean;
  hasResponseTime: boolean;
  createdAt: Date;
  updatedAt: Date;
}
