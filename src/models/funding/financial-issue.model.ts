import { z } from "zod";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type Repository, RepositorySchema } from "src/models/github/repository.model";
import { type Issue, IssueSchema } from "src/models/github/issue.model";
import { type ManagedIssue, ManagedIssueSchema } from "./managed-issue.model";
import { type IssueFunding, IssueFundingSchema } from "./issue-funding.model";

export interface FinancialIssue {
  owner: Owner;
  repository: Repository;
  issue: Issue;
  managedIssue?: ManagedIssue;
  issueFundings: IssueFunding[];
}

export const FinancialIssueSchema = z.object({
  owner: OwnerSchema,
  repository: RepositorySchema,
  issue: IssueSchema,
  managedIssue: ManagedIssueSchema.optional(),
  issueFundings: z.array(IssueFundingSchema),
}) satisfies z.ZodType<FinancialIssue>;
