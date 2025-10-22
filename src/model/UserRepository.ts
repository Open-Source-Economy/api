import { ValidationError, Validator } from "./error";
import { Currency, RepositoryId, RepositoryUserRole, UserId } from "./index";
import Decimal from "decimal.js";

export class UserRepository {
  userId: UserId;
  repositoryId: RepositoryId;
  repositoryUserRole: RepositoryUserRole;
  rate: Decimal | null;
  currency: Currency | null;

  constructor(userId: UserId, repositoryId: RepositoryId, repositoryUserRole: RepositoryUserRole, rate: Decimal | null, currency: Currency | null) {
    this.userId = userId;
    this.repositoryId = repositoryId;
    this.repositoryUserRole = repositoryUserRole;
    this.rate = rate;
    this.currency = currency;
  }
}
