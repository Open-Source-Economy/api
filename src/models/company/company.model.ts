import { z } from "zod";
import { type CompanyId, CompanyIdSchema, type AddressId, AddressIdSchema } from "src/types/uuid";

export interface Company {
  id: CompanyId;
  taxId: string | null;
  name: string;
  addressId: AddressId | null;
}

export const CompanySchema = z.object({
  id: CompanyIdSchema,
  taxId: z.string().nullable(),
  name: z.string(),
  addressId: AddressIdSchema.nullable(),
}) satisfies z.ZodType<Company>;
