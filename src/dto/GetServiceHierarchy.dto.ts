import { ServiceHierarchyItem } from "../model";
import Joi from "joi";

export interface GetServiceHierarchyParams {}

export interface GetServiceHierarchyResponse {
  items: ServiceHierarchyItem[];
}

export interface GetServiceHierarchyBody {}

export interface GetServiceHierarchyQuery {}

export namespace GetServiceHierarchyCompanion {
  export const paramsSchema: Joi.ObjectSchema<GetServiceHierarchyParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<GetServiceHierarchyBody> = Joi.object({});

  export const querySchema: Joi.ObjectSchema<GetServiceHierarchyQuery> = Joi.object({});
}
