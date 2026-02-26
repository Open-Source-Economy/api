import { z } from "zod";

export interface LocalUser {
  email: string;
  isEmailVerified: boolean;
}

export const LocalUserSchema = z.object({
  email: z.string().email(),
  isEmailVerified: z.boolean(),
}) satisfies z.ZodType<LocalUser>;
