import { WISHLIST_MESSAGES } from "../constants/messages.constants.js";

import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../services/wishlist.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getWishlistController = asyncHandler(async (req, res) => {
  const wishlist = await getWishlist(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        wishlist,
      },
      WISHLIST_MESSAGES.WISHLIST_FETCHED
    )
  );
});

const addToWishlistController = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  const wishlist = await addToWishlist(req.user._id, foodId);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        wishlist,
      },
      WISHLIST_MESSAGES.ITEM_ADDED
    )
  );
});

const removeFromWishlistController = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  const wishlist = await removeFromWishlist(req.user._id, foodId);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        wishlist,
      },
      WISHLIST_MESSAGES.ITEM_REMOVED
    )
  );
});

export {
  addToWishlistController,
  getWishlistController,
  removeFromWishlistController,
};
