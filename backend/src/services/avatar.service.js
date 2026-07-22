import { AVATAR_MESSAGES } from "../constants/messages.constants.js";
import ApiError from "../utils/ApiError.js";
import deleteFromCloudinary from "../utils/deleteFromCloudinary.js";
import uploadOnCloudinary from "../utils/uploadOnCloudinary.js";
export const uploadAvatar = async (avatatLocalPath) => {
  const avatar = await uploadOnCloudinary(avatatLocalPath);

  if (!avatar?.url || !avatar?.public_id) {
    throw new ApiError(500, AVATAR_MESSAGES.AVATAR_UPLOAD_FAILED);
  }
  return avatar;
};

export const replaceAvatar = async (oldPublicId, avatarLocalPath) => {
  if (oldPublicId) {
    await deleteFromCloudinary(oldPublicId);
  }

  return await uploadAvatar(avatarLocalPath);
};

export const removeAvatar = async (publicId) => {
  if (publicId) {
    await deleteFromCloudinary(publicId);
  }
};
