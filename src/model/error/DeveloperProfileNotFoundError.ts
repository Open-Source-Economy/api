import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError";

export class DeveloperProfileNotFoundError extends ApiError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message || "Developer profile not found");
    this.name = "DeveloperProfileNotFoundError";
  }
}
