import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type Currency, currencySchema } from "src/models/shared/currency.type";

export interface SetPreferredCurrencyParams {
  currency: Currency;
}

export interface SetPreferredCurrencyQuery {}

export interface SetPreferredCurrencyBody {}

export interface SetPreferredCurrencyResponse {}

const SetPreferredCurrencyParamsSchema = z.object({
  currency: currencySchema,
}) satisfies z.ZodType<SetPreferredCurrencyParams>;

const SetPreferredCurrencyQuerySchema = z.object({}) satisfies z.ZodType<SetPreferredCurrencyQuery>;

const SetPreferredCurrencyBodySchema = z.object({}) satisfies z.ZodType<SetPreferredCurrencyBody>;

const SetPreferredCurrencyResponseSchema = z.object({}) satisfies z.ZodType<SetPreferredCurrencyResponse>;

export const setPreferredCurrencyEndpoint = {
  method: "POST",
  path: "/user/preferred-currency/:currency",
  pathParams: SetPreferredCurrencyParamsSchema,
  query: SetPreferredCurrencyQuerySchema,
  body: SetPreferredCurrencyBodySchema,
  responses: { 201: SetPreferredCurrencyResponseSchema, 400: ProblemDetailsSchema },
  summary: "Set the preferred currency for the authenticated user",
} as const satisfies PostEndpointDefinition;
