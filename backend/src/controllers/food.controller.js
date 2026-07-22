import {
  FILE_MESSAGES,
  FOOD_MESSAGES,
  GENERAL_MESSAGES,
} from "../constants/messages.constants.js";
import Food from "../models/food.model.js";
import { removeMedia, uploadMedia } from "../services/media.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const createFood = asyncHandler(async (req, res) => {
  const { name, description, category, price } = req.body;

  const foodImageLocalPath = req.file?.path;

  if ([name, category, price].some((field) => !field?.trim())) {
    throw new ApiError(400, GENERAL_MESSAGES.VALIDATION_ERROR);
  }

  if (!foodImageLocalPath) {
    throw new ApiError(400, FILE_MESSAGES.IMAGE_REQUIRED);
  }

  const foodImage = await uploadMedia(foodImageLocalPath);

  const food = await Food.create({
    name,
    description,
    category,
    price,
    image: {
      url: foodImage?.url,
      publicId: foodImage?.public_id,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, { food }, FOOD_MESSAGES.FOOD_ADDED));
});

const getAllFoods = asyncHandler(async (req, res) => {
  const foods = await Food.find().lean();

  return res
    .status(200)
    .json(
      new ApiResponse(200, { foods }, FOOD_MESSAGES.FOODS_FETCHED_SUCCESSFULLY)
    );
});

const deleteFood = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  const food = await Food.findById(foodId);

  if (!food) {
    throw new ApiError(404, FOOD_MESSAGES.FOOD_NOT_FOUND);
  }

  await removeMedia(food.image.publicId);

  await food.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, FOOD_MESSAGES.FOOD_DELETED));
});

export { createFood, deleteFood, getAllFoods };
