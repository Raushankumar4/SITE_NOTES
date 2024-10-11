import mongoose, { Schema } from "mongoose";

const sessionalSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sessionalPdf: { type: String, required: true },
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
