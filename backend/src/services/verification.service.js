import {
  AUTH_MESSAGES,
  GENERAL_MESSAGES,
} from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";
import { verifyVerificationToken } from "../utils/verificationToken.js";

const verifyOtpFlow = async (req, purpose) => {
  try {
    const verificationToken = req.cookies?.verificationToken;
    if (!verificationToken) {
      throw new ApiError(401, AUTH_MESSAGES.VERIFICATION_TOKEN_MISSING);
    }

    const decodedToken = await verifyVerificationToken(verificationToken);

    if (decodedToken.purpose !== purpose) {
      throw new ApiError(400, AUTH_MESSAGES.INVALID_VERIFICATION_TOKEN);
    }

    return decodedToken;
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, GENERAL_MESSAGES.INTERNAL_SERVER_ERROR);
  }
};

export { verifyOtpFlow };
