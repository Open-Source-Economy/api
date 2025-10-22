import { Owner, Repository } from "../../model";

export interface SyncProjectParams {
  owner: string;
  repo?: string;
}

export interface SyncProjectResponse {
  owner: Owner;
  repository: Repository | null;
}

export interface SyncProjectBody {}

export interface SyncProjectQuery {}
