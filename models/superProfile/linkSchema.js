// LINK SCHEMA
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: String,
    url: String,
    archived: {
      type: Boolean,
      default: false,
    },
    order: Number,
    isSocial: {
      type: Boolean,
      default: false,
    },
    clicks: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Link || mongoose.model("Link", linkSchema);
