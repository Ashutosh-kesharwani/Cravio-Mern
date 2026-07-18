import validator from "validator";
import { DEFAULT_COUNTRY } from "../constants/app.constants.js";
import ApiError from "../utils/ApiError.js";

const validateMobileNumber = (mobile) => {
  const contactNumber = mobile?.trim();

  if (!contactNumber) {
    throw new ApiError(400, "Mobile number is required");
  }

  if (!validator.isMobilePhone(contactNumber, DEFAULT_COUNTRY || "en-IN")) {
    throw new ApiError(400, "Please enter a valid Indian Mobile number");
  }

  return contactNumber;
};

export default validateMobileNumber;
