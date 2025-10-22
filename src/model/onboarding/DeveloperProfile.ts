import { ValidationError, Validator } from "../error";
import { UserId } from "../user";
import { UUID } from "../UUID";

export class DeveloperProfileId extends UUID {}

export interface DeveloperProfile {
  id: DeveloperProfileId;
  userId: UserId;
  contactEmail: string; // Added contactEmail
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperProfileCompanion {
  export function fromBackend(row: any, table_prefix: string = ""): DeveloperProfile | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString(`${table_prefix}id`);
    const userId = validator.requiredString(`${table_prefix}user_id`);
    const contactEmail = validator.requiredString(`${table_prefix}contact_email`);
    const onboardingCompleted = validator.requiredBoolean(`${table_prefix}onboarding_completed`);
    const createdAt = validator.requiredDate(`${table_prefix}created_at`);
    const updatedAt = validator.requiredDate(`${table_prefix}updated_at`);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperProfileId(id),
      userId: new UserId(userId),
      contactEmail,
      onboardingCompleted,
      createdAt,
      updatedAt,
    };
  }
}
