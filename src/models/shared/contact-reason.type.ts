import { z } from "zod";

export enum ContactReason {
  MAINTAINER = "maintainer",
  REQUEST_PROJECT = "request-project",
  ENTERPRISE = "enterprise",
  PARTNERSHIP = "partnership",
  VOLUNTEER = "volunteer",
  PRESS = "press",
  SUPPORT = "support",
  GENERAL = "general",
}

export const contactReasonSchema = z.nativeEnum(ContactReason);
