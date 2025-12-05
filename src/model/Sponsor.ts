import { StripeCustomerId } from "./stripe/StripeCustomer";
import { UUID } from "./UUID";
import { OwnerId } from "./github/Owner";

export class SponsorId extends UUID {}

export class Sponsor {
  id: SponsorId;
  stripeCustomerId: StripeCustomerId;
  ownerId: OwnerId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: SponsorId, stripeCustomerId: StripeCustomerId, ownerId: OwnerId, isPublic: boolean, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.stripeCustomerId = stripeCustomerId;
    this.ownerId = ownerId;
    this.isPublic = isPublic;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
