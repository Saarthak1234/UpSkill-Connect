
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false, // Initially false, becomes true after OTP verification
    },
    adminType: {
      type: String,
      required: true,
      enum: ["Mentee", "Mentor"],
    },
    otp: { 
      type: Number 
    },  // Store OTP temporarily
    otpExpires: { 
      type: Date 
    }  // Expiry time for OTP
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
