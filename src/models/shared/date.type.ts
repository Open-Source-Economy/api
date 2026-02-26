import { z } from "zod";

/**
 * Branded type for ISO date strings (YYYY-MM-DD)
 */
export type ISODateString = string & { readonly __brand: "ISODate" };

export const isoDateSchema = z.string().date() as unknown as z.ZodType<ISODateString>;

/**
 * Branded type for ISO date-time strings (YYYY-MM-DDTHH:mm:ss.sssZ)
 */
export type ISODateTimeString = string & { readonly __brand: "ISODateTime" };

export const isoDateTimeSchema = z.string().datetime({ offset: true }) as unknown as z.ZodType<ISODateTimeString>;
