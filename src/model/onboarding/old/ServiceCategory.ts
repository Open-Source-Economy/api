import { ValidationError, Validator } from "../../error";
import { UUID } from "../../UUID";

export class ServiceCategoryId extends UUID {}

export interface ServiceCategory {
  id: ServiceCategoryId;
  name: string;
  parentCategory: string | null;
  hasResponseTime: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export namespace ServiceCategoryCompanion {
  export function fromBackend(row: any): ServiceCategory | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const name = validator.requiredString("name");
    const parentCategory = validator.optionalString("parent_category");
    const hasResponseTime = validator.requiredBoolean("has_response_time");
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new ServiceCategoryId(id),
      name,
      parentCategory: parentCategory ?? null,
      hasResponseTime,
      createdAt,
      updatedAt,
    };
  }
}
