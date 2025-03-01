import mongoose, { Schema } from "mongoose";

const sessionalSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sessionalPdf: { type: String, required: true },
    branch: {
      type: String,
      required: true,
      enum: [
        "CSE",
        "IT",
        "ECE",
        "MECH",
        "CHEM",
        "CIVIL",
        "EEE",
        "FT",
        "EIE",
        "BIOTECH",
        "OTHERS",
      ],
    },
    selectYear: {
      type: String,
      required: true,
      enum: ["1st", "2nd", "3rd", "4th"],
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "reported"],
      default: "pending",
    },
    rejectionReason: { type: String, default: null },
    reportReason: { type: String, default: null },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    note: {
      type: Schema.Types.ObjectId,
      ref: "Note",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Sessional = mongoose.model("Sessional", sessionalSchema);
