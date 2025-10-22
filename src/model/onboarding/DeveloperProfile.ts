import { UserId } from "../user";
import { UUID } from "../UUID";

export class DeveloperProfileId extends UUID {}

export interface DeveloperProfile {
  id: DeveloperProfileId;
  userId: UserId;
  contactEmail: string; // Added contactEmail
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
