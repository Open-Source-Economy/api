import { initContract } from "@ts-rest/core";
import { subscribeNewsletterEndpoint, submitContactFormEndpoint, getPlansEndpoint } from "src/endpoints";

const c = initContract();

export const miscContract = c.router({
  subscribeNewsletter: subscribeNewsletterEndpoint,
  submitContactForm: submitContactFormEndpoint,
  getPlans: getPlansEndpoint,
});
