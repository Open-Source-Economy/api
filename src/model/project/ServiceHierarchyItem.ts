import { Service, ServiceId } from "./Service";

export interface ServiceHierarchyItem {
  service: Service;
  level: number;
  ancestors: ServiceId[];
}
