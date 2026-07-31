import { Router } from "express";
import {
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
} from "../controllers/otp.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
const otpRouter = Router();

// OTP EndPoints

// Register OTP
otpRouter.route("/register/send").post(sendRegistrationOTP);
otpRouter.route("/register/verify").post(verifyRegistrationOTP);
otpRouter.route("/register/resend").post(resendRegistrationOTP);

// Login OTP
otpRouter.route("/login/send").post(sendLoginOTP);
otpRouter.route("/login/verify").post(verifyLoginOTP);
otpRouter.route("/login/resend").post(resendLoginOTP);

// Forgot-Password OTP
otpRouter.route("/forgot-password/send").post(sendForgotPasswordOTP);
otpRouter.route("/forgot-password/verify").post(verifyForgotPasswordOTP);
otpRouter.route("/forgot-password/resend").post(resendForgotPasswordOTP);

// Change-Contact-Number OTP
otpRouter
  .route("/change-contact-number/send")
  .post(verifyJWT, sendChangeContactNumberOTP);

otpRouter
  .route("/change-contact-number/verify")
  .post(verifyJWT, verifyChangeContactNumberOTP);

otpRouter
  .route("/change-contact-number/resend")
  .post(verifyJWT, resendChangeContactNumberOTP);

export default otpRouter;
