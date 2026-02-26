import { z } from "zod";

export enum Currency {
  USD = "usd",
  EUR = "eur",
  GBP = "gbp",
  CHF = "chf",
}

export const currencySchema = z.nativeEnum(Currency);
