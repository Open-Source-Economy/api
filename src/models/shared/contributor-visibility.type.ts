import { z } from "zod";

export enum ContributorVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export const contributorVisibilitySchema = z.nativeEnum(ContributorVisibility);
