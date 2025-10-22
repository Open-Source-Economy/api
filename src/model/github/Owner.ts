import { ValidationError, Validator } from "../error";
import Joi from "joi";

export class OwnerId {
  login: string;
  githubId?: number;

  constructor(login: string, id?: number) {
    this.login = login;
    this.githubId = id;
  }

  static fromGithubApi(json: any): OwnerId | ValidationError {
    return OwnerId.fromAny(json, "login", "id");
  }

  private static fromAny(data: any, loginKey: string, idKey: string): OwnerId | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const validator = new Validator(json);
    const login = validator.requiredString(loginKey);
    const id = validator.requiredNumber(idKey);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return new OwnerId(login, id);
  }
}

export enum OwnerType {
  User = "User",
  Organization = "Organization",
}

export class Owner {
  id: OwnerId;
  type: OwnerType;
  htmlUrl: string;
  avatarUrl?: string;
  displayAvatarUrl?: string;
  followers?: number;
  following?: number;
  publicRepos?: number;
  publicGists?: number;
  name?: string;
  twitterUsername?: string;
  company?: string;
  blog?: string;
  location?: string;
  email?: string;

  constructor(
    id: OwnerId,
    type: OwnerType,
    htmlUrl: string,
    avatarUrl?: string,
    followers?: number,
    following?: number,
    publicRepos?: number,
    publicGists?: number,
    name?: string,
    twitterUsername?: string,
    company?: string,
    blog?: string,
    location?: string,
    email?: string,
  ) {
    this.id = id;
    this.type = type;
    this.htmlUrl = htmlUrl;
    this.avatarUrl = avatarUrl;
    this.followers = followers;
    this.following = following;
    this.publicRepos = publicRepos;
    this.publicGists = publicGists;
    this.name = name;
    this.twitterUsername = twitterUsername;
    this.company = company;
    this.blog = blog;
    this.location = location;
    this.email = email;

    if (id.login === "apache") {
      this.displayAvatarUrl = undefined; // Apache Foundation has a special case for their avatar URL due regulation.
    } else {
      this.displayAvatarUrl = avatarUrl;
    }
  }

  // For Organization
  // GitHub API: https://docs.github.com/en/rest/orgs/orgs?apiVersion=2022-11-28#get-an-organization
  // Example: https://api.github.com/orgs/open-source-economy
  //
  // For User
  // GitHub API: https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user
  // Example: https://api.github.com/users/laurianemollier
  static fromGithubApi(data: any): Owner | ValidationError {
    let json: any;
    if (typeof data === "object") {
      json = data;
    } else if (typeof data === "string") {
      json = JSON.parse(data);
    }

    const validator = new Validator(json);

    const htmlUrl = validator.requiredString("html_url");
    const avatarUrl = validator.optionalString("avatar_url");
    const type = validator.requiredEnum<OwnerType>("type", Object.values(OwnerType) as OwnerType[]);
    const followers = validator.optionalNumber("followers");
    const following = validator.optionalNumber("following");
    const publicRepos = validator.optionalNumber("public_repos");
    const publicGists = validator.optionalNumber("public_gists");
    const name = validator.optionalString("name");
    const twitterUsername = validator.optionalString("twitter_username");
    const company = validator.optionalString("company");
    const blog = validator.optionalString("blog");
    const location = validator.optionalString("location");
    const email = validator.optionalString("email");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromGithubApi(json);
    if (ownerId instanceof ValidationError) {
      return ownerId;
    }

    return new Owner(ownerId, type, htmlUrl, avatarUrl, followers, following, publicRepos, publicGists, name, twitterUsername, company, blog, location, email);
  }
}

export namespace OwnerIdCompanion {
  export const schema: Joi.ObjectSchema<OwnerId> = Joi.object({
    login: Joi.string().trim().min(1).required().messages({
      "string.empty": "Owner login cannot be empty",
      "string.min": "Owner login must contain at least one character",
      "string.trim": "Owner login cannot consist only of spaces",
      "any.required": "Owner login is required",
    }),
    githubId: Joi.number().integer().min(1).optional().messages({
      "number.base": "GitHub ID must be a number",
      "number.integer": "GitHub ID must be an integer",
      "number.min": "GitHub ID cannot be less than {{#limit}}",
    }),
  });
}
