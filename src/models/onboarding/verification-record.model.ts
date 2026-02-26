import { z } from "zod";
import { type VerificationRecordId, VerificationRecordIdSchema, type UserId, UserIdSchema } from "src/types/uuid";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";
import {
  type VerificationEntityType,
  verificationEntityTypeSchema,
} from "src/models/shared/verification-entity-type.type";
import { type VerificationStatus, verificationStatusSchema } from "src/models/shared/verification-status.type";

export interface VerificationRecord {
  id: VerificationRecordId;
  entityType: VerificationEntityType;
  entityId: string;
  status: VerificationStatus;
  notes?: string;
  verifiedBy?: UserId;
  createdAt: ISODateTimeString;
  developerResponse?: string;
  developerRespondedAt?: ISODateTimeString;
}

export const VerificationRecordSchema = z.object({
  id: VerificationRecordIdSchema,
  entityType: verificationEntityTypeSchema,
  entityId: z.string(),
  status: verificationStatusSchema,
  notes: z.string().optional(),
  verifiedBy: UserIdSchema.optional(),
  createdAt: isoDateTimeSchema,
  developerResponse: z.string().optional(),
  developerRespondedAt: isoDateTimeSchema.optional(),
}) satisfies z.ZodType<VerificationRecord>;
