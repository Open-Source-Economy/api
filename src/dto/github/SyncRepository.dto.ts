import { Owner, Repository } from "../../model";

export interface SyncRepositoryParams {
  owner: string;
  repo: string;
}

export interface SyncRepositoryResponse {
  owner: Owner;
  repository: Repository;
}

export interface SyncRepositoryBody {}

export interface SyncRepositoryQuery {}
