import { Router } from "express";
import {
  getAllOrders,
  getMyOrders,
  placeOrder,
  stripeWebhook,
  updateOrderStatus,
  verifyOrder,
} from "../controllers/order.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const orderRouter = Router();

orderRouter.post("/webhook", stripeWebhook);

// Place Order Endpt
orderRouter.route("/place").post(verifyJWT, placeOrder);

orderRouter.route("/verify").get(verifyJWT, verifyOrder);

orderRouter.route("/my-orders").get(verifyJWT, getMyOrders);

// Admin Only Route
//  isAdmin , verifyJWT use afterward
// /api/v1/orders
orderRouter.route("/admin/all-orders").get(getAllOrders);

orderRouter.route("/admin/:orderId/status").patch(updateOrderStatus);

export default orderRouter;
