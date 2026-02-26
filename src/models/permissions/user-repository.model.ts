import { z } from "zod";
import { type UserId, UserIdSchema } from "src/types/uuid";
import { type RepositoryId, repositoryIdSchema } from "src/models/github/repository-id.type";
import { type RepositoryUserRole, repositoryUserRoleSchema } from "src/models/shared/repository-user-role.type";
import { type Currency, currencySchema } from "src/models/shared/currency.type";

export interface UserRepository {
  userId: UserId;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  rate: number | null;
  currency: Currency | null;
}

export const UserRepositorySchema = z.object({
  userId: UserIdSchema,
  repositoryId: repositoryIdSchema,
  repositoryUserRole: repositoryUserRoleSchema,
  rate: z.number().nullable(),
  currency: currencySchema.nullable(),
}) satisfies z.ZodType<UserRepository>;
