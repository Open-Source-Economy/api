import { z } from "zod";
import {
  type DeveloperSettingsId,
  DeveloperSettingsIdSchema,
  type DeveloperProfileId,
  DeveloperProfileIdSchema,
} from "src/types/uuid";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";
import { type Currency, currencySchema } from "src/models/shared/currency.type";
import { type PreferenceType, preferenceTypeSchema } from "src/models/shared/preference-type.type";
import {
  type OpenToOtherOpportunityType,
  openToOtherOpportunityTypeSchema,
} from "src/models/shared/open-to-other-opportunity-type.type";

export interface DeveloperSettings {
  id: DeveloperSettingsId;
  developerProfileId: DeveloperProfileId;
  royaltiesPreference?: PreferenceType;
  servicesPreference?: PreferenceType;
  communitySupporterPreference?: PreferenceType;
  hourlyWeeklyCommitment?: number;
  hourlyWeeklyCommitmentComment?: string | null;
  openToOtherOpportunity?: OpenToOtherOpportunityType;
  openToOtherOpportunityComment?: string | null;
  hourlyRate?: number;
  hourlyRateComment?: string | null;
  currency?: Currency;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export const DeveloperSettingsSchema = z.object({
  id: DeveloperSettingsIdSchema,
  developerProfileId: DeveloperProfileIdSchema,
  royaltiesPreference: preferenceTypeSchema.optional(),
  servicesPreference: preferenceTypeSchema.optional(),
  communitySupporterPreference: preferenceTypeSchema.optional(),
  hourlyWeeklyCommitment: z.number().optional(),
  hourlyWeeklyCommitmentComment: z.string().nullable().optional(),
  openToOtherOpportunity: openToOtherOpportunityTypeSchema.optional(),
  openToOtherOpportunityComment: z.string().nullable().optional(),
  hourlyRate: z.number().optional(),
  hourlyRateComment: z.string().nullable().optional(),
  currency: currencySchema.optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}) satisfies z.ZodType<DeveloperSettings>;
