import { z } from "zod";
import { type OwnerId, ownerIdSchema } from "./owner-id.type";

/**
 * Composite repository identifier.
 */
export interface RepositoryId {
  ownerId: OwnerId;
  name: string;
  githubId?: number;
}

export const repositoryIdSchema = z.object({
  ownerId: ownerIdSchema,
  name: z.string().min(1),
  githubId: z.number().int().optional(),
}) satisfies z.ZodType<RepositoryId>;
