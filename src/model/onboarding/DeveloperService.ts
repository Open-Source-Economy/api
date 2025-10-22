import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ServiceId } from "../project";
import { ResponseTimeType } from "./ResponseTimeType";
import { DeveloperProjectItemId } from "./DeveloperProjectItem";

export class DeveloperServiceId extends UUID {}

export interface DeveloperService {
  id: DeveloperServiceId;
  developerProfileId: DeveloperProfileId;
  developerProjectItemIds: DeveloperProjectItemId[];
  serviceId: ServiceId;
  hourlyRate?: number;
  responseTimeHours?: ResponseTimeType | null;
  comment?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
