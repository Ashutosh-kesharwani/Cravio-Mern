export const OTP_PURPOSE = {
  REGISTER: "register",
  FORGOT_PASSWORD: "forgot-password",
  CHANGE_CONTACT_NUMBER: "change-contact-number",
  LOGIN: "login",
};

export const OTP_EXPIRY_TIME = 5 * 60 * 1000;
export const OTP_LENGTH = 6;
export const OTP_MAX_ATTEMPTS = 5;
