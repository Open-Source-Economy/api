import { z } from "zod";
import {
  type ManualInvoiceId,
  ManualInvoiceIdSchema,
  type CompanyId,
  CompanyIdSchema,
  type UserId,
  UserIdSchema,
} from "src/types/uuid";

export interface ManualInvoice {
  id: ManualInvoiceId;
  number: number;
  companyId?: CompanyId;
  userId?: UserId;
  paid: boolean;
  creditAmount: number;
}

export const ManualInvoiceSchema = z.object({
  id: ManualInvoiceIdSchema,
  number: z.number(),
  companyId: CompanyIdSchema.optional(),
  userId: UserIdSchema.optional(),
  paid: z.boolean(),
  creditAmount: z.number(),
}) satisfies z.ZodType<ManualInvoice>;
