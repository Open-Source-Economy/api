import { Currency, IncomeStreamType, OpenToOtherOpportunityType } from "../../../model";

export interface SetDeveloperServiceSettingsParams {}

export interface SetDeveloperServiceSettingsBody {
  hourlyWeeklyCommitment: number;
  hourlyWeeklyCommitmentComments: string;

  openToOtherOpportunity: OpenToOtherOpportunityType;
  openToOtherOpportunityComments: string;

  hourlyRate: number;
  currency: Currency;
  hourlyRateComments: string;
}

export interface SetDeveloperServiceSettingsQuery {}

export interface SetDeveloperServiceSettingsResponse {}
