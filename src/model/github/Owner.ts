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

  static fromBackendPrimaryKey(row: any, table_prefix: string = ""): OwnerId | ValidationError {
    return OwnerId.fromAny(row, `${table_prefix}github_login`, `${table_prefix}github_id`);
  }

  static fromBackendForeignKey(row: any, table_prefix: string = ""): OwnerId | ValidationError {
    return OwnerId.fromAny(row, `${table_prefix}github_owner_login`, `${table_prefix}github_owner_id`);
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

  /**
   * Creates an `Owner` instance from a raw backend JSON object, typically retrieved from a SQL query.
   *
   * This method validates the required fields from the JSON and returns either a valid `Owner` instance
   * or a `ValidationError` if validation fails.
   *
   * @param json - The raw backend data object containing owner fields.
   * @param table_prefix - Optional prefix used to avoid column name conflicts when SQL joins are performed.
   *                       For example, if the `github_owner` table is joined with other tables in a query,
   *                       a prefix like `"owner_"` can be used so that columns become
   *                       `"owner_github_html_url"`, `"owner_github_avatar_url"`, etc.
   *                       This prefix is automatically prepended to relevant keys during validation.
   *
   * @returns A new `Owner` instance if validation succeeds, or a `ValidationError` otherwise.
   */
  static fromBackend(json: any, table_prefix: string = ""): Owner | ValidationError {
    const validator = new Validator(json);

    // @ts-ignore
    const type: OwnerType = validator.requiredEnum<OwnerType>(`${table_prefix}github_type`, Object.values(OwnerType) as OwnerType[]);
    const htmlUrl = validator.requiredString(`${table_prefix}github_html_url`);
    const avatarUrl = validator.requiredString(`${table_prefix}github_avatar_url`);
    const followers = validator.optionalNumber(`${table_prefix}github_followers`);
    const following = validator.optionalNumber(`${table_prefix}github_following`);
    const publicRepos = validator.optionalNumber(`${table_prefix}github_public_repos`);
    const publicGists = validator.optionalNumber(`${table_prefix}github_public_gists`);
    const name = validator.optionalString(`${table_prefix}github_name`);
    const twitterUsername = validator.optionalString(`${table_prefix}github_twitter_username`);
    const company = validator.optionalString(`${table_prefix}github_company`);
    const blog = validator.optionalString(`${table_prefix}github_blog`);
    const location = validator.optionalString(`${table_prefix}github_location`);
    const email = validator.optionalString(`${table_prefix}github_email`);

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    const ownerId = OwnerId.fromBackendPrimaryKey(json, table_prefix);
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
