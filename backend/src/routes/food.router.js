import { Router } from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
} from "../controllers/food.controllers.js";
import upload from "../middlewares/multer.middleware.js";

const foodRouter = Router();

// Food API Endpoint

//1. Add food item
// In add food item , we also send file so we have to use multer for parsing multipart/form-data and parse it into req.file
foodRouter.route("/foods").post(upload.single("image"), createFood);

//2. Get all food item
foodRouter.route("/foods").get(getAllFoods);

//3. delete a food Item
foodRouter.route("/foods/:id").delete(deleteFood);

export default foodRouter;
