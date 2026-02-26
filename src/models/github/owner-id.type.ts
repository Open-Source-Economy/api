import { z } from "zod";

/**
 * GitHub owner identifier.
 * `login` is the unique GitHub username, `githubId` is the numeric GitHub ID.
 */
export interface OwnerId {
  login: string;
  githubId?: number;
}

export const ownerIdSchema = z.object({
  login: z.string().min(1),
  githubId: z.number().int().optional(),
}) satisfies z.ZodType<OwnerId>;
