import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";

/* 
Generic Verify Role 
> takes array of roles 
> Check if user is authenticated or not , i.e req.user present or not
> check if our array of role like  [ verifyRole("admin" , "super_admin"),]
contains our curr user role or not , if not throw error
> else if then next()

usage :

adminRouter
  .route("/users")
  .get(
    verifyJWT,
    verifyRole("admin" , "super_admin"),
    getAllUsers
  );
*/
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
