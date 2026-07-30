/*  
Scripts : Seed To Add Food 

> scripts
"seed:foods": "node scripts/seedFoods.js"

*/

import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

import mongoose from "mongoose";
import connectDB from "../src/db/server.js";
import Food from "../src/models/food.model.js";

const FOOD_IMAGES_PATH = path.join(__dirname, "../../frontend/src/assets/food");

const foods = [
  {
    name: "Greek Salad",
    price: 189,
    description: "Fresh vegetables with olives, feta and herb dressing.",
    category: "salad",
  },
  {
    name: "Veg Salad",
    price: 159,
    description: "Healthy mixed vegetables served with refreshing dressing.",
    category: "salad",
  },
  {
    name: "Clover Salad",
    price: 179,
    description: "Fresh greens tossed with herbs and light dressing.",
    category: "salad",
  },
  {
    name: "Chicken Salad",
    price: 249,
    description: "Grilled chicken with fresh vegetables and creamy dressing.",
    category: "salad",
  },
  {
    name: "Lasagna Rolls",
    price: 219,
    description: "Cheesy pasta rolls baked with rich tomato sauce.",
    category: "rolls",
  },
  {
    name: "Peri Peri Rolls",
    price: 199,
    description: "Spicy peri peri rolls with flavorful vegetable filling.",
    category: "rolls",
  },
  {
    name: "Chicken Rolls",
    price: 229,
    description: "Soft rolls stuffed with juicy chicken and sauces.",
    category: "rolls",
  },
  {
    name: "Veg Rolls",
    price: 169,
    description: "Crispy vegetable rolls with delicious homemade fillings.",
    category: "rolls",
  },
  {
    name: "Ripple Ice Cream",
    price: 129,
    description: "Creamy ripple ice cream with rich chocolate flavor.",
    category: "deserts",
  },
  {
    name: "Fruit Ice Cream",
    price: 149,
    description: "Fresh fruit flavored ice cream with natural sweetness.",
    category: "deserts",
  },
  {
    name: "Jar Ice Cream",
    price: 139,
    description: "Creamy ice cream served with tasty premium toppings.",
    category: "deserts",
  },
  {
    name: "Vanilla Ice Cream",
    price: 99,
    description: "Classic vanilla ice cream made with fresh milk.",
    category: "deserts",
  },
  {
    name: "Chicken Sandwich",
    price: 189,
    description: "Grilled chicken sandwich with fresh vegetables and sauce.",
    category: "sandwich",
  },
  {
    name: "Vegan Sandwich",
    price: 169,
    description: "Healthy vegan sandwich packed with fresh vegetables.",
    category: "sandwich",
  },
  {
    name: "Grilled Sandwich",
    price: 159,
    description: "Grilled cheese sandwich with crispy golden bread.",
    category: "sandwich",
  },
  {
    name: "Bread Sandwich",
    price: 119,
    description: "Classic bread sandwich filled with fresh vegetables.",
    category: "sandwich",
  },
  {
    name: "Cup Cake",
    price: 89,
    description: "Soft cupcake topped with smooth creamy frosting.",
    category: "cake",
  },
  {
    name: "Vegan Cake",
    price: 219,
    description: "Delicious vegan cake made from premium ingredients.",
    category: "cake",
  },
  {
    name: "Butterscotch Cake",
    price: 279,
    description: "Rich butterscotch cake layered with creamy frosting.",
    category: "cake",
  },
  {
    name: "Sliced Cake",
    price: 119,
    description: "Fresh cake slice with soft sponge and cream.",
    category: "cake",
  },
  {
    name: "Garlic Mushroom",
    price: 199,
    description: "Garlic mushrooms cooked with herbs and butter.",
    category: "pure veg",
  },
  {
    name: "Fried Cauliflower",
    price: 179,
    description: "Crispy fried cauliflower seasoned with aromatic spices.",
    category: "pure veg",
  },
  {
    name: "Mix Veg Pulao",
    price: 189,
    description: "Basmati rice cooked with vegetables and spices.",
    category: "pure veg",
  },
  {
    name: "Rice Zucchini",
    price: 179,
    description: "Healthy rice served with fresh zucchini and herbs.",
    category: "pure veg",
  },
  {
    name: "Cheese Pasta",
    price: 229,
    description: "Creamy cheese pasta with herbs and vegetables.",
    category: "pasta",
  },
  {
    name: "Tomato Pasta",
    price: 199,
    description: "Italian pasta cooked in rich tomato basil sauce.",
    category: "pasta",
  },
  {
    name: "Creamy Pasta",
    price: 239,
    description: "Creamy white sauce pasta with premium cheese.",
    category: "pasta",
  },
  {
    name: "Chicken Pasta",
    price: 269,
    description: "Creamy pasta served with juicy grilled chicken.",
    category: "pasta",
  },
  {
    name: "Butter Noodles",
    price: 169,
    description: "Butter noodles tossed with herbs and vegetables.",
    category: "noodles",
  },
  {
    name: "Veg Noodles",
    price: 179,
    description: "Stir fried vegetable noodles with flavorful sauces.",
    category: "noodles",
  },
  {
    name: "Somen Noodles",
    price: 209,
    description: "Authentic somen noodles served with savory seasonings.",
    category: "noodles",
  },
  {
    name: "Cooked Noodles",
    price: 189,
    description: "Perfectly cooked noodles with vegetables and sauces.",
    category: "noodles",
  },
];

async function uploadImage(imagePath) {
  if (!fs.existsSync(imagePath)) {
    throw new Error(`Image not found: ${imagePath}`);
  }
  const response = await cloudinary.uploader.upload(imagePath, {
    folder: "cravio/foods",
    resource_type: "image",
  });

  return {
    url: response.secure_url,
    publicId: response.public_id,
  };
}

async function seedFoods() {
  try {
    await connectDB();

    console.log(" Seeding foods...");

    await Food.deleteMany({});
    console.log("Existing foods deleted.");

    for (let i = 0; i < foods.length; i++) {
      const imagePath = path.join(FOOD_IMAGES_PATH, `food_${i + 1}.png`);

      console.log(` Uploading food_${i + 1}.png`);

      const image = await uploadImage(imagePath);

      await Food.create({
        name: foods[i].name,
        description: foods[i].description,
        category: foods[i].category,
        price: foods[i].price,
        image: {
          url: image.url,
          publicId: image.publicId,
        },
      });

      console.log(`${foods[i].name} inserted`);
    }

    console.log("\n All foods inserted successfully.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error);

    await mongoose.disconnect();
    process.exit(1);
  }
}

seedFoods();
