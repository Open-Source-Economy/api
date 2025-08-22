import { ValidationError, Validator } from "../error";
import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ProjectItemId, ServiceId } from "../project";

export class DeveloperServiceId extends UUID {}

export interface DeveloperService {
  id: DeveloperServiceId;
  developerProfileId: DeveloperProfileId;
  projectItemIds: ProjectItemId[];
  serviceId: ServiceId;
  hourlyRate?: number;
  responseTimeHours?: number | null;
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
    const responseTimeHours = validator.optionalNumber("response_time_hours");
    const comment = validator.optionalString("comment");
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperServiceId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      projectItemIds: [], // This will be populated by the repository after fetching from the junction table
      serviceId: new ServiceId(serviceId),
      hourlyRate,
      responseTimeHours: responseTimeHours,
      comment,
      createdAt,
      updatedAt,
    };
  }
}
