import {
  ADMIN_MESSAGES,
  AUTH_MESSAGES,
} from "../constants/messages.constants.js";
import { ROLES } from "../constants/roles.constants.js";
import User from "../models/user.model.js";
import { getExistingAdmin, getSafeAdmin } from "../services/admin.service.js";
import { generateAccessAndRefreshToken } from "../services/auth.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie.util.js";
// Auth Controller

// Login Admin

/* 
  firstName: "Admin-1",
    email: "admin@gmail.com",
    username: "admin1",
    mobile: "9305217572",
    password: "Admin@123",
    role: "admin",
*/
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email?.trim() && !username?.trim()) {
    throw new ApiError(401, AUTH_MESSAGES.ADMIN_INVALID_CREDENTIALS);
  }

  if (!password?.trim()) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_REQUIRED);
  }

  const admin = await getExistingAdmin({ email, username });

  const isValidPassword = await admin.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, AUTH_MESSAGES.CURRENT_PASSWORD_INCORRECT);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    admin._id
  );

  const loggedInAdmin = await getSafeAdmin(admin._id);

  setAuthCookies(res, accessToken, refreshToken);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: loggedInAdmin }, AUTH_MESSAGES.LOGIN_SUCCESS)
    );
});

// Logout admin
const logoutAdmin = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: null });

  clearAuthCookies(res);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, AUTH_MESSAGES.LOGOUT_SUCCESS));
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  // const users = await User.find({ role: "customer" });
  const users = await User.find({
    role: { $ne: ROLES.ADMIN },
  }).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new ApiResponse(200, { users }, ADMIN_MESSAGES.USERS_FETCHED_SUCCESSFULLY)
    );
});

export { getAllUsers, loginAdmin, logoutAdmin };
