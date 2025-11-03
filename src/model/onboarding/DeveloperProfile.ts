import { UserId } from "../user";
import { UUID } from "../UUID";

export class DeveloperProfileId extends UUID {}

/**
 * A developer's profile in the system.
 * Contains contact information and onboarding status.
 *
 * Verification information is now stored separately in VerificationRecord table.
 */
export interface DeveloperProfile {
  id: DeveloperProfileId;
  userId: UserId;
  contactEmail: string;
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
