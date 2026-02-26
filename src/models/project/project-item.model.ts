import { z } from "zod";
import { type ProjectItemId, ProjectItemIdSchema } from "src/types/uuid";
import { type ISODateTimeString, isoDateTimeSchema } from "src/models/shared/date.type";
import { type ProjectItemType, projectItemTypeSchema } from "src/models/shared/project-item-type.type";
import { type ProjectCategory, projectCategorySchema } from "src/models/shared/project-category.type";

export interface ProjectItem {
  id: ProjectItemId;
  projectItemType: ProjectItemType;
  sourceIdentifier: string;
  categories?: ProjectCategory[];
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export const ProjectItemSchema = z.object({
  id: ProjectItemIdSchema,
  projectItemType: projectItemTypeSchema,
  sourceIdentifier: z.string(),
  categories: z.array(projectCategorySchema).optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
}) satisfies z.ZodType<ProjectItem>;
