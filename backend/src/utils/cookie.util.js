import { cookieOptions } from "../constants/cookie.constants.js";

export const setAuthCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, cookieOptions);

  res.cookie("refreshToken", refreshToken, cookieOptions);

  return res;
};

export const clearAuthCookies = (res) => {
  res.clearCookie("accessToken", cookieOptions);

  res.clearCookie("refreshToken", cookieOptions);

  return res;
};

export const setVerificationCookie = (res, verificationToken) => {
  res.cookie("verificationToken", verificationToken, cookieOptions);

  return res;
};

export const clearVerificationCookie = (res) => {
  res.clearCookie("verificationToken", cookieOptions);

  return res;
};
