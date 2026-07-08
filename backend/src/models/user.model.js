import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      lowercase: true,
      // match:
    },
    password: {
      type: String,
      required: [true, "password is required"],
      trim: true,
    },
    refreshToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    id: false,
    strictModeQuery: "throw",
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

// bcrypt function

// Hash Password
userSchema.pre("save", async function (next) {
  try {
    // check  is password  field is modified or not
    if (!this.isModified("password")) return next();
    // if modified , update password
    this.password = await bcrypt.hash(this.password, 10);

    next();
  } catch (error) {
    next(error);
  }
});

//Compare password func
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Token generation
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this._name,
      email: this.email,
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

const User = mongoose.model("User", userSchema);
export default User;
