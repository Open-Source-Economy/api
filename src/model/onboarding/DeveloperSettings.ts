import { ValidationError, Validator } from "../error";
import { Currency } from "../stripe";
import { UUID } from "../UUID";
import { DeveloperProfileId } from "./DeveloperProfile";
import { OpenToOtherOpportunityType } from "./OpenToOtherOpportunityType";
import { IncomeStreamType } from "./IncomeStreamType";

export class DeveloperSettingsId extends UUID {}

export interface DeveloperSettings {
  id: DeveloperSettingsId;
  developerProfileId: DeveloperProfileId;
  incomeStreams?: IncomeStreamType[];
  hourlyWeeklyCommitment?: number;
  hourlyWeeklyCommitmentComment?: string | null;
  openToOtherOpportunity?: OpenToOtherOpportunityType;
  openToOtherOpportunityComment?: string | null;
  hourlyRate?: number;
  hourlyRateComment?: string | null;
  currency?: Currency;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperSettingsCompanion {
  export function fromBackend(row: any): DeveloperSettings | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const incomeStreams = validator.optionalArrayOfEnums("income_streams", Object.values(IncomeStreamType) as IncomeStreamType[]);
    const hourlyWeeklyCommitment = validator.optionalNumber("hourly_weekly_commitment");
    const hourlyWeeklyCommitmentComment = validator.optionalString("hourly_weekly_commitment_comment");
    const openToOtherOpportunity = validator.optionalEnum(
      "open_to_other_opportunity",
      Object.values(OpenToOtherOpportunityType) as OpenToOtherOpportunityType[],
    );
    const openToOtherOpportunityComment = validator.optionalString("open_to_other_opportunity_comment");
    const hourlyRate = validator.optionalNumber("hourly_rate");
    const hourlyRateComment = validator.optionalString("hourly_rate_comment");
    const currency = validator.optionalEnum("currency", Object.values(Currency) as Currency[]);
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
      hourlyWeeklyCommitmentComment,
      openToOtherOpportunity,
      openToOtherOpportunityComment,
      hourlyRate,
      hourlyRateComment,
      currency,
      createdAt,
      updatedAt,
    };

    return success;
  }
}
