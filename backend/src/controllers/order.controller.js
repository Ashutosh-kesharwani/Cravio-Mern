import stripe from "../config/stripe.js";
import Food from "../models/food.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
/* 
Controller


*/

// Stripe Webhook

/* 

  Stripe webhook controller , Run automatically by stripe


  I) Local
  In local not work without   :   npx @stripe/cli listen --forward-to http://localhost:5100/api/v1/orders/webhook

  II)In production you do not use Stripe CLI.

  Suppose your backend is deployed at:

  https://api.cravio.com

  Then in Stripe Dashboard:

  Developers
      ↓
  Webhooks
      ↓
  Add Endpoint

  https://api.cravio.com/api/v1/orders/webhook

  Stripe will call your server directly.

  No CLI needed.
  */
const stripeWebhook = asyncHandler(async (req, res) => {
  // 1. Get Stripe Signature from request header
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    // 2. Verify that request actually came from Stripe
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    throw new ApiError(400, `Webhook Error: ${error.message}`);
  }

  // 3. Handle different Stripe Events
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;

      // Retrieve metadata
      const { orderId, userId } = session.metadata;

      // Update Order
      const order = await Order.findById(orderId);

      if (!order) {
        return res.sendStatus(200);
      }

      // Prevent duplicate processing
      if (order.paymentStatus === "paid") {
        console.log("Webhook already processed.");
        return res.sendStatus(200);
      }

      // else update order status
      order.paymentStatus = "paid";
      order.orderStatus = "confirmed";
      order.stripeSessionId = session.id;
      order.stripePaymentIntentId = session.payment_intent;

      await order.save();

      // Clear user's cart only after successful payment
      await User.findByIdAndUpdate(userId, {
        cartData: {},
      });

      console.log("Payment Successful");
      break;
    }

    // Case if checkout session got expired
    case "checkout.session.expired": {
      const session = event.data.object;

      // Update payment and order status
      await Order.findByIdAndUpdate(session.metadata.orderId, {
        paymentStatus: "failed",
        orderStatus: "cancelled",
      });

      console.log("Checkout Session Expired");
      break;
    }

    // If payment got failed
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;

      console.log("Payment Failed:", paymentIntent.id);
      break;
    }

    // Unhandled event
    default:
      console.log(`Unhandled Event: ${event.type}`);
  }

  // 4. Always acknowledge receipt , No Json needed [With stripe recommend]
  return res.sendStatus(200);
});

// Place Order , when use click procced to payment in frontend this controller will get executed
const placeOrder = asyncHandler(async (req, res) => {
  const frontend_url = process.env.FRONTEND_URL;
  const userId = req.user._id;
  const { items, address } = req.body;

  // Validate len if cart is empty then return
  if (!items?.length) {
    throw new ApiError(400, "Cart is empty");
  }

  if (!address) {
    throw new ApiError(400, "Delivery address is required");
  }

  // Calculate Total Amount
  // Always try to calculate the total amount from backend never trust the frontend req data , as it may be changed
  let totalAmount = 0;

  // Create a payment link
  //1. First we have added the price of each item
  const line_items = [];

  // Create a snapshot of each orderItems
  const orderItems = [];

  // Here we cal 3 things in this loop
  //1. totalAmount wrt items price
  //2. orderItems snapshots
  //3. line_items [Payment link]
  for (const item of items) {
    // find food item
    const food = await Food.findById(item._id);

    if (!food) {
      throw new ApiError(404, "Food item not found");
    }

    // Add snapshots of orderItem
    orderItems.push({
      foodId: food._id,
      name: food.name,
      image: food.image.url,
      price: food.price,
      quantity: item.quantity,
    });

    totalAmount += food.price * item.quantity;

    // Update line items
    // Price data
    // contains curr:usd [dollars] ,
    // product_data : name of item ,
    // unit_amount = item price * 100
    // quantity : item quanitity choosen
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: food.name,
        },
        unit_amount: food.price * 100,
      },
      quantity: item.quantity,
    });
  }

  // 2. Add Del charges
  const DELIVERY_CHARGE = 10;
  line_items.push({
    price_data: {
      currency: "usd",
      product_data: {
        name: "Delivery Charge",
      },
      unit_amount: DELIVERY_CHARGE * 100,
    },
    quantity: 1,
  });

  totalAmount += DELIVERY_CHARGE;

  // Create a newOrder object
  const newOrder = await Order.create({
    userId,
    items: orderItems,
    address,
    amount: totalAmount,
    paymentMethod: "Stripe",
  });

  // Create a session with stripe
  const session = await stripe.checkout.sessions.create({
    // specify payment types
    payment_method_types: ["card"],

    // Add user emails as well
    customer_email: req.user.email || undefined,

    // Client refrence id is used to identify the user who placed the order
    // Useful for Stripe Dashboard.
    client_reference_id: userId.toString(),

    line_items, // payment link we have created
    mode: "payment",
    // Payment success -> redirect -> success url
    success_url: `${frontend_url}/orders/verify?success=true&orderId=${newOrder._id}`,
    // Payment cancel -> redirect -> cancel url
    cancel_url: `${frontend_url}/orders/verify?success=false&orderId=${newOrder._id}`,

    // Checkout : expires after 30 min
    expires_at: Math.floor(Date.now() / 1000) + 30 * 60,

    // meta Data
    metadata: {
      orderId: newOrder._id.toString(),
      userId: userId.toString(),
    },
  });

  // After session has been created

  // Send response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { session_url: session.url },
        "Checkout session created successfully"
      )
    );
});

// Verify Order
const verifyOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.query;
  console.log({ orderId });

  if (!orderId?.trim()) {
    throw new ApiError(400, "Order ID is required");
  }

  // Always check the status of order and payment from backend
  // never rely on success , which is given in url
  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // Security: only the owner can verify their order
  // Curr user , will only verify there order
  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "Access denied");
  }

  // Send the whole order document to frontend
  // Now there check the status of payment , ans redirect accordingly
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        order,
      },
      "Order verified successfully"
    )
  );
});

// Get My Orders [User Orders]
const getMyOrders = asyncHandler(async (req, res) => {
  // Fetch all orders belonging to the logged-in user
  const orders = await Order.find({
    userId: req.user._id,
  }).sort({ createdAt: -1 });

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        orders,
      },
      "Orders fetched successfully"
    )
  );
});

// Admin Controller

// List all orders of user for [Admin Panel]
const getAllOrders = asyncHandler(async (req, res) => {
  // get all orders data
  const orders = await Order.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  // Send all order info
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        orders,
      },
      "All orders fetched successfully"
    )
  );
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;

  if (!orderStatus?.trim()) {
    throw new ApiError(400, "Order status is required");
  }

  const allowedStatus = [
    "pending",
    "confirmed",
    "processing",
    "out_for_delivery",
    "delivered",
    "cancelled",
  ];

  if (!allowedStatus.includes(orderStatus)) {
    throw new ApiError(400, "Invalid order status");
  }

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  order.orderStatus = orderStatus;
  await order.save(); // return updated document

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        order,
      },
      "Order status updated successfully"
    )
  );
});

export {
  getAllOrders,
  getMyOrders,
  placeOrder,
  stripeWebhook,
  updateOrderStatus,
  verifyOrder,
};
