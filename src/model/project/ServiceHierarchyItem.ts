import { Service, ServiceId } from "./Service";
import { ServiceType } from "./ServiceType";

export interface ServiceHierarchyItem {
  category: ServiceType;
  services: Service[];
}
