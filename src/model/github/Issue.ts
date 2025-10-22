import { OwnerId } from "./Owner";
import { RepositoryId } from "./Repository";
import { ValidationError, Validator } from "../error";

export class IssueId {
  repositoryId: RepositoryId;
  number: number;
  githubId?: number;

  constructor(repositoryId: RepositoryId, number: number, githubId?: number) {
    this.repositoryId = repositoryId;
    this.number = number;
    this.githubId = githubId;
  }

  static fromGithubApi(repositoryId: RepositoryId, json: any): IssueId | ValidationError {
    const validator = new Validator(json);
    const number = validator.requiredNumber("number");
    const id = validator.requiredNumber("id");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new IssueId(repositoryId, number, id);
  }
}

export class Issue {
  id: IssueId;
  title: string;
  htmlUrl: string;
  createdAt: Date;
  closedAt: Date | null;
  openBy: OwnerId;
  body?: string;

  constructor(id: IssueId, title: string, htmlUrl: string, createdAt: Date, closedAt: Date | null, openBy: OwnerId, body?: string) {
    this.id = id;
    this.title = title;
    this.htmlUrl = htmlUrl;
    this.createdAt = createdAt;
    this.closedAt = closedAt;
    this.openBy = openBy;
    this.body = body;
  }

  setRepositoryId(id: RepositoryId): void {
    this.id = new IssueId(id, this.id.number, this.id.githubId);
  }

  static fromGithubApi(repositoryId: RepositoryId, data: any): Issue | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const validator = new Validator(json);
    const id = validator.requiredNumber("id");
    const number = validator.requiredNumber("number");
    const title = validator.requiredString("title");
    const htmlUrl = validator.requiredString("html_url");
    const createdAt = validator.requiredString("created_at");
    const closedAt = validator.optionalString("closed_at");
    const openByObject = validator.requiredObject("user");
    const body = validator.optionalString("body");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const issueId = new IssueId(repositoryId, number, id);
    const ownerId = OwnerId.fromGithubApi(openByObject);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Issue(issueId, title, htmlUrl, new Date(createdAt), closedAt ? new Date(closedAt) : null, ownerId, body);
  }
}
