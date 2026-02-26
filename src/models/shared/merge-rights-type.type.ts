import { z } from "zod";

export enum MergeRightsType {
  NONE = "none",
  REVIEWER = "reviewer",
  LIMITED = "limited",
  FULL_COMMITTER = "full_committer",
  VOTE_BASED_COMMITTER = "vote_based_committer",
  RELEASE_MANAGER = "release_manager",
  EMERITUS = "emeritus",
}

export const mergeRightsTypeSchema = z.nativeEnum(MergeRightsType);
