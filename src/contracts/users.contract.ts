import { initContract } from "@ts-rest/core";
import { getAvailableCreditsEndpoint, getUserPlanEndpoint, setPreferredCurrencyEndpoint } from "src/endpoints";

const c = initContract();

export const usersContract = c.router({
  getAvailableCredits: getAvailableCreditsEndpoint,
  getUserPlan: getUserPlanEndpoint,
  setPreferredCurrency: setPreferredCurrencyEndpoint,
});
