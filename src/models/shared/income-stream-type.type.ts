import { z } from "zod";

export enum IncomeStreamType {
  ROYALTIES = "royalties",
  SERVICES = "services",
  DONATIONS = "donations",
}

export const incomeStreamTypeSchema = z.nativeEnum(IncomeStreamType);
