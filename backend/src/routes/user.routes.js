import { Router } from "express";
import {
  addUserAddress,
  changeCurrentEmail,
  changeCurrentPassword,
  changeCurrentUsername,
  changeUserAvatar,
  deleteUserAddress,
  deleteUserAvatar,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  updateContactNumber,
  updateProfile,
  updateUserAddress,
  uploadUserAvatar,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import imageUpload from "../middlewares/multer/imageUpload.js";

const userRouter = Router();

// User Api Endpoints

// Authentication Api EndPoint
userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/refresh-token").post(refreshAccessToken);

// Get Api EndPoint
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);

// Update Api EndPoint
userRouter.route("/change-password").patch(verifyJWT, changeCurrentPassword);
userRouter.route("/profile").patch(verifyJWT, updateProfile);
userRouter.route("/contact-number").patch(verifyJWT, updateContactNumber);
userRouter.route("/change-email").patch(verifyJWT, changeCurrentEmail);
userRouter.route("/me").patch(verifyJWT, changeCurrentUsername);

// Reset Password
userRouter.route("/reset-password").patch(verifyJWT, resetPassword);

// Avatar
userRouter
  .route("/avatar")
  .post(
    verifyJWT,
    imageUpload({ maxSizeMB: 5 }).single("avatar"),
    uploadUserAvatar
  )
  .patch(
    verifyJWT,
    imageUpload({ maxSizeMB: 5 }).single("avatar"),
    changeUserAvatar
  )
  .delete(verifyJWT, deleteUserAvatar);

// Address
userRouter.route("/address").post(verifyJWT, addUserAddress);
userRouter
  .route("/address/:addressId")
  .patch(verifyJWT, updateUserAddress)
  .delete(verifyJWT, deleteUserAddress);

export default userRouter;
