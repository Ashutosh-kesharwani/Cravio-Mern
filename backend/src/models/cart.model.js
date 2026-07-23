import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Type.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    items: [
      {
        food: {
          type: mongoose.Schema.Type.ObjectId,
          ref: "Food",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;
