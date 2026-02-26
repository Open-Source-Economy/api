import { z } from "zod";

/**
 * Offset-based pagination query parameters.
 */
export interface PaginationQuery {
  /** Number of items to return (default: 10) */
  take?: number;
  /** Number of items to skip (default: 0) */
  skip?: number;
}

export const PaginationQuerySchema = z.object({
  take: z.coerce.number().int().min(1).max(100).optional().default(10),
  skip: z.coerce.number().int().min(0).optional().default(0),
}) satisfies z.ZodType<PaginationQuery>;

/**
 * Offset pagination metadata returned with paginated responses.
 */
export interface PaginationMeta {
  /** Total number of items across all pages */
  total: number;
  /** Number of items returned in this page */
  count: number;
  /** Number of items requested */
  take: number;
  /** Number of items skipped */
  skip: number;
  /** Whether there are more items after this page */
  hasMore: boolean;
}

export const PaginationMetaSchema = z.object({
  total: z.number().int().min(0),
  count: z.number().int().min(0),
  take: z.number().int().min(1),
  skip: z.number().int().min(0),
  hasMore: z.boolean(),
}) satisfies z.ZodType<PaginationMeta>;

/**
 * Generic interface for offset-paginated responses.
 */
export interface PaginatedResponse<T> {
  items: T[];
  pagination: PaginationMeta;
}

/**
 * Creates a Zod schema for a paginated response with the given item schema.
 */
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    pagination: PaginationMetaSchema,
  });
}
