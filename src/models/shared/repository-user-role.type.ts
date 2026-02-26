import { z } from "zod";

export enum RepositoryUserRole {
  ADMIN = "admin",
  READ = "read",
}

export const repositoryUserRoleSchema = z.nativeEnum(RepositoryUserRole);
