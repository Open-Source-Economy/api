import { z } from "zod";

export enum Provider {
  Github = "github",
}

export const providerSchema = z.nativeEnum(Provider);
