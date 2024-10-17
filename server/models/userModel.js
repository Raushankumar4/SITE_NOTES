import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide a name"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 6,
    },
    phoneNumber: {
      type: Number,
      required: [true, "Please provide a phone number"],
      minlength: [10, "Please provide a valid phone number"],
      maxlength: [10, "Please provide a valid phone number"],
      unique: true,
      trim: true,
    },
    selectBranch: {
      type: String,
      required: [true, "Please provide a branch"],
      enum: ["CSE", "IT", "ECE", "MECH", "CHEM", "CIVIL", "EEE", "FT"],
    },
    role: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    profile: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
