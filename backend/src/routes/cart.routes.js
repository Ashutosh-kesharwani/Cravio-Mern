import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const cartRouter = Router();

// Route setup
// Protected Api [user must authenticated to send these request]
cartRouter.get("/", verifyJWT, getCart);
cartRouter.post("/", verifyJWT, addToCart);
cartRouter.patch("/:itemId", verifyJWT, removeFromCart);
export default cartRouter;
