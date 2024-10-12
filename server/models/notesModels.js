import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    notesPdf: { type: String, required: true },
    branch: {
      type: String,
      required: true,
      enum: ["CSE", "IT", "ECE", "MECH", "CHEM", "CIVIL", "EEE", "FT"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
