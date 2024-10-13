import mongoose, { Schema } from "mongoose";

const sessionalSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sessionalPdf: { type: String, required: true },
    branch: {
      type: String,
      required: true,
      enum: ["CSE", "IT", "ECE", "MECH", "CHEM", "CIVIL", "EEE", "FT"],
    },
    selectYear: {
      type: String,
      required: true,
      enum: ["I", "II", "III", "IV"],
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
