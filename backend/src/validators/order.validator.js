import { ORDER_MESSAGES } from "../constants/messages.constants.js";
import { ORDER_STATUS_LIST } from "../constants/order.constants.js";
import ApiError from "../utils/ApiError.js";

const validatePlaceOrder = ({ items, deliveryAddress }) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new ApiError(400, ORDER_MESSAGES.CART_EMPTY);
  }

  if (!deliveryAddress) {
    throw new ApiError(400, ORDER_MESSAGES.DELIVERY_ADDRESS_REQUIRED);
  }

  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "street",
    "city",
    "state",
    "zipcode",
    "country",
    "contactNumber",
  ];

  for (const field of requiredFields) {
    const value = deliveryAddress[field];

    if (typeof value !== "string" || !value.trim()) {
      throw new ApiError(
        400,
        `${field.replace(/([A-Z])/g, " $1")} is required.`
      );
    }
  }
};

const validateVerifyOrder = (orderId) => {
  if (!orderId?.trim()) {
    throw new ApiError(400, ORDER_MESSAGES.ORDER_ID_REQUIRED);
  }
};

const validateOrderStatus = (orderStatus) => {
  console.log(orderStatus);

  if (!orderStatus?.trim()) {
    throw new ApiError(400, ORDER_MESSAGES.ORDER_ID_REQUIRED);
  }

  if (!ORDER_STATUS_LIST.includes(orderStatus)) {
    throw new ApiError(400, ORDER_MESSAGES.INVALID_ORDER_STATUS);
  }
};

export { validateOrderStatus, validatePlaceOrder, validateVerifyOrder };
