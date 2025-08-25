import Joi from "joi";

export enum ResponseTimeType {
  FourHours = "4 hours",
  TwelveHours = "12 hours",
  OneBusinessDay = "1 business day",
  TwoBusinessDays = "2 business day",
  ThreeBusinessDays = "3 business day",
  FourBusinessDays = "4 business day",
  FiveBusinessDays = "5 business day",
  SevenBusinessDays = "7 business day",
}

export namespace ResponseTimeTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(ResponseTimeType))
    .messages({
      "any.only": "{{#label}} must be a valid response time type",
      "string.empty": "Response time type cannot be empty",
      "string.trim": "Response time type cannot consist only of spaces",
    });
}
