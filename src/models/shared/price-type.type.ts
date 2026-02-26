import { z } from "zod";

export enum PriceType {
  ANNUALLY = "annually",
  MONTHLY = "monthly",
  ONE_TIME = "one_time",
}

export enum CampaignPriceType {
  MONTHLY = "monthly",
  ONE_TIME = "one_time",
}

export enum PlanPriceType {
  MONTHLY = "monthly",
  ANNUALLY = "annually",
}

export const priceTypeSchema = z.nativeEnum(PriceType);
export const campaignPriceTypeSchema = z.nativeEnum(CampaignPriceType);
export const planPriceTypeSchema = z.nativeEnum(PlanPriceType);
