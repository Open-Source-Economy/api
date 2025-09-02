import { Currency, CurrencyCompanion, OpenToOtherOpportunityType, OpenToOtherOpportunityTypeCompanion } from "../../../model";
import Joi from "joi";

export interface SetDeveloperServiceSettingsParams {}

export interface SetDeveloperServiceSettingsBody {
  hourlyWeeklyCommitment: number;
  hourlyWeeklyCommitmentComments?: string;

  openToOtherOpportunity: OpenToOtherOpportunityType;
  openToOtherOpportunityComments?: string;

  hourlyRate: number;
  currency: Currency;
  hourlyRateComments?: string;
}

export interface SetDeveloperServiceSettingsQuery {}

export interface SetDeveloperServiceSettingsResponse {}

export namespace SetDeveloperServiceSettingsCompanion {
  export const paramsSchema: Joi.ObjectSchema<SetDeveloperServiceSettingsParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<SetDeveloperServiceSettingsBody> = Joi.object({
    hourlyWeeklyCommitment: Joi.number().integer().min(0).max(168).required().messages({
      "number.base": "Hourly weekly commitment must be a number",
      "number.integer": "Hourly weekly commitment must be an integer",
      "number.min": "Hourly weekly commitment cannot be less than {{#limit}}",
      "number.max": "Hourly weekly commitment cannot exceed {{#limit}}",
      "any.required": "Hourly weekly commitment is required",
    }),
    hourlyWeeklyCommitmentComments: Joi.string().trim().allow("").required().messages({
      "string.trim": "Comments cannot consist only of spaces",
      "any.required": "Hourly weekly commitment comments are required (can be empty)",
    }),
    openToOtherOpportunity: OpenToOtherOpportunityTypeCompanion.schema.label("Open to other opportunity").required(),
    openToOtherOpportunityComments: Joi.string().trim().allow("").required().messages({
      "string.trim": "Comments cannot consist only of spaces",
      "any.required": "Open to other opportunity comments are required (can be empty)",
    }),
    hourlyRate: Joi.number().min(0).required().messages({
      "number.base": "Hourly rate must be a number",
      "number.min": "Hourly rate cannot be less than {{#limit}}",
      "any.required": "Hourly rate is required",
    }),
    currency: CurrencyCompanion.schema.label("Currency").required(),
    hourlyRateComments: Joi.string().trim().allow("").required().messages({
      "string.trim": "Comments cannot consist only of spaces",
      "any.required": "Hourly rate comments are required (can be empty)",
    }),
  });

  export const querySchema: Joi.ObjectSchema<SetDeveloperServiceSettingsQuery> = Joi.object({});
}
