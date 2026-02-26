import { z } from "zod";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type Repository, RepositorySchema } from "src/models/github/repository.model";

export interface Project {
  owner: Owner;
  repository?: Repository;
}

export const ProjectSchema = z.object({
  owner: OwnerSchema,
  repository: RepositorySchema.optional(),
}) satisfies z.ZodType<Project>;
