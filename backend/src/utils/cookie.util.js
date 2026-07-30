import { cookieOptions } from "../constants/cookie.constants.js";

const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, cookieOptions);

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res;
};

const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", cookieOptions);

  res.clearCookie("refreshToken", cookieOptions);

  return res;
};

const setVerificationCookie = (res, verificationToken) => {
  res.cookie("verificationToken", verificationToken, cookieOptions);

  return res;
};

const clearVerificationCookie = (res) => {
  res.clearCookie("verificationToken", cookieOptions);

  return res;
};

export {
  clearAuthCookies,
  clearVerificationCookie,
  setAuthCookies,
  setVerificationCookie,
};
