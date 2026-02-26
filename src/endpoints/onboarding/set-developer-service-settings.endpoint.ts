import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PutEndpointDefinition } from "src/types/endpoint.types";
import { type Currency, currencySchema } from "src/models/shared/currency.type";
import {
  type OpenToOtherOpportunityType,
  openToOtherOpportunityTypeSchema,
} from "src/models/shared/open-to-other-opportunity-type.type";

// ============================================
// PUT /onboarding/settings/services
// ============================================

export interface SetDeveloperServiceSettingsParams {}

export interface SetDeveloperServiceSettingsQuery {}

export interface SetDeveloperServiceSettingsBody {
  hourlyWeeklyCommitment?: number;
  hourlyWeeklyCommitmentComment?: string;
  openToOtherOpportunity: OpenToOtherOpportunityType;
  openToOtherOpportunityComment?: string;
  hourlyRate?: number;
  currency?: Currency;
  hourlyRateComment?: string;
}

export interface SetDeveloperServiceSettingsResponse {}

const SetDeveloperServiceSettingsParamsSchema = z.object({}) satisfies z.ZodType<SetDeveloperServiceSettingsParams>;

const SetDeveloperServiceSettingsQuerySchema = z.object({}) satisfies z.ZodType<SetDeveloperServiceSettingsQuery>;

const SetDeveloperServiceSettingsBodySchema = z.object({
  hourlyWeeklyCommitment: z.number().int().min(1).max(80).optional(),
  hourlyWeeklyCommitmentComment: z.string().optional(),
  openToOtherOpportunity: openToOtherOpportunityTypeSchema,
  openToOtherOpportunityComment: z.string().optional(),
  hourlyRate: z.number().min(1).max(1000).optional(),
  currency: currencySchema.optional(),
  hourlyRateComment: z.string().optional(),
}) satisfies z.ZodType<SetDeveloperServiceSettingsBody>;

const SetDeveloperServiceSettingsResponseSchema = z.object({}) satisfies z.ZodType<SetDeveloperServiceSettingsResponse>;

export const setDeveloperServiceSettingsEndpoint = {
  method: "PUT",
  path: "/onboarding/settings/services",
  pathParams: SetDeveloperServiceSettingsParamsSchema,
  query: SetDeveloperServiceSettingsQuerySchema,
  body: SetDeveloperServiceSettingsBodySchema,
  responses: {
    200: SetDeveloperServiceSettingsResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Set developer service settings including availability, rates, and opportunity preferences",
} as const satisfies PutEndpointDefinition;
