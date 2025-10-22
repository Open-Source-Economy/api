import { IncomeStreamType, IncomeStreamTypeCompanion } from "../../../model";
import Joi from "joi";

export interface SetDeveloperIncomeStreamsParams {}

export interface SetDeveloperIncomeStreamsBody {
  incomeStreams: IncomeStreamType[];
}

export interface SetDeveloperIncomeStreamsQuery {}

export interface SetDeveloperIncomeStreamsResponse {}

export namespace SetDeveloperIncomeStreamsCompanion {
  export const paramsSchema: Joi.ObjectSchema<SetDeveloperIncomeStreamsParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<SetDeveloperIncomeStreamsBody> = Joi.object({
    incomeStreams: Joi.array().items(IncomeStreamTypeCompanion.schema).required().messages({
      "array.base": "Income streams must be an array",
      "array.empty": "Income streams cannot be empty",
      "any.required": "Income streams are required",
    }),
  });

  export const querySchema: Joi.ObjectSchema<SetDeveloperIncomeStreamsQuery> = Joi.object({});
}
