import Joi from "joi";
import { Owner, Repository } from "../../model";

export interface SyncRepositoryParams {
  owner: string;
  repo: string;
}

export interface SyncRepositoryResponse {
  owner: Owner;
  repository: Repository;
}

export interface SyncRepositoryBody {}

export interface SyncRepositoryQuery {}

export namespace SyncRepositoryCompanion {
  export const paramsSchema: Joi.ObjectSchema<SyncRepositoryParams> = Joi.object({
    owner: Joi.string().required().messages({
      "string.base": "Owner must be a string",
      "any.required": "Owner parameter is required",
      "string.empty": "Owner parameter cannot be empty",
    }),
    repo: Joi.string().required().messages({
      "string.base": "Repository name must be a string",
      "any.required": "Repository name parameter is required",
      "string.empty": "Repository name parameter cannot be empty",
    }),
  });

  export const bodySchema: Joi.ObjectSchema<SyncRepositoryBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<SyncRepositoryQuery> = Joi.object({});
}
