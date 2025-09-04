import Joi from "joi";

export enum ResponseTimeType {
  None = "none",
  FourHours = "4_hours",
  TwelveHours = "12_hours",
  OneBusinessDay = "11_business_day",
  TwoBusinessDays = "22_business_day",
  ThreeBusinessDays = "33_business_day",
  FourBusinessDays = "44_business_day",
  FiveBusinessDays = "55_business_day",
  SevenBusinessDays = "77_business_day",
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
