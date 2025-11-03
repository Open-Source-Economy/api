import { FullDeveloperProfile } from "../../../model";
import Joi from "joi";

export interface GetDeveloperProfileParams {
  githubUsername?: string;
}
export interface GetDeveloperProfileBody {}

export interface GetDeveloperProfileResponse {
  profile: FullDeveloperProfile | null;
}

export namespace GetDeveloperProfileCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetDeveloperProfileParams> = Joi.object({
    githubUsername: Joi.string().optional(),
  });

  export const bodySchema: Joi.ObjectSchema<GetDeveloperProfileBody> = Joi.object({});
}
