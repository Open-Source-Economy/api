import { z } from "zod";

export enum ProjectType {
  GITHUB = "github",
  MANUAL = "manual",
}

export const projectTypeSchema = z.nativeEnum(ProjectType);
