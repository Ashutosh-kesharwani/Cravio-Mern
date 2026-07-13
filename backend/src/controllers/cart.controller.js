import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

/* 

Here in schema we have already have the cartData field which is an empty object

So ,

1. addToCart Controller
> First retrieve the cartData field from user
> add new data

*/

const addToCart = asyncHandler(async (req, res) => {
  // we use verify JWT middleware so we get access to user data
  let userData = await User.findById(req.user._id);
  // Now get current cartData which has been stored in userDb
  let cartData = await userData.cartData;

  // We are going to add new Data which is provided by user in req
  // We are using a logic where if the currCartData with the itemId is not present then we create a new key value pair with id as key of that item and count as 1
  // else if present then just update its value
  const { itemId } = req.body;
  if (!cartData[itemId]) {
    cartData[itemId] = 1;
  } else {
    cartData[itemId] += 1;
  }

  // We have to now update the user cartData with updated value
  await User.findByIdAndUpdate(req.user._id, { cartData });

  return res
    .status(201)
    .json(new ApiResponse(201, {}, "Added to cart successfully"));
});
const removeFromCart = asyncHandler(async (req, res) => {
  let userData = await User.findById(req.user._id);
  let cartData = await userData.cartData;
  // console.log(req.params);
  const { itemId } = req.params;
  // If item with that id is availiable in cart > 0 , the  remove one count from it
  if (cartData[itemId] > 0) {
    cartData[itemId]--;

    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }
  }

  // After cartData in db
  await User.findByIdAndUpdate(req.user._id, { cartData });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Remove From cart successfully"));
});
const getCart = asyncHandler(async (req, res) => {
  let userData = await User.findById(req.user._id);
  let cartData = await userData.cartData;

  return res
    .status(200)
    .json(new ApiResponse(200, { cartData }, "Fetched cart successfully"));
});

export { addToCart, getCart, removeFromCart };
