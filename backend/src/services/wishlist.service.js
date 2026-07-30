import Food from "../models/food.model.js";
import User from "../models/user.model.js";

import { WISHLIST_MESSAGES } from "../constants/messages.constants.js";

import ApiError from "../utils/ApiError.js";

/* ================================
   Get Wishlist
================================ */

export const getWishlist = async (userId) => {
  const user = await User.findById(userId).populate("wishlist");

  if (!user) {
    throw new ApiError(404, WISHLIST_MESSAGES.USER_NOT_FOUND);
  }

  return user.wishlist;
};

/* ================================
   Add To Wishlist
================================ */

export const addToWishlist = async (userId, foodId) => {
  const food = await Food.findById(foodId);

  if (!food) {
    throw new ApiError(404, WISHLIST_MESSAGES.FOOD_NOT_FOUND);
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, WISHLIST_MESSAGES.USER_NOT_FOUND);
  }

  const alreadyExists = user.wishlist.some(
    (item) => item.toString() === foodId
  );

  if (alreadyExists) {
    throw new ApiError(409, WISHLIST_MESSAGES.ITEM_ALREADY_EXISTS);
  }

  user.wishlist.push(foodId);

  await user.save();

  await user.populate("wishlist");

  return user.wishlist;
};

/* ================================
   Remove From Wishlist
================================ */

export const removeFromWishlist = async (userId, foodId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, WISHLIST_MESSAGES.USER_NOT_FOUND);
  }

  user.wishlist = user.wishlist.filter((item) => item.toString() !== foodId);

  await user.save();

  await user.populate("wishlist");

  return user.wishlist;
};
