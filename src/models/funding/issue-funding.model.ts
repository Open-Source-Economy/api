import { z } from "zod";
import { type IssueFundingId, IssueFundingIdSchema, type UserId, UserIdSchema } from "src/types/uuid";
import { type IssueId, issueIdSchema } from "src/models/github/issue-id.type";

export interface IssueFunding {
  id: IssueFundingId;
  githubIssueId: IssueId;
  userId: UserId;
  credit: number;
}

export const IssueFundingSchema = z.object({
  id: IssueFundingIdSchema,
  githubIssueId: issueIdSchema,
  userId: UserIdSchema,
  credit: z.number(),
}) satisfies z.ZodType<IssueFunding>;
