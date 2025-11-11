import { Owner, ProjectItem, Repository } from "../";

export interface ProjectItemDetails {
  projectItem: ProjectItem;
  owner: Owner | null;
  repository: Repository | null;
}
