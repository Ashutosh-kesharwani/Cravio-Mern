import jwt from "jsonwebtoken";
import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";
import { getUserById } from "./user.service.js";

// Generate and persist new access & refresh tokens
export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await getUserById(userId);

    // Generate JWT tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save latest refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(
      `userController :: generateAccessAndRefreshToken :: ${error.message}`
    );

    throw new ApiError(500, AUTH_MESSAGES.TOKEN_SERVER_ERROR);
  }
};

export const verifyRefreshToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }
    const decodedToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );

    const user = await getUserById(decodedToken._id);

    if (!user || user.refreshToken !== refreshToken) {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }

    return user;
  } catch (error) {
    console.error(`userController :: verifyRefreshToken :: ${error.message}`);

    throw new ApiError(401, AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
  }
};
