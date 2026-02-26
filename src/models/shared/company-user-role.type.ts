import { z } from "zod";

export enum CompanyUserRole {
  ADMIN = "admin",
  SUGGEST = "suggest",
  READ = "read",
}

export const companyUserRoleSchema = z.nativeEnum(CompanyUserRole);
