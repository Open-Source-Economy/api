import { z } from "zod";

export enum VerificationStatus {
  PENDING_REVIEW = "pending_review",
  UNDER_REVIEW = "under_review",
  INFORMATION_REQUESTED = "information_requested",
  CHANGES_REQUESTED = "changes_requested",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export const verificationStatusSchema = z.nativeEnum(VerificationStatus);
