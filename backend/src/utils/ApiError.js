import { GENERAL_MESSAGES } from "../constants/messages.constants.js";

class ApiError extends Error {
  constructor(
    statusCode,
    message = GENERAL_MESSAGES.INTERNAL_SERVER_ERROR,
    errors = [],
    stack = ""
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.data = null;
    this.errors = errors;

    this.name = this.constructor.name;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
