import Joi from "joi";

export interface CompleteOnboardingParams {}
export interface CompleteOnboardingBody {}
export interface CompleteOnboardingQuery {}
export interface CompleteOnboardingResponse {}

export namespace CompleteOnboardingCompanion {
  export const paramsSchema: Joi.ObjectSchema<CompleteOnboardingParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<CompleteOnboardingBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<CompleteOnboardingQuery> = Joi.object({});
}
