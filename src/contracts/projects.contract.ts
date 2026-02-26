import { initContract } from "@ts-rest/core";
import {
  getProjectsEndpoint,
  getProjectEndpoint,
  getProjectDetailsEndpoint,
  getProjectItemsWithDetailsEndpoint,
  getCampaignEndpoint,
  getAllFinancialIssuesEndpoint,
  getIssueEndpoint,
  fundIssueEndpoint,
  requestIssueFundingEndpoint,
  getProjectServicesEndpoint,
} from "src/endpoints";

const c = initContract();

export const projectsContract = c.router({
  getProjects: getProjectsEndpoint,
  getProject: getProjectEndpoint,
  getProjectDetails: getProjectDetailsEndpoint,
  getProjectItemsWithDetails: getProjectItemsWithDetailsEndpoint,
  getCampaign: getCampaignEndpoint,
  getAllFinancialIssues: getAllFinancialIssuesEndpoint,
  getIssue: getIssueEndpoint,
  fundIssue: fundIssueEndpoint,
  requestIssueFunding: requestIssueFundingEndpoint,
  getProjectServices: getProjectServicesEndpoint,
});
