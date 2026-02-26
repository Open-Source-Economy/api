import { z } from "zod";
import { type OwnerId, ownerIdSchema } from "./owner-id.type";
import { type OwnerType, ownerTypeSchema } from "src/models/shared/owner-type.type";

export interface Owner {
  id: OwnerId;
  type: OwnerType;
  htmlUrl: string;
  avatarUrl?: string;
  displayAvatarUrl?: string;
  followers?: number;
  following?: number;
  publicRepos?: number;
  publicGists?: number;
  name?: string;
  twitterUsername?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;
}

export const OwnerSchema = z.object({
  id: ownerIdSchema,
  type: ownerTypeSchema,
  htmlUrl: z.string(),
  avatarUrl: z.string().optional(),
  displayAvatarUrl: z.string().optional(),
  followers: z.number().int().optional(),
  following: z.number().int().optional(),
  publicRepos: z.number().int().optional(),
  publicGists: z.number().int().optional(),
  name: z.string().optional(),
  twitterUsername: z.string().optional(),
  company: z.string().optional(),
  blog: z.string().optional(),
  location: z.string().optional(),
  email: z.string().optional(),
}) satisfies z.ZodType<Owner>;
