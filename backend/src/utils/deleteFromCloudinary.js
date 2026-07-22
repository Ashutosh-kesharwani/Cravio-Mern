import cloudinary from "../config/cloudinary.js";
import { FILE_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "./ApiError.js";

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.log(`deleteFromCloudinary :: Error :: ${error}`);
    throw new ApiError(500, FILE_MESSAGES.IMAGE_DELETE_FAILED);
  }
};

export default deleteFromCloudinary;
