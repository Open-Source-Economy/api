import { z } from "zod";

export enum VerificationEntityType {
  DEVELOPER_PROFILE = "developer_profile",
  DEVELOPER_PROJECT_ITEM = "developer_project_item",
}

export const verificationEntityTypeSchema = z.nativeEnum(VerificationEntityType);
