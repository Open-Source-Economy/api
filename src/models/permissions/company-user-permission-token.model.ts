import { z } from "zod";
import {
  type CompanyUserPermissionTokenId,
  CompanyUserPermissionTokenIdSchema,
  type CompanyId,
  CompanyIdSchema,
} from "src/types/uuid";
import { type CompanyUserRole, companyUserRoleSchema } from "src/models/shared/company-user-role.type";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";

export interface CompanyUserPermissionToken {
  id: CompanyUserPermissionTokenId;
  userName: string | null;
  userEmail: string;
  token: string;
  companyId: CompanyId;
  companyUserRole: CompanyUserRole;
  expiresAt: ISODateTimeString;
  hasBeenUsed: boolean;
}

export const CompanyUserPermissionTokenSchema = z.object({
  id: CompanyUserPermissionTokenIdSchema,
  userName: z.string().nullable(),
  userEmail: z.string().email(),
  token: z.string(),
  companyId: CompanyIdSchema,
  companyUserRole: companyUserRoleSchema,
  expiresAt: isoDateTimeSchema,
  hasBeenUsed: z.boolean(),
}) satisfies z.ZodType<CompanyUserPermissionToken>;
