import { ValidationError, Validator } from "../error";
import { DeveloperProfileId } from "./DeveloperProfile";
import { UUID } from "../UUID";
import { ProjectItemId } from "../project";
import { DeveloperRoleType } from "./DeveloperRoleType";
import { MergeRightsType } from "./MergeRightsType";

export class DeveloperProjectItemId extends UUID {}

export interface DeveloperProjectItem {
  id: DeveloperProjectItemId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export namespace DeveloperProjectItemCompanion {
  export function fromBackend(row: any): DeveloperProjectItem | ValidationError {
    const validator = new Validator(row);
    const id = validator.requiredString("id");
    const developerProfileId = validator.requiredString("developer_profile_id");
    const projectItemId = validator.requiredString("project_item_id");
    const roles = validator.requiredArrayOfEnums("roles", Object.values(DeveloperRoleType) as DeveloperRoleType[]);
    const mergeRights = validator.requiredArrayOfEnums("merge_rights", Object.values(MergeRightsType) as MergeRightsType[]);
    const comment = validator.optionalString("comment"); // Added optional comment validation
    const createdAt = validator.requiredDate("created_at");
    const updatedAt = validator.requiredDate("updated_at");

    const error = validator.getFirstError();
    if (error) {
      return error;
    }

    return {
      id: new DeveloperProjectItemId(id),
      developerProfileId: new DeveloperProfileId(developerProfileId),
      projectItemId: new ProjectItemId(projectItemId),
      roles,
      mergeRights,
      comment, // Added comment
      createdAt,
      updatedAt,
    };
  }
}
