import { Owner } from "../github/Owner";
import { UUID } from "../UUID";

export class ThirdPartyUserId extends UUID {}

export enum Provider {
  Github = "github",
}

export class GithubData {
  owner: Owner;

  constructor(owner: Owner) {
    this.owner = owner;
  }
}

export class ThirdPartyUser {
  provider: Provider;
  id: ThirdPartyUserId;
  email: string | null;
  providerData: GithubData;

  constructor(provider: Provider, id: ThirdPartyUserId, email: string | null, providerData: GithubData) {
    this.provider = provider;
    this.id = id;
    this.email = email;
    this.providerData = providerData;
  }
}
