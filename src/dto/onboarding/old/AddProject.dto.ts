export interface AddProjectParams {}

export interface AddProjectBody {
  projectType: "github" | "manual";
  githubOrg?: string;
  githubRepo?: string;
  projectName?: string;
  projectUrl?: string;
  role: "creator_founder" | "project_lead" | "core_developer" | "maintainer";
  mergeRights: "full_rights" | "specific_areas" | "no_rights" | "formal_process";
}

export interface AddProjectQuery {}

export interface AddProjectResponse {}
