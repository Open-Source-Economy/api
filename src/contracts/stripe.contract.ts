import { initContract } from "@ts-rest/core";
import { checkoutEndpoint, createPortalSessionEndpoint } from "src/endpoints";

const c = initContract();

export const stripeContract = c.router({
  checkout: checkoutEndpoint,
  createPortalSession: createPortalSessionEndpoint,
});
