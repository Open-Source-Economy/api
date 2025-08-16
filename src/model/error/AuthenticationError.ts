import { StatusCodes } from "http-status-codes";
import { ApiError } from "./ApiError"; // Adjust path as needed

export class AuthenticationError extends ApiError {
  constructor(message?: string) {
    super(StatusCodes.UNAUTHORIZED, message || "User not authenticated");
    this.name = "AuthenticationError";
  }
}
