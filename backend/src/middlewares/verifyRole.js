import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";

const verifyRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, AUTH_MESSAGES.UNAUTHORIZED));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, AUTH_MESSAGES.FORBIDDEN));
    }

    next();
  };
};

export default verifyRole;
