import { z } from "zod";
import { type ServiceId, ServiceIdSchema } from "src/types/uuid";
import { type ServiceType, serviceTypeSchema } from "src/models/shared/service-type.type";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";

export interface Service {
  id: ServiceId;
  serviceType: ServiceType;
  name: string;
  description?: string;
  isCustom: boolean;
  hasResponseTime: boolean;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export const ServiceSchema = z.object({
  id: ServiceIdSchema,
  serviceType: serviceTypeSchema,
  name: z.string(),
  description: z.string().optional(),
  isCustom: z.boolean(),
  hasResponseTime: z.boolean(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}) satisfies z.ZodType<Service>;
