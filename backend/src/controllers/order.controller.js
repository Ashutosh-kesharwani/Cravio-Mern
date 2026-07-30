import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import {
  getAllOrdersService,
  getMyOrdersService,
  placeOrderService,
  stripeWebhookService,
  updateOrderStatusService,
  verifyOrderService,
} from "../services/order.service.js";

import {
  validateOrderStatus,
  validatePlaceOrder,
  validateVerifyOrder,
} from "../validators/order.validator.js";

import { ORDER_MESSAGES } from "../constants/messages.constants.js";

const placeOrder = asyncHandler(async (req, res) => {
  const { items, deliveryAddress } = req.body;

  validatePlaceOrder({
    items,
    deliveryAddress,
  });

  const data = await placeOrderService({
    user: req.user,
    items,
    deliveryAddress,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        data,
        ORDER_MESSAGES.CHECKOUT_SESSION_CREATED_SUCCESSFULLY
      )
    );
});

const verifyOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.query;

  validateVerifyOrder(orderId);

  const data = await verifyOrderService(orderId);

  return res
    .status(200)
    .json(
      new ApiResponse(200, data, ORDER_MESSAGES.ORDER_VERIFIED_SUCCESSFULLY)
    );
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await getMyOrdersService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, orders, ORDER_MESSAGES.ORDERS_FETCHED_SUCCESSFULLY)
    );
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await getAllOrdersService();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        orders,
        ORDER_MESSAGES.ALL_ORDERS_FETCHED_SUCCESSFULLY
      )
    );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  validateVerifyOrder(orderId);
  validateOrderStatus(orderStatus);

  const order = await updateOrderStatusService({
    orderId,
    orderStatus,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        order,
        ORDER_MESSAGES.ORDER_STATUS_UPDATED_SUCCESSFULLY
      )
    );
});

const stripeWebhook = asyncHandler(async (req, res) => {
  await stripeWebhookService(req);

  return res.status(200).json({ received: true });
});

export {
  getAllOrders,
  getMyOrders,
  placeOrder,
  stripeWebhook,
  updateOrderStatus,
  verifyOrder,
};
