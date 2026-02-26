import { z } from "zod";

export enum ManagedIssueState {
  OPEN = "open",
  REJECTED = "rejected",
  SOLVED = "solved",
}

export const managedIssueStateSchema = z.nativeEnum(ManagedIssueState);
