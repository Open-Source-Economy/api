import Joi from "joi";
import { VerificationRecord, VerificationEntityType, VerificationStatus } from "../../model";

export interface CreateVerificationRecordParams {}

export interface CreateVerificationRecordBody {
  entityType: VerificationEntityType;
  entityId: string;
  status: VerificationStatus;
  notes?: string;
}

export interface CreateVerificationRecordQuery {}

export interface CreateVerificationRecordResponse {
  record: VerificationRecord;
}

export namespace CreateVerificationRecordCompanion {
  export const paramsSchema: Joi.ObjectSchema<CreateVerificationRecordParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<CreateVerificationRecordBody> = Joi.object({
    entityType: Joi.string()
      .valid(...Object.values(VerificationEntityType))
      .required()
      .messages({
        "any.only": "Entity type must be either developer_profile or developer_project_item",
        "any.required": "Entity type is required",
      }),
    entityId: Joi.string().uuid().required().messages({
      "string.guid": "Entity ID must be a valid UUID",
      "any.required": "Entity ID is required",
    }),
    status: Joi.string()
      .valid(...Object.values(VerificationStatus))
      .required()
      .messages({
        "any.only": "Status must be a valid verification status",
        "any.required": "Status is required",
      }),
    notes: Joi.string().optional().allow("").messages({
      "string.base": "Notes must be a string",
    }),
  });

  export const querySchema: Joi.ObjectSchema<CreateVerificationRecordQuery> = Joi.object({});
}
