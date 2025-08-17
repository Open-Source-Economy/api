export abstract class UUID {
  readonly uuid: string;

  constructor(uuid: string) {
    // TODO: add validation here to ensure it's a valid UUID
    this.uuid = uuid;
  }
}
