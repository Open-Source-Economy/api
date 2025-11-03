import { FullDeveloperProfile } from "../../../model";
import Joi from "joi";

export interface GetDeveloperProfileParams {
  githubUsername?: string;
}
export interface GetDeveloperProfileBody {}
export interface GetDeveloperProfileQuery {}
export interface GetDeveloperProfileResponse {
  profile: FullDeveloperProfile | null;
}

export namespace GetDeveloperProfileCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetDeveloperProfileParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<GetDeveloperProfileBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetDeveloperProfileQuery> = Joi.object({
    githubUsername: Joi.string().optional(),
  });
}
