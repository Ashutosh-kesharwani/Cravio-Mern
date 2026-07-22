import { cookieOptions } from "../constants/cookie.constants.js";
import {
  OTP_MESSAGES,
  USER_MESSAGES,
} from "../constants/messages.constants.js";
import { OTP_PURPOSE } from "../constants/otp.constants.js";
import User from "../models/user.model.js";
import { resendOTP, sendOTP, verifyOTP } from "../services/otp.service.js";
import {
  ensureUserDoesNotExist,
  getUserById,
  getVerifiedUserByMobile,
} from "../services/user.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateVerificationToken } from "../utils/verificationToken.js";
import validateMobileNumber from "../validators/validateMobileNumber.js";

const sendRegistrationOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  const existingUser = await User.findOne({ mobile: validMobileNumber });

  if (existingUser) {
    throw new ApiError(409, USER_MESSAGES.MOBILE_ALREADY_EXISTS);
  }

  await sendOTP(validMobileNumber, OTP_PURPOSE.REGISTER);

  return res.status(200).json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_SENT));
});

const verifyRegistrationOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;
  const validMobileNumber = validateMobileNumber(mobile);

  if (!otp?.trim()) {
    throw new ApiError(400, OTP_MESSAGES.OTP_REQUIRED);
  }

  await verifyOTP(validMobileNumber, otp, OTP_PURPOSE.REGISTER);

  const verificationToken = await generateVerificationToken(
    validMobileNumber,
    OTP_PURPOSE.REGISTER
  );

  return res
    .status(200)
    .cookie("verificationToken", verificationToken, cookieOptions)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_VERIFIED));
});

const resendRegistrationOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  const existingUser = await User.findOne({ mobile: validMobileNumber });

  if (existingUser) {
    throw new ApiError(409, USER_MESSAGES.MOBILE_ALREADY_EXISTS);
  }

  await resendOTP(validMobileNumber, OTP_PURPOSE.REGISTER);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_RESENT));
});

const sendLoginOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  await getVerifiedUserByMobile(validMobileNumber);

  await sendOTP(validMobileNumber, OTP_PURPOSE.LOGIN);

  return res.status(200).json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_SENT));
});

const verifyLoginOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  if (!otp?.trim()) {
    throw new ApiError(400, OTP_MESSAGES.OTP_REQUIRED);
  }

  await verifyOTP(validMobileNumber, otp.trim(), OTP_PURPOSE.LOGIN);

  const verificationToken = await generateVerificationToken(
    validMobileNumber,
    OTP_PURPOSE.LOGIN
  );

  return res
    .status(200)
    .cookie("verificationToken", verificationToken, cookieOptions)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_VERIFIED));
});

const resendLoginOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  await getVerifiedUserByMobile(validMobileNumber);

  await resendOTP(validMobileNumber, OTP_PURPOSE.LOGIN);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_RESENT));
});

const sendForgotPasswordOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  const validMobileNumber = validateMobileNumber(mobile);

  await getVerifiedUserByMobile(validMobileNumber);

  await sendOTP(validMobileNumber, OTP_PURPOSE.FORGOT_PASSWORD);

  return res.status(200).json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_SENT));
});

const verifyForgotPasswordOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  if (!otp?.trim()) {
    throw new ApiError(400, OTP_MESSAGES.OTP_REQUIRED);
  }

  await verifyOTP(validMobileNumber, otp.trim(), OTP_PURPOSE.FORGOT_PASSWORD);

  const verificationToken = await generateVerificationToken(
    validMobileNumber,
    OTP_PURPOSE.FORGOT_PASSWORD
  );

  // This not needed if wo error throw then yha tak code aayga hi nhi
  // if (!verificationToken) {
  //   throw new ApiError(500, "Failed to verify OTP , please try after sometime");
  // }

  return res
    .status(200)
    .cookie("verificationToken", verificationToken, cookieOptions)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_VERIFIED));
});

const resendForgotPasswordOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  const validMobileNumber = validateMobileNumber(mobile);

  await getVerifiedUserByMobile(validMobileNumber);

  await resendOTP(validMobileNumber, OTP_PURPOSE.FORGOT_PASSWORD);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_RESENT));
});

const sendChangeContactNumberOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body; // New number needs to be verified
  const validMobileNumber = validateMobileNumber(mobile);

  const user = await getUserById(req.user._id);

  if (user.mobile === validMobileNumber) {
    throw new ApiError(400, USER_MESSAGES.MOBILE_SAME_AS_OLD);
  }

  await ensureUserDoesNotExist({ mobile: validMobileNumber });

  await sendOTP(validMobileNumber, OTP_PURPOSE.CHANGE_CONTACT_NUMBER);

  return res.status(200).json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_SENT));
});

const verifyChangeContactNumberOTP = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;

  const validMobileNumber = validateMobileNumber(mobile);

  if (!otp?.trim()) {
    throw new ApiError(400, OTP_MESSAGES.OTP_REQUIRED);
  }

  await verifyOTP(
    validMobileNumber,
    otp.trim(),
    OTP_PURPOSE.CHANGE_CONTACT_NUMBER
  );

  const verificationToken = await generateVerificationToken(
    validMobileNumber,
    OTP_PURPOSE.CHANGE_CONTACT_NUMBER
  );

  return res
    .status(200)
    .cookie("verificationToken", verificationToken, cookieOptions)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_VERIFIED));
});

const resendChangeContactNumberOTP = asyncHandler(async (req, res) => {
  const { mobile } = req.body; // New number needs to be verified
  const validMobileNumber = validateMobileNumber(mobile);

  const user = await getUserById(req.user._id);

  if (user.mobile === validMobileNumber) {
    throw new ApiError(400, USER_MESSAGES.MOBILE_SAME_AS_OLD);
  }

  await ensureUserDoesNotExist({ mobile: validMobileNumber });

  await resendOTP(validMobileNumber, OTP_PURPOSE.CHANGE_CONTACT_NUMBER);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, OTP_MESSAGES.OTP_RESENT));
});

export {
  resendChangeContactNumberOTP,
  resendForgotPasswordOTP,
  resendLoginOTP,
  resendRegistrationOTP,
  sendChangeContactNumberOTP,
  sendForgotPasswordOTP,
  sendLoginOTP,
  sendRegistrationOTP,
  verifyChangeContactNumberOTP,
  verifyForgotPasswordOTP,
  verifyLoginOTP,
  verifyRegistrationOTP,
};
