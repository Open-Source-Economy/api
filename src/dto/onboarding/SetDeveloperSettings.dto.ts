import { IncomeStreamType, OpenToOtherOpportunityType, CurrencyType } from "../../model";

export interface SetDeveloperSettingsDto {
  incomeStreams: IncomeStreamType[];
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: CurrencyType;
}
