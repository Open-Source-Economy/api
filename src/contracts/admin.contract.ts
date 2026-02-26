import { initContract } from "@ts-rest/core";
import {
  getAllDeveloperProfilesEndpoint,
  createVerificationRecordEndpoint,
  syncOrganizationRepositoriesEndpoint,
} from "src/endpoints";

const c = initContract();

export const adminContract = c.router({
  getAllDeveloperProfiles: getAllDeveloperProfilesEndpoint,
  createVerificationRecord: createVerificationRecordEndpoint,
  syncOrganizationRepositories: syncOrganizationRepositoriesEndpoint,
});
