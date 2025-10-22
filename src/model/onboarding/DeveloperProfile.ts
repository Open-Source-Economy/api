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
  export function fromBackend(row: any): DeveloperProfile | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const userId = validator.requiredString("user_id");
    const contactEmail = validator.requiredString("contact_email");
    const onboardingCompleted = validator.requiredBoolean("onboarding_completed");
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

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
