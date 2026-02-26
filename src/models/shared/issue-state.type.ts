import { z } from "zod";

export enum IssueState {
  FUND_OFFERED = "FUND_OFFERED",
  COLLECT_REJECTED = "COLLECT_REJECTED",
  REFUNDED = "REFUNDED",
  COLLECT_APPROVED = "COLLECT_APPROVED",
  FUND_TO_BE_DISTRIBUTED = "FUND_TO_BE_DISTRIBUTED",
  FUND_DISTRIBUTED = "FUND_DISTRIBUTED",
}

export const issueStateSchema = z.nativeEnum(IssueState);
