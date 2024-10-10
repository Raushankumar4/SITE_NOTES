import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
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
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
