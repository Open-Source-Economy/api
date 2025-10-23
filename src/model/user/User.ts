import { LocalUser } from "./LocalUser";
import { GithubData, ThirdPartyUser } from "./ThirdPartyUser";
import { Currency } from "../stripe";
import { UUID } from "../UUID";

export class UserId extends UUID {}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

export const userUtils = {
  githubData(user: User): GithubData | null {
    if ("providerData" in user.data) {
      return user.data.providerData;
    } else {
      return null;
    }
  },

  email(user: User): string | null {
    if (user.data instanceof LocalUser) {
      return user.data.email;
    } else {
      return user.data.email;
    }
  },
};

export type User = Express.User;
