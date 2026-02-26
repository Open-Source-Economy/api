import { z } from "zod";
import {
  type DeveloperServiceId,
  DeveloperServiceIdSchema,
  type DeveloperProfileId,
  DeveloperProfileIdSchema,
  type DeveloperProjectItemId,
  DeveloperProjectItemIdSchema,
  type ServiceId,
  ServiceIdSchema,
} from "src/types/uuid";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";
import { type ResponseTimeType, responseTimeTypeSchema } from "src/models/shared/response-time-type.type";

export interface DeveloperService {
  id: DeveloperServiceId;
  developerProfileId: DeveloperProfileId;
  developerProjectItemIds: DeveloperProjectItemId[];
  serviceId: ServiceId;
  hourlyRate?: number;
  responseTimeHours?: ResponseTimeType | null;
  comment?: string | null;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export const DeveloperServiceSchema = z.object({
  id: DeveloperServiceIdSchema,
  developerProfileId: DeveloperProfileIdSchema,
  developerProjectItemIds: z.array(DeveloperProjectItemIdSchema),
  serviceId: ServiceIdSchema,
  hourlyRate: z.number().optional(),
  responseTimeHours: responseTimeTypeSchema.nullable().optional(),
  comment: z.string().nullable().optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}) satisfies z.ZodType<DeveloperService>;
