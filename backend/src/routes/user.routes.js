import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const userRouter = Router();

// User Authentication Routes
// Register Api Endpt.
userRouter.route("/register").post(registerUser);

// Login Api Endpt.
userRouter.route("/login").post(loginUser);

// Logout Api Endpt.
userRouter.route("/logout").post(verifyJWT, logoutUser);

//---------------------

// Get Route
// get curr user route
// this will use to keep user ki wo loggedIn hai ya loggedOut
userRouter.route("/current-user").get(verifyJWT, getCurrentUser);

// RefreshAccessToken Endpt , which use in axios intercepter
userRouter.route("/refresh-token").post(refreshAccessToken);

export default userRouter;

// user route add in app.js
// import userRouter from "./routes/user.route.js";
// app.use("/api/v1/users", userRouter);
