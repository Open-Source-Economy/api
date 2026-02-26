import { z } from "zod";
import { type DeveloperProfile, DeveloperProfileSchema } from "./developer-profile.model";
import { type DeveloperProjectItem, DeveloperProjectItemSchema } from "./developer-project-item.model";
import { type DeveloperService, DeveloperServiceSchema } from "./developer-service.model";
import { type DeveloperSettings, DeveloperSettingsSchema } from "./developer-settings.model";
import { type VerificationRecord, VerificationRecordSchema } from "./verification-record.model";
import { type ProjectItem, ProjectItemSchema } from "src/models/project/project-item.model";
import { type Service, ServiceSchema } from "src/models/project/service.model";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";
import { type User, UserSchema } from "src/models/user/user.model";

/**
 * Developer profile entry combining the profile with its verification history
 */
export interface DeveloperProfileEntry {
  profile: DeveloperProfile;
  user: User;
  owner: Owner | null;
  verificationRecords: VerificationRecord[];
}

export const DeveloperProfileEntrySchema = z.object({
  profile: DeveloperProfileSchema,
  user: UserSchema,
  owner: OwnerSchema.nullable(),
  verificationRecords: z.array(VerificationRecordSchema),
}) satisfies z.ZodType<DeveloperProfileEntry>;

/**
 * Developer project item entry combining the project and developer's relationship to it
 */
export interface DeveloperProjectItemEntry {
  projectItem: ProjectItem;
  developerProjectItem: DeveloperProjectItem;
  verificationRecords?: VerificationRecord[];
}

export const DeveloperProjectItemEntrySchema = z.object({
  projectItem: ProjectItemSchema,
  developerProjectItem: DeveloperProjectItemSchema,
  verificationRecords: z.array(VerificationRecordSchema).optional(),
}) satisfies z.ZodType<DeveloperProjectItemEntry>;

/**
 * Developer service entry combining the service definition and developer's offering
 */
export interface DeveloperServiceEntry {
  service: Service;
  developerService: DeveloperService | null;
}

export const DeveloperServiceEntrySchema = z.object({
  service: ServiceSchema,
  developerService: DeveloperServiceSchema.nullable(),
}) satisfies z.ZodType<DeveloperServiceEntry>;

/**
 * Complete developer profile with all related data.
 * Used for onboarding, admin views, and profile displays.
 */
export interface FullDeveloperProfile {
  profileEntry: DeveloperProfileEntry | null;
  settings: DeveloperSettings | null;
  projects: DeveloperProjectItemEntry[];
  services: DeveloperServiceEntry[];
}

export const FullDeveloperProfileSchema = z.object({
  profileEntry: DeveloperProfileEntrySchema.nullable(),
  settings: DeveloperSettingsSchema.nullable(),
  projects: z.array(DeveloperProjectItemEntrySchema),
  services: z.array(DeveloperServiceEntrySchema),
}) satisfies z.ZodType<FullDeveloperProfile>;
