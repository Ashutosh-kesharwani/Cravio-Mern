import { FILE_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";

export const uploadMedia = async (mediaLocalPath) => {
  const media = await uploadOnCloudinary(mediaLocalPath);

  if (!media?.url || !media?.public_id) {
    throw new ApiError(500, FILE_MESSAGES.IMAGE_UPLOAD_FAILED);
  }
  return media;
};

export const replaceMedia = async (oldPublicId, mediaLocalPath) => {
  if (oldPublicId) {
    await deleteFromCloudinary(oldPublicId);
  }

  return await uploadMedia(mediaLocalPath);
};

export const removeMedia = async (publicId) => {
  if (publicId) {
    await deleteFromCloudinary(publicId);
  }
};
