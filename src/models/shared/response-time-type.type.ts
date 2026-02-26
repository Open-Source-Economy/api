import { z } from "zod";

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

export const responseTimeTypeSchema = z.nativeEnum(ResponseTimeType);
