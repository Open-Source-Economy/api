import Joi from "joi";

export enum DeveloperRoleType {
  NONE = "none",
  // Generic Open-Source Roles
  OCCASIONAL_CONTRIBUTOR = "occasional_contributor",
  ACTIVE_CONTRIBUTOR = "active_contributor",
  COMMITTER = "committer",
  MAINTAINER = "maintainer",
  CORE_TEAM_MEMBER = "core_team_member",
  FOUNDER = "founder",

  // Generic Governance & Leadership Roles
  BOARD_MEMBER = "board_member",
  STEERING_COMMITTEE_MEMBER = "steering_committee_member",
  PROJECT_LEAD = "project_lead",
  WORKING_GROUP_CHAIR = "working_group_chair",
  BENEVOLENT_DICTATOR_FOR_LIFE = "benevolent_dictator_for_life",

  // Apache Software Foundation (ASF) Roles
  ASF_CONTRIBUTOR = "asf_contributor",
  ASF_COMMITTER = "asf_committer",
  ASF_PMC_MEMBER = "asf_pmc_member",

  // Linux Foundation & CNCF Roles
  LF_GOVERNING_BOARD_MEMBER = "lf_governing_board_member",
  TSC_MEMBER = "tsc_member",
  CNCF_TOC_MEMBER = "cncf_toc_member",
  LINUX_FOUNDATION_FELLOW = "linux_foundation_fellow",

  // Corporate Membership Roles
  STRATEGIC_MEMBER = "strategic_member",
  CONTRIBUTING_MEMBER = "contributing_member",
  ASSOCIATE_MEMBER = "associate_member",
}

export namespace DeveloperRoleTypeCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .trim()
    .valid(...Object.values(DeveloperRoleType))
    .messages({
      "any.only": "{{#label}} must be a valid developer role type",
      "string.empty": "Developer role type cannot be empty",
      "string.trim": "Developer role type cannot consist only of spaces",
      "any.required": "Developer role type is required",
    });
}
