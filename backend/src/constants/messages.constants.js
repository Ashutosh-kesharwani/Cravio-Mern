export const AUTH_MESSAGES = {
  // Registration
  REGISTER_SUCCESS: "Account created successfully.",
  USER_ALREADY_EXISTS: "An account with the provided details already exists.",
  REGISTER_FAILED: "Failed to register user. Please try again later.",
  // Login
  LOGIN_SUCCESS: "Logged in successfully.",
  INVALID_CREDENTIALS: "Invalid email, username, mobile number, or password.",

  // Logout
  LOGOUT_SUCCESS: "Logged out successfully.",

  // Password
  PASSWORD_REQUIRED: "Password is required.",
  PASSWORD_CHANGED: "Password changed successfully.",
  PASSWORD_RESET: "Password reset successfully.",
  PASSWORD_CONFIRM_REQUIRED: "Please confirm your password.",
  PASSWORD_MISMATCH: "New Password and confirm password must be same.",
  PASSWORD_SAME_AS_OLD:
    "New password cannot be the same as your current password.",
  CURRENT_PASSWORD_INCORRECT: "Current password is incorrect.",

  // Refresh Token
  TOKEN_REFRESHED: "Session refreshed successfully.",
  INVALID_REFRESH_TOKEN: "Your session is invalid. Please log in again.",
  REFRESH_TOKEN_EXPIRED: "Your session has expired. Please log in again.",

  // Verification
  VERIFICATION_TOKEN_MISSING:
    "Verification required. Please verify your mobile number first.",
  VERIFICATION_FAILED: "Mobile number verification failed.",
  INVALID_VERIFICATION_TOKEN: "Verification session is invalid or has expired.",

  // Authentication
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "You do not have permission to access this resource.",
};

export const USER_MESSAGES = {
  USER_NOT_FOUND: "User not found.",

  PROFILE_UPDATED: "Profile updated successfully.",

  EMAIL_UPDATED: "Email address updated successfully.",
  EMAIL_ALREADY_EXISTS:
    "This email address is already associated with another account.",
  EMAIL_REQUIRED: "Email address is required.",

  USERNAME_UPDATED: "Username updated successfully.",
  USERNAME_ALREADY_EXISTS: "This username is already taken.",
  USERNAME_REQUIRED: "Username is required.",

  MOBILE_UPDATED: "Mobile number updated successfully.",
  MOBILE_ALREADY_EXISTS: "This mobile number is already registered.",
  MOBILE_REQUIRED: "Mobile number is required.",
  MOBILE_SAME_AS_OLD:
    "New mobile number cannot be the same as your current mobile number.",
  INVALID_MOBILE_NUMBER: "Please enter valid Indian Mobile Number",
  MOBILE_VERIFICATION_FAILED:
    "Mobile number verification failed , User not registered with this mobile number",

  CURRENT_USER_FETCHED: "User profile fetched successfully.",
  DOB_REQUIRED: "Date of birth is required.",
};

export const AVATAR_MESSAGES = {
  AVATAR_REQUIRED: "Please select an avatar image.",
  AVATAR_UPLOADED: "Avatar uploaded successfully.",
  AVATAR_UPDATED: "Avatar updated successfully.",
  AVATAR_REMOVED: "Avatar removed successfully.",

  AVATAR_UPLOAD_FAILED: "Failed to upload avatar. Please try again.",
  AVATAR_REPLACE_FAILED: "Failed to change avatar. Please try again.",
};

export const ADDRESS_MESSAGES = {
  ADDRESS_ADDED: "Address added successfully.",
  ADDRESS_UPDATED: "Address updated successfully.",
  ADDRESS_DELETED: "Address removed successfully.",

  ADDRESS_NOT_FOUND: "Address not found.",
};

export const OTP_MESSAGES = {
  OTP_SENT: "OTP has been sent successfully.",
  OTP_RESENT: "OTP has been resent successfully.",

  OTP_VERIFIED: "OTP verified successfully.",
  OTP_NOT_FOUND:
    "No OTP found for this mobile number. Please request a new OTP.",

  INVALID_OTP: "The OTP you entered is incorrect.",

  OTP_EXPIRED: "OTP has expired. Please request a new one.",

  OTP_MAX_ATTEMPTS:
    "Maximum OTP verification attempts exceeded. Please request a new OTP.",

  OTP_REQUIRED: "OTP is required.",

  OTP_GENERATE_SERVER_ERROR: "Failed to generate OTP , Please try again later",
  OTP_SENT_SERVER_ERROR: "Failed to send OTP , Please try again later",
  OTP_VERIFY_SERVER_ERROR: "Unable to verify OTP. Please try again later.", // For OTP delete service we use this
  OTP_RESENT_SERVER_ERROR: "Failed to resend OTP. Please try again later.",
};

export const FILE_MESSAGES = {
  FILE_REQUIRED: "Please upload a file.",

  IMAGE_REQUIRED: "Please upload an image.",

  FILE_UPLOAD_FAILED: "File upload failed. Please try again.",

  IMAGE_UPLOAD_FAILED: "Image upload failed. Please try again.",
  IMAGE_DELETE_FAILED: "Image delete failed. Please try again.",
};

export const GENERAL_MESSAGES = {
  SUCCESS: "Request completed successfully.",

  CREATED: "Resource created successfully.",

  UPDATED: "Resource updated successfully.",

  DELETED: "Resource deleted successfully.",

  BAD_REQUEST: "The request could not be processed.",

  VALIDATION_ERROR: "Please fill in all required fields.",

  INTERNAL_SERVER_ERROR: "Something went wrong. Please try again later.",

  RESOURCE_NOT_FOUND: "Requested resource was not found.",

  DUPLICATE_RESOURCE: "Resource already exists.",
};
