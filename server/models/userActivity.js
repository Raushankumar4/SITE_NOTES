import mongoose, { Schema } from "mongoose";

const userActivitySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    loginTime: {
      type: Date,
      default: Date.now, 
      required: true,
    },
    logOutTime: {
      type: Date,
    },
    ipAddress: { type: String },
    deviceInfo: { type: String },
  },
  { timestamps: true }
);

export const UserActivity = mongoose.model("UserActivity", userActivitySchema);
