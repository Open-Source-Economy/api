import { Project } from "../../model";

export interface CreateProjectParams {
  owner: string;
  repo?: string;
}

export interface CreateProjectResponse {
  project: Project;
}

export interface CreateProjectBody {}

export interface CreateProjectQuery {}
