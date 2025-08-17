import { IncomeStreamType, OpenToOtherOpportunityType, Currency } from "../../model";

export interface SetDeveloperSettingsDto {
  incomeStreams: IncomeStreamType[];
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
}
