import { IncomeStreamType, OpenToOtherOpportunityType, Currency } from "../../model";

export interface SetDeveloperSettingsParams {}

export interface SetDeveloperSettingsBody {
  incomeStreams: IncomeStreamType[];
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
}

export interface SetDeveloperSettingsQuery {}

export interface SetDeveloperSettingsResponse {}
