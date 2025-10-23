import { UserId, UserRole } from "./User";
import { LocalUser } from "./LocalUser";
import { ThirdPartyUser } from "./ThirdPartyUser";
import { Currency } from "../stripe";

// TODO: should not be here
declare global {
  namespace Express {
    interface User {
      id: UserId;
      name: string | null;
      data: ThirdPartyUser | LocalUser;
      role: UserRole;
      preferredCurrency?: Currency;
      termsAcceptedVersion?: string;
    }
  }
}
