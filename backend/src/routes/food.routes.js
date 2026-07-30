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
  .get(getAllFoods);

/* 
Note : Jo route public honge means authentctaed ki jrurat nhu like home page usme jwt mat lgao else , wo data shi se load nhi hoga jaise verifyJWT hai isko mat lgao getAllFoods me as ye home page me hain to ye display hoga bhale user loggedIn ho ya nhi
*/

foodRouter
  .route("/:foodId")
  .delete(verifyJWT, verifyRole(ROLES.ADMIN), deleteFood);

export default foodRouter;
