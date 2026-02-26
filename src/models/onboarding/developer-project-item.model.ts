import { z } from "zod";
import {
  type DeveloperProjectItemId,
  DeveloperProjectItemIdSchema,
  type DeveloperProfileId,
  DeveloperProfileIdSchema,
  type ProjectItemId,
  ProjectItemIdSchema,
} from "src/types/uuid";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";
import { type DeveloperRoleType, developerRoleTypeSchema } from "src/models/shared/developer-role-type.type";
import { type MergeRightsType, mergeRightsTypeSchema } from "src/models/shared/merge-rights-type.type";
import { type ProjectCategory, projectCategorySchema } from "src/models/shared/project-category.type";

export interface DeveloperProjectItem {
  id: DeveloperProjectItemId;
  developerProfileId: DeveloperProfileId;
  projectItemId: ProjectItemId;
  roles: DeveloperRoleType[];
  mergeRights: MergeRightsType[];
  comment?: string;
  customCategories?: string[];
  predefinedCategories?: ProjectCategory[];
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export const DeveloperProjectItemSchema = z.object({
  id: DeveloperProjectItemIdSchema,
  developerProfileId: DeveloperProfileIdSchema,
  projectItemId: ProjectItemIdSchema,
  roles: z.array(developerRoleTypeSchema),
  mergeRights: z.array(mergeRightsTypeSchema),
  comment: z.string().optional(),
  customCategories: z.array(z.string()).optional(),
  predefinedCategories: z.array(projectCategorySchema).optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}) satisfies z.ZodType<DeveloperProjectItem>;
