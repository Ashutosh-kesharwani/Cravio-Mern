import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;

    // Delete it from cloudinary as well , with uploader.destroy method
    const response = await cloudinary.uploader.destroy(publicId);

    console.log({ response });

    return response;
  } catch (error) {
    console.log(`utils :: deleteFromCloudinary :: Error :: ${error}`);
    throw error;
  }
};

export default deleteFromCloudinary;
