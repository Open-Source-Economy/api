import { ValidationError, Validator } from "../../error";
import { UUID } from "../../UUID";
import { Currency } from "../../stripe";
import { CompanyUserRole } from "../../CompanyUserPermissionToken";
import { DeveloperProfileId } from "../DeveloperProfile";

export enum OpenToLargerOpportunities {
  YES = "yes",
  MAYBE = "maybe",
  NO = "no",
}

export class DeveloperAvailabilityId extends UUID {}

export interface DeveloperAvailability {
  id: DeveloperAvailabilityId;
  developerProfileId: DeveloperProfileId;
  weeklyCommitment: number;
  largerOpportunities: OpenToLargerOpportunities;
  hourlyRate: number;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperAvailabilityCompanion {
  export function fromBackend(row: any): DeveloperAvailability | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const weeklyCommitment = validator.requiredNumber("weekly_commitment");
    const largerOpportunities = validator.requiredEnum("larger_opportunities", Object.values(OpenToLargerOpportunities) as OpenToLargerOpportunities[]);
    const hourlyRate = validator.requiredNumber("hourly_rate");
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperAvailabilityId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      weeklyCommitment,
      largerOpportunities,
      hourlyRate,
      currency,
      createdAt,
      updatedAt,
    };
  }
}
