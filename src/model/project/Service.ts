import { ValidationError, Validator } from "../error";
import { UUID } from "../UUID";

export class ServiceId extends UUID {}

export interface Service {
  id: ServiceId;
  name: string;
  parentId?: ServiceId;
  isCustom: boolean;
  hasResponseTime: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export namespace ServiceCompanion {
  export function fromBackend(row: any): Service | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const name = validator.requiredString("name");
    const parentId = validator.optionalString("parent_id");
    const isCustom = validator.requiredBoolean("is_custom");
    const hasResponseTime = validator.requiredBoolean("has_response_time");
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new ServiceId(id),
      name,
      parentId: parentId ? new ServiceId(parentId) : undefined,
      isCustom,
      hasResponseTime,
      createdAt,
      updatedAt,
    };
  }
}
