import { Owner } from "../github/Owner";
import { UUID } from "../UUID";

export class ThirdPartyUserId extends UUID {}

export enum Provider {
  Github = "github",
}

export interface GithubData {
  owner: Owner;
}

export interface ThirdPartyUser {
  provider: Provider;
  id: ThirdPartyUserId;
  email: string | null;
  providerData: GithubData;
}
