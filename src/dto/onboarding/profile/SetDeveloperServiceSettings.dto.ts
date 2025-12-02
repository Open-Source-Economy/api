import { Currency, CurrencyCompanion, OpenToOtherOpportunityType, OpenToOtherOpportunityTypeCompanion } from "../../../model";
import Joi from "joi";

export interface SetDeveloperServiceSettingsParams {}

export interface SetDeveloperServiceSettingsBody {
  hourlyWeeklyCommitment?: number;
  hourlyWeeklyCommitmentComment?: string;

  openToOtherOpportunity: OpenToOtherOpportunityType;
  openToOtherOpportunityComment?: string;

  hourlyRate?: number;
  currency?: Currency;
  hourlyRateComment?: string;
}

export interface SetDeveloperServiceSettingsQuery {}

export interface SetDeveloperServiceSettingsResponse {}

export namespace SetDeveloperServiceSettingsCompanion {
  export const paramsSchema: Joi.ObjectSchema<SetDeveloperServiceSettingsParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<SetDeveloperServiceSettingsBody> = Joi.object({
    hourlyWeeklyCommitment: Joi.number().integer().min(1).max(80).optional().messages({
      "number.base": "Hourly weekly commitment must be a number",
      "number.integer": "Hourly weekly commitment must be an integer",
      "number.min": "Hourly weekly commitment must be at least {{#limit}}",
      "number.max": "Hourly weekly commitment cannot exceed {{#limit}}",
    }),
    hourlyWeeklyCommitmentComment: Joi.string().trim().allow("").optional().messages({
      "string.trim": "Comments cannot consist only of spaces",
    }),
    openToOtherOpportunity: OpenToOtherOpportunityTypeCompanion.schema.label("Open to other opportunity").required(),
    openToOtherOpportunityComment: Joi.string().trim().allow("").optional().messages({
      "string.trim": "Comments cannot consist only of spaces",
    }),
    hourlyRate: Joi.number().min(1).max(1000).optional().messages({
      "number.base": "Hourly rate must be a number",
      "number.min": "Hourly rate must be at least {{#limit}}",
      "number.max": "Hourly rate cannot exceed {{#limit}}",
    }),
    currency: CurrencyCompanion.schema.label("Currency").optional(),
    hourlyRateComment: Joi.string().trim().allow("").optional().messages({
      "string.trim": "Comments cannot consist only of spaces",
    }),
  });

  export const querySchema: Joi.ObjectSchema<SetDeveloperServiceSettingsQuery> = Joi.object({});
}
