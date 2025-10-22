import { ValidationError, Validator } from "./error";
import { IssueId } from "./github";
import { UserId } from "./user";

export class IssueFundingId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class IssueFunding {
  id: IssueFundingId;
  githubIssueId: IssueId;
  userId: UserId;
  credit: number;

  constructor(id: IssueFundingId, githubIssueId: IssueId, userId: UserId, creditAmount: number) {
    this.id = id;
    this.githubIssueId = githubIssueId;
    this.userId = userId;
    this.credit = creditAmount;
  }
}
