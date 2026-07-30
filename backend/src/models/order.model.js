import mongoose from "mongoose";

import {
  ORDER_STATUS,
  ORDER_STATUS_LIST,
  PAYMENT_METHOD,
  PAYMENT_METHOD_LIST,
  PAYMENT_STATUS,
  PAYMENT_STATUS_LIST,
} from "../constants/order.constants.js";

const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true,
      immutable: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
      immutable: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
      immutable: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

const deliveryAddressSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    street: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    zipcode: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    contactNumber: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      immutable: true,
    },

    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item.",
      },
    },

    deliveryAddress: {
      type: deliveryAddressSchema,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: PAYMENT_METHOD_LIST,
      default: PAYMENT_METHOD.STRIPE,
    },

    paymentStatus: {
      type: String,
      enum: PAYMENT_STATUS_LIST,
      default: PAYMENT_STATUS.PENDING,
      index: true,
    },

    orderStatus: {
      type: String,
      enum: ORDER_STATUS_LIST,
      default: ORDER_STATUS.PENDING,
      index: true,
    },

    stripeSessionId: {
      type: String,
      default: null,
      index: true,
    },

    stripePaymentIntentId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.index({
  user: 1,
  createdAt: -1,
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
