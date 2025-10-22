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
