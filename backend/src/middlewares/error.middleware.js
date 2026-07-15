import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof ApiError)) {
    err = new ApiError(
      err.statusCode || 500,
      err.message || "Internal Server Error"
    );
  }

  // Log Error
  console.error(err);

  return res.status(err.statusCode).json({
    statusCode: err.statusCode,
    message: err.message,
    success: false,
    data: null,
    errors: err.errors || [],

    // Show stack only in Development
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandler;
