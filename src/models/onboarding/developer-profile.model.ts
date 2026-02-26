import { z } from "zod";
import { type DeveloperProfileId, DeveloperProfileIdSchema, type UserId, UserIdSchema } from "src/types/uuid";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";

export interface DeveloperProfile {
  id: DeveloperProfileId;
  userId: UserId;
  contactEmail: string;
  onboardingCompleted: boolean;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export const DeveloperProfileSchema = z.object({
  id: DeveloperProfileIdSchema,
  userId: UserIdSchema,
  contactEmail: z.string(),
  onboardingCompleted: z.boolean(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}) satisfies z.ZodType<DeveloperProfile>;
