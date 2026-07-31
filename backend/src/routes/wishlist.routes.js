import { Router } from "express";

import {
  addToWishlistController,
  getWishlistController,
  removeFromWishlistController,
} from "../controllers/wishlist.controller.js";

import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

// Protected Routes
router.use(verifyJWT);

router.route("/").get(getWishlistController);

router.route("/:foodId").post(addToWishlistController);

router.route("/:foodId").delete(removeFromWishlistController);

export default router;
