import Joi from "joi";
import { Owner, Repository } from "../../model";

export interface SyncProjectParams {
  owner: string;
  repo?: string;
}

export interface SyncProjectResponse {
  owner: Owner;
  repository: Repository | null;
}

export interface SyncProjectBody {}

export interface SyncProjectQuery {}

export namespace SyncProjectCompanion {
  export const paramsSchema: Joi.ObjectSchema<SyncProjectParams> = Joi.object({
    owner: Joi.string().required().messages({
      "string.base": "Owner must be a string",
      "any.required": "Owner parameter is required",
      "string.empty": "Owner parameter cannot be empty",
    }),
    repo: Joi.string().optional().messages({
      "string.base": "Repository name must be a string",
      "string.empty": "Repository name parameter cannot be empty",
    }),
  });

  export const bodySchema: Joi.ObjectSchema<SyncProjectBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<SyncProjectQuery> = Joi.object({});
}
