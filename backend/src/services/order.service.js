import stripe from "../config/stripe.js";

import Food from "../models/food.model.js";
import Order from "../models/order.model.js";

import ApiError from "../utils/ApiError.js";

import {
  DELIVERY_CHARGE,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
} from "../constants/order.constants.js";

import { ORDER_MESSAGES } from "../constants/messages.constants.js";

const placeOrderService = async ({ user, items, deliveryAddress }) => {
  let totalAmount = 0;

  const orderItems = [];

  const stripeLineItems = [];
  console.log(items);

  for (const item of items) {
    const food = await Food.findById(item.food?._id);

    if (!food) {
      throw new ApiError(404, ORDER_MESSAGES.FOOD_NOT_FOUND);
    }

    orderItems.push({
      food: food._id,
      name: food.name,
      image: food.image.url,
      price: food.price,
      quantity: item.quantity,
    });

    totalAmount += food.price * item.quantity;

    stripeLineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: food.name,
        },
        unit_amount: food.price,
      },
      quantity: item.quantity,
    });
  }

  stripeLineItems.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Delivery Charge",
      },
      unit_amount: DELIVERY_CHARGE,
    },
    quantity: 1,
  });

  totalAmount += DELIVERY_CHARGE;

  const order = await Order.create({
    user: user._id,
    items: orderItems,
    deliveryAddress,
    totalAmount,
    paymentMethod: PAYMENT_METHOD.STRIPE,
    paymentStatus: PAYMENT_STATUS.PENDING,
    orderStatus: ORDER_STATUS.PENDING,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: user.email || undefined,
    client_reference_id: user._id.toString(),
    line_items: stripeLineItems,
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/verify?orderId=${order._id}`,
    cancel_url: `${process.env.FRONTEND_URL}/verify?orderId=${order._id}`,
    expires_at: Math.floor(Date.now() / 1000) + 1800,
    metadata: {
      orderId: order._id.toString(),
      userId: user._id.toString(),
    },
  });

  return {
    sessionUrl: session.url,
  };
};

const verifyOrderService = async (orderId) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, ORDER_MESSAGES.ORDER_NOT_FOUND);
  }

  return {
    paymentStatus: order.paymentStatus,
    orderStatus: order.orderStatus,
  };
};

const getMyOrdersService = async (userId) => {
  const orders = await Order.find({ user: userId })
    .populate({
      path: "items.food",
      select: "name image price",
    })
    .sort({ createdAt: -1 })
    .lean();

  return orders;
};

// Admin
const getAllOrdersService = async () => {
  const orders = await Order.find({})
    .populate("user", "fullName username email contactNumber")
    .populate({
      path: "items.food",
      select: "name image price",
    })
    .sort({ createdAt: -1 })
    .lean();

  return orders;
};

const updateOrderStatusService = async ({ orderId, orderStatus }) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, ORDER_MESSAGES.ORDER_NOT_FOUND);
  }

  order.orderStatus = orderStatus;

  await order.save();

  await order.populate({
    path: "items.food",
    select: "name image price",
  });

  return order;
};

const stripeWebhookService = async (req) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    throw new ApiError(
      400,
      ORDER_MESSAGES.WEBHOOK_SIGNATURE_VERIFICATION_FAILED
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      const order = await Order.findById(session.metadata.orderId);

      if (!order) {
        throw new ApiError(404, ORDER_MESSAGES.ORDER_NOT_FOUND);
      }

      if (order.paymentStatus === PAYMENT_STATUS.PAID) {
        return;
      }

      order.paymentStatus = PAYMENT_STATUS.PAID;
      order.orderStatus = ORDER_STATUS.CONFIRMED;
      order.stripeSessionId = session.id;

      await order.save();

      break;
    }

    case "checkout.session.expired": {
      const session = event.data.object;

      await Order.findByIdAndDelete(session.metadata.orderId);

      break;
    }

    case "checkout.session.async_payment_failed": {
      const session = event.data.object;

      const order = await Order.findById(session.metadata.orderId);

      if (order) {
        order.paymentStatus = PAYMENT_STATUS.FAILED;
        await order.save();
      }

      break;
    }

    default:
      break;
  }

  return;
};

export {
  getAllOrdersService,
  getMyOrdersService,
  placeOrderService,
  stripeWebhookService,
  updateOrderStatusService,
  verifyOrderService,
};
