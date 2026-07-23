import { Router } from "express";
import { addToCart } from "../controllers/cart.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.route("/").post(verifyJWT, addToCart);

export default cartRouter;
