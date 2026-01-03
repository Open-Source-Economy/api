import { Provider } from "../../model/user/ThirdPartyUser";

export interface CheckEmailParams {}

export interface CheckEmailQuery {
  email: string;
}

export interface CheckEmailBody {}

export interface CheckEmailResponse {
  exists: boolean;
  /**
   * The authentication provider for the user.
   * If not defined, the user is locally registered.
   */
  provider?: Provider;
}
