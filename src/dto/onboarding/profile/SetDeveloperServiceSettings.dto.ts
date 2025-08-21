import { Currency, IncomeStreamType, OpenToOtherOpportunityType } from "../../../model";

export interface SetDeveloperServiceSettingsParams {}

export interface SetDeveloperServiceSettingsBody {
  hourlyWeeklyCommitment: number;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  hourlyRate: number;
  currency: Currency;
}

export interface SetDeveloperServiceSettingsQuery {}

export interface SetDeveloperServiceSettingsResponse {}
