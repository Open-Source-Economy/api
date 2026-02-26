import { z } from "zod";
import { ProblemDetailsSchema } from "src/schemas/problem-details.schema";
import type { PostEndpointDefinition } from "src/types/endpoint.types";
import { type VerificationRecord, VerificationRecordSchema } from "src/models/onboarding/verification-record.model";
import {
  type VerificationEntityType,
  verificationEntityTypeSchema,
} from "src/models/shared/verification-entity-type.type";
import { type VerificationStatus, verificationStatusSchema } from "src/models/shared/verification-status.type";

// ============================================
// POST /admin/verification-record
// ============================================

export interface CreateVerificationRecordParams {}

export interface CreateVerificationRecordQuery {}

export interface CreateVerificationRecordBody {
  entityType: VerificationEntityType;
  entityId: string;
  status: VerificationStatus;
  notes?: string;
}

export interface CreateVerificationRecordResponse {
  record: VerificationRecord;
}

const CreateVerificationRecordParamsSchema = z.object({}) satisfies z.ZodType<CreateVerificationRecordParams>;

const CreateVerificationRecordQuerySchema = z.object({}) satisfies z.ZodType<CreateVerificationRecordQuery>;

const CreateVerificationRecordBodySchema = z.object({
  entityType: verificationEntityTypeSchema,
  entityId: z.string().uuid(),
  status: verificationStatusSchema,
  notes: z.string().optional(),
}) satisfies z.ZodType<CreateVerificationRecordBody>;

const CreateVerificationRecordResponseSchema = z.object({
  record: VerificationRecordSchema,
}) satisfies z.ZodType<CreateVerificationRecordResponse>;

export const createVerificationRecordEndpoint = {
  method: "POST",
  path: "/admin/verification-record",
  pathParams: CreateVerificationRecordParamsSchema,
  query: CreateVerificationRecordQuerySchema,
  body: CreateVerificationRecordBodySchema,
  responses: {
    201: CreateVerificationRecordResponseSchema,
    400: ProblemDetailsSchema,
    401: ProblemDetailsSchema,
    403: ProblemDetailsSchema,
  },
  summary: "Create a verification record (admin)",
} as const satisfies PostEndpointDefinition;
