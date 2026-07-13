import { Router } from "express";
import {
  createFood,
  deleteFood,
  getAllFoods,
} from "../controllers/food.controller.js";
import upload from "../middlewares/multer.middleware.js";

const foodRouter = Router();

// Food API Endpoint

//1. Add food item
// 1. Create Food
foodRouter.post("/", upload.single("image"), createFood);

// 2. Get All Foods
foodRouter.get("/", getAllFoods);

// 3. Delete Food
foodRouter.delete("/:id", deleteFood);

export default foodRouter;
