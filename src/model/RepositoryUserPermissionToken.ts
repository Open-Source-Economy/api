import { ValidationError, Validator } from "./error";
import { Currency, RepositoryId } from "./index";
import Decimal from "decimal.js";

export enum RepositoryUserRole {
  ADMIN = "admin",
  READ = "read",
}

export class RepositoryUserPermissionTokenId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class RepositoryUserPermissionToken {
  id: RepositoryUserPermissionTokenId;
  userName: string | null;
  userEmail: string | null;
  userGithubOwnerLogin: string;
  token: string;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  rate: Decimal | null;
  currency: Currency | null;
  expiresAt: Date;
  hasBeenUsed: boolean; // TODO: not used for the moment

  constructor(
    id: RepositoryUserPermissionTokenId,
    userName: string | null,
    userEmail: string | null,
    userGithubOwnerLogin: string,
    token: string,
    repositoryId: RepositoryId,
    repositoryUserRole: RepositoryUserRole,
    rate: Decimal | null,
    currency: Currency | null,
    expiresAt: Date,
    hasBeenUsed: boolean,
  ) {
    this.id = id;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userGithubOwnerLogin = userGithubOwnerLogin;
    this.token = token;
    this.repositoryId = repositoryId;
    this.repositoryUserRole = repositoryUserRole;
    this.rate = rate;
    this.currency = currency;
    this.expiresAt = expiresAt;
    this.hasBeenUsed = hasBeenUsed;
  }
}
