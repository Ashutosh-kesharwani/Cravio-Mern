import Food from "../models/food.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
/* 

    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
*/

// 1. Create food item
const createFood = asyncHandler(async (req, res) => {
  const { name, price, category, description } = req.body;

  // Check if all required Fields are present or not
  // note two ways to check if user send nothing means undefined or space just i) use -> !field?.trim() just , as if undefined to bhi work and if space just to convert with trim into "" , so to bhi falsy value and ! make it truthy
  // II way use like this -> !field || field.trim() === "" like this
  if ([name, price, category].some((field) => !field?.trim())) {
    throw new ApiError(400, "Required Field are mandatory");
  }

  // Retrieve File from req.files
  const imageLocalPath = req.file?.path;

  // Check image if given or not
  if (!imageLocalPath) {
    throw new ApiError(400, "Food image is required");
  }

  // Upload on cloudinary
  // Get response
  const image = await uploadOnCloudinary(imageLocalPath);

  if (!image?.url) {
    throw new ApiError(400, "Error while uploading food image on cloudinary");
  }

  // Create a food document /  object
  // create method will run all pre(save) middleware and all validation in schema defined
  const food = await Food.create({
    name,
    description,
    price, // mongoose automatically cast this str which we get from form-data into number , if it is valid number like "12" , if not "ab" throw cast error
    // image: image?.url, as we are store two things in image field
    image: {
      url: image.secure_url,
      publicId: image.public_id,
    },
    category,
  });

  // Send Response
  return res
    .status(201)
    .json(new ApiResponse(201, food, "Food item created successfully"));
});

// 2. Get All food items
const getAllFoods = asyncHandler(async (req, res) => {
  // lean is recommended if we are only reading data , so as from query we get query Object ,
  //  so mongoose will try to convert it into json ,
  //  so to fast the process we can use lean to just directly get json object
  // Lean :  [So it return fastly plain json object , instead of mongoose document and makeit slightly fater ad use less memory also]
  // recommend: Use lean when only send reading data
  const foodItems = await Food.find().lean();
  return res
    .status(200)
    .json(
      new ApiResponse(200, foodItems, "Fetched all food items successfully")
    );
});

// 3. Delete Food Item
// Fetch id from req
// check exist or not
// first delete from cloudinary
// delete from Db
// send response
const deleteFood = asyncHandler(async (req, res) => {
  const { id } = req.params; // always destructure param from req.params
  // console.log({ id });
  // if(!id) dont check , as if route is /foods/:id then express already expect id , so no need to check if not given then , express already send error

  // find food from Db
  const food = await Food.findById(id);

  // check if food item exist or not
  if (!food) {
    throw new ApiError(404, "Food item not found ");
  }

  // delete first from cloudinary
  // pass public id into delete method
  await deleteFromCloudinary(food.image.publicId);

  // Delete from db
  await food.deleteOne();

  // Send response
  return res
    .status(200)
    .json(new ApiResponse(200, null, "Food item deleted successfully"));
});

export { createFood, deleteFood, getAllFoods };
