import Joi from "joi";

export enum ResponseTimeType {
  None = "none",
  FourHours = "4_hours",
  TwelveHours = "12_hours",
  OneBusinessDay = "1_business_day",
  TwoBusinessDays = "2_business_day",
  ThreeBusinessDays = "3_business_day",
  FourBusinessDays = "4_business_day",
  FiveBusinessDays = "5_business_day",
  SevenBusinessDays = "7_business_day",
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
