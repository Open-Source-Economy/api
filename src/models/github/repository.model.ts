import { z } from "zod";
import { type RepositoryId, repositoryIdSchema } from "./repository-id.type";

export interface Repository {
  id: RepositoryId;
  htmlUrl: string | null;
  description?: string;
  homepage?: string;
  language?: string;
  forksCount?: number;
  stargazersCount?: number;
  watchersCount?: number;
  fullName?: string;
  fork?: boolean;
  topics?: string[];
  openIssuesCount?: number;
  visibility?: string;
  subscribersCount?: number;
  networkCount?: number;
}

export const RepositorySchema = z.object({
  id: repositoryIdSchema,
  htmlUrl: z.string().nullable(),
  description: z.string().optional(),
  homepage: z.string().optional(),
  language: z.string().optional(),
  forksCount: z.number().int().optional(),
  stargazersCount: z.number().int().optional(),
  watchersCount: z.number().int().optional(),
  fullName: z.string().optional(),
  fork: z.boolean().optional(),
  topics: z.array(z.string()).optional(),
  openIssuesCount: z.number().int().optional(),
  visibility: z.string().optional(),
  subscribersCount: z.number().int().optional(),
  networkCount: z.number().int().optional(),
}) satisfies z.ZodType<Repository>;
