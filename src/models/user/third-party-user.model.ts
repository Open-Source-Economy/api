import { z } from "zod";
import { type Provider, providerSchema } from "src/models/shared/provider.type";
import { type Owner, OwnerSchema } from "src/models/github/owner.model";

export interface GithubData {
  owner: Owner;
}

export const GithubDataSchema = z.object({
  owner: OwnerSchema,
}) satisfies z.ZodType<GithubData>;

export interface ThirdPartyUser {
  provider: Provider;
  email: string | null;
  providerData: GithubData;
}

export const ThirdPartyUserSchema = z.object({
  provider: providerSchema,
  email: z.string().email().nullable(),
  providerData: GithubDataSchema,
}) satisfies z.ZodType<ThirdPartyUser>;
