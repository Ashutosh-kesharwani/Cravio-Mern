import multer from "multer";
import { FILE_MESSAGES } from "../../constants/messages.constants.js";
import ApiError from "../../utils/ApiError.js";

const multerError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    switch (err.code) {
      case "LIMIT_FILE_SIZE":
        return next(new ApiError(400, FILE_MESSAGES.IMAGE_SIZE_EXCEEDED));

      case "LIMIT_FILE_COUNT":
        return next(new ApiError(400, FILE_MESSAGES.TOO_MANY_FILES));

      case "LIMIT_UNEXPECTED_FILE":
        return next(new ApiError(400, FILE_MESSAGES.UNEXPECTED_FILE_FIELD));

      default:
        return next(new ApiError(400, err.message));
    }
  }

  next(err);
};

export default multerError;
