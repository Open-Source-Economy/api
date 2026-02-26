import { z } from "zod";

export enum ProductType {
  CREDIT = "credit",
  DONATION = "donation",
  INDIVIDUAL_PLAN = "individual_plan",
  START_UP_PLAN = "start_up_plan",
  SCALE_UP_PLAN = "scale_up_plan",
  ENTERPRISE_PLAN = "enterprise_plan",
}

export enum CampaignProductType {
  CREDIT = "credit",
  DONATION = "donation",
}

export enum PlanProductType {
  INDIVIDUAL_PLAN = "individual_plan",
  START_UP_PLAN = "start_up_plan",
  SCALE_UP_PLAN = "scale_up_plan",
  ENTERPRISE_PLAN = "enterprise_plan",
}

export const productTypeSchema = z.nativeEnum(ProductType);
export const campaignProductTypeSchema = z.nativeEnum(CampaignProductType);
export const planProductTypeSchema = z.nativeEnum(PlanProductType);
