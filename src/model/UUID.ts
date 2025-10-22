import Joi from "joi";

export abstract class UUID {
  readonly uuid: string;

  constructor(uuid: string) {
    // TODO: add validation here to ensure it's a valid UUID
    this.uuid = uuid;
  }
}

export namespace UUIDCompanion {
  export const schema: Joi.StringSchema<string> = Joi.string()
    .guid({ version: ["uuidv4"] })
    .required()
    .messages({
      "string.guid": "{{#label}} must be a valid UUID",
      "any.required": "{{#label}} is required",
      "string.empty": "{{#label}} cannot be empty",
    });
}
