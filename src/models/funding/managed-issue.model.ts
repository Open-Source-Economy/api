import { z } from "zod";
import { type ManagedIssueId, ManagedIssueIdSchema, type UserId, UserIdSchema } from "src/types/uuid";
import { type IssueId, issueIdSchema } from "src/models/github/issue-id.type";
import { type ContributorVisibility, contributorVisibilitySchema } from "src/models/shared/contributor-visibility.type";
import { type ManagedIssueState, managedIssueStateSchema } from "src/models/shared/managed-issue-state.type";

export interface ManagedIssue {
  id: ManagedIssueId;
  githubIssueId: IssueId;
  requestedCreditAmount: number | null;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;
}

export const ManagedIssueSchema = z.object({
  id: ManagedIssueIdSchema,
  githubIssueId: issueIdSchema,
  requestedCreditAmount: z.number().nullable(),
  managerId: UserIdSchema,
  contributorVisibility: contributorVisibilitySchema,
  state: managedIssueStateSchema,
}) satisfies z.ZodType<ManagedIssue>;
