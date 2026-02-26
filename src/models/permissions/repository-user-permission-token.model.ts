import { z } from "zod";
import { type RepositoryUserPermissionTokenId, RepositoryUserPermissionTokenIdSchema } from "src/types/uuid";
import { type RepositoryId, repositoryIdSchema } from "src/models/github/repository-id.type";
import { type RepositoryUserRole, repositoryUserRoleSchema } from "src/models/shared/repository-user-role.type";
import { type Currency, currencySchema } from "src/models/shared/currency.type";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";

export interface RepositoryUserPermissionToken {
  id: RepositoryUserPermissionTokenId;
  userName: string | null;
  userEmail: string | null;
  userGithubOwnerLogin: string;
  token: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  rate: number | null;
  currency: Currency | null;
  expiresAt: ISODateTimeString;
  hasBeenUsed: boolean;
}

export const RepositoryUserPermissionTokenSchema = z.object({
  id: RepositoryUserPermissionTokenIdSchema,
  userName: z.string().nullable(),
  userEmail: z.string().nullable(),
  userGithubOwnerLogin: z.string(),
  token: z.string(),
  repositoryId: repositoryIdSchema,
  repositoryUserRole: repositoryUserRoleSchema,
  rate: z.number().nullable(),
  currency: currencySchema.nullable(),
  expiresAt: isoDateTimeSchema,
  hasBeenUsed: z.boolean(),
}) satisfies z.ZodType<RepositoryUserPermissionToken>;
