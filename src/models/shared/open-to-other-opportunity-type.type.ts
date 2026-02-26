import { z } from "zod";

export enum OpenToOtherOpportunityType {
  YES = "yes",
  MAYBE = "maybe",
  NO = "no",
}

export const openToOtherOpportunityTypeSchema = z.nativeEnum(OpenToOtherOpportunityType);
