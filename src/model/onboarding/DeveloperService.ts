import { ValidationError, Validator } from "../error";
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

export namespace DeveloperServiceCompanion {
  export function fromBackend(row: any): DeveloperService | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const serviceId = validator.requiredString("service_id");
    const hourlyRate = validator.optionalNumber("hourly_rate");
    const responseTimeHours = validator.optionalEnum("response_time_type", Object.values(ResponseTimeType) as ResponseTimeType[]);
    const comment = validator.optionalString("comment");
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    // The repository is responsible for fetching and populating the projectItemIds.
    // We initialize it as an empty array here as it's not present in the main
    // `developer_service_offering` table row.
    return {
      id: new DeveloperServiceId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      developerProjectItemIds: [],
      serviceId: new ServiceId(serviceId),
      hourlyRate,
      responseTimeHours: responseTimeHours,
      comment,
      createdAt,
      updatedAt,
    };
  }
}
