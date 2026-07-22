import {
  ADDRESS_MESSAGES,
  AUTH_MESSAGES,
  FILE_MESSAGES,
  GENERAL_MESSAGES,
  USER_MESSAGES,
} from "../constants/messages.constants.js";
import { OTP_PURPOSE } from "../constants/otp.constants.js";
import User from "../models/user.model.js";
import {
  addAddress,
  deleteAddress,
  updateAddress,
} from "../services/address.service.js";
import {
  generateAccessAndRefreshToken,
  verifyRefreshToken,
} from "../services/auth.service.js";
import {
  removeMedia,
  replaceMedia,
  uploadMedia,
} from "../services/media.service.js";
import {
  ensureUserDoesNotExist,
  getExistingUser,
  getSafeUser,
  getUserById,
} from "../services/user.service.js";
import { verifyOtpFlow } from "../services/verification.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  clearAuthCookies,
  clearVerificationCookie,
  setAuthCookies,
} from "../utils/cookie.util.js";

// User Controller

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { mobile } = await verifyOtpFlow(req, OTP_PURPOSE.REGISTER);
  const { firstName, lastName, username, email, password } = req.body;
  if ([firstName, username, email, password].some((field) => !field?.trim())) {
    throw new ApiError(400, GENERAL_MESSAGES.VALIDATION_ERROR);
  }

  await ensureUserDoesNotExist({
    email,
    username,
    mobile,
  });

  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    mobile,
    isMobileVerified: true,
  });

  const createdUser = await getSafeUser(user._id);

  if (!createdUser) {
    throw new ApiError(
      500,
      GENERAL_MESSAGES.INTERNAL_SERVER_ERROR,
      AUTH_MESSAGES.REGISTER_FAILED
    );
  }

  clearVerificationCookie(res);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        AUTH_MESSAGES.REGISTER_SUCCESS
      )
    );
});

// Login user
const loginUser = asyncHandler(async (req, res) => {
  let verifiedMobile = null;

  const { username, email, password, mobile } = req.body;

  // At least one login identifier is required
  if (!email?.trim() && !username?.trim() && !mobile?.trim()) {
    throw new ApiError(400, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  if (!password?.trim()) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_REQUIRED);
  }

  // Require OTP only for mobile login
  if (mobile?.trim()) {
    const decodedToken = await verifyOtpFlow(req, OTP_PURPOSE.LOGIN);

    if (decodedToken.mobile !== mobile.trim()) {
      throw new ApiError(401, USER_MESSAGES.MOBILE_VERIFICATION_FAILED);
    }

    verifiedMobile = decodedToken.mobile;
  }

  // Find user
  const existingUser = await getExistingUser({
    email,
    username,
    mobile: verifiedMobile,
  });

  // Verify password
  const isValidPassword = await existingUser.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, AUTH_MESSAGES.INVALID_CREDENTIALS);
  }

  // Generate tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser._id
  );

  const user = await getSafeUser(existingUser._id);

  // Clear verification cookie only if OTP was used
  if (verifiedMobile) {
    clearVerificationCookie(res);
  }

  setAuthCookies(res, accessToken, refreshToken);

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, AUTH_MESSAGES.LOGIN_SUCCESS));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
  // Clear refresh token from database
  await User.findByIdAndUpdate(req.user._id, {
    $set: { refreshToken: null },
  });

  // Clear authentication cookies
  clearAuthCookies(res);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, AUTH_MESSAGES.LOGOUT_SUCCESS));
});

// Refresh Acess Token
const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    const incomingRefreshToken =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    const user = await verifyRefreshToken(incomingRefreshToken);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const updatedUser = await getSafeUser(user._id);

    setAuthCookies(res, accessToken, refreshToken);

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { user: updatedUser },
          AUTH_MESSAGES.TOKEN_REFRESHED
        )
      );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, AUTH_MESSAGES.REFRESH_TOKEN_EXPIRED);
    }

    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, AUTH_MESSAGES.INVALID_REFRESH_TOKEN);
    }
    throw error;
  }
});

// Get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: req.user },
        USER_MESSAGES.CURRENT_USER_FETCHED
      )
    );
});

