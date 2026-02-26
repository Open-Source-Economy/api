import { z } from "zod";
import { type UserId, UserIdSchema } from "src/types/uuid";
import { type UserRole, userRoleSchema } from "src/models/shared/user-role.type";
import { type Currency, currencySchema } from "src/models/shared/currency.type";

export interface User {
  id: UserId;
  name: string | null;
  role: UserRole;
  preferredCurrency?: Currency;
  termsAcceptedVersion?: string;
}

export const UserSchema = z.object({
  id: UserIdSchema,
  name: z.string().nullable(),
  role: userRoleSchema,
  preferredCurrency: currencySchema.optional(),
  termsAcceptedVersion: z.string().optional(),
}) satisfies z.ZodType<User>;
