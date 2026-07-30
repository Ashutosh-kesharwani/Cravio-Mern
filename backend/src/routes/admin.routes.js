import { Router } from "express";
import { ROLES } from "../constants/roles.constants.js";
import {
  getAllUsers,
  getDashboard,
  loginAdmin,
  logoutAdmin,
} from "../controllers/admin.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/verifyRole.js";

const adminRouter = Router();

adminRouter.route("/login").post(loginAdmin);
adminRouter
  .route("/logout")
  .post(verifyJWT, verifyRole(ROLES.ADMIN), logoutAdmin);
adminRouter
  .route("/users")
  .get(verifyJWT, verifyRole(ROLES.ADMIN), getAllUsers);

adminRouter
  .route("/dashboard")
  .get(verifyJWT, verifyRole(ROLES.ADMIN), getDashboard);
export default adminRouter;
