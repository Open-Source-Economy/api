import { z } from "zod";

export enum DeveloperRoleType {
  NONE = "none",
  OCCASIONAL_CONTRIBUTOR = "occasional_contributor",
  ACTIVE_CONTRIBUTOR = "active_contributor",
  COMMITTER = "committer",
  MAINTAINER = "maintainer",
  CORE_TEAM_MEMBER = "core_team_member",
  FOUNDER = "founder",
  BOARD_MEMBER = "board_member",
  STEERING_COMMITTEE_MEMBER = "steering_committee_member",
  PROJECT_LEAD = "project_lead",
  WORKING_GROUP_CHAIR = "working_group_chair",
  BENEVOLENT_DICTATOR_FOR_LIFE = "benevolent_dictator_for_life",
  ASF_CONTRIBUTOR = "asf_contributor",
  ASF_COMMITTER = "asf_committer",
  ASF_PMC_MEMBER = "asf_pmc_member",
  LF_GOVERNING_BOARD_MEMBER = "lf_governing_board_member",
  TSC_MEMBER = "tsc_member",
  CNCF_TOC_MEMBER = "cncf_toc_member",
  LINUX_FOUNDATION_FELLOW = "linux_foundation_fellow",
  STRATEGIC_MEMBER = "strategic_member",
  CONTRIBUTING_MEMBER = "contributing_member",
  ASSOCIATE_MEMBER = "associate_member",
}

export const developerRoleTypeSchema = z.nativeEnum(DeveloperRoleType);
