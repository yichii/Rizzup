const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    content: {
      type: String,
      maxLength: [8000, "Must be no more than 8000 characters"],
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    edited: Boolean,
    commentCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = postSchema;
