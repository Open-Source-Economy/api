import { LocalUser } from "./LocalUser";
import { ThirdPartyUser } from "./ThirdPartyUser";
import { Currency } from "../stripe";
import { UUID } from "../UUID";

export class UserId extends UUID {}

export enum UserRole {
  SUPER_ADMIN = "super_admin",
  USER = "user",
}

export enum UserType {
  THIRD_PARTY = "third_party",
  LOCAL = "local",
}

export const userUtils = {
  githubData(user: User): ThirdPartyUser["providerData"] | null {
    if ("providerData" in user.data) {
      return user.data.providerData;
    } else {
      return null;
    }
  },

  email(user: User): string | null {
    if ("email" in user.data) {
      return user.data.email;
    } else {
      return null;
    }
  },
};

export interface User extends Express.User {
  id: UserId;
  name: string | null;
  type: UserType;
  data: LocalUser | ThirdPartyUser;
  role: UserRole;
  preferredCurrency?: Currency;
  termsAcceptedVersion?: string;
}
