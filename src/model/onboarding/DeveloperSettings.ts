import { ValidationError, Validator } from "../error";
import { Currency } from "../stripe";
import { UUID } from "../UUID";
import { DeveloperProfileId } from "./DeveloperProfile";

export enum IncomeStreamType {
  ROYALTIES = "royalties",
  SERVICES = "services",
  DONATIONS = "donations",
}

export enum OpenToOtherOpportunityType {
  YES = "yes",
  MAYBE = "maybe",
  NO = "no",
}

export class DeveloperSettingsId extends UUID {}

export interface DeveloperSettings {
  id: DeveloperSettingsId;
  developerProfileId: DeveloperProfileId;
  incomeStreams: IncomeStreamType[];
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperSettingsCompanion {
  export function fromBackend(row: any): DeveloperSettings | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const incomeStreams = validator.requiredArrayOfEnums("income_streams", Object.values(IncomeStreamType) as IncomeStreamType[]);
    const hourlyWeeklyCommitment = validator.requiredNumber("hourly_weekly_commitment");
    const openToOtherOpportunity = validator.requiredEnum(
      "open_to_other_opportunity",
      Object.values(OpenToOtherOpportunityType) as OpenToOtherOpportunityType[],
    );
    const hourlyRate = validator.requiredNumber("hourly_rate");
    const currency = validator.requiredEnum("currency", Object.values(Currency) as Currency[]);
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const success: DeveloperSettings = {
      id: new DeveloperSettingsId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      incomeStreams: incomeStreams,
      hourlyWeeklyCommitment,
      openToOtherOpportunity,
      hourlyRate,
      currency,
      createdAt,
      updatedAt,
    };

    return success;
  }
}
