import { PreferenceType, PreferenceTypeCompanion } from "../../../model";
import Joi from "joi";

export interface SetDeveloperPreferencesParams {}

export interface SetDeveloperPreferencesBody {
  royaltiesPreference?: PreferenceType | null;
  servicesPreference?: PreferenceType | null;
  communitySupporterPreference?: PreferenceType | null;
}

export interface SetDeveloperPreferencesQuery {}

export interface SetDeveloperPreferencesResponse {}

export namespace SetDeveloperPreferencesCompanion {
  export const paramsSchema: Joi.ObjectSchema<SetDeveloperPreferencesParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<SetDeveloperPreferencesBody> = Joi.object({
    royaltiesPreference: PreferenceTypeCompanion.schema.optional().allow(null).messages({
      "any.only": "Royalties preference must be a valid preference type",
    }),
    servicesPreference: PreferenceTypeCompanion.schema.optional().allow(null).messages({
      "any.only": "Services preference must be a valid preference type",
    }),
    communitySupporterPreference: PreferenceTypeCompanion.schema.optional().allow(null).messages({
      "any.only": "Community supporter preference must be a valid preference type",
    }),
  });

  export const querySchema: Joi.ObjectSchema<SetDeveloperPreferencesQuery> = Joi.object({});
}
