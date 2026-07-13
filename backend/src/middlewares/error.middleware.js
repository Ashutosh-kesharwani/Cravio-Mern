// src/middlewares/error.middleware.js

import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // If error is not ApiError, convert it into one
  if (!(err instanceof ApiError)) {
    err = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error"
    );
  }

  // Optional: Log error
  console.error(err);

  return res.status(err.statusCode).json({
    success: false,
    statusCode: err.statusCode,
    message: err.message,
    errors: err.errors || [],
    data: null,

    // Only show stack in development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
