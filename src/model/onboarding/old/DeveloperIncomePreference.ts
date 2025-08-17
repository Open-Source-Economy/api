import { ValidationError, Validator } from "../../error";
import { DeveloperProfileId } from "../DeveloperProfile";
import { UUID } from "../../UUID";
import { Currency } from "../../stripe";

export class DeveloperIncomePreferenceId extends UUID {}

export enum IncomeType {
  ROYALTIES = "royalties",
  SERVICES = "services",
  DONATIONS = "donations",
}

export interface DeveloperIncomePreference {
  id: DeveloperIncomePreferenceId;
  developerProfileId: DeveloperProfileId;
  incomeType: IncomeType;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperIncomePreferenceCompanion {
  export function fromBackend(row: any): DeveloperIncomePreference | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const incomeType = validator.requiredEnum("income_type", Object.values(IncomeType) as IncomeType[]);
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperIncomePreferenceId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      incomeType,
      createdAt,
      updatedAt,
    };
  }
}
