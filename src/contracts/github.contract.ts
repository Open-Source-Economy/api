import { initContract } from "@ts-rest/core";
import {
  getOwnerEndpoint,
  getRepositoryEndpoint,
  syncAllEndpoint,
  syncOwnerEndpoint,
  syncRepositoryEndpoint,
  syncProjectEndpoint,
} from "src/endpoints";

const c = initContract();

export const githubContract = c.router({
  getOwner: getOwnerEndpoint,
  getRepository: getRepositoryEndpoint,
  syncAll: syncAllEndpoint,
  syncOwner: syncOwnerEndpoint,
  syncRepository: syncRepositoryEndpoint,
  syncProject: syncProjectEndpoint,
});
