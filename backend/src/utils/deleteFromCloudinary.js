import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.log(`deleteFromCloudinary :: Error :: ${error}`);
  }
};

export default deleteFromCloudinary;
