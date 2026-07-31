import { OTP_MESSAGES } from "../constants/messages.constants.js";
import { OTP_EXPIRY_TIME } from "../constants/otp.constants.js";
import OTP from "../models/otp.model.js";
import ApiError from "../utils/ApiError.js";
import generateOTP from "../utils/generateOTP.js";
import sendSMS from "./sms.service.js";

const sendOTP = async (mobile, purpose) => {
  try {
    // Remove any existing OTP for the same purpose
    await deleteOTP(mobile, purpose);

    // Generate a new OTP
    const otp = generateOTP();

    // Generate a otp Document
    const otpDocument = await OTP.create({
      mobile,
      otpHash: otp,
      purpose,
      expiresAt: new Date(Date.now() + OTP_EXPIRY_TIME), // 5 minutes
    });

    if (!otpDocument) {
      throw new ApiError(500, OTP_MESSAGES.OTP_GENERATE_SERVER_ERROR);
    }

    // Send OTP via SMS
    const isSent = await sendSMS(mobile, otp);

    if (!isSent) {
      await deleteOTP(mobile, purpose);
      throw new ApiError(500, OTP_MESSAGES.OTP_SENT_SERVER_ERROR);
    }

    return true;
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      throw error; // preserve original error
    }

    throw new ApiError(500, OTP_MESSAGES.OTP_VERIFY_SERVER_ERROR);
  }
};

const handleInvalidOTPAttempt = async (otpDocument, mobile, purpose) => {
  otpDocument.attempts += 1;
  await otpDocument.save();

  if (otpDocument.attempts >= otpDocument.maxAttempts) {
    await deleteOTP(mobile, purpose);
    throw new ApiError(400, OTP_MESSAGES.OTP_MAX_ATTEMPTS);
  }

  throw new ApiError(400, OTP_MESSAGES.INVALID_OTP);
};

const verifyOTP = async (mobile, otp, purpose) => {
  try {
    const otpDocument = await OTP.findOne({ mobile, purpose });

    if (!otpDocument) {
      throw new ApiError(404, OTP_MESSAGES.OTP_NOT_FOUND);
    }

    if (otpDocument.expiresAt < new Date()) {
      await deleteOTP(mobile, purpose);
      throw new ApiError(400, OTP_MESSAGES.OTP_EXPIRED);
    }

    const isValidOTP = await otpDocument.compareOTP(otp);

    // Compare OTP
    if (!isValidOTP) {
      await handleInvalidOTPAttempt(otpDocument, mobile, purpose);
    }

    // Delete OTP after successful verification
    await deleteOTP(mobile, purpose);

    return true;
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      throw error; // preserve original error
    }

    throw new ApiError(500, OTP_MESSAGES.OTP_VERIFY_SERVER_ERROR);
  }
};

const resendOTP = async (mobile, purpose) => {
  try {
    await sendOTP(mobile, purpose);

    return true;
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      throw error; // preserve original error
    }

    throw new ApiError(500, OTP_MESSAGES.OTP_RESENT_SERVER_ERROR);
  }
};

const deleteOTP = async (mobile, purpose) => {
  try {
    const deletedOTP = await OTP.findOneAndDelete({
      mobile,
      purpose,
    });

    return !!deletedOTP;
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      throw error; // preserve original error
    }

    throw new ApiError(500, OTP_MESSAGES.OTP_VERIFY_SERVER_ERROR);
  }
};

export { deleteOTP, handleInvalidOTPAttempt, resendOTP, sendOTP, verifyOTP };
