import { UUID } from "../UUID";
import { OwnerId, RepositoryId } from "../github";
import { ProjectItemType } from "./ProjectItemType";

export class ProjectItemId extends UUID {}

export interface ProjectItem {
  id: ProjectItemId;
  projectItemType: ProjectItemType;
  sourceIdentifier: OwnerId | RepositoryId | string; // string being an url
  createdAt: Date;
  updatedAt: Date;
}
