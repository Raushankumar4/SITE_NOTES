import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    notesPdf: { type: String, required: true },
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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

    sessionalPaper: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sessional",
      },
    ],
  },

  { timestamps: true }
);

export const Note = mongoose.model("Note", notesSchema);
