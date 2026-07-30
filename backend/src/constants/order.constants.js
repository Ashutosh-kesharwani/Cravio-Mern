export const PAYMENT_METHOD = {
  STRIPE: "Stripe",
  COD: "COD",
};

export const PAYMENT_STATUS = {
  PENDING: "pending",
  PAID: "paid",
  FAILED: "failed",
};

export const ORDER_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  PROCESSING: "processing",
  OUT_FOR_DELIVERY: "out_for_delivery",
  DELIVERED: "delivered",
  CANCELLED: "cancelled",
};

export const DELIVERY_CHARGE = 10;

export const ORDER_STATUS_LIST = Object.values(ORDER_STATUS);

export const PAYMENT_STATUS_LIST = Object.values(PAYMENT_STATUS);

export const PAYMENT_METHOD_LIST = Object.values(PAYMENT_METHOD);
