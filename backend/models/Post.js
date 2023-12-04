const mongoose = require("mongoose");

const Schema = moongoose.Schema

const postSchema = new Schema({
    title: {
      type: String,
      maxLength: [80, "Must be no more than 80 characters"],
    },
    content: {
      type: String,
      maxLength: [8000, "Must be no more than 8000 characters"],
      minLength: [1, "Must be more than 0 characters"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    edited: {
      type: Boolean,
      default: false,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
