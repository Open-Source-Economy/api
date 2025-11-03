import { UserId } from "../user";
import { DeveloperProfileId } from "./DeveloperProfile";
import { DeveloperProjectItemId } from "./DeveloperProjectItem";
import { VerificationStatus } from "./VerificationStatus";
import { UUID } from "../UUID";

/**
 * Type of entity being verified
 */
export enum VerificationEntityType {
  DEVELOPER_PROFILE = "developer_profile",
  DEVELOPER_PROJECT_ITEM = "developer_project_item",
}

/**
 * A record tracking the verification process for a developer profile or project item.
 *
 * This provides:
 * - Full audit trail of verification status changes
 * - Admin notes and communication with developers
 * - Support for future features like appeals and multi-step workflows
 * - Historical record of who verified what and when
 *
 * Each entity (profile or project item) can have multiple records over time,
 * with the most recent record representing the current status.
 */
export interface VerificationRecord {
  id: VerificationRecordId;

  /** Type of entity being verified */
  entityType: VerificationEntityType;

  /** ID of the entity (either DeveloperProfileId or DeveloperProjectItemId) */
  entityId: string;

  /** Current verification status */
  status: VerificationStatus;

  /** Admin notes, questions, or feedback */
  notes?: string;

  /** Admin user who made this verification decision */
  verifiedBy?: UserId;

  /** Timestamp when this record was created */
  createdAt: Date;

  /** Optional: Developer's response (for future use in appeals/communication) */
  developerResponse?: string;

  /** Optional: Timestamp of developer's response */
  developerRespondedAt?: Date;
}

/**
 * Branded type for VerificationRecord IDs
 */
export class VerificationRecordId extends UUID {}
