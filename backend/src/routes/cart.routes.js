import { Router } from "express";

import {
  addToCart,
  clearUserCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cart.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.use(verifyJWT); // if all root needed protection then use this way

cartRouter.route("/").get(getCart).post(addToCart).delete(clearUserCart);

cartRouter.route("/:foodId").patch(updateCartItem).delete(removeFromCart);

export default cartRouter;
