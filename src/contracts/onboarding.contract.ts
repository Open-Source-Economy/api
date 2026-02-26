import { initContract } from "@ts-rest/core";
import {
  createProfileEndpoint,
  getDeveloperProfileEndpoint,
  updateContactInfosEndpoint,
  setDeveloperPreferencesEndpoint,
  setDeveloperServiceSettingsEndpoint,
  getPotentialProjectItemsEndpoint,
  upsertDeveloperProjectItemEndpoint,
  removeDeveloperProjectItemEndpoint,
  getServiceHierarchyEndpoint,
  createCustomServiceEndpoint,
  upsertDeveloperServiceEndpoint,
  upsertDeveloperServicesEndpoint,
  deleteDeveloperServiceEndpoint,
  completeOnboardingEndpoint,
} from "src/endpoints";

const c = initContract();

export const onboardingContract = c.router({
  createProfile: createProfileEndpoint,
  getDeveloperProfile: getDeveloperProfileEndpoint,
  updateContactInfos: updateContactInfosEndpoint,
  setDeveloperPreferences: setDeveloperPreferencesEndpoint,
  setDeveloperServiceSettings: setDeveloperServiceSettingsEndpoint,
  getPotentialProjectItems: getPotentialProjectItemsEndpoint,
  upsertDeveloperProjectItem: upsertDeveloperProjectItemEndpoint,
  removeDeveloperProjectItem: removeDeveloperProjectItemEndpoint,
  getServiceHierarchy: getServiceHierarchyEndpoint,
  createCustomService: createCustomServiceEndpoint,
  upsertDeveloperService: upsertDeveloperServiceEndpoint,
  upsertDeveloperServices: upsertDeveloperServicesEndpoint,
  deleteDeveloperService: deleteDeveloperServiceEndpoint,
  completeOnboarding: completeOnboardingEndpoint,
});
