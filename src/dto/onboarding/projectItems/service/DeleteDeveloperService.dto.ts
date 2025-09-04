import { ServiceId, UUIDCompanion } from "../../../../model";
import Joi from "joi";

export interface DeleteDeveloperServiceParams {}
export interface DeleteDeveloperServiceBody {
  serviceId: ServiceId;
}
export interface DeleteDeveloperServiceQuery {}
export interface DeleteDeveloperServiceResponse {}

export namespace DeleteDeveloperServiceCompanion {
  export const paramsSchema: Joi.ObjectSchema<DeleteDeveloperServiceParams> = Joi.object({});

  export const bodySchema: Joi.ObjectSchema<DeleteDeveloperServiceBody> = Joi.object({
    // Changed from UUIDCompanion.schema to Joi.object with a 'uuid' key
    serviceId: Joi.object({
      uuid: UUIDCompanion.schema.label("Service ID"),
    }).required(),
  });

  export const querySchema: Joi.ObjectSchema<DeleteDeveloperServiceQuery> = Joi.object({});
}