// Update Controller

// Change Current Password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  // Validate required fields
  if (
    [oldPassword, newPassword, confirmPassword].some((field) => !field?.trim())
  ) {
    throw new ApiError(400, GENERAL_MESSAGES.VALIDATION_ERROR);
  }

  // New password should be different
  if (oldPassword === newPassword) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_SAME_AS_OLD);
  }

  // Confirm password
  if (newPassword !== confirmPassword) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_MISMATCH);
  }

  // Fetch authenticated user
  const user = await getUserById(req.user._id);

  // Verify current password
  const isValidPassword = await user.comparePassword(oldPassword);

  if (!isValidPassword) {
    throw new ApiError(401, AUTH_MESSAGES.CURRENT_PASSWORD_INCORRECT);
  }

  // Update password (pre-save middleware will hash it)
  user.password = newPassword;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, AUTH_MESSAGES.PASSWORD_CHANGED));
});

// Reset User Password
const resetPassword = asyncHandler(async (req, res) => {
  const decoded = await verifyOtpFlow(req, OTP_PURPOSE.FORGOT_PASSWORD);

  const { password, confirmPassword } = req.body;

  if (!password?.trim() || !confirmPassword?.trim()) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_REQUIRED);
  }

  if (password !== confirmPassword) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_MISMATCH);
  }

  const user = await User.findOne({
    mobile: decoded.mobile,
  });

  if (!user) {
    throw new ApiError(404, USER_MESSAGES.USER_NOT_FOUND);
  }

  // Prevent using the current password again
  const isSamePassword = await user.comparePassword(password);

  if (isSamePassword) {
    throw new ApiError(400, AUTH_MESSAGES.PASSWORD_SAME_AS_OLD);
  }

  user.password = password;

  // Optional but recommended
  user.refreshToken = null;

  await user.save();

  // Clear authentication and verification cookies , after reset password user need to login again with new password
  clearAuthCookies(res);
  clearVerificationCookie(res);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, AUTH_MESSAGES.PASSWORD_RESET));
});

// Change Email
const changeCurrentEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email?.trim()) {
    throw new ApiError(400, USER_MESSAGES.EMAIL_REQUIRED);
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, USER_MESSAGES.EMAIL_ALREADY_EXISTS);
  }

  const user = await getUserById(req.user._id);

  user.email = email;

  await user.save();

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, USER_MESSAGES.EMAIL_UPDATED)
    );
});

// Change Username
const changeCurrentUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;

  if (!username?.trim()) {
    throw new ApiError(400, USER_MESSAGES.USERNAME_REQUIRED);
  }

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    throw new ApiError(409, USER_MESSAGES.USERNAME_ALREADY_EXISTS);
  }

  const user = await getUserById(req.user._id);

  user.username = username;

  await user.save();

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        USER_MESSAGES.USERNAME_UPDATED
      )
    );
});

// Avatar post , patch , delete
const uploadUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, FILE_MESSAGES.IMAGE_REQUIRED);
  }

  const avatar = await uploadMedia(avatarLocalPath);

  const user = await getUserById(req.user?._id);

  user.avatar.url = avatar.url;
  user.avatar.publicId = avatar.public_id;

  await user.save();

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, FILE_MESSAGES.IMAGE_UPLOADED)
    );
});

const changeUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, FILE_MESSAGES.IMAGE_REQUIRED);
  }

  const user = await getUserById(req.user?._id);

  const avatar = await replaceMedia(user.avatar.publicId, avatarLocalPath);

  user.avatar.url = avatar.url;
  user.avatar.publicId = avatar.public_id;

  await user.save();

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, FILE_MESSAGES.IMAGE_UPDATED)
    );
});

const deleteUserAvatar = asyncHandler(async (req, res) => {
  await removeMedia(req.user.avatar.publicId);

  await User.findByIdAndUpdate(req.user?._id, {
    $set: {
      avatar: {
        url: "",
        publicId: "",
      },
    },
  });

  const updatedUser = await getSafeUser(req.user?._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, FILE_MESSAGES.IMAGE_DELETED)
    );
});

