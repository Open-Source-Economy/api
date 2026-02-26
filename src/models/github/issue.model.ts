import { z } from "zod";
import { type IssueId, issueIdSchema } from "./issue-id.type";
import { type OwnerId, ownerIdSchema } from "./owner-id.type";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";

export interface Issue {
  id: IssueId;
  title: string;
  htmlUrl: string;
  createdAt: ISODateTimeString;
  closedAt: ISODateTimeString | null;
  openBy: OwnerId;
  body?: string;
}

export const IssueSchema = z.object({
  id: issueIdSchema,
  title: z.string(),
  htmlUrl: z.string(),
  createdAt: isoDateTimeSchema,
  closedAt: isoDateTimeSchema.nullable(),
  openBy: ownerIdSchema,
  body: z.string().optional(),
}) satisfies z.ZodType<Issue>;
