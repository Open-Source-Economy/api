import { Company, CompanyUserRole, RepositoryId, RepositoryUserRole, User } from "../../model";

/**
 * AuthInfo mirrors the authentication envelope returned by the backend.
 *
 * The presence of a payload does not imply that the requester is authenticated.
 * When the session is anonymous, `authenticatedUser` is `null` while the other fields can
 * convey contextual information (invites, feature flags, A/B experiments, session info).
 * Frontend consumers are expected to check `authInfo.authenticatedUser` explicitly to determine whether
 * a user is logged in.
 */
export interface AuthInfo {
  authenticatedUser: AuthenticatedUser | null;
}

export interface RepositoryInfo {
  role: RepositoryUserRole;
  rate: string | null; // currency / credit
  currency: string | null;
}

export interface AuthenticatedUser {
  user: User;
  company: Company | null; // if user belongs to a company or not
  companyRole: CompanyUserRole | null; // if user belongs to a company
  /**
   * @deprecated Repository membership should now be fetched via the dedicated developer profile service.
   *             This field will be removed once all consumers migrate.
   */
  repositories: [RepositoryId, RepositoryInfo][]; // if user belongs to a repository
}
