import { z } from "zod";
import { type RepositoryId, repositoryIdSchema } from "./repository-id.type";

/**
 * Composite issue identifier.
 */
export interface IssueId {
  repositoryId: RepositoryId;
  number: number;
  githubId?: number;
}

export const issueIdSchema = z.object({
  repositoryId: repositoryIdSchema,
  number: z.number().int(),
  githubId: z.number().int().optional(),
}) satisfies z.ZodType<IssueId>;
