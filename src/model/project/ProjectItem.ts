import { UUID } from "../UUID";
import { OwnerId, RepositoryId } from "../github";
import { ProjectItemType } from "./ProjectItemType";

export class ProjectItemId extends UUID {}

export type SourceIdentifier = OwnerId | RepositoryId | string; // string being an url

export interface ProjectItem {
  id: ProjectItemId;
  projectItemType: ProjectItemType;
  sourceIdentifier: SourceIdentifier;
  createdAt: Date;
  updatedAt: Date;
}
