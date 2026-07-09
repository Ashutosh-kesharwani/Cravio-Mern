import mongoose from "mongoose";

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
    },
    // Always store both url and public id for images
    // url is used for accessing that image , publicId is for delete from cloudinary
    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, id: false }
);

// If we want to create a model only once , as it is recommended , but if just write this things in that case it will , if we run this file again , it will again create the model , so if we dont want that to happen , what we can do is that we can , use mongoose model list and check that only create this model  if it not present i.e first else , use that one [created one]
const Food = mongoose.models.Food || mongoose.model("Food", foodSchema);

export default Food;
