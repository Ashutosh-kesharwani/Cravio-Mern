import validator from "validator";
import { DEFAULT_COUNTRY } from "../constants/app.constants.js";
import { USER_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";

const validateMobileNumber = (mobile) => {
  const contactNumber = mobile?.trim();

  if (!contactNumber) {
    throw new ApiError(400, USER_MESSAGES.MOBILE_REQUIRED);
  }

  if (!validator.isMobilePhone(contactNumber, DEFAULT_COUNTRY || "en-IN")) {
    throw new ApiError(400, USER_MESSAGES.INVALID_MOBILE_NUMBER);
  }

  return contactNumber;
};

export default validateMobileNumber;
