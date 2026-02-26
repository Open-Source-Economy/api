import { z } from "zod";

export enum OwnerType {
  User = "User",
  Organization = "Organization",
}

export const ownerTypeSchema = z.nativeEnum(OwnerType);
