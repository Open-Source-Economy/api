import Joi from "joi";
import { Owner } from "../../model";

export interface SyncOwnerParams {
  owner: string;
}

export interface SyncOwnerResponse {
  owner: Owner;
}

export interface SyncOwnerBody {}

export interface SyncOwnerQuery {}

export namespace SyncOwnerCompanion {
  export const paramsSchema: Joi.ObjectSchema<SyncOwnerParams> = Joi.object({
    owner: Joi.string().required().messages({
      "string.base": "Owner must be a string",
      "any.required": "Owner parameter is required",
      "string.empty": "Owner parameter cannot be empty",
    }),
  });

  export const bodySchema: Joi.ObjectSchema<SyncOwnerBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<SyncOwnerQuery> = Joi.object({});
}
