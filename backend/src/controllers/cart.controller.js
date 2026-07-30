import {
  addItemToCart,
  clearCart,
  getCartByUserId,
  removeCartItem,
  updateCartItemQuantity,
} from "../services/cart.service.js";

import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import { CART_MESSAGES } from "../constants/messages.constants.js";

const getCart = asyncHandler(async (req, res) => {
  const cart = await getCartByUserId(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, CART_MESSAGES.CART_FETCHED));
});

const addToCart = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { foodId } = req.body;

  const cart = await addItemToCart(req.user._id, foodId);

  return res
    .status(201)
    .json(new ApiResponse(201, cart, CART_MESSAGES.ITEM_ADDED));
});

const updateCartItem = asyncHandler(async (req, res) => {
  const { foodId } = req.params;
  const { quantity } = req.body;

  const cart = await updateCartItemQuantity(req.user._id, foodId, quantity);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, CART_MESSAGES.ITEM_UPDATED));
});

const removeFromCart = asyncHandler(async (req, res) => {
  const { foodId } = req.params;

  const cart = await removeCartItem(req.user._id, foodId);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, CART_MESSAGES.ITEM_REMOVED));
});

const clearUserCart = asyncHandler(async (req, res) => {
  const cart = await clearCart(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, CART_MESSAGES.CART_CLEARED));
});

export { addToCart, clearUserCart, getCart, removeFromCart, updateCartItem };
