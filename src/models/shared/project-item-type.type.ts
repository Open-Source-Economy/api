import { z } from "zod";

export enum ProjectItemType {
  GITHUB_REPOSITORY = "GITHUB_REPOSITORY",
  GITHUB_OWNER = "GITHUB_OWNER",
  URL = "URL",
}

export const projectItemTypeSchema = z.nativeEnum(ProjectItemType);
