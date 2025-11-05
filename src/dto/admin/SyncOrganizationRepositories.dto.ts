import Joi from "joi";

/**
 * Endpoint: POST /admin/organizations/:projectItemId/sync-repositories
 *
 * Syncs all repositories from a GitHub organization and creates individual ProjectItems for each.
 * This operation runs asynchronously in the background to prevent HTTP timeouts.
 *
 * Use Cases:
 * - Initial setup after a developer registers for an organization
 * - Refreshing repository list to capture new repos
 * - Syncing large organizations in batches
 *
 * Performance Notes:
 * - Fast Mode (default): ~11 seconds for 500 repos
 * - Detailed Mode: ~85 seconds for 500 repos
 * - Background job prevents timeouts
 * - Check server logs for detailed progress
 */

/**
 * URL parameters for organization sync endpoint
 */
export interface SyncOrganizationRepositoriesParams {
  /** UUID of the ProjectItem (must be type GITHUB_OWNER) */
  projectItemId: string;
}

/**
 * Request body for organization sync (empty - all params in query)
 */
export interface SyncOrganizationRepositoriesBody {}

/**
 * Query parameters for controlling sync behavior
 */
export interface SyncOrganizationRepositoriesQuery {
  /**
   * Starting position for pagination (default: 0)
   * Use to continue syncing from where a previous batch left off.
   * Example: offset=500 to sync repos 501-1000
   */
  offset?: number;

  /**
   * Number of repositories to sync in this batch (default: 500)
   * Will be capped at server-configured maximum (GITHUB_SYNC_MAX_REPOS).
   * Smaller values useful for testing or incremental syncs.
   */
  batchSize?: number;

  /**
   * Whether to fetch detailed repo data via individual API calls (default: false)
   *
   * false (Fast Mode - Recommended):
   * - Uses bulk data from organization list API
   * - Much faster, fewer API calls
   * - Sufficient for most use cases
   *
   * true (Detailed Mode):
   * - Makes individual GitHub API call per repository
   * - Slower but ensures most up-to-date data
   * - Use only when absolutely necessary
   */
  fetchDetails?: boolean;
}

/**
 * Response from organization sync endpoint (returns immediately)
 * The actual sync runs in the background.
 */
export interface SyncOrganizationRepositoriesResponse {
  /** Human-readable confirmation message */
  message: string;

  /** GitHub login of the organization being synced */
  organizationLogin: string;

  /** The offset used for this sync operation */
  offset: number;

  /** Whether there are more repositories to sync (only in background logs) */
  hasMore?: boolean;

  /** Next offset to use for continuing sync (only in background logs) */
  nextOffset?: number;

  /** Total number of repositories in the organization (only in background logs) */
  totalRepositories?: number;
}

export namespace SyncOrganizationRepositoriesCompanion {
  export const paramsSchema: Joi.ObjectSchema<SyncOrganizationRepositoriesParams> = Joi.object({
    projectItemId: Joi.string().uuid().required().messages({
      "string.guid": "Project item ID must be a valid UUID",
      "any.required": "Project item ID is required",
    }),
  });

  export const bodySchema: Joi.ObjectSchema<SyncOrganizationRepositoriesBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<SyncOrganizationRepositoriesQuery> = Joi.object({
    offset: Joi.number().integer().min(0).optional().messages({
      "number.base": "Offset must be a number",
      "number.integer": "Offset must be an integer",
      "number.min": "Offset must be 0 or greater",
    }),
    batchSize: Joi.number().integer().min(1).optional().messages({
      "number.base": "Batch size must be a number",
      "number.integer": "Batch size must be an integer",
      "number.min": "Batch size must be at least 1",
    }),
    fetchDetails: Joi.boolean().optional().messages({
      "boolean.base": "Fetch details must be a boolean",
    }),
  });
}
