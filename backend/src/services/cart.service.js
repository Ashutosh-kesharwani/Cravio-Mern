import Cart from "../models/cart.model.js";
import Food from "../models/food.model.js";

import ApiError from "../utils/ApiError.js";

import { CART_MESSAGES } from "../constants/messages.constants.js";

/**
 * Populate cart with complete food details.
 */
const populateCart = async (cart) => {
  await cart.populate({
    path: "items.food",
  });

  return cart;
};

/**
 * Returns the user's cart.
 * Creates an empty cart if one doesn't exist.
 */
const getCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  return populateCart(cart);
};

/**
 * Add a food item to cart.
 * If already present, increase quantity.
 */
const addItemToCart = async (userId, foodId) => {
  const food = await Food.findById(foodId);

  if (!food) {
    throw new ApiError(404, CART_MESSAGES.FOOD_NOT_FOUND);
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = await Cart.create({
      userId,
      items: [],
    });
  }

  const existingItem = cart.items.find(
    (item) => item.food.toString() === foodId.toString()
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.items.push({
      food: foodId,
      quantity: 1,
    });
  }

  await cart.save();

  return populateCart(cart);
};

/**
 * Update quantity of a cart item.
 */
const updateCartItemQuantity = async (userId, foodId, quantity) => {
  if (quantity < 1) {
    throw new ApiError(400, CART_MESSAGES.INVALID_QUANTITY);
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, CART_MESSAGES.CART_NOT_FOUND);
  }

  const item = cart.items.find(
    (item) => item.food.toString() === foodId.toString()
  );

  if (!item) {
    throw new ApiError(404, CART_MESSAGES.ITEM_NOT_IN_CART);
  }

  item.quantity = quantity;

  await cart.save();

  return populateCart(cart);
};

/**
 * Remove a food item completely from cart.
 */
const removeCartItem = async (userId, foodId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, CART_MESSAGES.CART_NOT_FOUND);
  }

  const itemExists = cart.items.some(
    (item) => item.food.toString() === foodId.toString()
  );

  if (!itemExists) {
    throw new ApiError(404, CART_MESSAGES.ITEM_NOT_IN_CART);
  }

  cart.items = cart.items.filter(
    (item) => item.food.toString() !== foodId.toString()
  );

  await cart.save();

  return populateCart(cart);
};

/**
 * Remove all items from cart.
 */
const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, CART_MESSAGES.CART_NOT_FOUND);
  }

  cart.items = [];

  await cart.save();

  return populateCart(cart);
};

export {
  addItemToCart,
  clearCart,
  getCartByUserId,
  removeCartItem,
  updateCartItemQuantity,
};
