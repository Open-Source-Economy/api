import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { GetEndpointDefinition } from "src/types/endpoint.types";
import { type StripePrice, StripePriceSchema } from "src/models/stripe/stripe-price.model";
import { type Currency, currencySchema } from "src/models/shared/currency.type";
import { type CampaignPriceType, campaignPriceTypeSchema } from "src/models/shared/price-type.type";
import { type CampaignProductType, campaignProductTypeSchema } from "src/models/shared/product-type.type";

// ============================================
// GET /projects/owners/:owner/campaigns
// ============================================

export interface Price {
  totalAmount: number;
  quantity: number;
  label: string;
  price: StripePrice;
}

export interface GetCampaignParams {
  owner: string;
  repo?: string;
}

export interface GetCampaignQuery {}

export interface GetCampaignResponse {
  raisedAmount: Record<Currency, number>;
  targetAmount: Record<Currency, number>;
  numberOfBackers?: number;
  numberOfDaysLeft?: number;
  prices: Record<CampaignPriceType, Record<Currency, Record<CampaignProductType, Price[]>>>;
}

const PriceSchema = z.object({
  totalAmount: z.number(),
  quantity: z.number().int(),
  label: z.string(),
  price: StripePriceSchema,
}) satisfies z.ZodType<Price>;

const GetCampaignParamsSchema = z.object({
  owner: z.string().min(1),
  repo: z.string().min(1).optional(),
}) satisfies z.ZodType<GetCampaignParams>;

const GetCampaignQuerySchema = z.object({}) satisfies z.ZodType<GetCampaignQuery>;

const GetCampaignResponseSchema = z.object({
  raisedAmount: z.record(currencySchema, z.number()),
  targetAmount: z.record(currencySchema, z.number()),
  numberOfBackers: z.number().int().optional(),
  numberOfDaysLeft: z.number().int().optional(),
  prices: z.record(
    campaignPriceTypeSchema,
    z.record(currencySchema, z.record(campaignProductTypeSchema, z.array(PriceSchema)))
  ),
}) satisfies z.ZodType<GetCampaignResponse>;

export const getCampaignEndpoint = {
  method: "GET",
  path: "/projects/owners/:owner/campaigns",
  pathParams: GetCampaignParamsSchema,
  query: GetCampaignQuerySchema,
  responses: { 200: GetCampaignResponseSchema, 400: ProblemDetailsSchema },
  summary: "Get campaign data for a project",
} as const satisfies GetEndpointDefinition;
