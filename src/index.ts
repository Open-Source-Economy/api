import { initContract } from "@ts-rest/core";

// ====== Types ======
export * from "./types";

// ====== Models ======
export * from "./models";

// ====== Schemas ======
export * from "./schemas/problem-details.schema";
export * from "./schemas/pagination.schema";

// ====== Endpoints ======
export * from "./endpoints";

// ====== Contracts ======
export * from "./contracts";

// ====== Combined Contract ======

import {
  authContract,
  usersContract,
  projectsContract,
  githubContract,
  stripeContract,
  onboardingContract,
  adminContract,
  miscContract,
} from "./contracts";

const c = initContract();

export const contract = c.router({
  auth: authContract,
  users: usersContract,
  projects: projectsContract,
  github: githubContract,
  stripe: stripeContract,
  onboarding: onboardingContract,
  admin: adminContract,
  misc: miscContract,
});
