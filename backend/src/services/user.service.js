import {
  AUTH_MESSAGES,
  USER_MESSAGES,
} from "../constants/messages.constants.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getUserById = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, USER_MESSAGES.USER_NOT_FOUND);
  }

  return user;
};

export const getSafeUser = async (userId) => {
  return await User.findById(userId).select("-password -refreshToken");
};

export const ensureUserDoesNotExist = async ({ email, username, mobile }) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { username }, { mobile }],
  }).select("email username mobile");

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ApiError(409, USER_MESSAGES.EMAIL_ALREADY_EXISTS);
    }

    if (existingUser.username === username) {
      throw new ApiError(409, USER_MESSAGES.USERNAME_ALREADY_EXISTS);
    }

    if (existingUser.mobile === mobile) {
      throw new ApiError(409, USER_MESSAGES.MOBILE_ALREADY_EXISTS);
    }
  }
};

export const getExistingUser = async ({ email, username, mobile }) => {
  const user = await User.findOne({
    $or: [{ email }, { username }, { mobile }],
  });

  if (!user) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  return user;
};

export const getVerifiedUserByMobile = async (mobile) => {
  const user = await User.findOne({ mobile });

  if (!user) {
    throw new ApiError(404, USER_MESSAGES.USER_NOT_REGISTERED_WITH_MOBILE);
  }

  if (!user.isMobileVerified) {
    throw new ApiError(400, USER_MESSAGES.MOBILE_NOT_VERIFIED);
  }

  return user;
};
