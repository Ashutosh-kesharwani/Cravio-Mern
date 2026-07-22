import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { FILE_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "./ApiError.js";
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    console.log(`uploadOnCloudinary :: Error :: ${error}`);
    throw new ApiError(500, FILE_MESSAGES.IMAGE_UPLOAD_FAILED);
  }
};

export default uploadOnCloudinary;
