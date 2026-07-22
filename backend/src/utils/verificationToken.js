import jwt from "jsonwebtoken";
import { AUTH_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "./ApiError.js";

const generateVerificationToken = async (mobile, purpose) => {
  return jwt.sign(
    {
      mobile,
      purpose,
    },
    process.env.VERIFICATION_TOKEN_SECRET,
    {
      expiresIn: process.env.VERIFICATION_TOKEN_EXPIRY,
    }
  );
};

const verifyVerificationToken = async (token) => {
  try {
    return jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET);
  } catch (error) {
    console.error(error);
    throw new ApiError(401, AUTH_MESSAGES.INVALID_VERIFICATION_TOKEN);
  }
};

export { generateVerificationToken, verifyVerificationToken };
