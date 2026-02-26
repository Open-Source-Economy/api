import { z } from "zod";
import { type ProjectItem, ProjectItemSchema } from "./project-item.model";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type Repository, RepositorySchema } from "src/models/github/repository.model";

export interface ProjectItemDetails {
  projectItem: ProjectItem;
  owner: Owner | null;
  repository: Repository | null;
}

export const ProjectItemDetailsSchema = z.object({
  projectItem: ProjectItemSchema,
  owner: OwnerSchema.nullable(),
  repository: RepositorySchema.nullable(),
}) satisfies z.ZodType<ProjectItemDetails>;
