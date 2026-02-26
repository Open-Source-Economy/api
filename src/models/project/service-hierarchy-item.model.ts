import { z } from "zod";
import { type Service, ServiceSchema } from "./service.model";
import { type ServiceType, serviceTypeSchema } from "src/models/shared/service-type.type";

export interface ServiceHierarchyItem {
  category: ServiceType;
  services: Service[];
}

export const ServiceHierarchyItemSchema = z.object({
  category: serviceTypeSchema,
  services: z.array(ServiceSchema),
}) satisfies z.ZodType<ServiceHierarchyItem>;
