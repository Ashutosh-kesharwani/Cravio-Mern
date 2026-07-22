import { Router } from "express";
import { ROLES } from "../constants/roles.constants.js";
import {
  createFood,
  deleteFood,
  getAllFoods,
} from "../controllers/food.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import imageUpload from "../middlewares/multer/imageUpload.js";
import verifyRole from "../middlewares/verifyRole.js";

const foodRouter = Router();

foodRouter
  .route("/")
  .post(
    verifyJWT,
    verifyRole(ROLES.ADMIN),
    imageUpload({ maxSize: 10 }).single("image"),
    createFood
  )
  .get(verifyJWT, getAllFoods);

foodRouter
  .route("/:foodId")
  .delete(verifyJWT, verifyRole(ROLES.ADMIN), deleteFood);

export default foodRouter;
