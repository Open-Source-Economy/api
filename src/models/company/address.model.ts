import { z } from "zod";
import { type AddressId, AddressIdSchema } from "src/types/uuid";

export interface Address {
  id: AddressId;
  name?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
}

export const AddressSchema = z.object({
  id: AddressIdSchema,
  name: z.string().optional(),
  line1: z.string().optional(),
  line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
}) satisfies z.ZodType<Address>;
