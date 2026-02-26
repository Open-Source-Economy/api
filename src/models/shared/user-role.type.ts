import { z } from "zod";

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

export const userRoleSchema = z.nativeEnum(UserRole);
