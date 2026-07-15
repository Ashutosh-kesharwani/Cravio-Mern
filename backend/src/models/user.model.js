import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import validator from "validator";

// Address Schema
const addressSchema = new mongoose.Schema({
  label: {
    type: String,
    enum: ["Home", "Office", "Other"],
  },
  street: String,
  city: String,
  state: String,
  zipcode: String,
  country: String,
  landmark: String,
  isDefault: {
    type: Boolean,
    default: false,
  },
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      lowercase: true,
      trim: true,
    },
    lastName: {
      type: String,
      default: "",
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please enter a valid email address "],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          }),
        message:
          "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      },
    },

    avatar: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
    },

    dob: {
      type: Date,
    },

    addresses: [addressSchema],

    contactNumber: {
      type: String,
      validate: {
        validator: validator.isMobilePhone,
        message: "Please enter a valid mobile number",
      },
    },

    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },

    // Use for deactivate/ban User account
    isActive: {
      type: Boolean,
      default: true,
    },

    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
      },
    ],

    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    id: false,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// Middleware

// Hash Password
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// JWT Token Generation
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

// Virtuals
userSchema.virtuals("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
