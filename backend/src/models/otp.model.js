import bcrypt from "bcrypt";
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
      enum: ["register", "login", "forgot-password", "change-contact-number"],
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    maxAttempts: {
      type: Number,
      default: 5,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Automatically delete expired OTP Document
otpSchema.index({ expiresAt: 1, expireAfterSeconds: 0 });

// Hash OTP
otpSchema.pre("save", async function () {
  if (!this.isModified("otpHash")) return;

  this.otpHash = await bcrypt.hash(this.otpHash, 10);
});

// Compare OTP
otpSchema.methods.compareOTP = async function (otp) {
  return await bcrypt.compare(otp, this.otpHash);
};

const OTP = mongoose.models.OTP || mongoose.model("OTP", otpSchema);

export default OTP;
