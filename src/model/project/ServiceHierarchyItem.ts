import { Service } from "./Service";
import { ServiceType } from "./ServiceType";

export interface ServiceHierarchyItem {
  category: ServiceType;
  services: Service[];
}
