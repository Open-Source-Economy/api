/**
 * Verification status for developer profiles and project items
 * Tracks the admin review workflow from submission to approval
 */
export enum VerificationStatus {
  /**
   * Default state when onboarding completes
   * Awaiting initial admin review
   */
  PENDING_REVIEW = "pending_review",

  /**
   * Admin has claimed this review and is actively working on it
   * Prevents duplicate work by other admins
   */
  UNDER_REVIEW = "under_review",

  /**
   * Admin needs clarification or additional information from the developer
   * Developer should respond to admin's questions
   */
  INFORMATION_REQUESTED = "information_requested",

  /**
   * Admin found inaccuracies that need to be corrected
   * Developer must update their profile/project information
   */
  CHANGES_REQUESTED = "changes_requested",

  /**
   * Profile/project has been verified and approved
   * Ready for production use
   */
  APPROVED = "approved",

  /**
   * Profile/project has been rejected
   * Does not meet criteria or is fraudulent
   */
  REJECTED = "rejected",
}
