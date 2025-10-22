import { ValidationError, Validator } from "./error";
import { IssueId, UserId } from "./index";

export enum ContributorVisibility {
  PUBLIC = "public",
  PRIVATE = "private",
}

export enum ManagedIssueState {
  OPEN = "open",
  REJECTED = "rejected",
  SOLVED = "solved",
}

export class ManagedIssueId {
  uuid: string;

  constructor(uuid: string) {
    this.uuid = uuid;
  }
}

export class ManagedIssue {
  id: ManagedIssueId;
  githubIssueId: IssueId;
  requestedCreditAmount: number | null;
  managerId: UserId;
  contributorVisibility: ContributorVisibility;
  state: ManagedIssueState;

  constructor(
    id: ManagedIssueId,
    githubIssueId: IssueId,
    requestedCreditAmount: number | null,
    managerId: UserId,
    contributorVisibility: ContributorVisibility,
    state: ManagedIssueState,
  ) {
    this.id = id;
    this.githubIssueId = githubIssueId;
    this.requestedCreditAmount = requestedCreditAmount;
    this.managerId = managerId;
    this.contributorVisibility = contributorVisibility;
    this.state = state;
  }
}
