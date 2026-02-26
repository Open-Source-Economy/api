import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PutEndpointDefinition } from "src/types/endpoint.types";
import { type PreferenceType, preferenceTypeSchema } from "src/models/shared/preference-type.type";

// ============================================
// PUT /onboarding/settings/preferences
// ============================================

export interface SetDeveloperPreferencesParams {}

export interface SetDeveloperPreferencesQuery {}

export interface SetDeveloperPreferencesBody {
  royaltiesPreference?: PreferenceType | null;
  servicesPreference?: PreferenceType | null;
  communitySupporterPreference?: PreferenceType | null;
}

export interface SetDeveloperPreferencesResponse {}

const SetDeveloperPreferencesParamsSchema = z.object({}) satisfies z.ZodType<SetDeveloperPreferencesParams>;

const SetDeveloperPreferencesQuerySchema = z.object({}) satisfies z.ZodType<SetDeveloperPreferencesQuery>;

const SetDeveloperPreferencesBodySchema = z.object({
  royaltiesPreference: preferenceTypeSchema.nullable().optional(),
  servicesPreference: preferenceTypeSchema.nullable().optional(),
  communitySupporterPreference: preferenceTypeSchema.nullable().optional(),
}) satisfies z.ZodType<SetDeveloperPreferencesBody>;

const SetDeveloperPreferencesResponseSchema = z.object({}) satisfies z.ZodType<SetDeveloperPreferencesResponse>;

export const setDeveloperPreferencesEndpoint = {
  method: "PUT",
  path: "/onboarding/settings/preferences",
  pathParams: SetDeveloperPreferencesParamsSchema,
  query: SetDeveloperPreferencesQuerySchema,
  body: SetDeveloperPreferencesBodySchema,
  responses: {
    200: SetDeveloperPreferencesResponseSchema,
    400: ProblemDetailsSchema,
  },
  summary: "Set developer preferences for royalties, services, and community support",
} as const satisfies PutEndpointDefinition;
