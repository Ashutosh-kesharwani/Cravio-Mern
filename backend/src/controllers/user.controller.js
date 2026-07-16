import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Constants
const options = {
  httpOnly: true,
  secure: false, // for development,
  sameSite: "lax",
};

// Helper Function

// Generate and persist new access & refresh tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate JWT tokens
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save latest refresh token in database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(
      `userController :: generateAccessAndRefreshToken :: ${error.message}`
    );

    throw new ApiError(
      500,
      "Something went wrong while generating authentication tokens"
    );
  }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  // Validate required fields
  if ([firstName, email, username, password].some((field) => !field?.trim())) {
    throw new ApiError(400, "All required fields are mandatory");
  }

  // Check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    username,
    password,
  });

  // Retrieve created user without sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering user , Please try again"
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User registered successfully"
      )
    );
});

// Login user using email or username
const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required credentials
  if (!email?.trim() && !username?.trim()) {
    throw new ApiError(400, "Email or username is required");
  }

  if (!password?.trim()) {
    throw new ApiError(400, "Password is required");
  }

  // Find user by email or username
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });

  // Avoid revealing whether the account exists
  if (!existedUser) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Verify password
  const isValidPassword = await existedUser.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  // Generate new authentication tokens
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id
  );

  // Remove sensitive fields before sending response
  const user = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { user }, "User logged in successfully"));
});

export { loginUser, registerUser };
