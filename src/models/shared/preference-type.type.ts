import { z } from "zod";

export enum PreferenceType {
  YES = "yes",
  MAYBE_LATER = "maybe_later",
  NOT_INTERESTED = "not_interested",
}

export const preferenceTypeSchema = z.nativeEnum(PreferenceType);
