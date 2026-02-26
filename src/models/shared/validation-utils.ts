import { z } from "zod";
import type { ISODateString } from "./date.type";

/**
 * Validation utilities for user-friendly error messages.
 */

export function requiredString(fieldLabel: string) {
  return z.string({ message: `${fieldLabel} is required` }).min(1, `${fieldLabel} is required`);
}

export function optionalString(fieldLabel: string) {
  return z.string({ message: `${fieldLabel} must be text` }).optional();
}

export function requiredEnum<T extends Record<string, string | number>>(fieldLabel: string, enumType: T) {
  return z.nativeEnum(enumType, { message: `Please select a ${fieldLabel.toLowerCase()}` });
}

export function optionalEnum<T extends Record<string, string | number>>(fieldLabel: string, enumType: T) {
  return z.nativeEnum(enumType, { message: `Please select a valid ${fieldLabel.toLowerCase()}` }).optional();
}

export function requiredBoolean(fieldLabel: string) {
  return z.boolean({ message: `Please answer the ${fieldLabel.toLowerCase()} question` });
}

export function requiredDate(fieldLabel: string): z.ZodType<ISODateString> {
  const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

  return z
    .string({ message: `${fieldLabel} is required` })
    .min(1, `${fieldLabel} is required`)
    .regex(ISO_DATE_PATTERN, `${fieldLabel} must be in YYYY-MM-DD format`)
    .refine(
      (val) => !isNaN(Date.parse(val)),
      `${fieldLabel} is not a valid date`
    ) as unknown as z.ZodType<ISODateString>;
}

export function optionalDate(fieldLabel: string) {
  const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

  return z
    .string({ message: `${fieldLabel} must be text` })
    .regex(ISO_DATE_PATTERN, `${fieldLabel} must be in YYYY-MM-DD format`)
    .refine((val) => !isNaN(Date.parse(val)), `${fieldLabel} is not a valid date`)
    .transform((val) => val as ISODateString)
    .optional();
}

export function requiredEmail(fieldLabel: string) {
  return z
    .string({ message: `${fieldLabel} is required` })
    .min(1, `${fieldLabel} is required`)
    .email(`${fieldLabel} is not a valid email address`)
    .transform((val) => val.toLowerCase().trim());
}

export function optionalEmail(fieldLabel: string) {
  return z
    .string({ message: `${fieldLabel} must be text` })
    .email(`${fieldLabel} is not a valid email address`)
    .transform((val) => val.toLowerCase().trim())
    .optional();
}