// Address
// POST /users/address
/* 
Add User Address  : [One to many] [A single user can have multiple address]

> Retrieve address all fields from user req.body.address 
[so in frontend we pass address field in which all these value are present]

> Retreive user doc with req.user._id
> check if user present
> Check if in current req , isDefault is True , [i.e iss address ko abb default banana hai]
> Then all exist address field ko false karo set

> Add new address in user.addresses field [As ye array of object] , so new field easily got added

> save the document

> find new user with user._id , and remove sensitive field

> return response


*/
const addUserAddress = asyncHandler(async (req, res) => {
  // Fetch user address field from req
  const { address } = req.body;

  // Retrieve user
  const user = await getUserById(req.user?._id);

  await addAddress(user, address);

  // Remove sensitive field
  const updatedUser = await getSafeUser(user._id);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: updatedUser },
        ADDRESS_MESSAGES.ADDRESS_ADDED
      )
    );
});

/* 
Update User Address
> Retrieve address id , ie kis address ko update karna hai from params  [ const {addressId} = req.params;]
> Retrieve address value from req.body.address
> Find user doc with req.user._id
> check is user found or not
> First get the address fielld jisse update karna hai , with addressId
> check present or not
> update the field which is given i.e not undefined , null or "" after trim

> IsDefault Set
> Now again if there is req of making this address as default so set rest wale as false
> update isdefault field separately

> Find updated user by remove sensitive field 
> send response


*/
//PATCH /users/address/:addressId
const updateUserAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const data = req.body.address;

  const user = await getUserById(req.user?._id);

  await updateAddress(user, addressId, data);

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        ADDRESS_MESSAGES.ADDRESS_UPDATED
      )
    );
});

/* 
Delete User address

> Here user ke addresses field me se jis address ko delete karne ki req aayi hai usse hame delete karna hai
> Get addressId from params
> get user from req.user._id
> check if user present
> find address from addressId which to delete
> check present or not
> then delete this document with deleteOne method 
> save user 
> send response , delete me we generally dont send the update user 

*/

const deleteUserAddress = asyncHandler(async (req, res) => {
  const { addressId } = req.params;

  const user = await getUserById(req.user?._id);

  await deleteAddress(user, addressId);

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser },
        ADDRESS_MESSAGES.ADDRESS_DELETED
      )
    );
});

const updateContactNumber = asyncHandler(async (req, res) => {
  const decoded = await verifyOtpFlow(req, OTP_PURPOSE.CHANGE_CONTACT_NUMBER);

  const user = await getUserById(req.user._id);
  if (user.mobile === decoded.mobile) {
    throw new ApiError(400, USER_MESSAGES.MOBILE_SAME_AS_OLD);
  }
  user.mobile = decoded.mobile;
  user.isMobileVerified = true;

  await user.save();

  const updatedUser = await getSafeUser(user._id);
  clearVerificationCookie(res);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, USER_MESSAGES.MOBILE_UPDATED)
    );
});

// Change rest field
const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, dob } = req.body;

  const user = await getUserById(req.user._id);

  // Only Update field if it given if undefined or empty then dont
  // means if firstName present undefined ya "" trim ke baad to falsy value to ye if chalega hi nhi
  if (firstName?.trim()) {
    user.firstName = firstName;
  }
  if (lastName?.trim()) {
    user.lastName = lastName;
  }

  // First outer check , if dob is not undefined matalb user ne kuch send kiya hai
  // inner check as str ke form me milega , so usme "  " to nhi hai , if to error do
  // else update kardo
  if (dob !== undefined) {
    if (typeof dob === "string" && !dob.trim()) {
      throw new ApiError(400, USER_MESSAGES.DOB_REQUIRED);
    }

    user.dob = dob;
  }

  await user.save();

  const updatedUser = await getSafeUser(user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: updatedUser }, USER_MESSAGES.PROFILE_UPDATED)
    );
});

export {
  addUserAddress,
  changeCurrentEmail,
  changeCurrentPassword,
  changeCurrentUsername,
  changeUserAvatar,
  deleteUserAddress,
  deleteUserAvatar,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateContactNumber,
  updateProfile,
  updateUserAddress,
  uploadUserAvatar,
};
