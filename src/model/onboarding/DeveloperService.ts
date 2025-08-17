import { ValidationError, Validator } from "../error";
import { DeveloperProfileId } from "./DeveloperProfile";
import { Currency } from "../stripe";
import { UUID } from "../UUID";
import { ServiceId } from "../project";
import { ProjectItemId } from "../project";

export class DeveloperServiceId extends UUID {}

export interface DeveloperService {
  id: DeveloperServiceId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  serviceId: ServiceId;
  hourlyRate: number;
  currency: Currency;
  responseTimeHours: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperServiceCompanion {
  export function fromBackend(row: any): DeveloperService | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const projectItemId = validator.requiredString("project_item_id");
    const serviceId = validator.requiredString("service_id");
    const hourlyRate = validator.requiredNumber("hourly_rate");
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const responseTimeHours = validator.optionalNumber("response_time_hours");
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperServiceId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      projectItemId: new ProjectItemId(projectItemId),
      serviceId: new ServiceId(serviceId),
      hourlyRate,
      currency,
      responseTimeHours: responseTimeHours ?? null,
      createdAt,
      updatedAt,
    };
  }
}
