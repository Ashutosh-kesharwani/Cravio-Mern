import { Router } from "express";

import {
  getAllOrders,
  getMyOrders,
  placeOrder,
  stripeWebhook,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/order.controller.js";

import { ROLES } from "../constants/roles.constants.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import verifyRole from "../middlewares/verifyRole.js";

const orderRouter = Router();

// User Routes
orderRouter.post("/", verifyJWT, placeOrder);

orderRouter.get("/verify", verifyJWT, verifyOrder);

orderRouter.get("/my-orders", verifyJWT, getMyOrders);

// Admin Routes
orderRouter.get("/", verifyJWT, verifyRole(ROLES.ADMIN), getAllOrders);

orderRouter.patch(
  "/:orderId/status",
  verifyJWT,
  verifyRole(ROLES.ADMIN),
  updateOrderStatus
);

// Webhook (No Authentication)
orderRouter.post("/webhook", stripeWebhook);

export default orderRouter;
