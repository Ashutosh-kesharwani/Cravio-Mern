import jwt from "jsonwebtoken";
import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

// Verify user's access token
const verifyJWT = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, AUTH_MESSAGES.UNAUTHORIZED);
    }

    // Verify JWT
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

    // Fetch authenticated user
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_ACCESS_TOKEN);
    }

    // Attach user to request object
    req.user = user;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, AUTH_MESSAGES.ACCESS_TOKEN_EXPIRED);
    }

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_ACCESS_TOKEN);
    }

    throw error;
  }
};

export default verifyJWT;
