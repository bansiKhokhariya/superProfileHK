import mongoose, { Document, Schema, model } from 'mongoose';
import toJSON from "./plugins/toJSON";


const linkSchema = new Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    clicks: { type: Number, default: 0 },
    archive: { type: Boolean, default: false },
  },
  { _id: false } // Disable _id generation for this schema
);

// USER SCHEMA
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    handle: {
      type: String,
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    image: {
      type: Object,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      private: true,
    },
    emailVerified: {
      type: Date,
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    linksLocation: {
      type: String,
      default: "top",
    },
    themePalette: {
      type: mongoose.Schema.Types.Mixed,
      default: {
        name: "Light",
        palette: ["#FFFFFF", "#F2F2F2", "#1F2937", "#6170F8"],
      },
    },
    buttonStyle: {
      type: String,
      default: "rounded-md",
    },
    links: [linkSchema],
    socialLinks: { type: Object },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);

export default mongoose.models.User || mongoose.model("User", userSchema);
