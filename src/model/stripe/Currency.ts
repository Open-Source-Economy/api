import Joi from "joi";

export enum Currency {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
  CHF = "chf",
}

export namespace CurrencyCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(Currency))
    .messages({
      "any.only": "{{#label}} must be a valid currency type",
      "string.empty": "Currency cannot be empty",
      "string.trim": "Currency cannot consist only of spaces",
      "any.required": "Currency is required",
    });
}
