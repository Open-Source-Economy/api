// TODO: to implement

import { CompanyId } from "../../model";

export interface GetSponsorsParams {
  owner: string;
  repo?: string;
}

export type CardSize = "xlarge" | "large" | "small" | "xsmall";

export interface SponsorCard {
  companyId: CompanyId;
  size?: CardSize;
}

export interface GetSponsorsResponse {
  sponsors: SponsorCard[];
}

export interface GetSponsorsBody {}

export interface GetSponsorsQuery {}
